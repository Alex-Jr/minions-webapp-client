import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory, Link } from "react-router-dom";

import { SubmitButton } from "../components";
import "./Signin.css";

const passwordTooltip = `
  A senha precisa conter:
  8 Caracteres de comprimento, 
  1 Caratere Especial, 
  1 Maiúsculo, 
  1 Minúsculo, 
  1 Número, 
`;

const Signin = () => {
  const [isLoading, setIsLoading] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordTwo) {
      alert("As senhas precisam ser iguais");
      return;
    }
    setIsLoading(true);
    await Auth.signUp(email, password)
      .then(() => {
        alert(`Um email de confirmação foi enviado para ${email}`);
        history.push("/login");
      })
      .catch((err) => {
        if (err.code === "UsernameExistsException") {
          alert("O email cadastrado já existe");
        } else {
          alert("Falha ao realizar cadastro");
          history.goBack();
        }
      });
    setIsLoading(false);
  };

  return (
    <div id="signin-page">
      <form onSubmit={handleSubmit} id="signin-form">
        <label className="signin-label">
          Email:
          <br />
          <input
            required={true}
            className="signin-input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label className="signin-label">
          Senha:
          <br />
          <input
            required={true}
            title={passwordTooltip}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
            className="signin-input"
            type="password"
            value={password.toString()}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <label className="signin-label">
          Confirmar Senha:
          <br />
          <input
            required={true}
            className="signin-input"
            type="password"
            value={passwordTwo}
            onChange={(e) => {
              setPasswordTwo(e.target.value);
            }}
          />
        </label>
        <Link to="/login">
          Já tem conta?
        </Link>
        <SubmitButton isLoading={isLoading} title="Confirmar" />
      </form>
    </div>
  );
};
export default Signin;
