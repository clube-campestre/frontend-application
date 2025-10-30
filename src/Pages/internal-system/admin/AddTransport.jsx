import FormRegister from "../../../components/admin-internal/FormRegister";
import { api } from "../../../provider/api";
import Toast from "../../../utils/Toast";
import { useNavigate } from "react-router";

const transportFields = [
  { id: "empresa", type: "text", label: "Empresa", isRequired: true },
  { id: "telefone", type: "text", label: "Telefone", isRequired: true },
  { id: "nomeMotorista", type: "text", label: "Nome do Motorista", isRequired: true },
  { id: "whatsapp", type: "text", label: "WhatsApp", isRequired: false },
  { id: "cotacao", type: "text", label: "Cotação (R$)", isRequired: true },
  {
    id: "distanciaHistorica",
    type: "number",
    label: "Distância Histórica (KM)",
    isRequired: true,
  },
  { id: "capacidade", type: "number", label: "Capacidade", isRequired: true },
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
        rating: Number(formData.nota),
      };

      await api.post("/transports", body);

      Toast.fire({
        icon: "success",
        title: "Transporte cadastrado com sucesso!",
      });

      setTimeout(() => {
        navigate("/admin");
      }, 2500);
    } catch (error) {
      console.error("Erro ao cadastrar transporte:", error);
      if (error.status === 409) {
        Toast.fire({
          icon: "error",
          title: error.response?.data?.message || `Já existe transporte com o nome '${formData.empresa}' cadastrado.`,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: error.response?.data?.message || "Erro ao cadastrar transporte.",
        });
      }
    }
  };

  return (
    <>
      <FormRegister
        formTitle="Cadastrar Transporte"
        fields={transportFields}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin")}
      />
    </>
  );
};

export default AddTransport;
