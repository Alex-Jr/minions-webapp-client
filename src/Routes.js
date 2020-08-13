import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Home, Login, ProductsList, Products, Cart, Checkout, Signin, Orders } from "./pages";
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
        <Route exact path="/products">
          <ProductsList />
        </Route>
        <Route exact path="/products/:id">
          <Products />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/orders">
          <Orders />
        </Route>
      </Switch>
    </Router>
  );
};
