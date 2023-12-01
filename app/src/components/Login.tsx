import React from "react";
import { Link } from "react-router-dom";

import Form from "./sub-components/Form";
import NavBar from "./sub-components/NavBar";

const Login = () => {
  return (
    <>
      <NavBar></NavBar>
      <p style={{ marginTop: "2rem", paddingInline: "2rem" }}>
        Ainda não tem conta?{" "}
        <strong style={{ cursor: "pointer" }}>
          <Link to="/cadastro">Cadastre-se</Link>
        </strong>
      </p>
      <Form tipo={parseInt("1")} />
    </>
  );
};

export default Login;
