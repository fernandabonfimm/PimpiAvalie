import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import { IoArrowRedo } from "react-icons/io5";
import "../styles/components.css";

const StepsComponent = ({ onClickEnd, children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const steps = ["Avalie o Produto", "Informações"];

  return (
    <div className="steps-container-new">
      <div className="steps">
        {/* Step 1 */}
        <div className="step-item">
          <div
            className={`step-circle ${
              currentStep > 0 ? "completed" : currentStep === 0 ? "active" : ""
            }`}
          >
            1
          </div>
        </div>

        {/* Linha flexível */}
        <div className="step-line-flex" />

        {/* Step 2 */}
        <div className="step-item">
          <div
            className={`step-circle ${
              currentStep === 1 ? "active" : ""
            }`}
          >
            2
          </div>
        </div>
      </div>

      <div className="container-children">
        {children}
      </div>

      <div className="container-buttons">
        
      </div>
    </div>

    
  );
  const navigate = useNavigate(); // Certifique-se de que useNavigate está declarado no componente

<Button 
  type="primary" 
  onClick={() => navigate('/Validacao')} 
  className="botao-validacao"
>
  Ir para Validação
</Button>

};

export default StepsComponent;