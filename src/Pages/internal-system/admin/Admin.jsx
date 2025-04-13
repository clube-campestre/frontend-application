import React, { useState } from 'react';
import AddButton from '../../../components/admin-internal/AddButton';
import ListPanel from '../../../components/admin-internal/ListPanel'
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  
  const [transportes] = useState([
    { id: 1, nome: "Ônibus Executivo - Placa ABC-1234", capacidade: 45 },
    { id: 2, nome: "Van Mercedes - Placa DEF-5678", capacidade: 15 },
    { id: 3, nome: "Micro-ônibus - Placa GHI-9012", capacidade: 28 },
    { id: 4, nome: "Ônibus de Turismo - Placa JKL-3456", capacidade: 50 },
    { id: 5, nome: "Van Sprinter - Placa MNO-7890", capacidade: 18 },
    { id: 6, nome: "Ônibus Leito - Placa PQR-1234", capacidade: 32 },
    { id: 7, nome: "Van Executiva - Placa STU-5678", capacidade: 12 },
    { id: 8, nome: "Ônibus Urbano - Placa VWX-9012", capacidade: 42 },
    { id: 9, nome: "Micro-ônibus Executivo - Placa YZA-3456", capacidade: 25 },
    { id: 10, nome: "Van Fretamento - Placa BCD-7890", capacidade: 16 },
    { id: 11, nome: "Ônibus Escolar - Placa EFG-1234", capacidade: 48 },
    { id: 12, nome: "Van Turismo - Placa HIJ-5678", capacidade: 14 },
    { id: 13, nome: "Ônibus Rodoviário - Placa KLM-9012", capacidade: 46 },
    { id: 14, nome: "Micro-ônibus Turismo - Placa NOP-3456", capacidade: 24 },
    { id: 15, nome: "Van Escolar - Placa QRS-7890", capacidade: 20 },
  ]);

  const [locais] = useState([
    { id: 1, nome: "Centro de Convenções", endereco: "Av. Principal, 1000" },
    { id: 2, nome: "Hotel Grand Plaza", endereco: "Rua das Flores, 123" },
    { id: 3, nome: "Parque de Exposições", endereco: "Estrada do Contorno, 500" },
    { id: 4, nome: "Estádio Municipal", endereco: "Av. dos Esportes, 789" },
    { id: 5, nome: "Teatro Municipal", endereco: "Praça Central, 45" },
    { id: 6, nome: "Centro Cultural", endereco: "Rua das Artes, 234" },
    { id: 7, nome: "Pavilhão de Feiras", endereco: "Rodovia BR-101, Km 50" },
    { id: 8, nome: "Ginásio Poliesportivo", endereco: "Av. Olímpica, 321" },
    { id: 9, nome: "Clube Recreativo", endereco: "Rua do Lazer, 567" },
    { id: 10, nome: "Universidade Federal", endereco: "Campus Universitário, s/n" },
    { id: 11, nome: "Shopping Center", endereco: "Av. do Comércio, 999" },
    { id: 12, nome: "Praça de Alimentação", endereco: "Rua Gastronômica, 432" },
    { id: 13, nome: "Parque Ecológico", endereco: "Estrada Verde, 876" },
    { id: 14, nome: "Auditório Principal", endereco: "Av. dos Congressos, 543" },
    { id: 15, nome: "Centro Empresarial", endereco: "Rua dos Negócios, 210" },
    { id: 16, nome: "Museu de História", endereco: "Praça Cultural, 111" },
    { id: 17, nome: "Biblioteca Municipal", endereco: "Av. do Conhecimento, 777" },
    { id: 18, nome: "Casa de Shows", endereco: "Rua da Música, 888" },
  ]);

  const handleAddMembro = () => {
    navigate('/adicionar-membro');
  };

  const handleAddEvento = () => {
   navigate('/adicionar-evento')
  };

  const handleAddTransporte = () => {
    navigate('/adicionar-transporte')
  };

  const handleAddLocal = () => {
    navigate('/adicionar-localizacao')
  };

  return (
    <div className="p-5 max-w-7xl mx-auto">
    <div className="flex justify-center gap-6 bg-[#7C7C7C] p-4 rounded-lg mb-5">
      <AddButton label="Adicionar membro" onClick={handleAddMembro} />
      <AddButton label="Adicionar evento" onClick={handleAddEvento} />
      <AddButton label="Adicionar transporte" onClick={handleAddTransporte} />
      <AddButton label="Adicionar local" onClick={handleAddLocal} />
    </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-3">Transportes</h2>
          <div 
            className="bg-gray-100 p-4 rounded-lg"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#FFCC00 #E5E7EB"
            }}
          >
            {transportes.length > 0 ? (
              transportes.map((transporte, index) => (
                <div key={index} className="bg-white p-3 rounded mb-2 shadow-sm">
                  <p className="font-medium">{transporte.nome}</p>
                  <p className="text-sm text-gray-600">Capacidade: {transporte.capacidade} passageiros</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum item encontrado</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-3">Locais</h2>
          <div 
            className="bg-gray-100 p-4 rounded-lg"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#FFCC00 #E5E7EB"
            }}
          >
            {locais.length > 0 ? (
              locais.map((local, index) => (
                <div key={index} className="bg-white p-3 rounded mb-2 shadow-sm">
                  <p className="font-medium">{local.nome}</p>
                  <p className="text-sm text-gray-600">{local.endereco}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum item encontrado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;