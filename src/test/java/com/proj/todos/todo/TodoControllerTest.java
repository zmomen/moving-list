package com.proj.todos.todo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebMvcTest(TodoController.class)
public class TodoControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Mock
    private TodoRepository todoRepository;

    @Test
    public void givenData_whenGetTodoCategories_thenReturnList() throws Exception {
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

        List<Todo> expected = Arrays.asList(mockTodo);
        when(todoRepository.findAll()).thenReturn(expected);
        mockMvc.perform(MockMvcRequestBuilders.post("/todo-categories")).andReturn();
    }
}