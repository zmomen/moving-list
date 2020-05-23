import axios from "axios";

var config = {
  headers: { "Access-Control-Allow-Origin": "*" },
};

var instance = axios.create({
  baseURL: "http://localhost:8080",
});

export function getTodoCategories() {
  return instance.get("/todo-categories", config);
}

export function getTodoStatus() {
  return instance.get("/todos/status", config);
}

export function updateTodo(todo) {
  let request = {
    title: todo.title,
    description: todo.description,
    category: todo.todoCategory.category,
    completed: true,
  };
  return instance.put(`/todos/${todo.id}`, request, config);
}

export function createTodo(todo) {
  console.warn("createdata", todo);
  return instance.post("/todos", todo, config);
}

export function deleteTodo(todo) {
  return instance.delete(`/todos/${todo.id}`, config);
}
