import FormRegister from "../../../components/admin-internal/FormRegister";
import { api } from "../../../provider/api";
import { useNavigate } from "react-router-dom";
import Toast from "../../../utils/Toast";

const placeFields = [
  { id: "nome", type: "text", label: "Nome do Local", isRequired: true },
  { id: "cep", type: "text", label: "CEP", isRequired: true },
  { id: "rua", type: "text", label: "Rua", isRequired: true },
  { id: "bairro", type: "text", label: "Bairro", isRequired: true },
  { id: "estado", type: "text", label: "Estado", isRequired: true },
  { id: "cidade", type: "text", label: "Cidade", isRequired: true },
  { id: "numero", type: "text", label: "Número", isRequired: true },
  {
    id: "referencia",
    type: "text",
    label: "Ponto de Referência",
    isRequired: false,
  },
  { id: "cotacao", type: "text", label: "Cotação (R$)", isRequired: true },
  { id: "capacidade", type: "number", label: "Capacidade", isRequired: true },
  { id: "nomeContato", type: "text", label: "Nome do Contato", isRequired: true },
  { id: "telefone", type: "text", label: "Telefone", isRequired: true },
];

const AddPlace = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const body = {
        name: formData.nome,
        price: Number(formData.cotacao),
        capacity: Number(formData.capacidade),
        rating: Number(formData.nota),
        contactCellphoneNumber: formData.telefone,
        contactName: formData.nomeContato,
        address: {
          street: formData.rua,
          houseNumber: formData.numero,
          district: formData.bairro,
          state: formData.estado,
          city: formData.cidade,
          cep: formData.cep,
          referenceHouse: formData.referencia,
        },
      };

      await api.post("/places", body);
      Toast.fire({
        icon: "success",
        title: "Local cadastrado com sucesso!",
      });

      setTimeout(() => {
        navigate("/admin");
      }, 2500);
    } catch (error) {  
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message ||`Erro ao cadastrar Local!`,
      });
    }
  };

  return (
    <>
      <FormRegister
        formTitle="Cadastrar Local"
        fields={placeFields}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin")}
      />
    </>
  );
};

export default AddPlace;
