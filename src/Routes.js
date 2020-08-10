import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Home, Login, ProductList, Product } from "./pages";
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
        <Route exact path="/product">
          <ProductList />
        </Route>
        <Route exact path="/product/:id">
          <Product />
        </Route>
      </Switch>
    </Router>
  );
};
