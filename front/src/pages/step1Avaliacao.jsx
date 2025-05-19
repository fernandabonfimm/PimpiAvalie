import React, { useState } from "react";
import { Layout, Form, Input, Button } from "antd";
import Logo from "../assets/images/logo3.png";
import StepsComponent from "../components/steps";
import "../styles/pages_avalie.css";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
        estado: "SP",
      };
      console.log("Dados da avaliação:", payload);

      // Envia a avaliação para o backend
      const response = await api.post("avaliacao/step1", payload);
      console.log("Resposta do backend:", response.data);
      console.log("Status da resposta:", response.status);
      
      if (response.status === 201) {
        // Armazena o ID da avaliação no localStorage
        localStorage.setItem("idAvaliacao", response.data._id);
        console.log("ID da avaliação armazenado:", response.data._id);
        Swal.fire({
          icon: "success",
          title: "Avaliação Enviada!",
          text: "Sua avaliação foi enviada com sucesso.",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/Validacao");
          
        });
      }
    } catch (error) {
      console.error("Erro no envio:", error);
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
        <Form layout="vertical" form={form} initialValues={{ local: "", cidade: "" }}>
          <div className="container-steps-avalie">
            <h1 className="title-steps-avalie" style={{ color: "#D0021B" }}>
              Avaliação
            </h1>
            <p className="subtitle-steps-avalie" style={{ color: "#D0021B" }}>
              Preencha os dados abaixo
            </p>
          </div>

            <Form.Item className="form-avalie" label="Seu nome completo" name="nome" rules={[{ required: true, message: "Informe seu nome completo" }]}>
              <Input className="input-custom" placeholder="Nome completo..." />
            </Form.Item>

            <Form.Item className="form-avalie" label="Seu melhor e-mail" name="email" rules={[{ required: true, message: "Informe seu e-mail" }]}>
              <Input className="input-custom" placeholder="exemplo: email@email.com..." />
            </Form.Item>

            <Form.Item className="form-avalie" label="Seu telefone ou WhatsApp" name="telefone" rules={[{ required: true, message: "Informe seu telefone" }]}>
              <Input className="input-custom" placeholder="Digite seu telefone ou WhatsApp..." />
            </Form.Item>

            <Form.Item className="form-avalie" label="Local da Compra" name="local" rules={[{ required: true, message: "Informe o local da compra" }]}>
              <Input className="input-custom" placeholder="Local da Compra" />
            </Form.Item>

            <Form.Item className="form-avalie" label="Cidade" name="cidade" rules={[{ required: true, message: "Informe sua cidade" }]}>
              <Input className="input-custom" placeholder="Digite sua cidade" />
            </Form.Item>

          
        </Form>
      </StepsComponent>
    </Content>
  );
};

export default Step1Validacao;