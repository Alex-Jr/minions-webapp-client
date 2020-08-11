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
        name: "prod-minions-webapp-orders-api",
        endpoint:
          "https://0i1gl8qra7.execute-api.us-east-1.amazonaws.com/prod/",
        region: "us-east-1",
      },
      {
        name: "prod-minions-webapp-products-api",
        endpoint:
          "https://zirgcl1e7a.execute-api.us-east-1.amazonaws.com/prod/",
        region: "us-east-1",
      },
    ],
  },
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
