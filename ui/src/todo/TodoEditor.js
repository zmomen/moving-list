import React, { useReducer, useState } from "react";
import "./Todo.css";
import ErrorBlock from "../common/ErrorBlock";

const TodoEditor = (props) => {
  const [errMsg, setErrMsg] = useState("");
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: props.data ? props.data.title : "",
      description: props.data ? props.data.description : "",
      category: props.data ? props.data.todoCategory.category : "",
    }
  );

  const isInputValid = () => {
    if (
      userInput["title"] === "" ||
      userInput["description"] === "" ||
      userInput["category"] === ""
    ) {
      setErrMsg("Invalid input! Please retry.");
      return false;
    }
    return true;
  };

  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ [name]: newValue });
    setErrMsg("");
  };

  const handleButtonClick = () => {
    isInputValid() &&
      (props.type === "Add"
        ? props.addTodo(userInput)
        : props.editTodo(userInput, props.data.id));
  };
  return (
    <div
      className={`${props.type === "Add" ? "todo-bg" : ""} todo-action black`}
    >
      <div className={"form-group black"}>
        <label className={`${props.type === "Add" ? "todo-lbl" : ""}`}>
          Title
        </label>
        <input
          className={"form-input black"}
          type="text"
          name="title"
          value={userInput.title}
          onChange={handleChange}
        />
        <label className={`${props.type === "Add" ? "todo-lbl" : ""}`}>
          Category
        </label>
        <input
          className={"form-input black"}
          type="text"
          name="category"
          value={userInput.category}
          onChange={handleChange}
        />
        <label className={`${props.type === "Add" ? "todo-lbl" : ""}`}>
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
      </div>
      <button className={"btn btn-success"} onClick={() => handleButtonClick()}>
        {props.type} Todo
      </button>
      {errMsg !== "" && <ErrorBlock message={errMsg} />}
    </div>
  );
};

export default TodoEditor;
