import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  tipo: number;
}

const Form = ({ tipo }: IProps) => {
  const [url, setUrl] = useState("http://localhost:2000");

  const [nomeC, setNomeC] = useState("");
  const [emailC, setEmailC] = useState("");
  const [senhaC, setSenha] = useState("");
  const [idadeC, setIdadeC] = useState(0);

  const [emailL, setEmailL] = useState("");
  const [senhaL, setSenhaL] = useState("");

  const navigate = useNavigate();

  const cadastrar = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/cadastrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailC,
          senha: senhaC,
          idade: idadeC,
          nome: nomeC,
        }),
      });

      const data = await response.json();

      if (response.status == 200) {
        navigate(`/usuario/${data.id}`, {
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
        const erroElement = document.getElementById("erroC");

        if (erroElement) {
          erroElement.style.display = "none";
        }
      } else {
        const erroElement = document.getElementById("erroC");

        if (erroElement) {
          erroElement.style.display = "block";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logar = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/logar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailL,
          senha: senhaL,
        }),
      });

      const data = await response.json();

      if (response.status == 200) {
        navigate(`/usuario/${data.id}`, {
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
        const error = document.getElementById("loginError") as HTMLElement;
        error.style.display = "block";
        console.log(emailL, senhaL);
        alert(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {tipo == 1 ? (
        <>
          <form style={{ padding: "2rem" }} onSubmit={logar}>
            <h1>Login</h1>
            <h2 style={{ color: "red", display: "none" }} id="loginError">
              Usuário ou senha inválidos!
            </h2>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={emailL}
                onChange={(e) => setEmailL(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={senhaL}
                onChange={(e) => setSenhaL(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <form style={{ padding: "2rem" }} onSubmit={cadastrar}>
            <h1>Cadastro</h1>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={nomeC}
                onChange={(e) => setNomeC(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Idade</label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={idadeC}
                onChange={(e) => setIdadeC(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={emailC}
                onChange={(e) => setEmailC(e.target.value)}
                required
              />
            </div>
            <h5 style={{ color: "red", display: "none" }} id="erroC">
              Email já cadastrado!
            </h5>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={senhaC}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Form;
