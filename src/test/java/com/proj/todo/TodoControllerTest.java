package com.proj.todo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

@RunWith(SpringRunner.class)
public class TodoControllerTest {
    private MockMvc mockMvc;

    @InjectMocks
    private TodoController todoController;

    @Mock
    private TodoRepository todoRepository;

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
    public void givenNewTodo_whenCreateTodo_thenReturnOK() throws Exception {
        Todo mockTodo = Todo.builder()
                .id(1L)
                .title("title")
                .description("description")
                .build();

        mockMvc.perform(post("/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(mockTodo)))
                .andExpect(status().isOk())
                .andExpect(content().string("CREATED!"));

        verify(todoRepository, times(1)).save(any(Todo.class));
    }

    @Test
    public void givenTodos_whenGetStatus_thenReturnsActiveAndCompleted() throws Exception {
        Todo complete = Todo.builder()
                .completed(true)
                .build();

        Todo active = Todo.builder()
                .completed(false)
                .build();

    List<Todo> expected = new ArrayList<>();
    expected.add(complete);
    expected.add(active);

        when(todoRepository.findAll()).thenReturn(expected);

        mockMvc.perform(get("/todos/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.active", is(1)))
                .andExpect(jsonPath("$.complete", is(1)));

        verify(todoRepository, times(1)).findAll();

    }
//
//    @Test
//    public void givenTodo_whenUpdateTodo_thenReturnOK() throws Exception {
//
////        mockMvc.perform(put("/todos/{id}", mockTodo.getId())
////                .contentType(MediaType.APPLICATION_JSON)
////                .body(asJsonString(mockTodo)))
////                .andExpect(status().isOk())
////                .andExpect(content().string("CREATED!"));
////
////        verify(todoRepository, times(1)).save();
//    }

//    @Test
//    public void givenTodos_whenGetAll_thenReturnTodos() throws Exception {
//        mockMvc.perform(get("/todos/all")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//    }

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