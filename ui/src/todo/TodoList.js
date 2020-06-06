import React, { useCallback, useState, useEffect } from "react";
import { dateFmt, dateOnly } from "../utils/helpers";
import "./Todo.css";
import Delete from "../common/icons/Delete";
import CheckMark from "../common/icons/CheckMark";
import Edit from "../common/icons/Edit";
import Modal from "./Modal";
import * as api from "../utils/api";
import { capitalizeFirstLetter } from "../utils/helpers";
import TodoEditor from "./TodoEditor";
import { Sticky, StickyContainer } from "react-sticky";

const TodoList = ({ isNewData, setIsNewData, persons, data }) => {
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

  const handleEditModal = (todo) => {
    setEditModal({ isOpen: true, data: todo });
  };

  const handleFilter = (filterType, evt, idx) => {
    //flow for category filter
    switch (true) {
      case filterType === "category" && evt.target.value !== "reset":
        //copy state
        let filtered = JSON.parse(JSON.stringify(data));
        filtered = filtered.filter(
          (cat) => cat.category.toUpperCase() === evt.target.value
        );
        setFilteredData({
          data: filtered,
        });
        break;
      case filterType === "person":
        // if filter exists, reset it
        if (filteredData.isFiltered === idx) {
          setFilteredData({
            data: data,
            isFiltered: -1,
          });
        } else {
          // else apply filter.
          //copy state
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
        break;
      case evt.target.value === "reset":
        setFilteredData({
          data: data,
          isFiltered: -1,
        });
        break;
      default:
    }
  };

  const headers = ["Name", "Description", "Due Date", "Actions"];
  return data.length > 0 ? (
    <div className={"d-flex"}>
      <div>
        <div className={"todo-table"}>
          <div>
            <div className={"filter"}>
              <h5 className={"pt-1"}>Filters:</h5>
              {Array.from(persons).map((pers, idx) => {
                return (
                  <button
                    key={idx}
                    className={`btn ${
                      filteredData.isFiltered === idx ? "btn-primary" : ""
                    }`}
                    value={pers}
                    onClick={(e) => handleFilter("person", e, idx)}
                  >
                    {pers}
                  </button>
                );
              })}
              <div className={"form-group d-flex"}>
                <h5 className={"pt-1"}>Category:</h5>
                <div className={"dropdown px-1"}>
                  <select
                    className={"form-select category-select"}
                    onChange={(e) => handleFilter("category", e)}
                  >
                    <option value="reset">Choose an option</option>
                    {data.map((todoCategory, idx) => {
                      return (
                        <option key={idx}>
                          {todoCategory.category.toUpperCase()}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-center">Moving Checklist</h3>
          {filteredData.data
            .filter((todoCategory) => todoCategory.todos.length > 0)
            .map((todoCategory, index) => {
              return (
                <div key={index}>
                  <b>{todoCategory.category.toUpperCase()}</b>
                  <div className={"divider"} />
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
                            <td style={{ width: "484px" }}>
                              {todo.description}
                            </td>
                            <td style={{ width: "160px" }}>
                              {dateOnly(todo.dueDate)}
                            </td>
                            <td style={{ width: "100px" }}>
                              {!editModal.isOpen && (
                                <div className="d-flex">
                                  <a
                                    href={`#delete-modal${todo.id}`}
                                    className={"c-hand"}
                                  >
                                    <Delete />
                                  </a>
                                  <a
                                    href={`#marking-complete-modal${todo.id}`}
                                    className={"c-hand"}
                                  >
                                    <CheckMark />
                                  </a>
                                  <div
                                    onClick={() => handleEditModal(todo)}
                                    className={"c-hand"}
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
      {editModal.isOpen && (
        <StickyContainer>
          <Sticky>
            {({ style }) => (
              <div style={style}>
                <EditModal
                  editModal={editModal}
                  setEditModal={setEditModal}
                  editAction={handleEdit}
                />
              </div>
            )}
          </Sticky>
        </StickyContainer>
      )}
    </div>
  ) : (
    <></>
  );
};

export default TodoList;

export const EditModal = ({ editModal, setEditModal, editAction }) => {
  return (
    <div className="edit-todo">
      <div className="modal-header">
        <div
          className="btn btn-clear"
          onClick={() => {
            setEditModal({ data: {}, isOpen: false });
          }}
        >
          &nbsp;
        </div>
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
    </div>
  );
};
