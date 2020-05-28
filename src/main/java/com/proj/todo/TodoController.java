package com.proj.todo;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.Duration;
import java.util.Date;
import java.util.List;
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
        return ResponseEntity.ok(todoRepository.findAllByOrderByIdDesc());
    }

    @GetMapping("/status")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity getStatus() {

        Map<String, List<Todo>> result = todoRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(Todo::isCompleted))
                .entrySet()
                .stream()
                .collect(Collectors.toMap(e -> e.getKey() ? "complete" : "active", Map.Entry::getValue));

        return ResponseEntity.ok(result);
    }


    @PostMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<String> createTodo(@RequestBody TodoRequest todoRequest) {

        TodoCategory maybeCategory;
        Optional<TodoCategory> byCategory = todoCategoryRepository.findByCategory(todoRequest.getCategory());
        if (byCategory.isPresent()) {
            maybeCategory = byCategory.get();
        } else {
            maybeCategory = TodoCategory
                    .builder()
                    .category(todoRequest.getCategory())
                    .build();
            todoCategoryRepository.save(maybeCategory);
        }

        Todo todo = Todo.builder()
                .title(todoRequest.getTitle())
                .dueDate(formatDueDate(todoRequest.getDueDate()))
                .description(todoRequest.getDescription())
                .todoCategory(maybeCategory)
                .completed(false)
                .modifiedDate(new Date())
                .build();
        todoRepository.save(todo);

        return ResponseEntity.created(URI.create("")).body("CREATED!");

    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<String> updateTodo(@PathVariable long id, @RequestBody TodoRequest todoRequest) {
        Optional<Todo> foundTodo = Optional.of(todoRepository.findById(id)).get();

        if (!foundTodo.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        foundTodo.get().setTitle(todoRequest.getTitle());
        foundTodo.get().setDescription(todoRequest.getDescription());
        foundTodo.get().setCompleted(todoRequest.isCompleted());
        foundTodo.get().setModifiedDate(new Date());
        foundTodo.get().setDueDate(formatDueDate(todoRequest.getDueDate()));

        todoRepository.save(foundTodo.get());
        return ResponseEntity.ok("Updated!");
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<String> deleteTodo(@PathVariable long id) {
        Optional<Todo> foundTodo = Optional.of(todoRepository.findById(id)).get();

        if (!foundTodo.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        todoRepository.delete(Todo.builder().id(id).build());
        return ResponseEntity.noContent().build();
    }

    private Date formatDueDate(Date input) {
        return Date.from(input.toInstant().plus(Duration.ofHours(5)));
    }
}