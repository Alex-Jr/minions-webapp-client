import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "aws-amplify";

import { login, singout } from "../redux/actions/user";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault();
    await Auth.signIn(email, password)
      .then((cognitoUser) => {
        dispatch(login())
      })
      .catch((err) => {
        dispatch(singout())
        alert(err.message)
      });
  };

  return (
    <div id="loginContainer">
      <form onSubmit={handleSubmit} id="form">
        <label>
          Email:
          <br />
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Senha:
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <input type="submit" value="Confirmar" />
      </form>
    </div>
  );
};
export default Login;
