import React, { useReducer } from "react";
import "./Todo.css";

const AddTodo = (props) => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      description: "",
      category: "",
    }
  );

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
      <button
        className={"btn btn-success"}
        onClick={() => props.addTodo(userInput)}
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
