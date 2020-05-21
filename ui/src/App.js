import React, { useState, useEffect } from "react";
import "spectre.css";
import "./App.css";
import BannerImage from "./common/BannerImage";
import Footer from "./common/Footer";
import TodoList from "./todo/TodoList";
import Todo from "./todo/Todo";
import * as api from "./utils/api";

const App = () => {
  // const [hasError, setErrors] = useState([]);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    api
      .getTodoCategories()
      .then((res) => {
        console.warn("some data", res);
        setTodos(res.data);
      })
      .catch((err) => {
        console.warn("errors", err);
        // setErrors([err]);
      });
  });

  return (
    <div>
      <div className="container grid-lg">
        <div className={"App-logo"}>
          <BannerImage width="300" height="200" />
          <Todo />
        </div>
        {/* {hasError ? "ERROS!" : ""} */}
        <TodoList data={todos} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
