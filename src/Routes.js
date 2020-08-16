import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import {
  Home,
  Login,
  ProductsList,
  Products,
  Cart,
  Checkout,
  Signin,
  OrdersList,
  Orders
} from "./pages";
import { NavBar, UnauthenticatedRoute, AuthenticatedRoute } from "./components";

export default (props) => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <UnauthenticatedRoute exact path="/login">
          <Login />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute exact path="/signin">
          <Signin />
        </UnauthenticatedRoute>
        <Route exact path="/products">
          <ProductsList />
        </Route>
        <Route exact path="/products/:id">
          <Products />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <AuthenticatedRoute exact path="/checkout">
          <Checkout />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/orders">
          <OrdersList />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/orders/:orderId">
          <Orders />
        </AuthenticatedRoute>
        <Route>
          <Home />
        </Route> 
      </Switch>
    </Router>
  );
};
