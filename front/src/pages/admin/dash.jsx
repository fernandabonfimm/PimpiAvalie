import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../../styles/admin/dash.css"; // Seu CSS estilizado
import Base from "../../components/base";

const Dash = () => {
  const boasAvaliacoes = 9449;
  const masAvaliacoes = 1550;
  const avaliacoesUltimos30Dias = 4073;
  const produtoMaisAvaliado = { name: "Pote 2L Sensação", total: 1200 };

  // Criando os dados para os 30 dias
  const data = [
    { day: "1", boas: 5, ruins: 2 },
    { day: "2", boas: 6, ruins: 3 },
    { day: "3", boas: 8, ruins: 1 },
    { day: "4", boas: 7, ruins: 4 },
    { day: "5", boas: 9, ruins: 2 },
    { day: "6", boas: 10, ruins: 1 },
    { day: "7", boas: 4, ruins: 5 },
    { day: "8", boas: 6, ruins: 3 },
    { day: "9", boas: 8, ruins: 2 },
    { day: "10", boas: 7, ruins: 3 },
    { day: "11", boas: 6, ruins: 4 },
    { day: "12", boas: 5, ruins: 5 },
    { day: "13", boas: 9, ruins: 1 },
    { day: "14", boas: 8, ruins: 2 },
    { day: "15", boas: 7, ruins: 3 },
    { day: "16", boas: 6, ruins: 4 },
    { day: "17", boas: 10, ruins: 1 },
    { day: "18", boas: 5, ruins: 5 },
    { day: "19", boas: 9, ruins: 2 },
    { day: "20", boas: 7, ruins: 3 },
    { day: "21", boas: 8, ruins: 2 },
    { day: "22", boas: 6, ruins: 4 },
    { day: "23", boas: 7, ruins: 3 },
    { day: "24", boas: 9, ruins: 1 },
    { day: "25", boas: 5, ruins: 5 },
    { day: "26", boas: 6, ruins: 4 },
    { day: "27", boas: 7, ruins: 3 },
    { day: "28", boas: 8, ruins: 2 },
    { day: "29", boas: 6, ruins: 4 },
    { day: "30", boas: 5, ruins: 5 },
  ];

  return (
    <Base
      children={
        <div className="dashboard-container">
          <h1 className="title-principal">Dashboard</h1>

          <div className="cards-container">
            <div className="card green">
              <h2>{boasAvaliacoes}</h2>
              <p>Avaliações Boas</p>
            </div>
            <div className="card red">
              <h2>{masAvaliacoes}</h2>
              <p>Avaliações Ruins</p>
            </div>
            <div className="card yellow">
              <h2>{avaliacoesUltimos30Dias}</h2>
              <p>Avaliações (30 dias)</p>
            </div>
          </div>

          <div id="container" style={{ width: "100%", height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="boas" stroke="#00FF00" strokeWidth={2} name="Boas" />
                <Line type="monotone" dataKey="ruins" stroke="#FF0000" strokeWidth={2} name="Ruins" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      }
    />
  );
};

export default Dash;
