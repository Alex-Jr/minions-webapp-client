import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

export default (props) => {
  return (
    <nav>
      <ul id="nav-list">
        <div className="nav-btn">
          <li><Link to="/">Home</Link></li>
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
