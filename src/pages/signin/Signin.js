import React from "react";
import { Auth } from "aws-amplify";
import { useHistory, Link } from "react-router-dom";

import { SubmitButton } from "../../components";
import "./Signin.css";
import { useForm } from "../../hooks";

const passwordTooltip = `
  A senha precisa conter:
  8 Caracteres de comprimento, 
  1 Caratere Especial, 
  1 Maiúsculo, 
  1 Minúsculo, 
  1 Número, 
`;

const Signin = () => {
  const [{ values, isLoading }, handleChange, handleSubmit] = useForm();

  const history = useHistory();

  const handleSignin = async () => {
    const { email, password, passwordTwo } = values
    if (password !== passwordTwo) {
      alert("As senhas precisam ser iguais");
      return;
    }
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
  };

  return (
    <div id="signin-page">
      <form onSubmit={handleSubmit(handleSignin)} id="signin-form">
        <label className="signin-label">
          Email:
          <br />
          <input
            required
            className="signin-input"
            type="email"
            name="email"
            onChange={handleChange}
          />
        </label>
        <label className="signin-label">
          Senha:
          <br />
          <input
            required
            title={passwordTooltip}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
            className="signin-input"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <label className="signin-label">
          Confirmar Senha:
          <br />
          <input
            required
            className="signin-input"
            type="password"
            name="passwordTwo"
            onChange={handleChange}
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
