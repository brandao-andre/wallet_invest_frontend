import { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";

import Logo from "../../assets/wallet.svg";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

export const SignIn: React.FC = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });
  let history = useHistory();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = state;
    if (!email || !password) {
      setState({ ...state, error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/login", { email, password });
        login(response.data);
        history.push("/app");
      } catch (err) {
        setState({
          ...state,
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T",
        });
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
        <img src={Logo} alt="Airbnb logo" />
        {state.error && <p>{state.error}</p>}
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
        <button type="submit">Entrar</button>
        <hr />
        <Link to="/signup">Criar conta grátis</Link>
      </Form>
    </Container>
  );
};

export default withRouter(SignIn);
