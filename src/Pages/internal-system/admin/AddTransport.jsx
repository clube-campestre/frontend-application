import FormRegister from "../../../components/admin-internal/FormRegister";
import { api } from "../../../provider/api";
import Swal from "sweetalert2";

const transportFields = [
	{ id: "empresa", type: "text", label: "Empresa", isRequired: true },
	{ id: "cotacao", type: "number", label: "Cotação", isRequired: true },
	{
		id: "distanciaHistorica",
		type: "number",
		label: "Distância Histórica",
		isRequired: true,
	},
	{ id: "capacidade", type: "number", label: "Capacidade", isRequired: true },
	{ id: "telefone", type: "text", label: "Telefone", isRequired: true },
	{ id: "whatsapp", type: "text", label: "WhatsApp", isRequired: false },
];

const AddTransport = () => {
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

			Swal.fire({
				icon: "success",
				toast: true,
				title: "Transporte cadastrado com sucesso!",
				showConfirmButton: false,
				timer: 1500,
				position: "top",
			});
		} catch (error) {
			console.error("Erro ao cadastrar transporte:", error);
			Swal.fire({
				icon: "error",
				toast: true,
				title: "Erro ao cadastrar transporte!",
				showConfirmButton: false,
				timer: 1500,
				position: "top",
			});
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
