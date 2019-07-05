package com.proj.todos.todo;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.AllArgsConstructor;
import lombok.Data;

@Controller
@AllArgsConstructor
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("/todos")
    public @ResponseBody List<Todo> listAll() {
        return todoRepository.findAll();
    }

    @PostMapping("/todos")
    public ResponseEntity<String> createTodo(@RequestBody TodoObject todoObj) {
        Todo todo = Todo.builder()
                        .title(todoObj.getTitle())
                        .description(todoObj.getDescription())
                        .createdDate(new Date())
                        .build();
        System.out.println(todo.toString());

        return ResponseEntity.ok("CREATED!");

    }

    @Data(staticConstructor = "of")
    static class TodoObject {
        String title;
        String description;
    }
}