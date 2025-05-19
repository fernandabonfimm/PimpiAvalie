import React from 'react';
import { Layout, Button } from 'antd';
import { FaRocket } from 'react-icons/fa'; 
import "../styles/pages_avalie.css";

const { Content } = Layout;

const SuccessPage = () => {
  return (
    <Content className="success-container">
      <div className="success-content">
        <div className="icon-wrapper">
          <FaRocket className="icon" style={{ color: "#D0021B", fontSize: "48px" }} />
          <div className="fireworks"></div>
        </div>
        <h1 className="success-title">Avaliação Enviada com Sucesso!</h1>
      </div>
    </Content>
  );
};


export default SuccessPage;
