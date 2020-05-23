import React, { useReducer, useState } from "react";
import "./Todo.css";
import ErrorBlock from "../common/ErrorBlock";

const AddTodo = (props) => {
  const [errMsg, setErrMsg] = useState("");
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      description: "",
      category: "",
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
  return (
    <div className={"add-btn black"}>
      <div className={"form-group black"}>
        <label>Title</label>
        <input
          className={"form-input black"}
          type="text"
          name="title"
          value={userInput.title}
          onChange={handleChange}
        />
        <label>Category</label>
        <input
          className={"form-input black"}
          type="text"
          name="category"
          value={userInput.category}
          onChange={handleChange}
        />
        <label>Description</label>
        <div className={"margins"}>
          <textarea
            className={"form-input black"}
            name="description"
            value={userInput.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        className={"btn btn-success"}
        onClick={() => isInputValid() && props.addTodo(userInput)}
      >
        Add Todo
      </button>
      {errMsg !== "" && <ErrorBlock message={errMsg} />}
    </div>
  );
};

export default AddTodo;
