import React, { useState } from "react";
import { Layout, Form, Input, Button, Select } from "antd";
import Logo from "../assets/images/logo3.png";
import StepsComponent from "../components/steps";
import "../styles/pages_avalie.css";

const { Content } = Layout;

const Step1Validacao = () => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);

      // Envio dos dados para o backend
      const response = await fetch("https://coloca-o-link-do-backend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar dados");
      }

      const data = await response.json();
      console.log("Resposta do backend:", data);
      alert("Avaliação enviada com sucesso!");
    } catch (error) {
      console.error("Erro no envio:", error);
      alert("Erro ao enviar a avaliação. Tente novamente.");
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
            nome: "",
            email: "",
            celular: "",
            localCompra: "",
          }}
        >
          <Form.Item
            className="form-avalie"
            label="Nome"
            name="nome"
            rules={[
              { required: true, message: "Por favor, insira seu nome" },
            ]}
          >
            <Input placeholder="Nome" />
          </Form.Item>

          <Form.Item
            className="form-avalie"
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira seu email" },
              { type: "email", message: "Por favor, insira um email válido" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            className="form-avalie"
            label="Celular"
            name="celular"
            rules={[{ required: true, message: "Por favor, insira seu celular" }]}
          >
            <Input placeholder="Celular" />
          </Form.Item>

          <Form.Item
            className="form-avalie"
            label="Local da Compra"
            name="localCompra"
            rules={[{ required: true, message: "Por favor, informe o local da compra" }]}
          >
            <Input placeholder="Local da Compra" />
          </Form.Item>

          <Form.Item
            className="form-avalie"
            label="Cidade"
            name="cidade"
            rules={[{ required: true, message: "Por favor, informe sua cidade" }]}
          >
            <Select placeholder="Selecione sua cidade">
              <Select.Option value="sao-paulo">São Paulo</Select.Option>
              <Select.Option value="rio-de-janeiro">Rio de Janeiro</Select.Option>
              <Select.Option value="belo-horizonte">Belo Horizonte</Select.Option>
              <Select.Option value="curitiba">Curitiba</Select.Option>
              <Select.Option value="porto-alegre">Porto Alegre</Select.Option>
            </Select>
          </Form.Item>

          {/* Botão para concluir a avaliação */}
          <Form.Item>
            <Button type="primary" onClick={handleSubmit} className="botao-concluir">
              Concluir Avaliação
            </Button>
          </Form.Item>
        </Form>
      </StepsComponent>
    </Content>
  );
};

export default Step1Validacao;