import React, { useState } from "react";
import "../styles/admin/base.css";
import { Breadcrumb, Layout, Menu } from "antd";
import Logo from "../assets/images/logo3.png";
import {
  StarOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // <-- Importa useNavigate

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "dashboard", <PieChartOutlined />),
  getItem("Avaliações", "avaliacoes", <StarOutlined />),
];

function Base({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // <-- Inicializa o hook
  const [nome, setNome] = useState("");
  const handleMenuClick = ({ key }) => {
    navigate(`/admin/${key}`);
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem("@admUser");
    if (!storedUser) {
      navigate("/admin/login");
    } else {
      const user = JSON.parse(storedUser);
      setNome(user.nome);
    }
  }, [navigate]);
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
          <span>Olá, {nome}</span>
          <div className="icon-bla">
            <UserOutlined style={{ fontSize: "15px", color: "white" }} />
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className="sidebar_total"
        >
          <div className="demo-logo-vertical" />
          <Menu
            defaultSelectedKeys={["dashboard"]}
            mode="inline"
            items={items}
            onClick={handleMenuClick} // <-- Aqui está a navegação
            className="sidebar"
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Base;
