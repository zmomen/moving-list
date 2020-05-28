package com.proj.todo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodoRequest {
    String title;
    String description;
    String category;
    boolean completed;
    Date dueDate;
}
