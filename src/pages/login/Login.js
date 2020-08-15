import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "aws-amplify";
import { useHistory, Link } from "react-router-dom";

import { login, singout } from "../../redux/actions/user";
import { SubmitButton } from "../../components";
import "./Login.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await Auth.signIn(email, password)
      .then((cognitoUser) => {
        dispatch(login(cognitoUser.attributes));
        history.goBack();
      })
      .catch((err) => {
        dispatch(singout());
        alert(err.message);
      });
    setIsLoading(true);
  };

  return (
    <div id="login-page">
      <form onSubmit={handleSubmit} id="login-form">
        <label className="login-label">
          Email:
          <br />
          <input
            className="login-input"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label className="login-label">
          Senha:
          <br />
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <Link to="/signin">
          Ainda não tem conta?
        </Link>
        <SubmitButton isLoading={isLoading} title="Entrar" />
      </form>
    </div>
  );
};
export default Login;
