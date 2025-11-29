import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Toast from "../../utils/Toast";
import AddMemberInput from "../add-member-input/AddMemberInput";

// Mantivemos a lógica inteligente de grid
const getFieldWidthClass = (id) => {
  switch (id) {
    case "numero":
    case "estado":
    case "uf":
      return "w-1/2 md:w-1/6"; 
    case "cep":
    case "capacidade":
    case "nota":
      return "w-full md:w-1/4";
    case "cidade":
    case "bairro":
    case "telefone":
    case "cotacao":
      return "w-full md:w-1/3";
    case "rua":
    case "nome":
    case "referencia":
      return "w-full md:w-1/2 lg:w-2/3";
    default:
      return "w-full md:w-1/3"; 
  }
};

const FormRegister = ({ formTitle, fields, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {
      nota: "",
    })
  );
  const [hoveredNota, setHoveredNota] = useState(0);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const formatToBRL = (value) => {
    if (!value) return "R$ 0,00";
    const numericValue = value.replace(/\D/g, "");
    const number = parseFloat(numericValue) / 100;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const unmaskBRL = (value) => {
    return Number(value.replace(/\D/g, "")) / 100;
  };

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

    if (!match) return "";

    const [, ddd, firstPart, secondPart] = match;

    let result = "";
    if (ddd) result += `(${ddd}`;
    if (ddd && ddd.length === 2) result += `) `;
    if (firstPart) result += firstPart;
    if (secondPart) result += `-${secondPart}`;

    return result;
  };

  const unmaskPhone = (value) => {
    return value ? value.replace(/\D/g, "") : "";
  };

  const handleChange = (id, valor) => {
    if (id === "cep") {
      let cep = valor.replace(/\D/g, "");
      if (cep.length > 5) {
        cep = cep.slice(0, 5) + "-" + cep.slice(5, 8);
      }
      cep = cep.slice(0, 9);
      setFormData((prev) => ({ ...prev, [id]: cep }));
    } else if (id === "cotacao") {
      const formatted = formatToBRL(valor);
      setFormData((prev) => ({ ...prev, [id]: formatted }));
    } else if (id === "telefone" || id === "whatsapp") {
      const formatted = formatPhone(valor);
      setFormData((prev) => ({ ...prev, [id]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: valor }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      cotacao: unmaskBRL(formData.cotacao),
      telefone: unmaskPhone(formData.telefone),
      whatsapp: unmaskPhone(formData.whatsapp),
      cep: formData.cep.replace(/\D/g, ""),
    };
    onSubmit(updatedFormData);
  };

  const getAddress = async (cep) => {
    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Toast.fire({ icon: "error", title: "CEP não encontrado!" });
        return;
      }
      if (data.logradouro) handleChange("rua", data.logradouro);
      if (data.bairro) handleChange("bairro", data.bairro);
      if (data.uf) handleChange("estado", data.uf);
      if (data.localidade) handleChange("cidade", data.localidade);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      Toast.fire({ icon: "error", title: "Erro ao buscar CEP" });
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleBlur = (id, valor) => {
    if (id === "cep") {
      const cepNumerico = valor.replace(/\D/g, "");
      if (cepNumerico.length === 8) {
        getAddress(cepNumerico);
      }
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 sm:p-6 shadow-md w-full mx-auto">
      {/* Cabeçalho Limpo (Sem botão Fechar) */}
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-[#FCAE2D] mr-2 rounded"></div>
        <h2 className="text-xl font-semibold text-gray-800">{formTitle}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2">
          {fields.map((field) => (
            <div 
              key={field.id} 
              className={`px-2 mb-4 sm:mb-6 ${getFieldWidthClass(field.id)}`}
            >
              {renderizarCampo(field, formData, handleChange, handleBlur, isLoadingCep)}
            </div>
          ))}

          <div className="px-2 mb-6 w-full md:w-1/3">
            <label htmlFor="nota" className="block text-sm font-medium text-gray-700 mb-1">
              Nota
            </label>
            <div className="flex space-x-1">
              {[...Array(5).keys()].map((i) => {
                const valor = i + 1;
                return (
                  <button
                    key={valor}
                    type="button"
                    onClick={() => handleChange("nota", valor)}
                    onMouseEnter={() => setHoveredNota(valor)}
                    onMouseLeave={() => setHoveredNota(0)}
                    className="w-8 h-8 rounded-full cursor-pointer focus:outline-none focus:scale-110 transition-transform"
                  >
                    {valor <= (formData.nota || hoveredNota) ? (
                      <FaStar color="#FCAE2D" size={24} />
                    ) : (
                      <FaRegStar color="#FCAE2D" size={24} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- RODAPÉ COM OS DOIS BOTÕES --- */}
        {/* flex-col-reverse: No mobile, 'Cadastrar' fica em cima de 'Fechar'. 
            sm:flex-row: No desktop, ficam lado a lado. */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-3 bg-gary-500 text-blue font-medium rounded-md hover:bg-red-600 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>✕</span> Cancelar
            </button>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-[#FCAE2D] text-white font-medium rounded-md hover:bg-[#e09a22] focus:outline-none focus:ring-2 focus:ring-[#FCAE2D] focus:ring-opacity-50 transition-all shadow-sm"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

const renderizarCampo = (campo, formData, handleChange, handleBlur, isLoadingCep) => {
  const { id, type, isRequired, label } = campo;
  const isEndereco = ["rua", "bairro", "estado", "cidade"].includes(id);

  return (
    <div key={id} className="relative">
      <AddMemberInput
        id={id}
        type={type}
        label={label}
        value={formData[id] || ""}
        onChange={(e) => handleChange(id, e.target.value)}
        onBlur={(e) => handleBlur(id, e.target.value)}
        required={isRequired}
        disabled={isEndereco && isLoadingCep}
        className="w-full"
      />
    </div>
  );
};

export default FormRegister;