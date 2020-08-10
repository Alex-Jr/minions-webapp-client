import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from "./pages";
import NavBar from "./components/NavBar";

export default (props) => {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
