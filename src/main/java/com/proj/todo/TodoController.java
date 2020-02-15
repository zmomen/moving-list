package com.proj.todo;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("todos")
@AllArgsConstructor
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity listAll() {
        return ResponseEntity.ok(todoRepository.findAll());
    }

    @PostMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<String> createTodo(@RequestBody TodoObject todoObj) {
        Todo todo = Todo.builder()
                .title(todoObj.getTitle())
                .description(todoObj.getDescription())
                .completed(false)
                .modifiedDate(new Date())
                .build();
        todoRepository.save(todo);

        return ResponseEntity.ok("CREATED!");

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
        boolean completed;
    }
}