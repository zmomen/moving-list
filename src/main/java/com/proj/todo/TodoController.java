package com.proj.todo;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("todos")
@AllArgsConstructor
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;
    private TodoCategoryRepository todoCategoryRepository;

    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity listAll() {
        return ResponseEntity.ok(todoRepository.findAll());
    }

    @GetMapping("/status")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity getStatus() {

        Map<String, Long> result = todoRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(Todo::isCompleted, Collectors.counting()))
                .entrySet()
                .stream()
                .collect(Collectors.toMap(e -> e.getKey() ? "complete" : "active", Map.Entry::getValue));

        return ResponseEntity.ok(result);
    }


    @PostMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<String> createTodo(@RequestBody TodoObject todoObj) {

        TodoCategory maybeCategory;
        Optional<TodoCategory> byCategory = todoCategoryRepository.findByCategory(todoObj.getCategory());
        if (byCategory.isPresent()) {
            maybeCategory = byCategory.get();
        } else {
            maybeCategory = TodoCategory
                    .builder()
                    .category(todoObj.getCategory())
                    .build();
            todoCategoryRepository.save(maybeCategory);
        }

        Todo todo = Todo.builder()
                .title(todoObj.getTitle())
                .createdAt(new Date())
                .description(todoObj.getDescription())
                .todoCategory(maybeCategory)
                .completed(false)
                .modifiedDate(new Date())
                .build();
        todoRepository.save(todo);

        return ResponseEntity.created(URI.create(todoObj.getTitle())).body("CREATED!");

    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<String> updateTodo(@PathVariable long id, @RequestBody TodoObject todoObject) {
        Optional<Todo> foundTodo = Optional.of(todoRepository.findById(id)).get();

        if (!foundTodo.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        foundTodo.get().setTitle(todoObject.getTitle());
        foundTodo.get().setDescription(todoObject.getDescription());
        foundTodo.get().setCompleted(todoObject.isCompleted());
        foundTodo.get().setModifiedDate(new Date());


        todoRepository.save(foundTodo.get());
        return ResponseEntity.ok("Updated!");
    }

    @Data(staticConstructor = "of")
    static class TodoObject {
        String title;
        String description;
        String category;
        boolean completed;
    }
}