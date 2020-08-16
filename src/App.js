import React, { useEffect, useCallback } from "react";
import { Auth } from "aws-amplify";
import { Provider, useDispatch } from "react-redux";

import Routes from "./Routes";
import "./App.css";
import AppStore from "./redux/AppStore";
import { login } from "./redux/actions/user";

function AppWraper() {
  return (
    <Provider store={AppStore}>
      <App />
    </Provider>
  );
}

function App() {
  const dispatch = useDispatch();

  const loadSession = useCallback(async () => {
    await Auth.currentSession()
      .then((cognitoUser) => {
        dispatch(login(cognitoUser.idToken.payload));
      })
      .catch((err) => {});
  }, [dispatch]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  return (
    <div id="screenContainer">
      <Routes />
    </div>
  );
}

export default AppWraper;
