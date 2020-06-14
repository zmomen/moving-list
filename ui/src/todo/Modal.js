import React from "react";
import { dateFmt } from "../utils/helpers";
import { capitalizeFirstLetter } from "../utils/helpers";

const Modal = ({ type, id, title, data, deleteAction, markCompleteAction }) => {
  return (
    <div className="docs-demo columns">
      <div className="column">
        <div className="modal modal-md" id={id}>
          <a className="modal-overlay" href="#modals" aria-label="Close">
            &nbsp;
          </a>
          <div className="modal-container modal-completed-size" role="document">
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
                case "completed":
                  return <CompletedTasksModal data={data} />;
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

export const CompletedTasksModal = ({ data }) => {
  console.warn("Whats in data", data);
  const headers = ["Name", "Description", "Completed On"];
  return (
    <>
      <div className="modal-body">
        <div className="content">
          <table>
            <thead>
              <tr>
                {headers.map((header, hd) => (
                  <th key={hd}>{capitalizeFirstLetter(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.complete &&
                data.complete
                  .sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate))
                  .map((todo, index) => {
                    return (
                      <tr key={index}>
                        <td className={"todo-completed"}>
                          &#10003; {todo.title}
                        </td>
                        <td className={"todo-completed"}>{todo.description}</td>
                        <td className={"todo-modal-text"}>
                          {dateFmt(todo.modifiedDate)}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
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
