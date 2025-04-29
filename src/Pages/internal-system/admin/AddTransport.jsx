import FormRegister from "../../../components/admin-internal/FormRegister";
import { api } from "../../../provider/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const transportFields = [
  { id: "empresa", type: "text", label: "Empresa", isRequired: true },
  { id: "cotacao", type: "number", label: "Cotação (R$)", isRequired: true },
  {
    id: "distanciaHistorica",
    type: "number",
    label: "Distância Histórica (KM)",
    isRequired: true,
  },
  { id: "capacidade", type: "number", label: "Capacidade", isRequired: true },
  { id: "telefone", type: "text", label: "Telefone", isRequired: true },
  { id: "whatsapp", type: "text", label: "WhatsApp", isRequired: false },
];

const AddTransport = () => {
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  const handleSubmit = async (formData) => {
    try {
      const body = {
        enterprise: formData.empresa,
        price: Number(formData.cotacao),
        travelDistance: Number(formData.distanciaHistorica),
        capacity: Number(formData.capacidade),
        companyContact: formData.telefone,
        driverContact: formData.whatsapp,
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
          title: `Já existe transporte com o nome '${formData.empresa}' cadastrado.`,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Erro ao cadastrar transporte.",
        });
      }
    }
  };

  return (
    <FormRegister
      formTitle="Cadastrar Transporte"
      fields={transportFields}
      onSubmit={handleSubmit}
    />
  );
};

export default AddTransport;
