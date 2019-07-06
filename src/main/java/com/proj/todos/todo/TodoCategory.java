package com.proj.todos.todo;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "todos")
@Table(name = "todo_category")
class TodoCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "category")
    private String category;
    
    @OneToMany(mappedBy = "todoCategory", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("category")
    private List<Todo> todos;

    public TodoCategory(String category, List<Todo> newTodos) {
        this.category = category;
        this.todos = newTodos;
        this.todos.forEach(x -> x.setTodoCategory(this));
    }
}