import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Toast from "../../utils/Toast";
import AddMemberInput from "../add-member-input/AddMemberInput";

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
        Toast.fire({
          icon: "error",
          title: "CEP não encontrado!",
        });
        return;
      }

      if (data.logradouro) handleChange("rua", data.logradouro);
      if (data.bairro) handleChange("bairro", data.bairro);
      if (data.uf) handleChange("estado", data.uf);
      if (data.localidade) handleChange("cidade", data.localidade);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      Toast.fire({
        icon: "error",
        title: "Erro ao buscar CEP",
      });
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
    <div className="bg-gray-100 rounded-lg p-6 shadow-md max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-1 h-6 bg-[#FCAE2D] mr-2 rounded"></div>
          <h2 className="text-xl font-semibold text-gray-800">{formTitle}</h2>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer flex items-center gap-2"
          >
            <span>✕</span> Fechar
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2">
          {fields.map((field) => (
            <div key={field.id} className="px-2 mb-6 w-1/3">
              {renderizarCampo(
                field,
                formData,
                handleChange,
                handleBlur,
                isLoadingCep
              )}
            </div>
          ))}

          <div className="px-2 mb-6 w-1/3"> 
            <label
              htmlFor="nota"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
                    className={`w-8 h-8 rounded-full cursor-pointer`}
                  >
                    {valor <= (formData.nota || hoveredNota) ? (
                      <FaStar color="#FCAE2D" />
                    ) : (
                      <FaRegStar color="#FCAE2D" />
                    )}
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

const renderizarCampo = (
  campo,
  formData,
  handleChange,
  handleBlur,
  isLoadingCep
) => {
  const { id, type, isRequired, label } = campo;
  const isEndereco = ["rua", "bairro", "estado", "cidade"].includes(id);

  return (
    <div key={id} className="relative">
      <AddMemberInput
        id={id}
        type={type}
        label={label} // Removido o asterisco aqui, pois será tratado no próprio componente
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
