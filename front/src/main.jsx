import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Step1Validacao  from "./pages/step1Avaliacao";
import LoginAdmin from '../src/pages/admin/login';
import Dash from "./pages/admin/dash";
import './index.css'; // Importa o CSS global
import AvalieProduto from "./pages/AvalieProduto";
const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AvalieProduto />} />
        <Route path="/Validacao" element={<Step1Validacao />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<Dash />} />
      </Routes>
    </Router>
  </StrictMode>
);
