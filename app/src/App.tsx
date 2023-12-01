import { useState } from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import PaginaUsuario from "./components/PaginaUsuario";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/usuario/:id" element={<PaginaUsuario />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
