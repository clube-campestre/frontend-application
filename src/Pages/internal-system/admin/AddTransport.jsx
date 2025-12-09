import React, { useState } from "react";
import { 
  Truck, 
  Phone, 
  User, 
  MessageCircle, 
  DollarSign, 
  MapPin, 
  Box, 
  Save, 
  X 
} from "lucide-react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createTransport } from "../../../services/transportsService";
import Toast from "../../../utils/Toast";
import { getUser } from "../../../utils/authStorage";
import { maskPhone } from "../../../utils/validators/addMemberValidator";

// --- Componente FormRegister Refatorado ---
const FormRegister = ({ formTitle, fields, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [hoveredNota, setHoveredNota] = useState(0);

  const formatToBRL = (value) => {
    if (!value) return "";
    const numericValue = value.replace(/\D/g, "");
    if (numericValue === "") return "";
    const number = parseFloat(numericValue) / 100;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const unmaskBRL = (value) => {
    if (!value) return 0;
    return parseFloat(value.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
  };

  const unmaskPhone = (value) => {
    return value ? value.replace(/\D/g, "") : "";
  };

  const handleChange = (id, value) => {
    if (id === "cotacao") {
      const formatted = formatToBRL(value);
      setFormData((prev) => ({ ...prev, [id]: formatted }));
    } else if (id === "telefone" || id === "whatsapp") {
      // Armazena apenas números no estado, mas exibe com máscara
      const digits = value.replace(/\D/g, "").slice(0, 11);
      setFormData((prev) => ({ ...prev, [id]: digits }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Remover máscara do campo cotação antes de enviar
    const cleanedFormData = {
      ...formData,
      cotacao: unmaskBRL(formData.cotacao),
      // Telefones já estão sem máscara no estado (apenas dígitos)
    };
    await onSubmit(cleanedFormData);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        {/* Cabeçalho Limpo (Sem botão X) */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
            <Truck size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{formTitle}</h2>
        </div>

        {/* Grid de Campos */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {fields.map((field) => (
              <div 
                key={field.id} 
                className={`${field.colSpan || "md:col-span-12"} flex flex-col gap-1`}
              >
                <label 
                  htmlFor={field.id} 
                  className="text-sm font-semibold text-gray-600 flex items-center gap-1"
                >
                  {field.icon && <span className="text-gray-400">{field.icon}</span>}
                  {field.label}
                  {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                <div className="relative">
                  {field.type === "rating" ? (
                    <div className="flex space-x-1">
                      {[...Array(5).keys()].map((i) => {
                        const valor = i + 1;
                        return (
                          <button
                            key={valor}
                            type="button"
                            onClick={() => handleChange(field.id, valor)}
                            onMouseEnter={() => setHoveredNota(valor)}
                            onMouseLeave={() => setHoveredNota(0)}
                            className="w-8 h-8 rounded-full cursor-pointer focus:outline-none focus:scale-110 transition-transform"
                          >
                            {valor <= (formData[field.id] || hoveredNota) ? (
                              <FaStar color="#FCAE2D" size={24} />
                            ) : (
                              <FaRegStar color="#FCAE2D" size={24} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      required={field.isRequired}
                      value={field.id === "telefone" || field.id === "whatsapp" 
                        ? maskPhone(formData[field.id] || "") 
                        : formData[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition-all h-11 text-gray-700 placeholder-gray-400"
                      placeholder={`Digite ${field.label.toLowerCase()}...`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RODAPÉ COM AÇÕES (Mobile: Coluna Reversa / Desktop: Linha) */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          
          {/* Botão Cancelar Refatorado 
              Usei bg-red-500 direto para garantir visibilidade, 
              mas você pode usar tons de cinza com hover vermelho se preferir.
          */}
          {onCancel && (
            <button
              type="button" // Essencial para não submeter o formulário
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gray-300 text-blue hover:bg-red-600 hover:text-gray-100 font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <X size={18} /> Cancelar
            </button>
          )}

          {/* Botão Salvar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-sm shadow-amber-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Salvando..." : <><Save size={18} /> Salvar Transporte</>}
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Configuração dos Campos ---
const transportFields = [
  { 
    id: "empresa", 
    type: "text", 
    label: "Empresa", 
    isRequired: true,
    colSpan: "md:col-span-6"
  },
  { 
    id: "nomeMotorista", 
    type: "text", 
    label: "Nome do Motorista", 
    isRequired: true,
    colSpan: "md:col-span-6"
  },
  { 
    id: "telefone", 
    type: "text", 
    label: "Telefone", 
    isRequired: true,
    colSpan: "md:col-span-3"
  },
  { 
    id: "whatsapp", 
    type: "text", 
    label: "WhatsApp", 
    isRequired: false,
    colSpan: "md:col-span-3"
    
  },
  { 
    id: "cotacao", 
    type: "text", 
    label: "Cotação (R$)", 
    isRequired: true,
    colSpan: "md:col-span-2"
  },
  {
    id: "distanciaHistorica",
    type: "number",
    label: "Distância (KM)", 
    isRequired: true,
    colSpan: "md:col-span-2"
  },
  { 
    id: "capacidade", 
    type: "number", 
    label: "Capacidade", 
    isRequired: true,
    colSpan: "md:col-span-2", 
    icon: <Box size={14} />
  },
  {
    id: "nota",
    type: "rating",
    label: "Nota",
    isRequired: true,
    colSpan: "md:col-span-12"
  },
];

const AddTransport = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const user = getUser();
    const access = user?.access || null;

    // Permissões: bloquear SUPERVISOR e TESOURARIA para criação de transportes
    if (access === "SUPERVISOR" || access === "TESOURARIA") {
      Toast.fire({ icon: "error", title: "Permissão insuficiente" });
      return;
    }

    try {
      // Telefones já estão sem máscara (apenas dígitos) no formData
      const body = {
        companyName: formData.empresa,
        companyNumber: (formData.telefone || "").replace(/\D/g, ""),
        driverName: formData.nomeMotorista,
        driverNumber: (formData.whatsapp || "").replace(/\D/g, ""),
        price: Number(formData.cotacao),
        travelDistance: Number(formData.distanciaHistorica),
        capacity: Number(formData.capacidade),
        rating: Number(formData.nota) || 0,
      };

      const res = await createTransport(body);

      if (res) {
        Toast.fire({ icon: "success", title: "Transporte cadastrado com sucesso!" });
        setTimeout(() => navigate("/admin"), 1200);
      }
    } catch (error) {
      console.error("Erro ao cadastrar transporte:", error);
      Toast.fire({ icon: "error", title: "Erro ao cadastrar transporte." });
    }
  };

  return (
    <FormRegister
      formTitle="Cadastrar Transporte"
      fields={transportFields}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin")}
    />
  );
};

export default AddTransport;