import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

export default (props) => {
  return (
    <nav>
      <ul id="nav-list">
        <div className="nav-btn">
          <li><NavLink to="/">Home</NavLink></li>
          <li>Produtos</li>
        </div>
        <div className="nav-btn">
          <li>Cadastro</li>
          <li>Login</li>
        </div>
      </ul>
    </nav>
  );
};
