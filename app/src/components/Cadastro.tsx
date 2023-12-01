import React from "react";
import { Link } from "react-router-dom";

import Form from "./sub-components/Form";
import NavBar from "./sub-components/NavBar";

const Cadastro = () => {
  return (
    <>
      <NavBar></NavBar>
      <p style={{ marginTop: "2rem", paddingInline: "2rem" }}>
        Já tem uma conta?{" "}
        <strong style={{ cursor: "pointer" }}>
          <Link to="/login">Login</Link>
        </strong>
      </p>
      <Form tipo={parseInt("0")}></Form>
    </>
  );
};

export default Cadastro;
