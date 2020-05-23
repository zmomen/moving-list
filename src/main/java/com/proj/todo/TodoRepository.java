package com.proj.todo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface TodoRepository extends CrudRepository<Todo, Long> {
    List<Todo> findAll();
    List<Todo> findAllByOrderByIdDesc();
 }
