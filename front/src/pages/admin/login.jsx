import React, { useState } from "react";
import Swal from "sweetalert2";
import "../../styles/admin/login.css"; // Importa o CSS
import { Image } from "antd";
import logo from "../../assets/images/logo3.png";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api";
export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setsenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    const payload = {
      email: email,
      senha: senha,
    };

    const response = await api.post("admin/login", payload);
    console.log("Resposta do backend:", response.data);
    if (response.status === 201 || response.status === 200) {
      localStorage.setItem("@admUser", JSON.stringify(response.data.admin));
      Swal.fire({
        icon: "success",
        title: "Login bem-sucedido!",
        text: "Você foi autenticado com sucesso.",
      }).then(() => {
        // Redireciona para a página de dashboard
        navigate("/admin/dashboard");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro no login",
        text: "E-mail ou senha incorretos.",
      });
    }
  };

  return (
    <div className="login-container">
      <div>
        <Image src={logo}></Image>
      </div>
      <div className="login-card">
        <div className="login-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="senha"
          className="login-input"
          type="password"
          value={senha}
          onChange={(e) => setsenha(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          LOGIN
        </button>
      </div>
    </div>
  );
}
