import React, { useEffect, useState } from "react";
import AddButton from "../../../components/admin-internal/AddButton";
import { useNavigate } from "react-router-dom";
import { api } from "../../../provider/api";
import { FaRegStar, FaStar, FaPencilAlt, FaTrash } from "react-icons/fa";
import EditModal from "../../../components/edit-modal/EditModal";
import Swal from "sweetalert2";

const Admin = () => {
	const navigate = useNavigate();
	const Toast = Swal.mixin({
		toast: true,
		position: "top",
		showConfirmButton: false,
		timer: 2500,
		timerProgressBar: true,
	});

	const [transports, setTransports] = useState([]);
	const [places, setPlaces] = useState([]);
	const [showTransportModal, setShowTransportModal] = useState(false);
	const [showPlaceModal, setShowPlaceModal] = useState(false);
	const [selectedTransport, setSelectedTransport] = useState({});
	const transportFields = [
		{
			name: "enterprise",
			label: "Empresa",
			placeholder: "Digite o nome da empresa",
			type: "text",
			isRequired: true,
		},
		{
			name: "price",
			label: "Cotação (R$)",
			placeholder: "Digite o valor da cotação",
			type: "number",
			isRequired: true,
		},
		{
			name: "travelDistance",
			label: "Distância Histórica (KM)",
			placeholder: "Digite a distância histórica",
			type: "number",
			isRequired: true,
		},
		{
			name: "capacity",
			label: "Capacidade",
			placeholder: "Digite a capacidade",
			type: "number",
			isRequired: true,
		},
		{
			name: "companyContact",
			label: "Telefone",
			placeholder: "Digite o telefone",
			type: "text",
			isRequired: true,
		},
		{
			name: "driverContact",
			label: "WhatsApp",
			placeholder: "Digite o WhatsApp",
			type: "text",
			isRequired: true,
		},
		{ name: "rating", label: "Avaliação", isRequired: true },
	];

	const [selectedPlace, setSelectedPlace] = useState({});
	const placeFields = [
		{
			name: "name",
			label: "Nome do Local",
			placeholder: "Digite o nome do local",
			type: "text",
			isRequired: true,
		},
		{
			name: "price",
			label: "Cotação (R$)",
			placeholder: "Digite a cotação",
			type: "number",
			isRequired: true,
		},
		{
			name: "capacity",
			label: "Capacidade",
			placeholder: "Digite a capacidade",
			type: "number",
			isRequired: true,
		},
		{
			name: "contact",
			label: "Telefone",
			placeholder: "Digite o telefone",
			type: "text",
			isRequired: true,
		},
		{
			name: "houseNumber",
			label: "Número",
			placeholder: "Digite o número",
			type: "text",
			isRequired: true,
		},
		{
			name: "district",
			label: "Bairro",
			placeholder: "Digite o bairro",
			type: "text",
			isRequired: true,
		},
		{
			name: "city",
			label: "Cidade",
			placeholder: "Digite a cidade",
			type: "text",
			isRequired: true,
		},
		{
			name: "cep",
			label: "CEP",
			placeholder: "Digite o CEP",
			type: "text",
			isRequired: true,
		},
		{
			name: "street",
			label: "Rua",
			placeholder: "Digite a rua",
			type: "text",
			isRequired: true,
		},
		{
			name: "state",
			label: "Estado",
			placeholder: "Digite o estado",
			type: "text",
			isRequired: true,
		},
		{
			name: "referenceHouse",
			label: "Ponto de Referência",
			placeholder: "Digite o ponto de referência",
			type: "text",
			isRequired: true,
		},
		{ name: "rating", label: "Avaliação", isRequired: true },
	];

	const getTransports = async () => {
		try {
			const response = await api.get("/transports");
			setTransports(response.data);
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Erro ao buscar transportes!",
			});
			console.error("Error fetching transports:", error);
		}
	};

	const getPlaces = async () => {
		try {
			const response = await api.get("/places");

			const places = [];

			response.data.forEach((place) => {
				const placeWithoutAddressObject = {
					id: place.id,
					name: place.name,
					price: place.price,
					capacity: place.capacity,
					contact: place.contact,
					rating: place.rating,
					houseNumber: place.address.houseNumber,
					district: place.address.district,
					city: place.address.city,
					state: place.address.state,
					cep: place.address.cep,
					referenceHouse: place.address.referenceHouse,
				};
				places.push(placeWithoutAddressObject);
			});

			setPlaces(places);
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Erro ao buscar locais!",
			});
			console.error("Error fetching places:", error);
		}
	};

	useEffect(() => {
		getTransports();
		getPlaces();
	}, []);

	const handleAddMembro = () => {
		navigate("/add-member");
	};

	const handleAddEvento = () => {
		navigate("/add-event");
	};

	const handleAddTransporte = () => {
		navigate("/add-transport");
	};

	const handleAddPlace = () => {
		navigate("/add-place");
	};

	const handleEditTransport = async (data) => {
		try {
			await api.put(`/transports/${data.id}`, data);
			getTransports();
			setShowTransportModal(false);
			Toast.fire({
				icon: "success",
				title: "Transporte editado com sucesso!",
			});
		} catch (error) {
			if (error.response.status === 500) {
				Toast.fire({
					icon: "error",
					title: "Ocorreu um erro interno. Tente novamente mais tarde.",
				});
			} else {
				Toast.fire({
					icon: "error",
					title: "Erro aao editar transporte!",
				});
			}
			console.error("Error updating transport:", error);
		}
	};

	const handleDeleteTransport = async (id) => {
		try {
			await api.delete(`/transports/${id}`);
			getTransports();
		} catch (error) {
			console.error("Error deleting transport:", error);
		}
	};

	const handleEditPlace = async (data) => {
		const placeWithAddressObject = {
			id: data.id,
			name: data.name,
			price: data.price,
			capacity: data.capacity,
			contact: data.contact,
			rating: data.rating,
			address: {
				houseNumber: data.houseNumber,
				district: data.district,
				city: data.city,
				state: data.state,
				cep: data.cep,
				referenceHouse: data.referenceHouse,
				street: data.street,
			},
		};
		try {
			await api.put(
				`/places/${placeWithAddressObject.id}`,
				placeWithAddressObject
			);
			getPlaces();
			setShowEditModal(false);
			Toast.fire({
				icon: "success",
				title: "Local editado com sucesso!",
			});
		} catch (error) {
			if (error.response.status === 500) {
				Toast.fire({
					icon: "error",
					title: "Ocorreu um erro interno. Tente novamente mais tarde.",
				});
			} else {
				Toast.fire({
					icon: "error",
					title: "Erro ao editar local!",
				});
			}
			console.error("Error editing place:", error);
		}
	};

	const handleDeletePlace = async (id) => {
		try {
			await api.delete(`/places/${id}`);
			getPlaces();
		} catch (error) {
			console.error("Error deleting place:", error);
		}
	};

	return (
		<div className="p-15 w-full mx-auto">
			<div className="flex justify-center gap-6 bg-[#7C7C7C] p-4 rounded-lg mb-5">
				<AddButton label="Adicionar membro" onClick={handleAddMembro} />
				<AddButton label="Adicionar evento" onClick={handleAddEvento} />
				<AddButton
					label="Adicionar transporte"
					onClick={handleAddTransporte}
				/>
				<AddButton label="Adicionar local" onClick={handleAddPlace} />
			</div>

			<div className="grid grid-cols-2 gap-5">
				<div>
					<h2 className="text-xl font-bold text-blue-900 mb-3">
						Transportes
					</h2>
					<div
						className="bg-gray-100 p-4 rounded-lg"
						style={{
							maxHeight: "400px",
							overflowY: "auto",
							scrollbarWidth: "thin",
							scrollbarColor: "#FFCC00 #E5E7EB",
						}}
					>
						{transports.length > 0 ? (
							transports.map((transport, index) => (
								<div
									key={index}
									className="bg-white p-3 rounded mb-2 shadow-sm flex justify-between items-center"
								>
									<div>
										<p className="font-medium">
											{transport.enterprise}
										</p>
										<p className="text-sm text-gray-600">
											Capacidade: {transport.capacity}{" "}
											passageiros
										</p>
										<p className="text-sm text-gray-600 flex flex-row items-center">
											Nota:{" "}
											{Array.from({ length: 5 }, (_, i) =>
												i < transport.rating ? (
													<FaStar
														key={i}
														className="text-yellow-500 ml-1"
													/>
												) : (
													<FaRegStar
														key={i}
														className="text-gray-400 ml-1"
													/>
												)
											)}
										</p>
									</div>
									<div className="flex gap-5">
										<button
											onClick={() => {
												setShowTransportModal(true);
												setSelectedTransport(transport);
											}}
											className="text-amber-500 hover:text-amber-600"
										>
											<FaPencilAlt size={18} />
										</button>
										<button
											onClick={() =>
												handleDeleteTransport(
													transport.id
												)
											}
											className="text-gray-400 hover:text-gray-600"
										>
											<FaTrash size={18} />
										</button>
										{showTransportModal && (
											<EditModal
												onClose={() =>
													setShowTransportModal(false)
												}
												editingItem={selectedTransport}
												onSubmit={handleEditTransport}
												title="Editar Transporte"
												fields={transportFields}
											/>
										)}
									</div>
								</div>
							))
						) : (
							<p className="text-gray-500 italic">
								Nenhum transporte foi encontrado
							</p>
						)}
					</div>
				</div>

				<div>
					<h2 className="text-xl font-bold text-blue-900 mb-3">
						Locais
					</h2>
					<div
						className="bg-gray-100 p-4 rounded-lg"
						style={{
							maxHeight: "400px",
							overflowY: "auto",
							scrollbarWidth: "thin",
							scrollbarColor: "#FFCC00 #E5E7EB",
						}}
					>
						{places.length > 0 ? (
							places.map((place, index) => (
								<div
									key={index}
									className="bg-white p-3 rounded mb-2 shadow-sm flex justify-between items-center"
								>
									<div>
										<p className="font-medium">
											{place.name}
										</p>
										<p className="text-sm text-gray-600">
											CEP: {place.cep}
										</p>
										<p className="text-sm text-gray-600 flex flex-row items-center">
											Nota:{" "}
											{Array.from({ length: 5 }, (_, i) =>
												i < place.rating ? (
													<FaStar
														key={i}
														className="text-yellow-500 ml-1"
													/>
												) : (
													<FaRegStar
														key={i}
														className="text-gray-400 ml-1"
													/>
												)
											)}
										</p>
									</div>
									<div className="flex gap-5">
										<button
											onClick={() => {
												setShowPlaceModal(true);
												setSelectedPlace(place);
											}}
											className="text-amber-500 hover:text-amber-600"
										>
											<FaPencilAlt size={18} />
										</button>
										<button
											onClick={() =>
												handleDeletePlace(place.id)
											}
											className="text-gray-400 hover:text-gray-600"
										>
											<FaTrash size={18} />
										</button>
										{showPlaceModal && (
											<EditModal
												onClose={() =>
													setShowPlaceModal(false)
												}
												editingItem={selectedPlace}
												onSubmit={handleEditPlace}
												title="Editar Local"
												fields={placeFields}
											/>
										)}
									</div>
								</div>
							))
						) : (
							<p className="text-gray-500 italic">
								Nenhum local foi encontrado
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Admin;
