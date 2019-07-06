import React from "react";

const TodoList = props => {
  console.warn("data", props.data);
  return (
    <table className="table">
      <thead>
        <tr>
          {props.headers.map((element, index) => (
            <th key={index}>{element.charAt(0).toUpperCase() + element.slice(1)}</th>
          ))}
        </tr>
      </thead>
      {/* <tbody>
        <tr className="active">
        {props.data.map((element, index) => (
          <td key={index}>{element}</td>
        ))}
        </tr>
      </tbody> */}
    </table>
  );
};

export default TodoList;
