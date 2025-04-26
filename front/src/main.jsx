import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Step1Validacao  from "./pages/step1Avaliacao";
import LoginAdmin from '../src/pages/admin/login';
const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Step1Validacao />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
      </Routes>
    </Router>
  </StrictMode>
);
