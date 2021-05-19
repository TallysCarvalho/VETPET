import React, { useState } from "react";
import Title from "../../components/Title";
import Header from "../../components/Header";
import { FaDog } from "react-icons/fa";
import firebase from "../../firebaseConnection";
import { toast } from "react-toastify";

export default function Customers() {
  const [nomePet, setNomePet] = useState("");
  const [pet, setPet] = useState("Cachorro");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");

  function handleChangeSelect(e) {
    setPet(e.target.value);
  }

  async function handleAdd(e) {
    e.preventDefault();

    if (nomePet !== "" && cnpj !== "" && endereco !== "") {
      await firebase
        .firestore()
        .collection("customers")
        .add({
          nomePet: nomePet,
          pet: pet,
          cnpj: cnpj,
          endereco: endereco,
        })
        .then(() => {
          setNomePet("");
          setCnpj("");
          setPet("Cachorro");
          setEndereco("");
          toast.info("Pet cadastrado com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao cadastrar esse Pet");
        });
    } else {
      toast.error("Preencha todos os campos");
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Clientes">
          <FaDog size={25} />
        </Title>

        <div className="container">
          <form className="form-profile customers" onSubmit={handleAdd}>
            <label>Nome do Pet</label>
            <input
              type="text"
              value={nomePet}
              onChange={(e) => setNomePet(e.target.value)}
            />

            <label>Tipo</label>
            <select value={pet} onChange={handleChangeSelect}>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
              <option value="Peixe">Peixe</option>
            </select>

            <label>CPF Do Responsável</label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />

            <label>Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
