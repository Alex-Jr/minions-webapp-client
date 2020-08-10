import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Provider, useDispatch } from 'react-redux';

import Routes from './Routes';
import './App.css';
import AppStore from './redux/AppStore';
import { login } from './redux/actions/user';


function AppWraper() {
  return(
    <Provider store={AppStore}>
      <App/>
    </Provider>
  )
}

function App() {
  const dispatch = useDispatch()
  const loadSession = async () => {
    try {
      await Auth.currentSession();
      dispatch(login())
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  }

  useEffect(() => {
    loadSession();
  }, [])

  return (
    <div id="screenContainer">
      <Routes/>
    </div>
  );
}

export default AppWraper;
