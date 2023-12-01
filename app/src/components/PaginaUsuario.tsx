import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import NavBar from "./sub-components/NavBar";
import Card from "./sub-components/Card";

interface IData {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: string;
  imagem_capa: string;
}

const PaginaUsuario = () => {
  const [url, setUrl] = useState("http://localhost:2000");

  const location = useLocation();

  const state = location.state.userInfo;

  const [tarefas, setTarefas] = useState<any>([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState<any>([]);

  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  const [mostrarTarefas, setMostrarTarefas] = useState(false);
  const [concluidas, setConcluidas] = useState(false);

  const navigate = useNavigate();

  const sair = async () => {
    const response = await fetch(`${url}/sair`);

    if (response.status == 200) {
      navigate("/login");
    }
  };

  const getTasks = async () => {
    try {
      const response = await fetch(`${url}/getTasks/${state.id}`);
      const data = await response.json();

      setTarefas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompletedTasks = async () => {
    try {
      const response = await fetch(`${url}/getCompletedTasks/${state.id}`);
      const data = await response.json();

      setTarefasConcluidas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
    getCompletedTasks();
  }, []);

  const addTask = async () => {
    try {
      if (titulo != "" && desc != "" && prioridade != "") {
        const response = await fetch(`${url}/addTask`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo: titulo,
            descricao: desc,
            prioridade: prioridade,
            usuario_id: state.id,
            imagem_capa: imagem,
          }),
        });

        const data = await response.json();
        console.log(data);

        if (response.status == 200) {
          alert("Tarefa adicionada!");
          getTasks();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="nome">
        <h1>Olá, {state.nome}</h1>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Adicionar Tarefa{" "}
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Adicionar Tarefa
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Titulo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: ir a padaria..."
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Descricao
                </label>
                <input
                  type="textArea"
                  className="form-control"
                  id="formGroupExampleInput2"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Ex: comprar pão..."
                />
              </div>

              <label className="form-label">Prioridade</label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
              >
                <option defaultValue={""}>Prioridade</option>
                <option value={"1"}>Um</option>
                <option value={"2"}>Dois</option>
                <option value={"3"}>Três</option>
              </select>

              <label style={{ marginTop: "1rem" }} className="form-label">
                Imagem (opcional)
              </label>
              <div className="input-group mb-3">
                <input
                  type="file"
                  onChange={(e) =>
                    e.target.files && setImagem(e.target.files[0])
                  }
                  className="form-control"
                  id="inputGroupFile02"
                />
                <label className="input-group-text">Upload</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addTask}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-info"
        onClick={() => window.location.reload()}
      >
        Atualizar
      </button>

      <button type="button" className="btn btn-danger" onClick={sair}>
        Sair
      </button>
      <br />

      <button
        type="button"
        className="btn btn-warning"
        style={{ marginTop: "2rem" }}
        onClick={() =>
          mostrarTarefas ? setMostrarTarefas(false) : setMostrarTarefas(true)
        }
      >
        {mostrarTarefas ? (
          <span>Esconder tarefas pendentes</span>
        ) : (
          <span>Mostrar Tarefas pendentes</span>
        )}
      </button>

      {mostrarTarefas && (
        <div className="container text-center">
          <div className="row align-items-center">
            {Array.isArray(tarefas) &&
              tarefas.map((item: IData): any => {
                return (
                  <div className="col">
                    <Card
                      tipo={1}
                      id={item.id}
                      desc={item.descricao}
                      prioridade={parseInt(item.prioridade)}
                      titulo={item.titulo}
                      usuario_id={state.id}
                      imagem={item.imagem_capa}
                    ></Card>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      <br />

      <button
        type="button"
        className="btn btn-warning"
        style={{ marginTop: "2rem" }}
        onClick={() => {
          concluidas ? setConcluidas(false) : setConcluidas(true);
          getCompletedTasks();
        }}
      >
        {concluidas ? (
          <span>Esconder tarefas concluidas</span>
        ) : (
          <span>Mostrar Tarefas concluidas</span>
        )}
      </button>

      {concluidas && (
        <div className="container text-center">
          <div className="row align-items-center">
            {Array.isArray(tarefasConcluidas) &&
              tarefasConcluidas.map((item: IData): any => {
                return (
                  <div className="col">
                    <Card
                      id={item.id}
                      desc={item.descricao}
                      prioridade={parseInt(item.prioridade)}
                      titulo={item.titulo}
                      usuario_id={state.id}
                      imagem={item.imagem_capa}
                      tipo={2}
                    ></Card>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default PaginaUsuario;
