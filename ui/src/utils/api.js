import axios from "axios";

var config = {
  headers: { "Access-Control-Allow-Origin": "*" }
};

var instance = axios.create({
  baseURL: "http://localhost:8080"
});

export function getTodoCategories() {
  return instance.get("/todo-categories", config);
}

export function updateTodo(id, title, desc) {
  return instance.put(`/todos/${id}`, config);
}

export function createTodo(data) {
  console.warn("waht is be ing sent?", data);
  return instance.post('/todos', data);
}
