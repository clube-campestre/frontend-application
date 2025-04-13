import React, { useState } from 'react';

const FormRegister = ({ tituloFormulario, campos, aoEnviar }) => {
  const [formData, setFormData] = useState(() =>
    campos.reduce((acc, campo) => ({ ...acc, [campo.id]: '' }), { nota: '' })
  );

  const handleChange = (id, valor) => {
    setFormData((prev) => ({ ...prev, [id]: valor }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    aoEnviar(formData);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">{tituloFormulario}</h2>
      <div className="w-8 h-1 bg-[#FCAE2D] mt-2"></div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2">
          {campos.map((campo) => (
            <div key={campo.id} className="px-2 mb-4 w-1/3">
              <label htmlFor={campo.id} className="block text-sm font-medium text-gray-700 mb-1">
                {campo.rotulo}
              </label>
              {renderizarCampo(campo, formData, handleChange)}
            </div>
          ))}

          <div className="px-2 mb-4 w-1/3">
            <label htmlFor="nota" className="block text-sm font-medium text-gray-700 mb-1">Nota</label>
            <div className="flex space-x-1">
              {[...Array(10).keys()].map((i) => {
                const valor = i + 1;
                return (
                  <button
                    key={valor}
                    type="button"
                    onClick={() => handleChange('nota', valor)}
                    className={`w-8 h-8 rounded-full ${
                      formData.nota === valor ? 'border-4 border-black' : ''
                    } ${
                      valor <= 3 ? 'bg-red-500' : valor <= 6 ? 'bg-yellow-500' : 'bg-green-500'
                    } cursor-pointer`}
                  >
                    {valor}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-[#FCAE2D] text-white rounded-md hover:bg-[#e09a22] focus:outline-none focus:ring-2 focus:ring-[#FCAE2D] focus:ring-opacity-50"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

const renderizarCampo = (campo, formData, handleChange) => {
  const { id, tipo, obrigatorio } = campo;

  return (
    <input
      type={tipo === 'numero' ? 'number' : 'text'}
      id={id}
      value={formData[id] || ''}
      onChange={(e) => handleChange(id, e.target.value)}
      required={obrigatorio}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCAE2D]"
    />
  );
};

export default FormRegister;
