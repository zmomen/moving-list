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
  const [filteredData, setFilteredData] = useState({
    data: [],
    isFiltered: -1,
  });
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
  }, [filteredData, isNewData]);

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

  const handleFilter = useCallback((evt, idx) => {
    // if filter exists, reset it
    if (filteredData.isFiltered !== -1) {
      setFilteredData({ data: [], isFiltered: -1 });
    } else {
    // else apply filter.
      let filtered = [...todos.data];
      filtered.map((cat) => {
        cat.todos = cat.todos.filter((t) => t.title === evt.target.value);
        return cat;
      });
      setFilteredData({ data: filtered, isFiltered: idx });
    }
  }, [todos, filteredData]);

  return (
    <div>
      <div className={"container grid-lg"}>
        <Nav data={todoStatus} />
        <div className={"App-logo"}>
          <BannerImage className={"rounded"} width="350" height="300" />
          <TodoEditor type={"Add"} addTodo={addTodo} />
        </div>
        {todos.errors !== null ? (
          <ErrorBlock message="api call failed!" errors={todos.errors} />
        ) : (
          ""
        )}
        <div className={"filter"}>
          <div style={{ paddingTop: "5px" }}>Filters:</div>
          {Array.from(persons).map((pp, idx) => {
            return (
              <button
                key={idx}
                className={`btn ${
                  filteredData.isFiltered === idx ? "btn-primary" : ""
                }`}
                value={pp}
                onClick={(e) => handleFilter(e, idx)}
              >
                {pp}
              </button>
            );
          })}
        </div>
        <TodoList
          data={filteredData.isFiltered === -1 ? todos.data : filteredData.data}
          isNewData={isNewData}
          setIsNewData={setIsNewData}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
