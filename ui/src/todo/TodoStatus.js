import React, { useEffect, useState } from "react";
import "./Todo.css";
import * as api from "../utils/api";
import { dateFmt } from "../utils/helpers";

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
        Active
      </span>

      <span className={"badge"} data-badge={data.completed}>
        <a
          style={{ color: "green" }}
          href="#example-modal-1"
          onClick={handleTodoStatus}
        >
          Complete
        </a>
      </span>
      <Modal data={activeComplete} title="Completed Tasks" />
    </div>
  );
};

export default TodoStatus;

const Modal = ({ data, title }) => {
  let complete = data.complete;
  return (
    <div className="docs-demo columns">
      <div className="column">
        <div className="modal modal-md" id="example-modal-1">
          <a className="modal-overlay" href="#modals" aria-label="Close">
            &nbsp;
          </a>
          <div className="modal-container" role="document">
            <div className="modal-header">
              <a
                className="btn btn-clear float-right"
                href="#modals"
                aria-label="Close"
              >
                &nbsp;
              </a>
              <div className="modal-title h5">{title}</div>
            </div>
            <div className="modal-body">
              <div className="content">
                {complete.map((elem, index) => {
                  return (
                    <div className={"todo-completed-block"}>
                      <div className={"todo-completed-block"}>
                        &#10003; {elem.title}
                      </div>
                      <div className={"todo-completed-text"}>
                        {` - Completed on: ${dateFmt(elem.modifiedDate)}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer">
              <a className="btn btn-link" href="#modals">
                Close
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
