import React, { useCallback, useState, useEffect } from "react";
import { dateFmt } from "../utils/helpers";
import "./Todo.css";
import Delete from "../common/icons/Delete";
import CheckMark from "../common/icons/CheckMark";
import Edit from "../common/icons/Edit";
import Modal from "./Modal";
import * as api from "../utils/api";
import { capitalizeFirstLetter } from "../utils/helpers";
import TodoEditor from "./TodoEditor";

const TodoList = (props) => {
  const { isNewData, setIsNewData, persons, data } = props;
  useEffect(() => {
    setFilteredData({ data: data, isFiltered: -1 });
  }, [data]);

  const [filteredData, setFilteredData] = useState({
    data: data,
    isFiltered: -1,
  });

  const [editModal, setEditModal] = useState({ data: {}, isOpen: false });

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
        .then((res) => setIsNewData(!isNewData))
        .catch((error) => console.warn("edit error", error));
    },
    [isNewData, setIsNewData]
  );

  const handleFilter = (evt, idx) => {
    // if filter exists, reset it
    if (filteredData.isFiltered === idx) {
      setFilteredData({
        data: data,
        isFiltered: -1,
      });
    } else {
      // else apply filter.
      let filtered = JSON.parse(JSON.stringify(data));
      filtered.map((cat) => {
        cat.todos = cat.todos.filter((t) => t.title === evt.target.value);
        return cat;
      });
      setFilteredData({
        data: filtered,
        isFiltered: idx,
      });
    }
  };

  const handleEditModal = (todo) => {
    setEditModal({ isOpen: true, data: todo });
  };

  const headers = ["Name", "Description", "Due Date", "Actions"];
  return (
    <div className={"todo-list-spacing"}>
      <div>
        <div className={"filter"}>
          <div style={{ paddingTop: "5px" }}>Filters:</div>
          {Array.from(persons).map((pp, idx) => {
            return (
              <button
                key={idx}
                className={`btn ${
                  filteredData.isFiltered === idx ? "btn-primary" : ""
                }`}
                value={pp}
                onClick={(e) => handleFilter(e, idx)}
              >
                {pp}
              </button>
            );
          })}
        </div>
        <div className={"todo-table-title"}>Moving Checklist</div>
        <div className={"todo-table"}>
          {filteredData.data
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
                          <th key={hd}>
                            {capitalizeFirstLetter(todoCategory)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {todoCategory.todos.map((todo, idx) => {
                        return (
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
                              {!editModal.isOpen && (
                                <div style={{ display: "flex" }}>
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
                                  <div
                                    onClick={() => handleEditModal(todo)}
                                    className={"todo-action-btn"}
                                  >
                                    <Edit />
                                  </div>
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
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
        </div>
      </div>
      <div style={{ paddingTop: "8rem" }}>
        {editModal.isOpen && (
          <EditModal
            editModal={editModal}
            setEditModal={setEditModal}
            editAction={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default TodoList;

export const EditModal = ({ editModal, setEditModal, editAction }) => {
  return (
    <>
      <div className="modal-header">
        <div
          className="btn btn-clear float-right"
          onClick={() => {
            setEditModal({ data: {}, isOpen: false });
          }}
        >
          &nbsp;
        </div>
        <div className="modal-title h5">Edit task</div>
      </div>

      <div className="modal-body">
        <div className="content">
          {editModal.data && (
            <>
              <TodoEditor
                type={"Edit"}
                data={editModal.data}
                editTodo={editAction}
              />
              <div className={"todo-modal-text"}>
                {` - Modified on: ${dateFmt(editModal.data.modifiedDate)}`}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="modal-footer">
        <div
          className="btn btn-link"
          onClick={() => {
            setEditModal({ data: {}, isOpen: false });
          }}
        >
          Close
        </div>
      </div>
    </>
  );
};
