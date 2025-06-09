import amigoImage from "../../../assets/images/amigo3.png";
import companheiroImage from "../../../assets/images/logoVermelho.png";
import pesquisadorImage from "../../../assets/images/logoVerde.svg";
import pioneiroImage from "../../../assets/images/pioneiro 3.svg";
import excursionistaImage from "../../../assets/images/excursionista 3.svg";
import guiaImage from "../../../assets/images/guia 3.svg";
import { LuCirclePlus } from "react-icons/lu";
import { MemberCard } from "../../../components/member-card/MemberCard";
import MemberModal from "../../../components/member-manage/MemberModal";
import EditModal from "../../../components/edit-modal/EditModal";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { api } from "../../../provider/api";
import Toast from "../../../utils/Toast";

const Classes = () => {
	const [selectedClassName, setSelectedClassName] = useState(null);
	const [showAddMemberModal, setShowAddMemberModal] = useState(false);
	const [showEditMemberModal, setShowEditMemberModal] = useState(false);
	const [selectedMember, setSelectedMember] = useState(null);
	const [members, setMembers] = useState([]);
	const [allMembers, setAllMembers] = useState([]);
	const [classInstructor, setClassInstructor] = useState(null);
	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);

	const classes = [
		{ id: 1, name: "Amigo", logo: amigoImage },
		{ id: 2, name: "Companheiro", logo: companheiroImage },
		{ id: 3, name: "Pesquisador", logo: pesquisadorImage },
		{ id: 4, name: "Pioneiro", logo: pioneiroImage },
		{ id: 5, name: "Excursionista", logo: excursionistaImage },
		{ id: 6, name: "Guia", logo: guiaImage },
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

	const handleShowEditMemberModal = () => {
		setShowEditMemberModal(!showEditMemberModal);
	};

	const handleSelectMember = (member) => {
		setSelectedMember(member);
	};

	// NOVO: Função para abrir/fechar modal adicionar membro
	const handleShowAddMemberModal = () => {
		setShowAddMemberModal((prev) => !prev);
	};

	const fetchMembers = async () => {
		try {
				const allMembersResponse = await api.get("/members");
				setAllMembers(allMembersResponse.data || []);
				if (selectedClassName === null) {
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
					const response = await api.get("/members/class", {
						params: {
							classCategory: selectedClassName.toUpperCase(),
							page: pageNumber,
							size: pageSize,
						},
					});
					setMembers(response.data.members || []);
					setTotalItems(response.data.totalItems);
					setTotalPages(response.data.totalPages);
					setClassInstructor(response.data.instructorName);
				}
			} catch (error) {
				setMembers([]);
				setClassInstructor(null);
				setTotalItems(0);
				Toast.fire({
					icon: "error",
					title: `${
						error.response.data.message || "Erro ao buscar membros."
					}`,
				});
				console.error("Error fetching members:", error);
			}
		};
		
	useEffect(() => {
		fetchMembers();
	}, [selectedClassName, pageNumber]);

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
							title: `Membro adicionado com sucesso na classe ${selectedClassName}!`,
						});
					}
					handleShowAddMemberModal();
				})
			);
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: `Erro ao adicionar membro na classe ${selectedClassName}.`,
			});
			console.error("Error editing member:", error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-self-center justify-around h-[82vh] w-[80vw]">
			<div className="flex items-center justify-between w-full h-16 rounded-t-lg">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						{classes.map((unity) => (
							<>
								<img
									key={unity.id}
									src={unity.logo || "/placeholder.svg"}
									alt={`Unity ${unity.name}`}
									className={`h-15 cursor-pointer transition-all ${
										selectedClassName === unity.name
											? "h-20 grayscale-0"
											: "h-12 grayscale"
									}`}
									onClick={() => {
										setSelectedClassName(
											selectedClassName === unity.name
												? null
												: unity.name
										);
									}}
								/>
							</>
						))}
					</div>
					<div className="flex flex-row gap-1">
						<p className="text-xl font-semibold">
							Classe Selecionada:
						</p>
						<p className="text-xl font-semibold text-[#FCAE2D]">
							{selectedClassName}
						</p>
					</div>
				</div>
			</div>

			{/* Main Content Section */}
			<div className="flex flex-col items-center h-[65vh] w-full bg-[#EDEDED] rounded-[7px] shadow-md ">
				{/* Counselor Section */}
				<div className="flex items-center justify-between w-full p-4">
					<div className="flex items-center gap-2">
						{selectedClassName && (
							<>
								<div className="h-[5vh] w-2 bg-[#FCAE2D] rounded-full"></div>
								<span className="text-2xl">Instrutor(a):</span>
								<span className="font-bold text-2xl">
									{classInstructor || "Indefinido"}
								</span>
							</>
						)}
					</div>
					{selectedClassName && ( // Verifica se uma unidade foi selecionada
						<button
							className="flex items-center gap-2 px-4 py-2 bg-[#D9D9D9] text-[#021c4f] shadow-md rounded hover:bg-gray-400"
							onClick={handleShowAddMemberModal}
						>
							Adicionar Membros <LuCirclePlus />
						</button>
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

					{/* Add Member Modal */}
					{showAddMemberModal && (
						<MemberModal
							members={allMembers}
							className={selectedClassName}
							isOpen={showAddMemberModal}
							onClose={handleShowAddMemberModal}
							onConfirm={(selectedMembers) => {
								handleUpdateMemberUnit(selectedMembers);
							}}
						/>
					)}

					{/* Edit Member Modal */}
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

export default Classes;
