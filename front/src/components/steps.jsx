import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/components.css";

const StepsComponent = ({ onClickEnd, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(location.state?.step ?? 0);

  useEffect(() => {
    if (location.state?.step !== undefined) {
      setCurrentStep(location.state.step);
    }
  }, [location.state]);

  const handleNextAction = async () => {
    if (onClickEnd) await onClickEnd(); // Envia os dados ao backend

    if (currentStep === 0) {
      navigate("/Validacao", { state: { step: 1 } }); // Avança para Step 2
    } else {
      navigate("/Validacao", { state: { step: 2 } }); // Finaliza avaliação
    }
  };

  return (
    <div className="steps-container-new">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="steps-new">
          <div className="step-item">
            <div
              className={`step-circle ${
                currentStep > 0
                  ? "completed"
                  : currentStep === 0
                  ? "active"
                  : ""
              }`}
            >
              1
            </div>
          </div>

          <div className="step-line-flex" />

          <div className="step-item">
            <div
              className={`step-circle ${
                currentStep === 1
                  ? "active"
                  : currentStep === 2
                  ? "completed"
                  : ""
              }`}
            >
              2
            </div>
          </div>
        </div>
      </div>
      <div className="container-children">{children}</div>

      <div className="container-buttons">
        <Button
          type="primary"
          onClick={handleNextAction}
          className="btn-validation"
        >
          {currentStep === 0 ? "Próximo Passo" : "Concluir Avaliação"}
        </Button>
      </div>
    </div>
  );
};

export default StepsComponent;
