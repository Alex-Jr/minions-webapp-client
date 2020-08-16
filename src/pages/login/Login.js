import React from "react";
import { useDispatch } from "react-redux";
import { Auth } from "aws-amplify";
import { useHistory, Link } from "react-router-dom";

import { login, singout } from "../../redux/actions/user";
import { SubmitButton } from "../../components";
import { useForm } from "../../hooks";
import "./Login.css";

const Login = () => {
  const [{ values, isLoading }, handleChange, handleSubmit] = useForm();

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async () => {
    await Auth.signIn(values.email, values.password)
      .then((cognitoUser) => {
        dispatch(login(cognitoUser.attributes));
        history.goBack();
      })
      .catch((err) => {
        dispatch(singout());
        alert(err.message);
      });
  };

  return (
    <div id="login-page">
      <form onSubmit={handleSubmit(handleLogin)} id="login-form">
        <label className="login-label">
          Email:
          <br />
          <input
            required
            className="login-input"
            type="email"
            name="email"
            onChange={handleChange}
          />
        </label>
        <label className="login-label">
          Senha:
          <br />
          <input
            required
            className="login-input"
            type="password"
            name="password"
            onChange={handleChange}
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
