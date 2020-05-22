import React from "react";
import TodoStatus from "../todo/TodoStatus";
import "./Nav.css";

const Nav = ({ data }) => {
  return (
    <header className={"header navbar"}>
      <section className={"navbar-section"}>
        <a href="..." className={"navbar-brand mr-2"}>
          <span role="img" aria-label="">Moving, Inc™️</span>
        </a>
      </section>
      <section className={"navbar-section"}>
        <TodoStatus data={data} />
      </section>
    </header>
  );
};

export default Nav;
