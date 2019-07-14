import React from "react";

const Nav = () => {
    return (
<ul className="nav">
  <li className="nav-item">
    <a href="#">Elements</a>
  </li>
  <li className="nav-item active">
    <a href="#">Layout</a>
    <ul className="nav">
      <li className="nav-item">
        <a href="#">Flexbox grid</a>
      </li>
      <li className="nav-item">
        <a href="#">Responsive</a>
      </li>
      <li className="nav-item">
        <a href="#">Navbar</a>
      </li>
      <li className="nav-item">
        <a href="#">Empty states</a>
      </li>
    </ul>
  </li>
  <li className="nav-item">
    <a href="#">Components</a>
  </li>
  <li className="nav-item">
    <a href="#">Utilities</a>
  </li>
    </ul>);
}

export default Nav;