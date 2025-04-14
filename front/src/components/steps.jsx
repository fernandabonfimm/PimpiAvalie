import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import { IoArrowRedo } from "react-icons/io5";
import "../styles/components.css";

const steps = [
  {
    title: "Avalie o Produto",
    content: "First-content",
  },
  {
    title: "Informações",
    content: "Last-content",
  },
];

const StepsComponent = ({ onClickEnd }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps current={current} items={items} />
      {current === 0 && (
        <div className="content-step">
          <h2>Avalie o Produto</h2>
          <p>Conteúdo da avaliação do produto.</p>
        </div>
      )}
      <div className="container-buttons">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()} className="btn-step">
            Próximo Passo
            <IoArrowRedo />
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={onClickEnd} className="btn-step">
            Concluir Avaliação
          </Button>
        )}
      </div>
    </>
  );
};

export default StepsComponent;
