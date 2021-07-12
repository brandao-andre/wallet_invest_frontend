import React from "react";
import { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import api from "../../services/api";

import Logo from "../../assets/wallet.svg";

import { Form, Container } from "./styles";

const SignUp: React.FC = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });
  let history = useHistory();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = state;
    if (!name || !email || !password) {
      setState({
        ...state,
        error: "Preencha todos os dados para se cadastrar",
      });
    } else {
      try {
        await api.post("/users", { name, email, password });
        history.push("/");
      } catch (err) {
        setState({
          ...state,
          error: "Ocorreu um erro ao registrar sua conta. T.T",
        });
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <img src={Logo} alt="Wallet invest logo" />
        {state.error && <p>{state.error}</p>}
        <input
          type="text"
          placeholder="Nome de usuário"
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Endereço de e-mail"
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
        <button type="submit">Cadastrar grátis</button>
        <hr />
        <Link to="/">Fazer login</Link>
      </Form>
    </Container>
  );
};

export default withRouter(SignUp);
