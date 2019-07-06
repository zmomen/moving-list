import React from "react";
import "spectre.css";
import "./App.css";
import TodoList from "./todo/TodoList";

function App() {
  const headers = ["name", "genre", "release date"];
  const data = ["name", "genre", "release date"];
  return (
    <div className="container grid-lg">
      <TodoList headers={headers} data={data} />
    </div>
  );
}

export default App;
