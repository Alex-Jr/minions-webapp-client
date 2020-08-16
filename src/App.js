import React, { useEffect, useCallback, useState } from "react";
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
  const [ AppLoading, setAppLoading ] = useState(true)
  const dispatch = useDispatch();

  const loadSession = useCallback(async () => {
    await Auth.currentSession()
      .then((cognitoUser) => {
        dispatch(login(cognitoUser.idToken.payload));
      })
      .catch((err) => {})
      .finally(() => {
        setAppLoading(false)
      });
  }, [dispatch]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  if(AppLoading) {
    return <div></div>
  }

  return (
    <div id="screenContainer">
      <Routes />
    </div>
  );
}

export default AppWraper;
