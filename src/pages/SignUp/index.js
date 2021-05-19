import { useState, useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { FaWhatsapp } from "react-icons/fa";

import React from "react";

function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (nome !== "" && email !== "" && password !== "") {
      signUp(email, password, nome);
    }
  }

  return (
    <div className="Container_Sign">
      <div className="right">
        <div className="Logo">
          <span>VET</span>
          <span className="pet">PET</span>
        </div>
        <h2>Somos amigos do seu Pet agende já uma consulta!</h2>
        <button className="btn">
          <FaWhatsapp size={25} color={"white"} />
          <span>Agende Já</span>
        </button>
      </div>
      <div className="left">
        <div className="container-center">
          <div className="login">
            <div className="login-area"></div>
            <form onSubmit={handleSubmit}>
              <h1>Registrar</h1>
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="text"
                placeholder="email@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">
                {loadingAuth ? "Registrando..." : "Cadastrar"}
              </button>
            </form>

            <Link to="/">Já tenho uma conta!</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
