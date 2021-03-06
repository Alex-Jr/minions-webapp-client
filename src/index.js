import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Amplify } from "aws-amplify";
import awsConfig from "./awsConfig";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: awsConfig.cognito.REGION,
    userPoolId: awsConfig.cognito.USER_POOL_ID,
    identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: awsConfig.orders_apiGateway.NAME,
        endpoint: awsConfig.orders_apiGateway.URL,
        region: awsConfig.orders_apiGateway.REGION,
      },
      {
        name: awsConfig.products_apiGateway.NAME,
        endpoint: awsConfig.products_apiGateway.URL,
        region: awsConfig.products_apiGateway.REGION,
      },
    ],
  },
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
