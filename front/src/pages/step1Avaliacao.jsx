import React, { useState } from "react";
import { Layout, Form, Input } from "antd";
import Logo from "../assets/images/logo3.png";
import StepsComponent from "../components/steps";
import "../styles/pages_avalie.css";



const { Content } = Layout;

const Step1Validacao = () => {
  const [form] = Form.useForm();

  const validateNome = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Por favor, insira seu nome"));
    }
    const regexOnlyNumbers = /^[0-9\s]+$/;
    if (regexOnlyNumbers.test(value)) {
      return Promise.reject(new Error("Nome não pode conter apenas números"));
    }
    return Promise.resolve();
  };

  // const handleSubmit = async () => {
  //   try {
  //     const values = await form.validateFields();
  //     console.log("Success:", values);
  //     alert("Avaliação Concluída!");
  //   } catch (errorInfo) {
  //     console.log("Failed:", errorInfo);
  //   }
  // };
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);
  
      // Envio dos dados para o backend
      const response = await fetch("https://coloca o link do backend", {
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
    <>
      <Content className="container-step1-avalie">
        <div className="container-img-avalie">
          <img src={Logo} alt="logo" />
        </div>
        <StepsComponent
          onClickEnd={handleSubmit}
          children={
            <Form
              layout="vertical"
              form={form}
              className="form-avalie"
              initialValues={{
                nome: "",
                email: "",
                celular: "",
                localCompra: "",
                cidade: "",
              }}
            >
              <Form.Item
                label="Nome"
                name="nome"
                rules={[
                  { required: true, message: "Por favor, insira seu nome" },
                  { validator: validateNome },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Por favor, insira seu email" },
                  { type: "email", message: "Por favor, insira um email válido" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Celular"
                name="celular"
                rules={[{ required: true, message: "Por favor, insira seu celular" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Local da Compra"
                name="localCompra"
                rules={[{ required: true, message: "Por favor, informe o local da compra" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Cidade"
                name="cidade"
                rules={[{ required: true, message: "Por favor, informe sua cidade" }]}
              >
                <Input />
              </Form.Item>
            </Form>
          }
        />
      </Content>
    </>
  );
};

export default Step1Validacao;