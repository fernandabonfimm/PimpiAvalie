import React from 'react';
import { Line } from '@ant-design/plots';
import "../../styles/admin/dash.css"; // Seu CSS estilizado

const Dash = () => {
  const boasAvaliacoes = 9449;
  const masAvaliacoes = 1550; 
  const avaliacoesUltimos30Dias = 4073;
  const produtoMaisAvaliado = { name: 'Produto X', total: 1200 };

  const data = Array.from({ length: 30 }, (_, i) => ({
    dia: `Dia ${i + 1}`,
    boas: Math.floor(Math.random() * 100),
    ruins: Math.floor(Math.random() * 50),
  }));
  

  const config = {
    data: [
      { day: '1', type: 'Boa', value: 5 },
      { day: '1', type: 'Ruim', value: 2 },
      { day: '2', type: 'Boa', value: 6 },
      { day: '2', type: 'Ruim', value: 3 },
      { day: '3', type: 'Boa', value: 8 },
      { day: '3', type: 'Ruim', value: 1 },
      { day: '4', type: 'Boa', value: 7 },
      { day: '4', type: 'Ruim', value: 4 },
      { day: '5', type: 'Boa', value: 9 },
      { day: '5', type: 'Ruim', value: 2 },
      { day: '6', type: 'Boa', value: 10 },
      { day: '6', type: 'Ruim', value: 1 },
      { day: '7', type: 'Boa', value: 4 },
      { day: '7', type: 'Ruim', value: 5 },
      { day: '8', type: 'Boa', value: 6 },
      { day: '8', type: 'Ruim', value: 3 },
      { day: '9', type: 'Boa', value: 8 },
      { day: '9', type: 'Ruim', value: 2 },
      { day: '10', type: 'Boa', value: 7 },
      { day: '10', type: 'Ruim', value: 3 },
      { day: '11', type: 'Boa', value: 6 },
      { day: '11', type: 'Ruim', value: 4 },
      { day: '12', type: 'Boa', value: 5 },
      { day: '12', type: 'Ruim', value: 5 },
      { day: '13', type: 'Boa', value: 9 },
      { day: '13', type: 'Ruim', value: 1 },
      { day: '14', type: 'Boa', value: 8 },
      { day: '14', type: 'Ruim', value: 2 },
      { day: '15', type: 'Boa', value: 7 },
      { day: '15', type: 'Ruim', value: 3 },
      { day: '16', type: 'Boa', value: 6 },
      { day: '16', type: 'Ruim', value: 4 },
      { day: '17', type: 'Boa', value: 10 },
      { day: '17', type: 'Ruim', value: 1 },
      { day: '18', type: 'Boa', value: 5 },
      { day: '18', type: 'Ruim', value: 5 },
      { day: '19', type: 'Boa', value: 9 },
      { day: '19', type: 'Ruim', value: 2 },
      { day: '20', type: 'Boa', value: 7 },
      { day: '20', type: 'Ruim', value: 3 },
      { day: '21', type: 'Boa', value: 8 },
      { day: '21', type: 'Ruim', value: 2 },
      { day: '22', type: 'Boa', value: 6 },
      { day: '22', type: 'Ruim', value: 4 },
      { day: '23', type: 'Boa', value: 7 },
      { day: '23', type: 'Ruim', value: 3 },
      { day: '24', type: 'Boa', value: 9 },
      { day: '24', type: 'Ruim', value: 1 },
      { day: '25', type: 'Boa', value: 5 },
      { day: '25', type: 'Ruim', value: 5 },
      { day: '26', type: 'Boa', value: 6 },
      { day: '26', type: 'Ruim', value: 4 },
      { day: '27', type: 'Boa', value: 7 },
      { day: '27', type: 'Ruim', value: 3 },
      { day: '28', type: 'Boa', value: 8 },
      { day: '28', type: 'Ruim', value: 2 },
      { day: '29', type: 'Boa', value: 6 },
      { day: '29', type: 'Ruim', value: 4 },
      { day: '30', type: 'Boa', value: 5 },
      { day: '30', type: 'Ruim', value: 5 },
    ],
    xField: 'day', // Eixo X representando os dias
    yField: 'value', // Eixo Y com as avaliações
    seriesField: 'type', // Define que 'type' será a série que separa as avaliações boas e ruins
    smooth: true, // Para deixar as linhas mais suaves
    color: ['#00FF00', '#FF0000'], // Verde para boas e vermelho para ruins
    lineStyle: {
      lineWidth: 2, // Largura das linhas
    },
    meta: {
      day: { alias: 'Dia' }, // Alias para o eixo X
      value: { alias: 'Avaliações' }, // Alias para o eixo Y
    },
  };
  
  
  
  
  

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="cards-container">
        <div className="card">
          <h2>{boasAvaliacoes}</h2>
          <p>Avaliações Boas</p>
        </div>
        <div className="card">
          <h2>{masAvaliacoes}</h2>
          <p>Avaliações Ruins</p>
        </div>
        <div className="card">
          <h2>{avaliacoesUltimos30Dias}</h2>
          <p>Avaliações (30 dias)</p>
        </div>
        <div className="card">
          <h2>{produtoMaisAvaliado.name}</h2>
          <p>{produtoMaisAvaliado.total} avaliações</p>
        </div>
      </div>

      <div id="container" style={{ width: '100%', height: '400px' }}>
        <Line {...config} />
      </div>

    </div>
  );
};

export default Dash;
