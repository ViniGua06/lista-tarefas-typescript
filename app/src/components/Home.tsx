import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NavBar from "./sub-components/NavBar";

const Home = () => {
  const [url, setUrl] = useState("http://localhost:2000");

  const [logado, setLogado] = useState(undefined);

  const getData = async () => {
    try {
      const response = await fetch(`${url}/getData`);
      const data = await response.json();

      setLogado(data.logado);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NavBar></NavBar>
    </>
  );
};

export default Home;
