import React, { useState } from "react";
import "../../styles/admin/Cadastro.css"; // Importando os estilos
import Base from "../../components/base";
import { Table, Button, Input, Select, Modal, Row, Col } from "antd";
import { api } from "../../../api";
import Swal from "sweetalert2";

const Produto = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const addCategory = () => {
    if (categoryName.trim()) {
      setCategories([...categories, { nome: categoryName }]);
      setCategoryName("");
    }
    const response = api.post("/categoria", { nome: categoryName });
    response
      .then((res) => {
        console.log("Categoria criada com sucesso:", res.data);
        Swal.fire({
          icon: "success",
          title: "Sucesso",
          text: "Categoria criada com sucesso!",
          confirmButtonText: "OK",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao criar categoria:", error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao criar categoria",
          confirmButtonText: "OK",
        });
      });
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categoria");
        const data = response.data.map((item) => ({
          key: item._id,
          nome: item.nome,
        }));
        setCategories(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao buscar categorias",
          confirmButtonText: "OK",
        });
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await api.get("/produto");
        setProducts(response.data);
        console.log("Produtos:", response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao buscar produtos",
          confirmButtonText: "OK",
        });
      }
    };
    fetchProducts();
    fetchCategories();
  }, []);

  const addProduct = () => {
    if (productName.trim() && productValue.trim() && selectedCategory) {
      const newProduct = {
        nome: productName,
        valor: productValue,
        categoria: selectedCategory,
      };
      setProducts([...products, newProduct]);
      setProductName("");
      setProductValue("");
      setSelectedCategory("");

      const response = api.post("/produto", {
        nome: productName,
        valor: productValue,
        idCategoria: selectedCategory,
      });
      response
        .then((res) => {
          console.log("Produto criado com sucesso:", res.data);
          Swal.fire({
            icon: "success",
            title: "Sucesso",
            text: "Produto criado com sucesso!",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          console.error("Erro ao criar produto:", error);
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Erro ao criar produto",
            confirmButtonText: "OK",
          });
        });
    } else {
      alert("Preencha todos os campos antes de adicionar um produto!");
    }
  };

  const productColumns = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
      render: (text) => `R$ ${text}`,
    },
  ];

  const categoryColumns = [
    { title: "Nome da Categoria", dataIndex: "nome", key: "nome" },
  ];

  return (
    <Base>
      <div className="dashboard-container">
        <h1 className="title-principal">Produtos</h1>

        {/* <div className="form-section">
          <h2>Criar Categoria</h2>
          <Input
            type="text"
            placeholder="Nome da categoria"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Button className="button-red" onClick={addCategory}>
            Adicionar Categoria
          </Button>
        </div>

        <div className="table-section">
          <h2>Categorias Criadas</h2>
          <Table
            dataSource={categories}
            columns={categoryColumns}
            pagination={{ pageSize: 5 }}
          />
        </div> */}

        <div className="form-section">
          <h2>Criar Produto</h2>
          <Input
            type="text"
            placeholder="Nome do produto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            placeholder="Valor do produto"
            value={productValue}
            onChange={(e) => setProductValue(e.target.value)}
          />
          <Select
            placeholder="Selecione uma categoria"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            style={{ width: "100%", marginBottom: "20px" }}
          >
            {categories.map((category) => (
              <Select.Option key={category.key} value={category.key}>
                {category.nome}
              </Select.Option>
            ))}
          </Select>

          <Button className="button-red" onClick={addProduct}>
            Adicionar Produto
          </Button>
        </div>

        <div className="table-section">
          <h2>Produtos Criados</h2>
          <Table
            dataSource={products}
            columns={productColumns}
            pagination={{ pageSize: 5 }}
            rowKey={(record) => record._id}
          />
        </div>
      </div>
    </Base>
  );
};

export default Produto;
