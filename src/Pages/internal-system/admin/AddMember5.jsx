import React from 'react';

const doencas = [
  'catapora', 'meningite', 'hepatite', 'dengue', 'pneumonia', 'malária', 'febre amarela',
  'sarampo', 'tétano', 'varíola', 'coqueluche', 'difteria', 'rinite', 'bronquite',
  'asma', 'rubéola', 'cólera', 'covid-19', 'H1N1', 'caxumba'
];

const AddMember5 = ({ data, onNext, onBack, onChange }) => {
  const handleChange = (doenca, valor) => {
    onChange({ [`doenca_${doenca}`]: valor });
  };

  const todasRespondidas = doencas.every(
    (doenca) => data[`doenca_${doenca}`] === 'sim' || data[`doenca_${doenca}`] === 'nao'
  );

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md max-w-5xl mx-auto mt-6">
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-yellow-400 mr-2 rounded"></div>
        <h2 className="text-xl font-semibold">Cadastrar Membro</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doencas.map((doenca) => (
          <div key={doenca}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white text-sm">
                  <th className="px-2 py-1 text-left uppercase">Doença</th>
                  <th className="px-2 py-1 uppercase">Sim</th>
                  <th className="px-2 py-1 uppercase">Não</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-2 py-1 capitalize font-semibold">{doenca}</td>
                  <td className="text-center">
                    <input
                      type="radio"
                      name={`doenca_${doenca}`}
                      value="sim"
                      checked={data[`doenca_${doenca}`] === 'sim'}
                      onChange={() => handleChange(doenca, 'sim')}
                      className="accent-yellow-400 w-4 h-4"
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="radio"
                      name={`doenca_${doenca}`}
                      value="nao"
                      checked={data[`doenca_${doenca}`] === 'nao'}
                      onChange={() => handleChange(doenca, 'nao')}
                      className="accent-yellow-400 w-4 h-4"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
          onClick={() => onNext(data)}
          disabled={!todasRespondidas}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            todasRespondidas
              ? 'bg-yellow-400 text-black hover:bg-yellow-500'
              : 'bg-gray-300 text-gray-400 cursor-not-allowed'
          }`}
        >
          Próximo
        </button>
      </div>

      <div className="flex justify-center mt-6">
        {[1, 2, 3, 4, 5, 6, 7].map((etapa) => (
          <div
            key={etapa}
            className={`w-4 h-4 mx-1 rounded-full ${
              etapa <= 6 ? 'bg-yellow-400' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AddMember5;
