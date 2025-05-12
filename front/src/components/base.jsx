import React, { useState } from "react";
import "../styles/admin/base.css";
import { Layout, Menu } from "antd";
import Logo from "../assets/images/logo3.png";
import { StarOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom"; // <-- Importa useLocation para identificar a página ativa

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon) {
  return { key, icon, label };
}

const items = [
  getItem("Dashboard", "dashboard", <PieChartOutlined />),
  getItem("Avaliações", "avaliacoes", <StarOutlined />),
  getItem("Cadastro", "cadastro", <StarOutlined />),
];

function Base({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // <-- Obtém a rota atual

  const handleMenuClick = ({ key }) => {
    navigate(`/admin/${key}`);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <div className="header-title">
            <h3>Dashboard</h3>
          </div>
        </div>
        <div className="header-user">
          <span>Olá, Fulinho de Tal</span>
          <div className="icon-bla">
            <UserOutlined style={{ fontSize: "15px", color: "white" }} />
          </div>
        </div>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className="sidebar_total">
          <div className="demo-logo-vertical" />
          <Menu
            selectedKeys={[location.pathname.split("/").pop()]} // <-- Define o item ativo com base na URL
            mode="inline"
            items={items}
            onClick={handleMenuClick}
            className="sidebar"
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Base;