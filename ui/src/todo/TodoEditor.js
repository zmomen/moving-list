import React, { useReducer, useState } from "react";
import "./Todo.css";
import ErrorBlock from "../common/ErrorBlock";
import { customDateFormat } from "../utils/helpers";

const TodoEditor = (props) => {
  const [msg, setMsg] = useState("");
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: props.data ? props.data.title : "",
      description: props.data ? props.data.description : "",
      category: props.data ? props.data.todoCategory.category : "",
      dueDate: props.data
        ? customDateFormat(props.data.dueDate)
        : customDateFormat(),
    }
  );

  const isInputValid = () => {
    if (
      userInput["title"] === "" ||
      userInput["description"] === "" ||
      userInput["category"] === ""
    ) {
      setMsg("Error: Invalid input! Please retry.");
      return false;
    }
    return true;
  };

  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ [name]: newValue });
    setMsg("");
  };

  const handleButtonClick = () => {
    if (isInputValid()) {
      props.type === "Add"
        ? props.addTodo(userInput)
        : props.editTodo(userInput, props.data.id);
      setMsg("Task " + props.type + "ed!");
    }
  };

  return (
    <div
      className={`${props.type === "Add" ? "todo-bg" : ""} todo-action black`}
    >
      <div className={"form-group black"}>
        <label className={`${props.type === "Add" ? "todo-labels" : ""}`}>
          Name
        </label>
        <input
          className={"form-input black"}
          type="text"
          name="title"
          value={userInput.title}
          onChange={handleChange}
        />
        <label className={`${props.type === "Add" ? "todo-labels" : ""}`}>
          Category
        </label>
        <input
          className={"form-input black"}
          type="text"
          name="category"
          value={userInput.category}
          onChange={handleChange}
        />
        <label className={`${props.type === "Add" ? "todo-labels" : ""}`}>
          Description
        </label>
        <div className={"margins"}>
          <textarea
            className={"form-input black"}
            name="description"
            value={userInput.description}
            onChange={handleChange}
          />
        </div>
        <label className={`${props.type === "Add" ? "todo-labels" : ""}`}>
          Due Date
        </label>
        <input
          className={"form-input black"}
          type="datetime-local"
          defaultValue={userInput.dueDate}
          name="dueDate"
          onChange={handleChange}
        />
      </div>
      <button className={"btn btn-success"} onClick={() => handleButtonClick()}>
        {props.type} Task
      </button>
      {msg !== "" && <ErrorBlock message={msg} />}
    </div>
  );
};

export default TodoEditor;
