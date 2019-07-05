package com.proj.todos.todo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface TodoCategoryRepository extends CrudRepository<TodoCategory, Long> {
    List<TodoCategory> findAll();
}