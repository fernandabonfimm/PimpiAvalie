import React, { useState } from "react";
import "../styles/admin/base.css";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Logo from "../assets/images/logo3.png";
import {
    StarOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';

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
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Avaliações", "2", <StarOutlined />),
];

function Base({ children }) {
  const [collapsed, setCollapsed] = useState(false);
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
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
            className="sidebar_total"
        >
          <div className="demo-logo-vertical"/>
          <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} className="sidebar"/>
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
