import React from "react";
import { dateFmt } from "../utils/helpers";

const Modal = ({ type, id, title, data }) => {
  console.warn("my id", id);
  return (
    <div className="docs-demo columns">
      <div className="column">
        <div className="modal modal-md" id={id}>
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

            {/* switch based on type */}
            {(function () {
              switch (type) {
                case "marking-complete":
                  return <></>;
                case "deleting":
                  return <DeleteModal data={data} />;
                case "editing":
                  return <></>;
                case "completed":
                  return <CompletedTasksModalContent data={data} />;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

export const CompletedTasksModalContent = ({ data }) => {
  return (
    <>
      <div className="modal-body">
        <div className="content">
          {data.complete &&
            data.complete.map((todo, index) => {
              return (
                <div className={"todo-completed-block"}>
                  <div className={"todo-completed-block"}>
                    &#10003; {todo.title}
                  </div>
                  <div className={"todo-completed-text"}>
                    {` - Completed on: ${dateFmt(todo.modifiedDate)}`}
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
    </>
  );
};

export const DeleteModal = ({ deleteAction, data }) => {
  return (
    <>
      <div className="modal-body">
        <div className="content">
          {data && (
            <>
              <div>
                {data.title} - {data.description}
              </div>
              <div className={"todo-completed-text"}>
                {` - Modified on: ${dateFmt(data.modifiedDate)}`}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="modal-footer">
        <div className="btn btn-link" onClick={() => deleteAction(data.id)}>
          Yes
        </div>
        <a className="btn btn-link" href="#modals">
          No
        </a>
      </div>
    </>
  );
};
