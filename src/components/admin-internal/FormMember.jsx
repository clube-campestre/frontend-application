import React, { useState } from 'react';

const Formulario = ({ titulo, campos, textoBotao, aoEnviar, etapaAtual, totalEtapas }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (id, valor) => {
    setFormData({
      ...formData,
      [id]: valor
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    aoEnviar(formData);
  };

  const renderizarCampo = (campo) => {
    const { id, tipo, placeholder, obrigatorio, opcoes } = campo;
    
    switch (tipo) {
      case 'texto':
        return (
          <input
            type="text"
            id={id}
            placeholder={placeholder || ''}
            value={formData[id] || ''}
            onChange={(e) => handleChange(id, e.target.value)}
            required={obrigatorio}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCAE2D]"
          />
        );
      
      case 'data':
        return (
          <input
            type="date"
            id={id}
            value={formData[id] || ''}
            onChange={(e) => handleChange(id, e.target.value)}
            required={obrigatorio}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCAE2D]"
          />
        );
      
      case 'select':
        return (
          <select
            id={id}
            value={formData[id] || ''}
            onChange={(e) => handleChange(id, e.target.value)}
            required={obrigatorio}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCAE2D]"
          >
            <option value="">Selecione</option>
            {opcoes?.map((opcao) => (
              <option key={opcao.valor} value={opcao.valor}>
                {opcao.rotulo}
              </option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="flex space-x-4">
            {opcoes?.map((opcao) => (
              <label key={opcao.valor} className="flex items-center">
                <input
                  type="radio"
                  name={id}
                  value={opcao.valor}
                  checked={formData[id] === opcao.valor}
                  onChange={() => handleChange(id, opcao.valor)}
                  required={obrigatorio}
                  className="mr-2 text-[#FCAE2D] focus:ring-[#FCAE2D]"
                />
                {opcao.rotulo}
              </label>
            ))}
          </div>
        );
      
      case 'numero':
        return (
          <input
            type="number"
            id={id}
            placeholder={placeholder || ''}
            value={formData[id] || ''}
            onChange={(e) => handleChange(id, e.target.value)}
            required={obrigatorio}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCAE2D]"
          />
        );
        case 'textarea':
    return (
    <textarea
      id={id}
      placeholder={placeholder || ''}
      value={formData[id] || ''}
      onChange={(e) => handleChange(id, e.target.value)}
      required={obrigatorio}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCAE2D] h-32"
      />
  );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{titulo}</h2>
        <div className="w-8 h-1 bg-[#FCAE2D] mt-2"></div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2">
          {campos.map((campo) => (
            <div 
              key={campo.id} 
              className={`px-2 mb-4 ${campo.metade ? 'w-1/2' : 'w-full'}`}
            >
              <label htmlFor={campo.id} className="block text-sm font-medium text-gray-700 mb-1">
                {campo.rotulo}
              </label>
              {renderizarCampo(campo)}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            type="submit" 
            className="px-6 py-2 bg-[#FCAE2D] text-white rounded-md hover:bg-[#e09a22] focus:outline-none focus:ring-2 focus:ring-[#FCAE2D] focus:ring-opacity-50"
          >
            {textoBotao || 'Enviar'}
          </button>
        </div>
      </form>
      
      {totalEtapas > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalEtapas)].map((_, index) => (
            <div 
              key={index} 
              className={`w-3 h-3 rounded-full ${index + 1 === etapaAtual ? 'bg-[#FCAE2D]' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Formulario;