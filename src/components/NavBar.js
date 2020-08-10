import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Auth } from "aws-amplify";

import "./NavBar.css";
import { singout } from "../redux/actions/user";

export default (props) => {
  const logged = useSelector((state) => state.userReducer.logged)

  const dispatch = useDispatch()
  const handleLogout = () => {
    Auth.signOut()
    dispatch(singout())
  }
  
  return (
    <nav>
      <ul id="nav-list">
        <div className="nav-btn">
          <li><NavLink to="/">Home</NavLink></li>
          <li>Produtos</li>
        </div>
        {logged ? 
          <div className="nav-btn">
            <li onClick={handleLogout}><NavLink to="/">Sair</NavLink></li>
            <li>Minha Conta</li>
          </div>
        :
          <div className="nav-btn">
            <li>Cadastro</li>
            <li><NavLink to="/login">Login</NavLink></li>
          </div>
        }
      </ul>
    </nav>
  );
};
