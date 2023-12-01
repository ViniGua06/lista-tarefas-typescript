import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [url, setUrl] = useState("http://localhost:2000");

  const history = useNavigate();

  const getData = async () => {
    try {
      const response = await fetch(`${url}/getData`);
      const data = await response.json();

      if (data.logado == true) {
        history(`/usuario/${data.id}`, {
          state: {
            userInfo: {
              id: data.id,
              nome: data.nome,
              email: data.email,
              senha: data.senha,
              idade: data.idade,
            },
          },
        });
      } else {
        history("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary " data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand">
            <Link to="/home">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5732/5732649.png"
                alt="Logo"
                width="37"
                height="100%"
                className="d-inline-block align-text-top"
              />
              Tarefas App
            </Link>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  style={{ cursor: "pointer" }}
                  onClick={getData}
                >
                  Suas tarefas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" style={{ cursor: "pointer" }}>
                  Tarefas Gerais
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
