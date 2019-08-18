package com.proj.todos.todo;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("todo-categories")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TodoCategoryController {

    @Autowired
    private TodoCategoryRepository todoCategoryRepository;

    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public @ResponseBody
    List<TodoCategory> listAllCategories() {
        return todoCategoryRepository.findAll();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<TodoCategory> listCategoryById(@PathVariable long id) {
        return ResponseEntity.of(todoCategoryRepository.findById(id));
    }

    @PostMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<String> createTodoCategory(@RequestParam String category,
                                                     @RequestBody(required = false) List<TodoObject> todoObjectList) {

        if (todoObjectList != null) {
            List<Todo> newTodos = new ArrayList<>();
            todoObjectList.forEach(todoObject -> newTodos.add(Todo.builder()
                    .title(todoObject.getTitle())
                    .description(todoObject.getDescription())
                    .modifiedDate(new Date())
                    .completed(false)
                    .build()));

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