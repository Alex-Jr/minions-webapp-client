import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Home, Login } from "./pages";
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
      </Switch>
    </Router>
  );
};
