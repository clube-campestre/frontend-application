import loboImage from "../../../assets/images/lobo.png";
import falcaoImage from "../../../assets/images/falcao.png";
import pandaImage from "../../../assets/images/panda.png";
import panteraImage from "../../../assets/images/pantera.png";
import raposaImage from "../../../assets/images/raposa.png";
import tigreImage from "../../../assets/images/tigre.png";
import ursoImage from "../../../assets/images/urso.png";
import aguiaRealImage from "../../../assets/images/aguia-real.png";
import linceImage from "../../../assets/images/lince.png";
import { LuCirclePlus } from "react-icons/lu";
import { MemberCard } from "../../../components/member-card/MemberCard";
import { useState } from "react";
import EditModal from "../../../components/edit-modal/EditModal";
import MemberModal from "../../../components/member-manage/MemberModal";
import { useEffect } from "react";
import { api } from "../../../provider/api";
import Toast from "../../../utils/Toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Unities = () => {
	const [selectedUnit, setSelectedUnit] = useState(null);
	const [selectedUnitName, setSelectedUnitName] = useState(null);
	const [showEditMemberModal, setShowEditMemberModal] = useState(false);
	const [showAddMemberModal, setShowAddMemberModal] = useState(false);
	const [showAddUnitPointModal, setShowAddUnitPointModal] = useState(false);
	const [selectedMember, setSelectedMember] = useState(null);
	const [members, setMembers] = useState([]);
	const [allMembers, setAllMembers] = useState([]);
	const [unitPoints, setUnitPoints] = useState(null);
	const [unitCounselor, setUnitCounselor] = useState(null);
	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);

	const handleShowEditMemberModal = () => {
		setShowEditMemberModal(!showEditMemberModal);
	};

	const handleSelectMember = (member) => {
		setSelectedMember(member);
	};

	const handleShowAddMemberModal = () => {
		setShowAddMemberModal((prev) => !prev);
	};

	const unities = [
		{
			id: 1,
			name: "Panda",
			formatedName: "PANDA",
			logo: pandaImage,
		},
		{
			id: 2,
			name: "Falcão",
			formatedName: "FALCAO",
			logo: falcaoImage,
		},
		{
			id: 3,
			name: "Lince",
			formatedName: "LINCE",
			logo: linceImage,
		},
		{
			id: 4,
			name: "Leão",
			formatedName: "LEAO",
			logo: linceImage,
		},
		{
			id: 5,
			name: "Águia Real",
			formatedName: "AGUIA_REAL",
			logo: aguiaRealImage,
		},
		{
			id: 6,
			name: "Tigre",
			formatedName: "TIGRE",
			logo: tigreImage,
		},
		{
			id: 7,
			name: "Raposa",
			formatedName: "RAPOSA",
			logo: raposaImage,
		},
		{
			id: 8,
			name: "Urso",
			formatedName: "URSO",
			logo: ursoImage,
		},
		{
			id: 9,
			name: "Pantera",
			formatedName: "PANTERA",
			logo: panteraImage,
		},
		{
			id: 10,
			name: "Lobo",
			formatedName: "LOBO",
			logo: loboImage,
		},
	];

	const unitPointsFields = [
		{
			name: "unit",
			label: "Unidade",
			placeholder: "Selecione a unidade",
			type: "select",
			options: unities.map((unit) => ({
				value: unit.id,
				label: unit.name,
			})),
			selectedOption: "Selecione a unidade",
			isRequired: true,
		},
		{
			name: "isSum",
			label: "Tipo de Pontuação",
			placeholder: "Selecione o tipo de pontuação",
			type: "select",
			options: [
				{ value: true, label: "Adicionar Pontos" },
				{ value: false, label: "Remover Pontos" },
			],
			isRequired: true,
			selectedOption: "Selecione o tipo de pontuação",
		},
		{
			name: "points",
			label: "Pontos da Unidade",
			placeholder: "Digite os pontos da unidade",
			type: "number",
			isRequired: true,
		},
	];

	const membersFields = [
		{
			name: "username",
			label: "Nome do Membro",
			placeholder: "Digite o nome do membro",
			type: "text",
			isRequired: true,
		},
		{
			name: "cpf",
			label: "CPF",
			placeholder: "XXX.XXX.XXX-XX",
			type: "text",
			isRequired: true,
		},
		{
			name: "birthDate",
			label: "Data de Nascimento",
			placeholder: "DD/M	M/AAAA",
			type: "date",
			isRequired: true,
		},
		{
			name: "contact",
			label: "Contato",
			placeholder: "(XX) XXXXX-XXXX",
			type: "text",
			isRequired: true,
		},
		{
			name: "motherName",
			label: "Nome da Mãe",
			placeholder: "Digite o nome da mãe",
			type: "text",
			isRequired: true,
		},
		{
			name: "motherContact" ,
			label: "Contato da Mãe",
			placeholder: "(XX) XXXXX-XXXX",
			type: "text",
			isRequired: true,
		},
		{
			name: "fatherName",
			label: "Nome do Pai",
			placeholder: "Digite o nome do pai",
			type: "text",
			isRequired: true,
		},
		{
			name: "fatherContact" ,
			label: "Contato do Pai",
			placeholder: "(XX) XXXXX-XXXX",
			type: "text",
			isRequired: true,
		},
		{
			name: "responsibleName",
			label: "Nome do Responsável",
			placeholder: "Digite o nome do responsável",
			type: "text",
			isRequired: true,
		},
		{
			name: "responsibleContact",
			label: "Contato do Responsável",
			placeholder: "(XX) XXXXX-XXXX",
			type: "text",
			isRequired: true,
		},
	];

	const fetchMembers = async () => {
		try {
			const allMembersResponse = await api.get("/members");
			setAllMembers(allMembersResponse.data || []);
			if (selectedUnit === null) {
				const response = await api.get(`/members/filter`, {
					params: {
						page: pageNumber,
						size: pageSize,
					},
				});
				setMembers(response.data.items || []);
				setTotalItems(response.data.totalItems);
				setTotalPages(response.data.totalPages);
			} else {
				const response = await api.get(`/members/unit`, {
					params: {
						unitId: selectedUnit,
						page: pageNumber,
						size: pageSize,
					},
				});
				setMembers(response.data.members || []);
				setUnitPoints(response.data.score);
				setUnitCounselor(response.data.counselorName);
				setTotalItems(response.data.totalItems);
				setTotalPages(response.data.totalPages);
			}
		} catch (error) {
			console.error("Error fetching members:", error);
			setMembers([]);
			setUnitCounselor(null);
			setUnitPoints(null);
			Toast.fire({
				icon: "error",
				title: `${error.response.data.message || "Erro ao buscar membros."}`,
			});
			if (error.response.data.message) {
			}
		}
	};

	useEffect(() => {
		fetchMembers();
	}, [selectedUnit, pageNumber]);

	const handleEditMember = async (member) => {
		try {
			const response = await api.put(`/members/${member.cpf}`, member);
			if (response.status === 200) {
				Toast.fire({
					icon: "success",
					title: "Membro editado com sucesso!",
				});
				setShowEditMemberModal(false);
				fetchMembers();
			}
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Erro ao editar membro.",
			});
			console.error("Error editing member:", error);
		}
	};

	const handleUpdateMemberUnit = async (members) => {
		try {
			await Promise.all(
				members.map(async (member) => {
					const response = await api.put(
						`/members/${member.cpf}`,
						member
					);
					if (response.status === 200) {
						Toast.fire({
							icon: "success",
							title: `Membro adicionado com sucesso na unidade ${selectedUnitName}!`,
						});
					}
					handleShowAddMemberModal();
					fetchMembers();
				})
			);
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: `Erro ao adicionar membro na unidade ${selectedUnitName}.`,
			});
			console.error("Error editing member:", error);
		}
	};

	const handleAddUnitPoint = async (data) => {
		if (!data.unit || !data.points) {
			Toast.fire({
				icon: "error",
				title: "Dados inválidos para adicionar pontuação.",
			});
			return;
		}

		if (data.points < 0) {
			Toast.fire({
				icon: "error",
				title: "A pontuação não pode ser negativa.",
			});
			return;
		}

		try {
			const response = await api.post(
				"/units/score",
				{},
				{
					params: {
						id: data.unit,
						score: data.points,
						isSum: data.isSum,
					},
				}
			);
			if (response.status === 200) {
				Toast.fire({
					icon: "success",
					title: `Pontuação ${data.isSum ? "adicionada" : "removida"} com sucesso!`,
				});
			}
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Erro ao adicionar pontuação.",
			});
			console.error("Error adding unit point:", error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-self-center justify-around h-[82vh] w-[80vw]">
			{/* Header Section */}
			<div className="flex items-center justify-between w-full h-16 rounded-t-lg">
				<div className="flex items-center gap-2">
					{unities.map((unit) => (
						<img
							key={unit.id}
							src={unit.logo || "/placeholder.svg"}
							alt={`Unit ${unit.name}`}
							className={`h-16 cursor-pointer transition-all ${
								selectedUnit === unit.id
									? "h-20 grayscale-0"
									: "h-12 grayscale"
							}`}
							onClick={() => {
								setSelectedUnit(
									selectedUnit === unit.id ? null : unit.id
								);

								setSelectedUnitName(
									selectedUnitName === unit.formatedName
										? null
										: unit.formatedName
								);
							}}
						/>
					))}
				</div>
				<div className="flex items-center gap-2 px-2 py-2 text-[#021c4f] bg-[#EDEDED] rounded">
					{selectedUnit ? (
						<>
							<span className="text-[20px] font-medium">
								PONTUAÇÃO
							</span>
							<span className="text-4Fxl font-extrabold">
								{unitPoints || 0}
							</span>
						</>
					) : (
						<span className="text-[20px] font-medium ">
							Selecione uma unidade
						</span>
					)}
				</div>
			</div>

			{/* Main Content Section */}
			<div className="flex flex-col items-center h-[65vh] w-full bg-[#EDEDED] rounded-[7px] shadow-md ">
				{/* Counselor Section */}
				<div className="flex items-center justify-between w-full p-4">
					<div className="flex items-center gap-2">
						{selectedUnit && (
							<>
								<div className="h-[5vh] w-2 bg-[#FCAE2D] rounded-full"></div>
								<span className="text-2xl">
									Conselheiro(a):
								</span>
								<span className="font-bold text-2xl">
									{unitCounselor || "Indefinido"}
								</span>
							</>
						)}
					</div>
					{selectedUnit && (
						<>
							<div className="flex gap-4">
								<button
									className="flex items-center gap-2 px-2 py-2 bg-[#D9D9D9] text-[#021c4f] shadow-md rounded hover:bg-gray-400"
									onClick={handleShowAddMemberModal}
								>
									Adicionar Membros <LuCirclePlus />
								</button>
								<button
									className="flex items-center gap-2 px-2 py-2 bg-[#D9D9D9] text-[#021c4f] shadow-md rounded hover:bg-gray-400"
									onClick={() =>
										setShowAddUnitPointModal(true)
									}
								>
									Alterar Pontuação <LuCirclePlus />
								</button>
							</div>
						</>
					)}
				</div>

				{/* Members Section */}
				<div className="flex flex-col gap-2 w-[98%] h-[53vh] p-4 overflow-y-auto">
					{members.length > 0 ? (
						members.map((member) => (
							<MemberCard
								key={member.id}
								item={member}
								editFields={membersFields}
								onEdit={() => {
									setSelectedMember(member);
									setShowEditMemberModal(true);
								}}
							/>
						))
					) : (
						<p className="text-gray-500 text-center">
							Nenhum membro encontrado.
						</p>
					)}
					{showAddUnitPointModal && (
						<EditModal
							title="Adicionar Pontuação"
							fields={unitPointsFields}
							onClose={() => setShowAddUnitPointModal(false)}
							onSubmit={(data) => {
								handleAddUnitPoint(data);
								setShowAddUnitPointModal(false);
							}}
						/>
					)}
					{showAddMemberModal && (
						<MemberModal
							members={allMembers}
							unitId={selectedUnit}
							unitName={selectedUnitName}
							isOpen={showAddMemberModal}
							onClose={handleShowAddMemberModal}
							onConfirm={(selectedMembers) => {
								handleUpdateMemberUnit(selectedMembers);
							}}
						/>
					)}
					{showEditMemberModal && selectedMember && (
						<EditModal
							editingItem={selectedMember}
							onClose={handleShowEditMemberModal}
							onSubmit={handleEditMember}
							title="Editar Membro"
							fields={membersFields}
						/>
					)}
				</div>
				{members.length > 0 && (
					<>
						<section className="flex items-center justify-center gap-4 w-full mt-4">
							<button
								onClick={() =>
									setPageNumber((prev) =>
										Math.max(prev - 1, 0)
									)
								}
								disabled={pageNumber === 0}
								className={`px-4 py-2 rounded transition-colors duration-200 ${
									pageNumber === 0
										? "bg-gray-300 text-gray-600 cursor-not-allowed"
										: "bg-[#FCAE2D] text-white hover:bg-[#e2961e]"
								}`}
							>
								<FaChevronLeft />
							</button>
							<span className="text-gray-800 font-medium">
								Página{" "}
								<span className="text-[#FCAE2D] font-bold">
									{pageNumber + 1}
								</span>{" "}
								de {totalPages}
							</span>
							<button
								onClick={() =>
									setPageNumber((prev) => prev + 1)
								}
								disabled={pageNumber + 1 === totalPages}
								className={`px-4 py-2 rounded transition-colors duration-200 ${
									pageNumber + 1 === totalPages
										? "bg-gray-300 text-gray-600 cursor-not-allowed"
										: "bg-[#FCAE2D] text-white hover:bg-[#e2961e]"
								}`}
							>
								<FaChevronRight />
							</button>
						</section>
						<div className="flex items-center justify-center w-full mt-2">
							<span className="text-gray-800 font-extralight text-[14px]">
								Exibindo {members.length} de {totalItems}{" "}
								membros
							</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Unities;
