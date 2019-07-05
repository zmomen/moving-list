import React from "react";
import "spectre.css";
import "./App.css";
import Table from "./common/Table";

function App() {
  const headers = ["name", "genre", "release date"];
  const data = ["name", "genre", "release date"];
  return (
    <div className="container grid-lg">
      <Table headers={headers} data={data} />
    </div>
  );
}

export default App;
