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

// =================================================================================
// ⚠️ MOCKS (PARA O PREVIEW FUNCIONAR) - REMOVA EM PRODUÇÃO
// =================================================================================
const useNavigate = () => (path) => {
  const msg = `[Navegação Simulada] Redirecionando para: ${path}`;
  
  // CORREÇÃO: Agora exibe alerta para a rota /admin também
  if (path === "/admin") {
    alert("✅ Ação de Cancelar recebida!\n\nNo seu app real, isso fechará o modal ou navegará para: /admin");
  } else {
    alert(msg);
  }
};

const Toast = {
  fire: ({ icon, title }) => console.log(`[TOAST ${icon.toUpperCase()}]: ${title}`),
};

const api = {
  post: (url, body) => new Promise((resolve) => {
    console.log(`API POST ${url}`, body);
    setTimeout(resolve, 1000);
  }),
};
// =================================================================================

// --- Componente FormRegister Refatorado ---
const FormRegister = ({ formTitle, fields, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
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
                  <input
                    id={field.id}
                    type={field.type}
                    required={field.isRequired}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition-all h-11 text-gray-700 placeholder-gray-400"
                    placeholder={`Digite ${field.label.toLowerCase()}...`}
                  />
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
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gray-300 text-blue hover:bg-red-600 font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
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
    type: "number", 
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
];

const AddTransport = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const body = {
        companyName: formData.empresa,
        companyNumber: formData.telefone,
        driverName: formData.nomeMotorista,
        driverNumber: formData.whatsapp,
        price: Number(formData.cotacao),
        travelDistance: Number(formData.distanciaHistorica),
        capacity: Number(formData.capacidade),
        rating: 0, 
      };

      await api.post("/transports", body);

      Toast.fire({
        icon: "success",
        title: "Transporte cadastrado com sucesso!",
      });

      setTimeout(() => {
        navigate("/admin");
      }, 1500);
      
    } catch (error) {
      console.error("Erro ao cadastrar transporte:", error);
      Toast.fire({
        icon: "error",
        title: "Erro ao cadastrar transporte.",
      });
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