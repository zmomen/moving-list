package com.proj.todos.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.Data;

@Controller
@RequestMapping("todo-categories")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TodoCategoryController {

    @Autowired
    private TodoCategoryRepository todoCategoryRepository;

    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public @ResponseBody List<TodoCategory> listAllCategories() {
        return todoCategoryRepository.findAll();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<TodoCategory> listCategoryByName(@RequestParam long id)
    {
    return ResponseEntity.of(todoCategoryRepository.findById(id));
    }

    @PostMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<String> createTodoCategory(@RequestParam(required = true) String category,
            @RequestBody(required = false) List<TodoObject> todoObjectList) {

        if (todoObjectList != null) {
            List<Todo> newTodos = new ArrayList<>();
            todoObjectList.forEach(todoObject -> {
                newTodos.add(Todo.builder()
                .title(todoObject.getTitle())
                .description(todoObject.getDescription())
                .createdDate(new Date())
                .build());
            });
            
            TodoCategory todoCategory = new TodoCategory(category, newTodos);
            todoCategoryRepository.save(todoCategory);
            return ResponseEntity.ok("CREATED! " + todoCategory.getId());
        } else {
            return ResponseEntity.ok("NOT! " + category + " wjat is " + todoObjectList);
        }
    }

    @Data(staticConstructor = "of")
    static class TodoObject {
        String title;
        String description;
    }
}