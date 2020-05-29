import React, { useCallback } from "react";
import { dateFmt } from "../utils/helpers";
import "./Todo.css";
import Delete from "../common/icons/Delete";
import CheckMark from "../common/icons/CheckMark";
import Edit from "../common/icons/Edit";
import Modal from "./Modal";
import * as api from "../utils/api";
import { capitalizeFirstLetter } from "../utils/helpers";

const TodoList = (props) => {
  const { isNewData, setIsNewData } = props;
  const headers = ["Name", "Description", "Due Date", "Actions"];

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
    (todo) => {
      todo["completed"] = true;
      api
        .updateTodo(todo)
        .then((res) => {
          console.warn("marked! response", res.status);
          setIsNewData(!isNewData);
        })
        .catch((error) => console.warn("mark complete error", error));
    },
    [isNewData, setIsNewData]
  );

  const handleEdit = useCallback(
    (todo, id) => {
      let editData = { id: id, ...todo };
      api
        .updateTodo(editData)
        .then((res) => {
          console.warn("edited! response", res.status);
          setIsNewData(!isNewData);
        })
        .catch((error) => console.warn("edit error", error));
    },
    [isNewData, setIsNewData]
  );

  return (
    <>
      <div className={"todo-table-title"}>Moving Checklist</div>
      <div className={"todo-table"}>
        {props.data
          .filter((todoCategory) => todoCategory.todos.length > 0)
          .map((todoCategory, index) => {
            return (
              <div key={index}>
                <b className={"todo-category"}>
                  {todoCategory.category.toUpperCase()}
                </b>
                <table className={"table table-striped"}>
                  <thead>
                    <tr>
                      {headers.map((todoCategory, hd) => (
                        <th key={hd}>{capitalizeFirstLetter(todoCategory)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {todoCategory.todos.map((todo, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <tr
                            key={idx}
                            className={idx % 2 === 0 ? "active" : ""}
                          >
                            <td style={{ width: "140px" }}>{todo.title}</td>
                            <td style={{ width: "444px" }}>
                              {todo.description}
                            </td>
                            <td style={{ width: "200px" }}>
                              {dateFmt(todo.dueDate)}
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
                              <a
                                href={`#edit-modal${todo.id}`}
                                className={"todo-action-btn"}
                              >
                                <Edit />
                              </a>
                              <Modal
                                key={idx}
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
                              <Modal
                                type={"editing"}
                                id={`edit-modal${todo.id}`}
                                data={todo}
                                title="Edit task"
                                editAction={handleEdit}
                              />
                            </td>
                          </tr>
                        </React.Fragment>
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
