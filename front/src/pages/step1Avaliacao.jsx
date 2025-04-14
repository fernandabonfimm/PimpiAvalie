import React from "react";
import Logo from "../assets/images/logo3.png";
import { Layout } from "antd";
const { Content, Footer } = Layout;
import "../styles/pages.css";
import StepsComponent from "../components/steps";
const Step1Validacao = () => {
  return (
    <>
      <Content className="container-step1-avalie">
        <div className="container-img-avalie">
          <img src={Logo} alt="logo" />
        </div>
      </Content>
      <div>
        <StepsComponent onClickEnd={() => alert("Avaliação Concluída!")} />
      </div>
    </>
  );
};

export default Step1Validacao;
