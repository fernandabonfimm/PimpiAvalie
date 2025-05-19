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

React.useEffect(() => {
  const getTrends = async () => {
    try {
      const response = await api.get("avaliacao/grafico/all");
      console.log(response.data);
      const formattedData = response.data.data.map((item) => ({
        _id: item._id,
        boas: item.boas,
        ruins: item.ruins,
      }));
      setDataChartTrends(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error("Erro ao buscar tendências:", error);
    }
  };
  getTrends();
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
              <h2>{quantityOfReviews ? quantityOfReviews : 0}</h2>
              <p>Avaliações (30 dias)</p>
            </div>
          </div>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <LineChart data={dataChartTrends}>
                
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="boas"
                  stroke="#4CAF50" // verde
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                  name="Avaliações Boas"
                />
                <Line
                  type="monotone"
                  dataKey="ruins"
                  stroke="#F44336" // vermelho
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                  name="Avaliações Ruins"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      }
    />
  );
};

export default Dash;
