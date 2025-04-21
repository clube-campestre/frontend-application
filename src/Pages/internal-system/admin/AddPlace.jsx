import FormRegister from "../../../components/admin-internal/FormRegister";
import { api } from "../../../provider/api";
import Swal from "sweetalert2";

const locateFields = [
	{ id: "local", type: "text", label: "Local", isRequired: true },
	{ id: "endereco", type: "text", label: "Endereço", isRequired: true },
	{ id: "cotacao", type: "number", label: "Cotação (R$)", isRequired: true },
	{ id: "capacidade", type: "number", label: "Capacidade", isRequired: true },
	{ id: "telefone", type: "text", label: "Telefone", isRequired: true },
	{ id: "whatsapp", type: "text", label: "WhatsApp", isRequired: false },
];

const AddPlace = () => {
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
				sirname: formData.local,
				address: formData.endereco,
				price: Number(formData.cotacao),
				capacity: Number(formData.capacidade),
				companyContact: formData.telefone,
				driverContact: formData.whatsapp,
			};

			await api.post("/places", body);
			Toast.fire({
				icon: "success",
				title: "Local cadastrado com sucesso!",
			});
		} catch (error) {
			console.error("Erro ao cadastrar local:", error);
			Toast.fire({
				icon: "error",
				title: "Erro ao cadastrar local.",
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

export default AddPlace;
