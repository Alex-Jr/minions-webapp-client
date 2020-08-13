import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Home, Login, ProductList, Product, Cart, Checkout, Signin } from "./pages";
import NavBar from "./components/NavBar";

export default (props) => {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/product">
          <ProductList />
        </Route>
        <Route exact path="/product/:id">
          <Product />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
      </Switch>
    </Router>
  );
};
