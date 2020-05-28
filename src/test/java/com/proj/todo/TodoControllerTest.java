package com.proj.todo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

@RunWith(SpringRunner.class)
public class TodoControllerTest {
    private MockMvc mockMvc;

    @InjectMocks
    private TodoController todoController;

    @Mock
    private TodoRepository todoRepository;

    @Mock
    private TodoCategoryRepository todoCategoryRepository;

    ArgumentCaptor<Todo> captor = ArgumentCaptor.forClass(Todo.class);

    @Before
    public void setup() {
        mockMvc = standaloneSetup(todoController)
                .build();
    }

    @Test
    public void givenTodos_whenGetTodos_thenReturnTodosList() throws Exception {
        TodoCategory mockTodoCategory = TodoCategory.builder()
                .category("category")
                .build();

        Todo mockTodo = Todo.builder()
                .id(1L)
                .title("title")
                .todoCategory(mockTodoCategory)
                .description("description")
                .modifiedDate(new Date())
                .build();

        List<Todo> expected = Collections.singletonList(mockTodo);
        when(todoRepository.findAll()).thenReturn(expected);
        mockMvc.perform(get("/todos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$.[0].title").value("title"));
    }

    @Test
    public void givenNewTodo_whenCreateTodoAndCategoryExists_thenCreateTodoForThatCategoryAndReturnCreated() throws Exception {
        String mockedCategory = "cat";

        TodoRequest request = TodoRequest.builder()
                .title("title")
                .description("desc")
                .category(mockedCategory)
                .dueDate(new Date())
                .completed(false)
                .build();

        when(todoCategoryRepository.findByCategory(mockedCategory))
                .thenReturn(Optional.of(TodoCategory.builder().category(mockedCategory).build()));

        mockMvc.perform(post("/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isCreated())
                .andExpect(content().string("CREATED!"));

        verify(todoRepository, times(1)).save(any(Todo.class));
    }

    @Test
    public void givenNewTodo_whenCreateTodoAndCategoryIsNew_thenCreateTodoForThatCategoryAndReturnCreated() throws Exception {
        String mockedCategory = "new";

        TodoRequest request = TodoRequest.builder()
                .title("title")
                .description("desc")
                .category(mockedCategory)
                .dueDate(new Date())
                .completed(false)
                .build();

        when(todoCategoryRepository.findByCategory(mockedCategory))
                .thenReturn(Optional.empty());

        mockMvc.perform(post("/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isCreated())
                .andExpect(content().string("CREATED!"));

        verify(todoCategoryRepository, times(1)).save(any(TodoCategory.class));
    }

    @Test
    public void givenTodos_whenGetStatus_thenReturnsActiveAndCompleted() throws Exception {
        Todo complete = Todo.builder()
                .title("todo1")
                .completed(true)
                .build();

        Todo active = Todo.builder()
                .title("todo2")
                .completed(false)
                .build();

        List<Todo> expected = new ArrayList<>();
        expected.add(complete);
        expected.add(active);

        when(todoRepository.findAll()).thenReturn(expected);

        mockMvc.perform(get("/todos/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.active", hasSize(1)))
                .andExpect(jsonPath("$.active.[0].title", is(active.getTitle())))
                .andExpect(jsonPath("$.complete", hasSize(1)))
                .andExpect(jsonPath("$.complete.[0].title", is(complete.getTitle())));

        verify(todoRepository, times(1)).findAll();
    }

    @Test
    public void givenTodos_whenDeleteTodo_thenDeletesTodoAndReturnsNoContent() throws Exception {
        long todoId = 1L;
        Todo todo = Todo.builder()
                .id(todoId)
                .title("todo1")
                .completed(true)
                .build();

        when(todoRepository.findById(todoId)).thenReturn(Optional.of(todo));

        mockMvc.perform(delete("/todos/{id}", todo.getId()))
                .andExpect(status().isNoContent());

        verify(todoRepository, times(1)).findById(todoId);
        verify(todoRepository, times(1)).delete(any(Todo.class));
    }

    @Test
    public void givenTodo_whenUpdateTodo_thenReturnOK() throws Exception {
        long id = 1L;
        Todo existing = Todo.builder().id(id).build();
        TodoRequest request = TodoRequest.builder()
                .title("title")
                .description("updated desc")
                .dueDate(new Date())
                .completed(false)
                .build();

        when(todoRepository.findById(id))
                .thenReturn(Optional.of(existing));

        mockMvc.perform(put("/todos/{id}", id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andExpect(content().string("Updated!"));

        verify(todoRepository, times(1)).save(captor.capture());

        assertEquals(request.getTitle() ,captor.getValue().getTitle());
        assertEquals(request.getDescription() ,captor.getValue().getDescription());
        assertEquals(request.isCompleted() ,captor.getValue().isCompleted());
    }

    /*
     * converts a Java object into JSON representation
     */
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}