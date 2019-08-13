import React from "react";
import { dateFmt } from "../utils/helpers";

const TodoList = props => {
  const headers = ["Title", "Description", "Created date", "Action"];
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
                      {element.charAt(0).toUpperCase() +
                        element.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {element.todos.map((todo, index) => {
                  return (
                    <tr key={index} className={index % 2 === 0 ? "active" : ""}>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>{dateFmt(todo.createdDate)}</td>
                      <td>{"hah"}</td>
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
