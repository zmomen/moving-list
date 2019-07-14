package com.proj.todos.todo;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.AllArgsConstructor;
import lombok.Data;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("todos")
@AllArgsConstructor
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public @ResponseBody List<Todo> listAll() {
        return todoRepository.findAll();
    }

    @PostMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<String> createTodo(@RequestBody TodoObject todoObj) {
        Todo todo = Todo.builder().title(todoObj.getTitle()).description(todoObj.getDescription())
                .createdDate(new Date()).build();
        todoRepository.save(todo);

        return ResponseEntity.ok("CREATED!");

    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<String> updateArticle(@PathVariable long id, @RequestBody TodoObject todoObject) {
        Todo foundTodo = todoRepository.findById(id).get();
        
        if (foundTodo == null) {
            return ResponseEntity.notFound().build();
        }
        foundTodo.setTitle(todoObject.getTitle());
        foundTodo.setDescription(todoObject.getDescription());

        todoRepository.save(foundTodo);
		return ResponseEntity.ok("Updated!");
    }

    @Data(staticConstructor = "of")
    static class TodoObject {
        String title;
        String description;
    }
}