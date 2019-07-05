import axios from "axios";

var instance = axios.create({
  baseURL: "http://localhost:8080"
});

export function getTodoCategories() {
  return instance.get("/todo-categories");
}
