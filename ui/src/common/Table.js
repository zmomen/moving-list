import React from "react";

const Table = props => {
  const { headers, data } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((element, index) => (
            <th key={index}>{element.charAt(0).toUpperCase() + element.slice(1)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="active">
        {data.map((element, index) => (
          <td key={index}>{element}</td>
        ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
