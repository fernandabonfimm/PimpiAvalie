import React, { useState } from "react";
import { Layout, Form, Select, Rate, Input, Button } from "antd";
import Logo from "../assets/images/logo3.png";
import StepsComponent from "../components/steps";
import "../styles/pages_avalie_produto.css";

const { Content } = Layout;
const { Option } = Select;

const AvalieProduto = () => {
  const [form] = Form.useForm();
  const [avaliacao, setAvaliacao] = useState(4);
  const [comprariaNovamente, setComprariaNovamente] = useState(null);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);

      const response = await fetch("https://coloca-o-link-do-backend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, avaliacao, comprariaNovamente }),
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
    <Content className="container-avalie-produto">
      <div className="container-img-avalie">
        <img src={Logo} alt="logo" />
      </div>
      <StepsComponent onClickEnd={handleSubmit}>
        <Form layout="vertical" form={form} className="form-avalie-produto">
          <Form.Item name="categoria" rules={[{ required: true, message: "Escolha uma categoria" }]}>
            <Select placeholder="Escolha a categoria">
              <Option value="sorvete">Sorvete</Option>
              <Option value="picolé">Picolé</Option>
            </Select>
          </Form.Item>

          <Form.Item name="produto" rules={[{ required: true, message: "Escolha o produto" }]}>
            <Select placeholder="Escolha o produto">
              <Option value="chocolate">Chocolate</Option>
              <Option value="morango">Morango</Option>
            </Select>
          </Form.Item>

          <Form.Item name="sabor" rules={[{ required: true, message: "Escolha o sabor" }]}>
            <Select placeholder="Escolha o sabor">
              <Option value="tradicional">Tradicional</Option>
              <Option value="zero">Zero Açúcar</Option>
            </Select>
          </Form.Item>

          <div className="container-avaliacao">
            <span>Avalie o produto:</span>
            <Rate value={avaliacao} onChange={setAvaliacao} />
          </div>

          <div className="container-compraria">
            <span>Você compraria novamente?</span>
            <Button type={comprariaNovamente === "sim" ? "primary" : "default"} onClick={() => setComprariaNovamente("sim")}>
              Sim
            </Button>
            <Button type={comprariaNovamente === "não" ? "primary" : "default"} onClick={() => setComprariaNovamente("não")}>
              Não
            </Button>
          </div>

          <Form.Item name="descricao" rules={[{ required: true, message: "Descreva sua avaliação" }]}>
            <Input.TextArea placeholder="Descrição da sua avaliação..." rows={4} />
          </Form.Item>

          <Button type="primary" className="btn-submit" onClick={handleSubmit}>
            Próximo passo
          </Button>
        </Form>
      </StepsComponent>
    </Content>
  );
};

export default AvalieProduto;