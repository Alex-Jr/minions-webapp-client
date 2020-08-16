import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthenticatedRoute = (props) => {
  const { logged } = useSelector((state) => state.userReducer);

  return (
    <Route {...props}>
      {logged ? (
        props.children
      ) : (
        <Redirect to={"/login"} />
      )}
    </Route>
  );
}

export default AuthenticatedRoute;