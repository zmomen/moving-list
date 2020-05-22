import React, { useState } from "react";
import { dateFmt } from "../utils/helpers";
import "./Todo.css";
import Delete from "../common/icons/Delete";
import CheckMark from "../common/icons/CheckMark";
import Edit from "../common/icons/Edit";

const TodoList = (props) => {
  const headers = ["#", "Title", "Description", "Modified date", "Actions"];

  const handleDelete = (todo) => {
    console.warn("Deleted!", todo); 
    
  };

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
                            <span
                              onClick={() => handleDelete(todo)}
                              className={"todo-action-btn"}
                            >
                              <Delete />
                            </span>
                            <span
                              className={"todo-action-btn"}
                              onClick={() => console.warn("checked")}
                            >
                              <CheckMark />
                            </span>
                            <span
                              className={"todo-action-btn"}
                              onClick={() => console.warn("edited")}
                            >
                              <Edit />
                            </span>
                          </td>
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

const Checkbox = ({ name, checked, onChange }) => (
  <input type="checkbox" name={name} checked={checked} onChange={onChange} />
);
