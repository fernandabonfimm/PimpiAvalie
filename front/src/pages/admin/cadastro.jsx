import React, { useState } from "react";
import "../../styles/admin/Cadastro.css"; // Importando os estilos

const Cadastro = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const addCategory = () => {
    if (categoryName.trim() !== "") {
      setCategories([...categories, categoryName]);
      setCategoryName("");
    }
  };

  const addProduct = () => {
    if (productName.trim() !== "" && productValue.trim() !== "" && selectedCategory) {
      setProducts([...products, { name: productName, value: productValue, category: selectedCategory }]);
      setProductName("");
      setProductValue("");
      setSelectedCategory("");
    } else {
      alert("Preencha todos os campos antes de adicionar um produto!");
    }
  };

  return (
    <div className="container">
      <h1>Painel Administrativo</h1>

      <div>
        <h2>Criar Categoria</h2>
        <input
          type="text"
          placeholder="Nome da categoria"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button onClick={addCategory}>Adicionar Categoria</button>
      </div>

      <div>
        <h2>Criar Produto</h2>
        <input
          type="text"
          placeholder="Nome do produto"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor do produto"
          value={productValue}
          onChange={(e) => setProductValue(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Selecione uma categoria</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={addProduct}>Adicionar Produto</button>
      </div>

      <div>
        <h2>Categorias Criadas</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Produtos Criados</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name} - R$ {product.value} ({product.category})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cadastro;