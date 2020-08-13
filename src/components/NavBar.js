import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Auth } from "aws-amplify";

import "./NavBar.css";
import { singout } from "../redux/actions/user";

export default (props) => {
  const logged = useSelector((state) => state.userReducer.logged);
  const cartCount = useSelector((state) => state.cartReducer.count);

  const dispatch = useDispatch();
  const handleLogout = () => {
    Auth.signOut();
    dispatch(singout());
  };

  let cartIcon =
    cartCount > 0 ? (
      <NavLink to="/cart">
        <li id="cartContainer">
          <img
            src={process.env.PUBLIC_URL + "/svg/shopping-cart.svg"}
            alt="shopping cart icon"
            id="shoppingCartIcon"
          />
          <div id="cartCount">
            {cartCount < 10 ? `0${cartCount}` : cartCount}
          </div>
        </li>
      </NavLink>
    ) : (
      <div></div>
    );
  return (
    <nav>
      <ul id="nav-list">
        <div className="nav-btn">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/product">Produtos</NavLink>
          </li>
        </div>
        {logged ? (
          <div className="nav-btn">
            {cartIcon}
            <li onClick={handleLogout}>
              <NavLink to="/">Sair</NavLink>
            </li>
            <li>
              <NavLink to="/orders">Meus pedidos</NavLink>
            </li>
          </div>
        ) : (
          <div className="nav-btn">
            {cartIcon}
            <li>
              <NavLink to="/signin">Cadastro</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};
