import React, { useCallback } from "react";
import { dateFmt } from "../utils/helpers";
import "./Todo.css";
import Delete from "../common/icons/Delete";
import CheckMark from "../common/icons/CheckMark";
import Edit from "../common/icons/Edit";
import Modal from "./Modal";
import * as api from "../utils/api";

const TodoList = (props) => {
  const { isNewData, setIsNewData } = props;
  const headers = ["#", "Title", "Description", "Modified date", "Actions"];

  const handleDelete = useCallback(
    (todo) => {
      api
        .deleteTodo(todo)
        .then((res) => {
          console.warn("deleted! response", res.status);
          setIsNewData(!isNewData);
        })
        .catch((error) => console.warn("delete error", error));
    },
    [isNewData, setIsNewData]
  );

  const handleMarkComplete = useCallback(
    (data) => {
      api
        .updateTodo(data)
        .then((res) => {
          console.warn("marked! response", res.status);
          setIsNewData(!isNewData);
        })
        .catch((error) => console.warn("mark complete error", error));
    },
    [isNewData, setIsNewData]
  );

  return (
    <>
      <div className={"todo-table-title"}>Moving Checklist</div>
      <div className={"todo-table"}>
        {props.data.map((element, index) => {
          return (
            <div key={index}>
              <b className={"todo-category"}>{element.category}</b>
              <table className={"table table-striped"}>
                <thead>
                  <tr>
                    {headers.map((element, hd) => (
                      <th key={hd}>
                        {element.charAt(0).toUpperCase() + element.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {element.todos.map((todo, idx) => {
                    return (
                      <>
                        <tr key={idx} className={idx % 2 === 0 ? "active" : ""}>
                          <td style={{ width: "50px" }}>{todo.id}</td>
                          <td style={{ width: "180px" }}>{todo.title}</td>
                          <td style={{ width: "414px" }}>{todo.description}</td>
                          <td style={{ width: "200px" }}>
                            {dateFmt(todo.modifiedDate)}
                          </td>
                          <td style={{ width: "100px" }}>
                            <a
                              href={`#delete-modal${todo.id}`}
                              className={"todo-action-btn"}
                            >
                              <Delete />
                            </a>
                            <a
                              href={`#marking-complete-modal${todo.id}`}
                              className={"todo-action-btn"}
                            >
                              <CheckMark />
                            </a>
                            <span
                              className={"todo-action-btn"}
                              onClick={() => console.warn("edited")}
                            >
                              <Edit />
                            </span>
                          </td>
                          <Modal
                            type={"deleting"}
                            id={`delete-modal${todo.id}`}
                            data={todo}
                            title="Are you sure you want to delete this task?"
                            deleteAction={handleDelete}
                          />
                          <Modal
                            type={"marking-complete"}
                            id={`marking-complete-modal${todo.id}`}
                            data={todo}
                            title="Mark this task as complete?"
                            markCompleteAction={handleMarkComplete}
                          />
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TodoList;
