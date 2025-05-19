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
        console.log(response.data);
        setQuantityOfGoodReviews(response.data.quantidade);
      } catch (error) {
        console.error("Erro ao buscar avaliações boas:", error);
      }
    };

    const getQuantityOfBadReviews = async () => {
      try {
        const response = await api.get("avaliacao/quantidade/ruim");
        console.log(response.data);
        setQuantityOfBadReviews(response.data.quantidade);
      } catch (error) {
        console.error("Erro ao buscar avaliações ruins:", error);
      }
    };
    const getQuantityOfAllReviews = async () => {
      try {
        const response = await api.get("avaliacao/quantidade/todas");
        console.log(response.data);
        setQuantityOfReviews(response.data.quantidade);
      } catch (error) {
        console.error("Erro ao buscar todas as avaliações:", error);
      }
    };
    getQuantityOfAllReviews();
    getQuantityOfBadReviews();
    getQuantityOfGoodReviews();
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
        </div>
      }
    />
  );
};

export default Dash;
