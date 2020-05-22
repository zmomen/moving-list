import React, { useState, useEffect, useCallback } from "react";
import "spectre.css";
import "./App.css";
import BannerImage from "./common/BannerImage";
import ErrorBlock from "./common/ErrorBlock";
import Footer from "./common/Footer";
import TodoList from "./todo/TodoList";
import AddTodo from "./todo/AddTodo";
import * as api from "./utils/api";
import Nav from "./common/Nav";

const App = () => {
  const [todoStatus, setTodoStatus] = useState({ completed: 0, active: 0 });
  const [todos, setTodos] = useState({ data: [], errors: null });
  const [isNewData, setIsNewData] = useState(false);
  useEffect(() => {
    api
      .getTodoCategories()
      .then((res) => {
        setTodos({ data: res.data, errors: null });

        let active = 0,
          completed = 0;
        res.data.forEach((element) => {
          element.todos.forEach((todo) => {
            todo.completed ? completed++ : active++;
          });
        });
        setTodoStatus({ completed: completed, active: active });
      })
      .catch((error) => {
        console.warn("what", { ...error });
        setTodos({ data: [], errors: error });
      });
  }, [isNewData]);

  const addTodo = useCallback(
    (userInput) => {
      api
        .createTodo(userInput)
        .then((res) => {
          console.warn("Suces", res.data);
          setIsNewData(!isNewData);
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },
    [isNewData]
  );

  return (
    <div>
      <div className={"container grid-lg"}>
        <Nav data={todoStatus}/>
        
        <div className={"App-logo"}>
          <BannerImage className={"rounded"} width="350" height="300" />
          <AddTodo addTodo={addTodo} />
        </div>
        {todos.errors !== null ? <ErrorBlock errors={todos.errors} /> : ""}
        <TodoList data={todos.data} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
