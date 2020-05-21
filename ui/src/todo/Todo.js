import React, { useReducer, useState, useCallback } from "react";
import * as api from "../utils/api";

import "./Todo.css";

const Todo = (props) => {
  const [errors, setErrors] = useState();
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      description: "",
      category: "",
    }
  );

  const handleSubmit = useCallback(() => {
    console.warn("buttn", userInput);
    api
      .createTodo(userInput)
      .then((res) => {
        console.warn("Suces", res.data);
      })
      .catch((err) => {
        console.warn("error", err.data);
        // setErrors(err);
      });
  }, [userInput]);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ [name]: newValue });
  };
  return (
    <div className={"add-btn black"}>
      <div className={"form-group"}>
        <label>Title</label>
        <input
          className="form-input"
          type="text"
          name="title"
          value={userInput.title}
          onChange={handleChange}
        />
        <label>Category</label>
        <input
          className="form-input"
          type="text"
          name="category"
          value={userInput.category}
          onChange={handleChange}
        />
        <label>Description</label>
        <div className={"margins"}>
          <textarea
            className={"form-input"}
            name="description"
            value={userInput.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className={"btn btn-success"} onClick={handleSubmit}>
        Add Task
      </button>
      {errors !== undefined ? <div className={"error"}> {errors}</div> : ""}
    </div>
  );
};

export default Todo;
