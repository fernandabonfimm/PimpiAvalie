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
  return (
    <Base
      children={
        <div className="dashboard-container">
          <h1 className="title-principal">Dashboard</h1>

          <div className="cards-container">
            <div className="card green">
              <h2>{quantityOfGoodReviews ? quantityOfGoodReviews : 0}</h2>
              <p>Avaliações Boas</p>
            </div>
            <div className="card red">
              <h2>{quantityOfBadReviews ? quantityOfBadReviews : 0}</h2>
              <p>Avaliações Ruins</p>
            </div>
            <div className="card yellow">
              <h2>{quantityOfReviews ? quantityOfReviews : 0 }</h2>
              <p>Avaliações (30 dias)</p>
            </div>
          </div>

          <div id="container" style={{ width: "100%", height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              {/* <LineChart
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
              </LineChart> */}
            </ResponsiveContainer>
          </div>
        </div>
      }
    />
  );
};

export default Dash;
