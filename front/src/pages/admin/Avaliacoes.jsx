import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import "../../styles/admin/avaliacoes.css";

const Avaliacoes = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      nome: "João da Silva",
      email: "joao@email.com",
      localCompra: "Supermercado X",
      cidade: "Ribeirão Preto",
    },
    {
      key: "2",
      nome: "Maria Souza",
      email: "maria@email.com",
      localCompra: "Loja Y",
      cidade: "São Paulo",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const visualizar = (record) => {
    setSelectedRecord(record);
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const editar = (record) => {
    setSelectedRecord(record);
    setIsEditing(true);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const deletar = (key) => {
    Modal.confirm({
      title: "Você tem certeza que deseja deletar?",
      onOk: () => {
        setDataSource(prev => prev.filter(item => item.key !== key));
        message.success("Deletado com sucesso");
      },
    });
  };

  const handleOk = () => {
    if (isEditing) {
      form.validateFields().then(values => {
        setDataSource(prev =>
          prev.map(item =>
            item.key === selectedRecord.key ? { ...item, ...values } : item
          )
        );
        message.success("Atualizado com sucesso");
        setIsModalVisible(false);
        form.resetFields();
      });
    } else {
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
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
    },
    {
      title: "Cidade",
      dataIndex: "cidade",
      key: "cidade",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <div className="botoes-acoes">
          <Button className="btn-vermelho" onClick={() => visualizar(record)}>
            Visualizar
          </Button>
          <Button className="btn-amarelo" onClick={() => editar(record)}>
            Editar
          </Button>
          <Button danger onClick={() => deletar(record.key)}>
            Deletar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container-avaliacoes">
      <h1 className="titulo-avaliacoes">Painel de Avaliações</h1>
      <div className="tabela-responsive">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
        />
      </div>

      <Modal
        title={isEditing ? "Editar Avaliação" : "Visualizar Avaliação"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEditing ? "Salvar" : "Fechar"}
        cancelButtonProps={{ style: { display: isEditing ? "inline" : "none" } }}
      >
        {isEditing ? (
          <Form form={form} layout="vertical">
            <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="E-mail" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="localCompra" label="Local da Compra">
              <Input />
            </Form.Item>
            <Form.Item name="cidade" label="Cidade">
              <Input />
            </Form.Item>
          </Form>
        ) : selectedRecord && (
          <div>
            <p><strong>Nome:</strong> {selectedRecord.nome}</p>
            <p><strong>Email:</strong> {selectedRecord.email}</p>
            <p><strong>Local da Compra:</strong> {selectedRecord.localCompra}</p>
            <p><strong>Cidade:</strong> {selectedRecord.cidade}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Avaliacoes;
