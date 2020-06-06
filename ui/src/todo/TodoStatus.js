import React, { useState } from "react";
import "./Todo.css";
import Modal from "./Modal";
import * as api from "../utils/api";

const TodoStatus = ({ data }) => {
  const [activeComplete, setActiveComplete] = useState({
    active: [],
    complete: [],
  });

  const handleTodoStatus = () => {
    api
      .getTodoStatus()
      .then((res) => {
        setActiveComplete(res.data);
      })
      .catch((err) => console.warn("errors", err));
  };

  return (
    <div className={"black todo-badge"}>
      <span className={"badge"} data-badge={data.active}>
        <b>Active</b>
      </span>

      <span className={"badge"} data-badge={data.completed}>
        <a
          style={{ color: "green" }}
          href="#completed-modal"
          onClick={handleTodoStatus}
        >
          <b>Complete</b>
        </a>
      </span>
      <Modal
        type="completed"
        id={"completed-modal"}
        title="Completed Tasks"
        data={activeComplete}
      />
    </div>
  );
};

export default TodoStatus;
