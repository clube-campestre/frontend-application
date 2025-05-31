import React, { useState } from "react";

function Etapa1({ dados, setDados }) {
  return (
    <div>
      <label className="block mb-2">Nome:</label>
      <input
        type="text"
        className="border p-2 w-full"
        value={dados.nome || ""}
        onChange={e => setDados({ ...dados, nome: e.target.value })}
      />
    </div>
  );
}

function Etapa2({ dados, setDados }) {
  return (
    <div>
      <label className="block mb-2">Idade:</label>
      <input
        type="number"
        className="border p-2 w-full"
        value={dados.idade || ""}
        onChange={e => setDados({ ...dados, idade: e.target.value })}
      />
    </div>
  );
}

export default function CadastroMembro() {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [formDados, setFormDados] = useState({});

  // Função para atualizar dados específicos de uma etapa dentro do estado geral
  const atualizarDadosEtapa = (novosDados) => {
    setFormDados(prev => ({ ...prev, ...novosDados }));
  };

  const handleProximo = () => {
    setEtapaAtual((prev) => Math.min(prev + 1, 2));
  };

  const handleVoltar = () => {
    setEtapaAtual((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      {etapaAtual === 1 && (
        <Etapa1 dados={formDados} setDados={atualizarDadosEtapa} />
      )}
      {etapaAtual === 2 && (
        <Etapa2 dados={formDados} setDados={atualizarDadosEtapa} />
      )}

      <div className="mt-4 flex justify-between">
        <button
          onClick={handleVoltar}
          disabled={etapaAtual === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Voltar
        </button>
        {etapaAtual < 2 ? (
          <button
            onClick={handleProximo}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Próximo
          </button>
        ) : (
          <button
            onClick={() => alert(JSON.stringify(formDados, null, 2))}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Enviar
          </button>
        )}
      </div>
    </div>
  );
}
