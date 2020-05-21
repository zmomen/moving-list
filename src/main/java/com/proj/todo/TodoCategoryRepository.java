package com.proj.todo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoCategoryRepository extends CrudRepository<TodoCategory, Long> {
    List<TodoCategory> findAll();

    Optional<TodoCategory> findByCategory(String category);
}