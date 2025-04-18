import FormRegister from "../../../components/admin-internal/FormRegister";
import { api } from "../../../provider/api";
import Swal from "sweetalert2";

const locateFields = [
	{ id: "local", type: "text", label: "Local", isRequired: true },
	{ id: "endereco", type: "text", label: "Endereço", isRequired: true },
	{ id: "cotacao", type: "number", label: "Cotação", isRequired: true },
	{ id: "capacidade", type: "number", label: "Capacidade", isRequired: true },
	{ id: "telefone", type: "text", label: "Telefone", isRequired: true },
	{ id: "whatsapp", type: "text", label: "WhatsApp", isRequired: false },
];

const AddLocate = () => {
	const handleSubmit = async (formData) => {
		try {
			const body = {
				enterprise: formData.local,
				address: formData.endereco,
				price: Number(formData.cotacao),
				capacity: Number(formData.capacidade),
				companyContact: formData.telefone,
				driverContact: formData.whatsapp,
			};

			await api.post("/locates", body);

			Swal.fire({
				icon: "success",
				toast: true,
				title: "Local cadastrado com sucesso!",
				showConfirmButton: false,
				timer: 1500,
				position: "top",
			});
		} catch (error) {
			console.error("Erro ao cadastrar local:", error);
			Swal.fire({
				icon: "error",
				toast: true,
				title: "Erro ao cadastrar local!",
				showConfirmButton: false,
				timer: 1500,
				position: "top",
			});
		}
	};

	return (
		<FormRegister
			formTitle="Cadastrar Local"
			fields={locateFields}
			onSubmit={handleSubmit}
		/>
	);
};

export default AddLocate;
