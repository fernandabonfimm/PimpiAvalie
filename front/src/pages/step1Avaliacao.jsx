import React, { useState } from "react";
import { Layout, Form, Input, Button, Select } from "antd";
import Logo from "../assets/images/logo3.png";
import StepsComponent from "../components/steps";
import "../styles/pages_avalie.css";
import { api } from "../../api"; // <-- importe o axios configurado
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // <-- importe o sweetalert2

const { Content } = Layout;

const Step1Validacao = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        nome: values.nome,
        email: values.email,
        telefone: values.telefone,
        local: values.local,
        cidade: values.cidade,
        estado: "SP", // Mude conforme a lógica
      };

      // Envia a avaliação para o backend
      const response = await api.post("/avaliacao/step1", payload);
      console.log("Resposta do backend:", response.data);
      console.log("Status da resposta:", response.status);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Avaliação Enviada!",
          text: "Sua avaliação foi enviada com sucesso.",
          confirmButtonText: "Ok",
        }).then(() => {
          // Redireciona para a página de sucesso
          navigate("/sucesso");
        });
      }
    } catch (error) {
      console.error("Erro no envio:", error);
      // Em caso de erro, exibe um alerta de erro
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Houve um erro ao enviar sua avaliação. Tente novamente.",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Content className="container-step1-avalie">
      <div className="container-img-avalie">
        <img src={Logo} alt="logo" />
      </div>
      <StepsComponent onClickEnd={handleSubmit}>
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            local: "",
            cidade: "",
          }}
        >
          <div
            className="container-steps-avalie"
            style={{
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1 className="title-steps-avalie" style={{ color: "#D0021B" }}>
              Avaliação
            </h1>
            <p className="subtitle-steps-avalie" style={{ color: "#D0021B" }}>
              Preencha os dados abaixo
            </p>
          </div>

          <Form.Item
            className="form-avalie"
            label="Seu nome completo"
            name="nome"
            rules={[
              {
                required: true,
                message: "Por favor, informe o seu nome completo",
              },
            ]}
          >
            <Input placeholder="nome completo..." />
          </Form.Item>

          <Form.Item
            className="form-avalie"
            label="Seu melhor e-mail"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor, informe o seu melhor e-mail",
              },
            ]}
          >
            <Input placeholder="exemplo: email@email.com..." />
          </Form.Item>

          <Form.Item
            className="form-avalie"
            label="Seu telefone ou WhatsApp"
            name="telefone"
            rules={[
              {
                required: true,
                message: "Por favor, informe o seu telefone ou WhatsApp",
              },
            ]}
          >
            <Input placeholder="digite o telefone ou whatsapp..." />
          </Form.Item>

          <Form.Item
            className="form-avalie"
            label="Local da Compra"
            name="local"
            rules={[
              {
                required: true,
                message: "Por favor, informe o local da compra",
              },
            ]}
          >
            <Input placeholder="Local da Compra" />
          </Form.Item>

          <Form.Item
            className="form-avalie"
            label="Cidade"
            name="cidade"
            rules={[
              { required: true, message: "Por favor, informe sua cidade" },
            ]}
          >
            <Input placeholder="Digite sua cidade" />
          </Form.Item>

          {/* Botão para concluir a avaliação */}
          <Form.Item style={{ marginTop: "2rem" }}>
            <Button
              type="primary"
              onClick={handleSubmit}
              className="botao-concluir"
              style={{
                display: "block",
                margin: "0 auto",
                height: "3rem",
                fontWeight: "bold",
                borderRadius: "1.5rem",
              }}
            >
              Concluir Avaliação
            </Button>
          </Form.Item>
        </Form>
      </StepsComponent>
    </Content>
  );
};

export default Step1Validacao;
