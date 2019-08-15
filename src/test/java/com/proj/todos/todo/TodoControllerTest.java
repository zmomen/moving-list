package com.proj.todos.todo;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
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
                .createdDate(new Date())
                .build();

        List<Todo> expected = Collections.singletonList(mockTodo);
        when(todoRepository.findAll()).thenReturn(expected);
        mockMvc.perform(get("/todos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$.[0].title").value("title"));
    }
}