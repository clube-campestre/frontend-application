import React from 'react';
import { useNavigate } from 'react-router-dom';

const perguntas = [
  'Problemas cardíacos?',
  'Alergia a algum medicamento?',
  'Tem alergia a lactose?',
  'Tem alguma deficiência?',
  'Transfusão de sangue?',
  'Alergia de pele? Se sim, faz uso de medicamento?',
  'Tem ou teve desmaio ou convulsão? Se sim, faz uso de qual medicamento?',
  'Possui transtornos psicológicos? Se sim, quais?',
  'Possui alergia? Se sim, quais e qual medicamento usa?',
  'É diabético? Se sim, qual medicamento usa?',
  'Teve algum ferimento grave recente?',
  'Algum tipo de fratura recente? Se sim, quais?',
  'Passou por cirurgias? Se sim, quais?',
  'Motivo de internação nos últimos 5 anos:'
];

const AddMember6 = ({ data, onBack, onChange }) => {
  const navigate = useNavigate();

  const handleResposta = (pergunta, resposta) => {
    const novaData = { ...data, [`pergunta_${pergunta}`]: resposta };
    if (resposta === 'nao') {
      delete novaData[`justificativa_${pergunta}`];
    }
    onChange(novaData);
  };

  const handleJustificativa = (pergunta, texto) => {
    onChange({ [`justificativa_${pergunta}`]: texto });
  };

  const todasRespondidas = perguntas.every((pergunta) => {
    const resposta = data[`pergunta_${pergunta}`];
    if (!resposta) return false;
    if (resposta === 'sim') {
      return data[`justificativa_${pergunta}`]?.trim();
    }
    return true;
  });

  const handleConcluir = () => {
    alert("Cadastro de membro concluído!");
    navigate("/admin");
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md max-w-5xl mx-auto mt-6">
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-yellow-400 mr-2 rounded"></div>
        <h2 className="text-xl font-semibold">Cadastrar Membro</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {perguntas.map((pergunta, index) => (
          <div key={index}>
            <label className="block font-semibold mb-1 text-sm">{pergunta}</label>
            <div className="flex items-center gap-4 mb-2">
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name={`pergunta_${pergunta}`}
                  value="sim"
                  checked={data[`pergunta_${pergunta}`] === 'sim'}
                  onChange={() => handleResposta(pergunta, 'sim')}
                  className="accent-yellow-400"
                />
                Sim
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name={`pergunta_${pergunta}`}
                  value="nao"
                  checked={data[`pergunta_${pergunta}`] === 'nao'}
                  onChange={() => handleResposta(pergunta, 'nao')}
                  className="accent-yellow-400"
                />
                Não
              </label>
            </div>
            {data[`pergunta_${pergunta}`] === 'sim' && (
              <input
                type="text"
                placeholder="Justifique aqui..."
                value={data[`justificativa_${pergunta}`] || ''}
                onChange={(e) => handleJustificativa(pergunta, e.target.value)}
                className="w-full p-2 border border-[#FCAE2D] focus:outline-none focus:ring-2 focus:ring-[#FCAE2D] rounded bg-white text-sm"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-full hover:bg-gray-400 transition"
        >
          Voltar
        </button>
        <button
          onClick={handleConcluir}
          disabled={!todasRespondidas}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            todasRespondidas
              ? 'bg-yellow-400 text-black hover:bg-yellow-500'
              : 'bg-gray-300 text-gray-400 cursor-not-allowed'
          }`}
        >
          Concluir
        </button>
      </div>

      <div className="flex justify-center mt-10">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full mx-1"></div>
        ))}
      </div>
    </div>
  );
};

export default AddMember6;
