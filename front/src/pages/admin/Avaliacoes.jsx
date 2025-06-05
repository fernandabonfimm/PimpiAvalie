import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import "../../styles/admin/avaliacoes.css";
import Base from "../../components/base";
import { api } from "../../../api";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { render } from "react-dom";

const Avaliacoes = () => {
  const [dataSource, setDataSource] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [nomeProduto, setNomeProduto] = useState("");
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [idProduto, setIdProduto] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [csvData, setCsvData] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/avaliacao");
        const data = response.data.map((item) => ({
          key: item._id,
          nome: item.nome,
          email: item.email,
          localCompra: item.local,
          cidade: item.cidade,
          nota: item.nivel,
          descricao: item.descricao,
          telefone: item.telefone,
          comprariaNovamente: item.comprariaNovamente,
          createdAt: item.createdAt,
          idProduto: item.idProduto,
          idCategoria: item.idCategoria,
        }));
        setDataSource(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao buscar dados",
          confirmButtonText: "OK",
        });
      }
    };
    fetchData();
  }, []);

  const visualizar = (record) => {
    setSelectedRecord(record.key);
    console.log(record);
    setIdProduto(record.idProduto);
    setIdCategoria(record.idCategoria);
    setDataSelecionada(record);
    setIsModalVisible(true);
  };

  React.useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produto/${idProduto}`);
        const data = response.data;
        setNomeProduto(data.nome);
      } catch (error) {
        console.error("Erro ao buscar dados do produto:", error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao buscar dados do produto",
          confirmButtonText: "OK",
        });
      }
    };

    const fetchCategoria = async () => {
      try {
        const response = await api.get(`/categoria/${idCategoria}`);
        const data = response.data;
        setNomeCategoria(data.nome);
      } catch (error) {
        console.error("Erro ao buscar dados da categoria:", error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao buscar dados da categoria",
          confirmButtonText: "OK",
        });
      }
    };
    if (idProduto) {
      fetchProduto();
    }
    if (idCategoria) {
      fetchCategoria();
    }
  }, [idProduto, idCategoria]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const getUniqueValues = (data, key) => {
    return [...new Set(data.map((item) => item[key]))].map((value) => ({
      text: value,
      value,
    }));
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Local de Compra",
      dataIndex: "localCompra",
      key: "localCompra",
      filters: getUniqueValues(dataSource, "localCompra"),
      onFilter: (value, record) => record.localCompra === value,
    },
    {
      title: "Cidade",
      dataIndex: "cidade",
      key: "cidade",
      filters: getUniqueValues(dataSource, "cidade"),
      onFilter: (value, record) => record.cidade === value,
    },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
      render: (text, record) =>
        new Date(record.createdAt).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
    {
      title: "Nota",
      dataIndex: "nota",
      key: "nota",
      filters: getUniqueValues(dataSource, "nota"),
      onFilter: (value, record) => record.nota === value,
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <div className="botoes-acoes">
          <Button className="btn-vermelho" onClick={() => visualizar(record)}>
            Visualizar
          </Button>
        </div>
      ),
    },
  ];

  async function exportToCSV() {
    try {
      const response = await api.get("/avaliacao/exportar/data", {
        responseType: "blob", // Para receber o arquivo como blob
      });
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "avaliacoes.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      message.success("CSV exportado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
      message.error("Erro ao exportar as avaliações.");
    }
  }

  return (
    <Base
      children={
        <div className="dashboard-container">
          <h1 className="title-principal">Avaliações</h1>
          <div className="botoes-acoes">
            <Button className="btn-exportar" onClick={exportToCSV}>
              Exportar CSV
            </Button>
          </div>
          <div className="tabela-responsive">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 5 }}
              scroll={{ x: true }}
            />
          </div>

          <Modal
            title={"Visualizar Avaliação"}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={"Fechar"}
            cancelButtonProps={{
              style: { display: "none" },
            }}
          >
            {dataSelecionada && (
              <div>
                <p>
                  <strong>Nome:</strong> {dataSelecionada.nome}
                </p>
                <p>
                  <strong>Email:</strong> {dataSelecionada.email}
                </p>
                <p>
                  <strong>Local da Compra:</strong>{" "}
                  {dataSelecionada.localCompra}
                </p>
                <p>
                  <strong>Cidade:</strong> {dataSelecionada.cidade}
                </p>
                <p>
                  <strong>Telefone:</strong> {dataSelecionada.telefone}
                </p>
                <p>
                  <strong>Nota:</strong> {dataSelecionada.nota}
                </p>
                <p>
                  <strong>Compraria Novamente:</strong>{" "}
                  {dataSelecionada.comprariaNovamente}
                </p>
                <p>
                  <strong>Descrição:</strong> {dataSelecionada.descricao}
                </p>
                <p>
                  <strong>Produto:</strong> {nomeProduto}
                </p>
                <p>
                  <strong>Categoria:</strong> {nomeCategoria}
                </p>
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(dataSelecionada.createdAt).toLocaleDateString(
                    "pt-BR",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}
                </p>
              </div>
            )}
          </Modal>
        </div>
      }
    ></Base>
  );
};

export default Avaliacoes;
