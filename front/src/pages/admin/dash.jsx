import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../styles/admin/dash.css"; // Seu CSS estilizado
import Base from "../../components/base";
import { api } from "../../../api";

const Dash = () => {
  const boasAvaliacoes = 9449;
  const masAvaliacoes = 1550;
  const avaliacoesUltimos30Dias = 4073;
  const produtoMaisAvaliado = { name: "Pote 2L Sensação", total: 1200 };
  const [quantityOfGoodReviews, setQuantityOfGoodReviews] = React.useState(0);
  const [quantityOfBadReviews, setQuantityOfBadReviews] = React.useState(0);
  const [quantityOfReviews, setQuantityOfReviews] = React.useState(0);
  const [dataChartTrends, setDataChartTrends] = React.useState([]);
  React.useEffect(() => {
    const getQuantityOfGoodReviews = async () => {
      try {
        const response = await api.get("avaliacao/quantidade/bom");
        setQuantityOfGoodReviews(response.data.quantidade);
      } catch (error) {
        console.error("Erro ao buscar avaliações boas:", error);
      }
    };

    const getQuantityOfBadReviews = async () => {
      try {
        const response = await api.get("avaliacao/quantidade/ruim");
        setQuantityOfBadReviews(response.data.quantidade);
      } catch (error) {
        console.error("Erro ao buscar avaliações ruins:", error);
      }
    };
    const getQuantityOfAllReviews = async () => {
      try {
        const response = await api.get("avaliacao/quantidade");
        setQuantityOfReviews(response.data.quantidade);
      } catch (error) {
        console.error("Erro ao buscar todas as avaliações:", error);
      }
    };
    getQuantityOfAllReviews();
    getQuantityOfBadReviews();
    getQuantityOfGoodReviews();
  }, []);

  React.useEffect(() => {
    const getAvaliacaoTrends = async () => {
      try {
        const response = await api.get("avaliacao/grafico");
        setDataChartTrends(response.data);
      } catch (error) {
        console.error("Erro ao buscar tendências de avaliações:", error);
      }
    }
    getAvaliacaoTrends();
  }, []);
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
              <h2>{quantityOfGoodReviews}</h2>
              <p>Avaliações Boas</p>
            </div>
            <div className="card red">
              <h2>{quantityOfBadReviews}</h2>
              <p>Avaliações Ruins</p>
            </div>
            <div className="card yellow">
              <h2>{quantityOfReviews}</h2>
              <p>Avaliações (30 dias)</p>
            </div>
          </div>

          <div id="container" style={{ width: "100%", height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dataChartTrends}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="boas"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="ruins" stroke="#ff0000" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      }
    />
  );
};

export default Dash;
