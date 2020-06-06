import React, { useState, useEffect, useCallback } from "react";
import "spectre.css";
import "./App.css";
import BannerImage from "./common/BannerImage";
import ErrorBlock from "./common/ErrorBlock";
import Footer from "./common/Footer";
import TodoList from "./todo/TodoList";
import TodoEditor from "./todo/TodoEditor";
import * as api from "./utils/api";
import Nav from "./common/Nav";

const App = () => {
  const [todoStatus, setTodoStatus] = useState({ completed: 0, active: 0 });
  const [todos, setTodos] = useState({ data: [], errors: null });
  const [persons, setPersons] = useState(new Set());
  const [isNewData, setIsNewData] = useState(false);
  useEffect(() => {
    api
      .getTodoCategories()
      .then((res) => {
        let personsArr = new Set();
        let active = 0,
          completed = 0;
        res.data.forEach((todoCategory) => {
          todoCategory.todos.forEach((todo) => {
            // set nav bar counts
            todo.completed ? completed++ : active++;
            // filter for table.
            todoCategory.todos = todoCategory.todos.filter((t) => !t.completed);
            return todoCategory;
          });

          // add persons.
          res.data.forEach((todoCategory) => {
            todoCategory.todos.forEach((todo) => {
              personsArr.add(todo.title);
            });
          });
        });

        setPersons(personsArr);
        setTodoStatus({ completed: completed, active: active });
        setTodos({ data: res.data, errors: null });
      })
      .catch((error) => {
        console.warn("failed", { ...error });
        setTodos({ data: [], errors: error });
      });
  }, [isNewData]);

  const addTodo = useCallback(
    (userInput) => {
      api
        .createTodo(userInput)
        .then((res) => {
          console.warn("Success", res.data);
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
        <Nav data={todoStatus} />
        <div className={"d-flex App-logo"}>
          <BannerImage className={"rounded"} width="350" height="350" />
          <TodoEditor type={"Add"} addTodo={addTodo} />
        </div>
        {todos.errors !== null ? (
          <div>
            <div className="empty">
              <ErrorBlock
                message="Error! api call failed!"
                errors={todos.errors}
              />
              <div className="empty-action">
                <a href="/" className={"navbar-brand mr-2"}>
                  Refresh page
                </a>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={"app-content"}>
        <TodoList
          persons={persons}
          data={todos.data}
          isNewData={isNewData}
          setIsNewData={setIsNewData}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
