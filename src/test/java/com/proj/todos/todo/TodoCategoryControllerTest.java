package com.proj.todos.todo;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

@RunWith(SpringRunner.class)
public class TodoCategoryControllerTest {
    private MockMvc mockMvc;

    @InjectMocks
    private TodoCategoryController todoCategoryController;

    @Mock
    private TodoCategoryRepository todoCategoryRepository;

    @Before
    public void setup() {
        mockMvc = standaloneSetup(todoCategoryController)
                .build();
    }

    @Test
    public void givenCategory_whenGetCategoryById_thenReturnCategory() throws Exception {
        TodoCategory expectedCategory = TodoCategory.builder()
                .id(1L)
                .category("cat")
                .build();

        when(todoCategoryRepository.findById(expectedCategory.getId()))
                .thenReturn(Optional.of(expectedCategory));

        mockMvc.perform(get("/todo-categories/{id}", expectedCategory.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.category").value("cat"));
    }

}