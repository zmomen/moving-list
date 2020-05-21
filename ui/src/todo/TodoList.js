import React, { useState } from "react";
import { dateFmt } from "../utils/helpers";

const TodoList = props => {
  const [isComplete, setTodoState] = useState(false);
  const [whichIndex, setIndex] = useState(-1);
  const headers = ["#", "Title", "Description", "Modified date", "Action"];
  return (
    <div>
      {props.data.map((element, index) => {
        return (
          <div key={index}>
            <b>{element.category}</b>
            <table className="table table-striped">
              <thead>
                <tr>
                  {headers.map((element, index) => (
                    <th key={index}>
                      {element.charAt(0).toUpperCase() + element.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {element.todos.map((todo, index) => {
                  const rowStyle =
                    whichIndex === index && isComplete
                      ? { textDecoration: "line-through" }
                      : {};
                  return (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "active" : ""}
                      style={rowStyle}
                    >
                      <td>{todo.id}</td>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>{dateFmt(todo.modifiedDate)}</td>
                      <td>
                        <span
                          onClick={() => {
                            setTodoState(!isComplete);
                            setIndex(index);
                          }}
                          style={{ cursor: "pointer", color: "blue" }}
                        >
                          &#10003;
                        </span>
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
  );
};

export default TodoList;
