import React, { useState } from "react";
import { Layout, Form, Select, Rate, Input, Button } from "antd";
import Logo from "../assets/images/logo3.png";
import StepsComponent from "../components/steps";
import "../styles/pages_avalie_produto.css";
import { FaFolder, FaStar, FaIceCream } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import Swal from "sweetalert2";

const { Content } = Layout;
const { Option } = Select;

const AvalieProduto = () => {
  const [form] = Form.useForm();
  const [avaliacao, setAvaliacao] = useState(4);
  const [comprariaNovamente, setComprariaNovamente] = useState(null);
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("categoria");
        console.log("Categorias:", response.data);
        setAllCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await api.get("produto");
        console.log("Produtos:", response.data);
        setAllProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        nivel: avaliacao,
        comprariaNovamente: comprariaNovamente,
        descricao: values.descricao,
        idProduto: selectedProduct,
        idCategoria: selectedCategory,
      };
      console.log("Dados da avaliação:", payload);

      // Envia a avaliação para o backend
      const getId = localStorage.getItem("idAvaliacao");
      console.log("ID da avaliação:", getId);
      // Verifica se o ID existe antes de enviar a requisição
      if (getId) {
        const response = await api.put(`avaliacao/step2/${getId}`, payload);
        console.log("Resposta do backend:", response.data);
        console.log("Status da resposta:", response.status);
        if (response.status === 201 || response.status === 200) {
          //limpa o localStorage
          localStorage.removeItem("idAvaliacao");
          Swal.fire({
            icon: "success",
            title: "Avaliação Enviada!",
            text: "Sua avaliação foi enviada com sucesso.",
            confirmButtonText: "Ok",
          }).then(() => {
            // Redireciona para a página de sucesso
            navigate("/sucesso");
          });
        }
      }
    } catch (error) {
      console.error("Erro no envio:", error);
      // Em caso de erro, exibe um alerta de erro
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Houve um erro ao enviar sua avaliação. Tente novamente.",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Content className="container-avalie-produto">
      <div className="container-img-avalie">
        <img src={Logo} alt="logo" />
        <h2 className="titulo-avalie-produto">Avalie o Produto</h2>
      </div>
      <StepsComponent onClickEnd={handleSubmit}>
        <Form layout="vertical" form={form} className="form-avalie-produto">
          <Form.Item name="categoria" rules={[{ required: true, message: "Escolha uma categoria" }]}>
            <Select
              placeholder="Escolha uma categoria"
              bordered={false}
              className="custom-select"
              onChange={setSelectedCategory}
            >
              {allCategories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.nome}
                </Option>
              ))}
            </Select>
          </Form.Item>


          <Form.Item name="produto" rules={[{ required: true, message: "Escolha o produto" }]}>
            <Select
              placeholder="Escolha o produto"
              bordered={false}
              className="custom-select"
              onChange={setSelectedProduct}
            >
              {allProducts.map((product) => (
                <Option key={product._id} value={product._id}>
                  {product.nome}
                </Option>
              ))}
            </Select>
          </Form.Item>


          <div className="container-avaliacao">
            <span>Avalie o produto:</span>
            <Rate value={avaliacao} onChange={setAvaliacao} />
          </div>

          <div className="container-compraria">
            <span>Você compraria novamente?</span>
            <Button
              type={comprariaNovamente === "sim" ? "primary" : "default"}
              onClick={() => setComprariaNovamente("sim")}
            >
              Sim
            </Button>
            <Button
              type={comprariaNovamente === "não" ? "primary" : "default"}
              danger
              onClick={() => setComprariaNovamente("não")}
            >
              Não
            </Button>
          </div>

          <Form.Item
            name="descricao"
            rules={[{ required: true, message: "Descreva sua avaliação" }]}
          >
            <Input.TextArea
              placeholder="Descrição da sua avaliação..."
              rows={4}
            />
          </Form.Item>

          
        </Form>
      </StepsComponent>
    </Content>
  );
};

export default AvalieProduto;