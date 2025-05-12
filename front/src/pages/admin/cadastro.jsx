import React, { useState } from "react";
import "../../styles/admin/Cadastro.css"; // Importando os estilos
import Base from "../../components/base";
import { Table, Button, Input, Select, Modal } from "antd";

const Cadastro = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const addCategory = () => {
    if (categoryName.trim()) {
      setCategories([...categories, { name: categoryName }]);
      setCategoryName("");
    }
  };

  const addProduct = () => {
    if (productName.trim() && productValue.trim() && selectedCategory) {
      setProducts([...products, { name: productName, value: productValue, category: selectedCategory }]);
      setProductName("");
      setProductValue("");
      setSelectedCategory("");
    } else {
      alert("Preencha todos os campos antes de adicionar um produto!");
    }
  };

  const showProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleProductModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const showCategoryModal = (category) => {
    setSelectedCategoryItem(category);
    setIsCategoryModalOpen(true);
  };

  const handleCategoryModalClose = () => {
    setIsCategoryModalOpen(false);
    setSelectedCategoryItem(null);
  };

  const productColumns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Valor", dataIndex: "value", key: "value", render: (text) => `R$ ${text}` },
    { title: "Categoria", dataIndex: "category", key: "category" },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => showProductModal(record)}>Visualizar</Button>
      ),
    },
  ];

  const categoryColumns = [
    { title: "Nome da Categoria", dataIndex: "name", key: "name" },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => showCategoryModal(record)}>Visualizar</Button>
      ),
    },
  ];

  return (
    <Base>
      <div className="container">
        <h1>Painel Administrativo</h1>

        <div className="form-section">
          <h2>Criar Categoria</h2>
          <Input type="text" placeholder="Nome da categoria" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
          <Button className="button-red" onClick={addCategory}>Adicionar Categoria</Button>
        </div>

        <div className="form-section">
          <h2>Criar Produto</h2>
          <Input type="text" placeholder="Nome do produto" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <Input type="number" placeholder="Valor do produto" value={productValue} onChange={(e) => setProductValue(e.target.value)} />
          <Select className="select-category" value={selectedCategory} onChange={(value) => setSelectedCategory(value)}>
          <Select.Option value="">Selecione uma categoria</Select.Option>
          {categories.map((category, index) => (
            <Select.Option key={index} value={category.name}>{category.name}</Select.Option>
          ))}
        </Select>
        <Button className="button-red" onClick={addProduct}>Adicionar Produto</Button>
                  
        </div>

        <div className="table-section">
          <h2>Categorias Criadas</h2>
          <Table dataSource={categories} columns={categoryColumns} pagination={{ pageSize: 5 }} />
        </div>

        <div className="table-section">
          <h2>Produtos Criados</h2>
          <Table dataSource={products} columns={productColumns} pagination={{ pageSize: 5 }} />
        </div>
      </div>

      <Modal title="Detalhes da Categoria" visible={isCategoryModalOpen} onCancel={handleCategoryModalClose} footer={null}>
        {selectedCategoryItem && (
          <>
            <p><strong>Nome:</strong> {selectedCategoryItem.name}</p>
          </>
        )}
      </Modal>

      <Modal title="Detalhes do Produto" visible={isModalOpen} onCancel={handleProductModalClose} footer={null}>
        {selectedProduct && (
          <>
            <p><strong>Nome:</strong> {selectedProduct.name}</p>
            <p><strong>Valor:</strong> R$ {selectedProduct.value}</p>
            <p><strong>Categoria:</strong> {selectedProduct.category}</p>
          </>
        )}
      </Modal>
    </Base>
  );
};

export default Cadastro;