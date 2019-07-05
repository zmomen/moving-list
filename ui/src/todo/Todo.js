import React from "react";
import Table from "../common/Table";

const Todo = props => {
  return <Table headers={props.headers} data={props.data} />;
};

export default Todo;