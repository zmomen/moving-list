package com.proj.todo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "todos")
@Table(name = "todo_category")
@JsonInclude(JsonInclude.Include.NON_NULL)
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