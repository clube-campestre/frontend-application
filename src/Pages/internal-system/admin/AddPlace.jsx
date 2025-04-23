import FormRegister from "../../../components/admin-internal/FormRegister";
import { api } from "../../../provider/api";
import Swal from "sweetalert2";

const locateFields = [
	{ id: "nome", type: "text", label: "Nome", isRequired: true },
	{ id: "rua", type: "text", label: "Rua", isRequired: true },
	{ id: "numero", type: "text", label: "Número", isRequired: true },
	{ id: "bairro", type: "text", label: "Bairro", isRequired: true },
	{ id: "estado", type: "text", label: "Estado", isRequired: true },
	{ id: "cidade", type: "text", label: "Cidade", isRequired: true },
	{ id: "cep", type: "text", label: "CEP", isRequired: true },
	{ id: "referencia", type: "text", label: "Referência", isRequired: true },
	{ id: "cotacao", type: "number", label: "Cotação (R$)", isRequired: true },
	{ id: "capacidade", type: "number", label: "Capacidade", isRequired: true },
	{ id: "telefone", type: "text", label: "Telefone", isRequired: true },
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
				sirname: formData.nome,
				price: Number(formData.cotacao),
				capacity: Number(formData.capacidade),
				rating: Number(formData.nota),
				address: {
					companyContact: formData.telefone,
					street: formData.rua,
					houseNumber: formData.numero,
					district: formData.bairro,
					state: formData.estado,
					city: formData.cidade,
					cep: formData.cep,
					referenceHouse: formData.referencia,
				}
			};

			console.log(body)

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
