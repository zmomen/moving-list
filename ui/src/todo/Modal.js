import React from "react";
import { dateFmt } from "../utils/helpers";
import TodoEditor from "./TodoEditor";

const Modal = ({
  type,
  id,
  title,
  data,
  deleteAction,
  markCompleteAction,
  editAction,
}) => {
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
                  return (
                    <MarkCompleteModal
                      markCompleteAction={markCompleteAction}
                      data={data}
                    />
                  );
                case "deleting":
                  return (
                    <DeleteModal deleteAction={deleteAction} data={data} />
                  );

                case "editing":
                  return <EditModal editAction={editAction} data={data} />;
                case "completed":
                  return <CompletedTasksModalContent data={data} />;
                default:
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
                    &#10003; {todo.title} {todo.description.substring(0,20)}...
                  </div>
                  <div className={"todo-modal-text"}>
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

export const MarkCompleteModal = ({ data, markCompleteAction }) => {
  return (
    <>
      <div className="modal-body">
        <div className="content">
          {data && (
            <>
              <div>
                {data.title} - {data.description}
              </div>
              <div className={"todo-modal-text"}>
                {` - Modified on: ${dateFmt(data.modifiedDate)}`}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#modals"
          className="btn btn-link"
          onClick={() => {
            markCompleteAction(data);
          }}
        >
          Yes
        </a>
        <a className="btn btn-link" href="#modals">
          No
        </a>
      </div>
    </>
  );
};

export const DeleteModal = ({ data, deleteAction }) => {
  return (
    <>
      <div className="modal-body">
        <div className="content">
          {data && (
            <>
              <div>
                {data.title} - {data.description}
              </div>
              <div className={"todo-modal-text"}>
                {` - Modified on: ${dateFmt(data.modifiedDate)}`}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#modals"
          className="btn btn-link"
          onClick={() => {
            deleteAction(data);
          }}
        >
          Yes
        </a>
        <a className="btn btn-link" href="#modals">
          No
        </a>
      </div>
    </>
  );
};

export const EditModal = ({ data, editAction }) => {
  return (
    <>
      <div className="modal-body">
        <div className="content">
          {data && (
            <>
              <TodoEditor type={"Edit"} data={data} editTodo={editAction} />
              <div className={"todo-modal-text"}>
                {` - Modified on: ${dateFmt(data.modifiedDate)}`}
              </div>
            </>
          )}
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
