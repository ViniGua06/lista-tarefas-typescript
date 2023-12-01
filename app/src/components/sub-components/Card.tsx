import React, { useState } from "react";

interface IProps {
  titulo: string;
  id: number;
  desc: string;
  prioridade: number;
  usuario_id: number;
  imagem: string;
  tipo: number;
}

const Card = ({
  titulo,
  id,
  desc,
  prioridade,
  usuario_id,
  imagem,
  tipo,
}: IProps): JSX.Element => {
  const [url, setUrl] = useState("http://localhost:2000");

  const removeItem = async (id: number) => {
    try {
      const response = await fetch(`${url}/removeItem/${id}`);

      if (response.status == 200) {
        alert("Tarefa removida!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const doTask = async (id: number) => {
    try {
      const response = await fetch(`${url}/completeTask/${id}`);

      if (response.status == 200) {
        alert("Tarefa concluída com sucesso!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {tipo == 1 ? (
        <>
          <div
            className="card"
            style={
              prioridade == 1
                ? {
                    background: "linear-gradient(45deg, #FF6347, #FF5500)",
                    width: "18rem",
                    marginTop: "2rem",
                  }
                : prioridade == 2
                ? {
                    background: "linear-gradient(45deg, #FFFF99, #FFD700)",
                    width: "18rem",
                    marginTop: "2rem",
                  }
                : {
                    background: "linear-gradient(45deg, #9ACD32, #6B8E23)",
                    width: "18rem",
                    marginTop: "2rem",
                  }
            }
            key={id}
          >
            <img
              src={imagem !== null || imagem != "" ? imagem : ""}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{titulo}</h5>
              <p className="card-text">{desc}</p>
              <a
                className="btn btn-primary"
                style={{ marginRight: "1rem" }}
                onClick={() => removeItem(id)}
              >
                Excluir
              </a>
              <a
                className="btn btn-primary"
                style={{ marginLeft: "1rem" }}
                onClick={() => doTask(id)}
              >
                Concluir
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="card"
            style={
              prioridade == 1
                ? {
                    background: "linear-gradient(45deg, #FF6347, #FF5500)",
                    width: "18rem",
                    marginTop: "2rem",
                  }
                : prioridade == 2
                ? {
                    background: "linear-gradient(45deg, #FFFF99, #FFD700)",
                    width: "18rem",
                    marginTop: "2rem",
                  }
                : {
                    background: "linear-gradient(45deg, #9ACD32, #6B8E23)",
                    width: "18rem",
                    marginTop: "2rem",
                  }
            }
            key={id}
          >
            <img
              src={imagem !== null || imagem != "" ? imagem : ""}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{titulo}</h5>
              <p className="card-text">{desc}</p>
              <a
                className="btn btn-primary"
                style={{ marginRight: "1rem" }}
                onClick={() => removeItem(id)}
              >
                Excluir
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Card;
