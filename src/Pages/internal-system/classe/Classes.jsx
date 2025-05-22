import amigoImage from "../../../assets/images/amigo3.png";
import companheiroImage from "../../../assets/images/logoVermelho.png";
import pesquisadorImage from "../../../assets/images/logoVerde.svg";
import pioneiroImage from "../../../assets/images/pioneiro 3.svg";
import excursionistaImage from "../../../assets/images/excursionista 3.svg";
import guiaImage from "../../../assets/images/guia 3.svg";
import { LuCirclePlus } from "react-icons/lu";
import { MemberCard } from "../../../components/member-card/MemberCard";
import { useState } from "react";
import { useEffect } from "react";
import EditModal from "../../../components/edit-modal/EditModal";
import { api } from "../../../provider/api";
import Swal from "sweetalert2";

const Classes = () => {
	const [selectedClassId, setselectedClassId] = useState(null);
	const [selectedClassName, setSelectedClassName] = useState(null);
	const [showEditMemberModal, setShowEditMemberModal] = useState(false);
	const [selectedMember, setSelectedMember] = useState(null);
	const [members, setMembers] = useState([]);
	const Toast = Swal.mixin({
		toast: true,
		position: "top",
		showConfirmButton: false,
		timer: 2500,
		timerProgressBar: true,
	});

	const unities = [
		{ id: 1, name: "Panda", logo: amigoImage },
		{ id: 2, name: "Falcão", logo: companheiroImage },
		{ id: 3, name: "Águia Real", logo: pesquisadorImage },
		{ id: 4, name: "Tigre", logo: pioneiroImage },
		{ id: 5, name: "Raposa", logo: excursionistaImage },
		{ id: 6, name: "Urso", logo: guiaImage },
	];

	const mockMembers = [
		{
			id: 1,
			name: "Ana Souza",
			birthday: "10/02/2008",
			contact: "(11) 91234-5678",
			cpf: "123.456.789-00",
			responsibleContact: "(11) 99876-5432",
			unity: "Panda",
			classId: 1,
		},
		{
			id: 2,
			name: "Bruno Lima",
			birthday: "12/07/2007",
			contact: "(21) 93456-7890",
			cpf: "987.654.321-00",
			responsibleContact: "(21) 98765-4321",
			unity: "Falcão",
			classId: 2,
		},
		{
			id: 3,
			name: "Carla Mendes",
			birthday: "05/11/2009",
			contact: "(31) 90012-3456",
			cpf: "456.789.123-00",
			responsibleContact: "(31) 98888-7777",
			unity: "Tigre",
			classId: 4,
		},
		{
			id: 4,
			name: "Daniel Oliveira",
			birthday: "11/04/2006",
			contact: "(71) 91111-2222",
			cpf: "321.654.987-00",
			responsibleContact: "(71) 97777-6666",
			unity: "Lobo",
			classId: 8,
		},
		{
			id: 5,
			name: "Eduarda Santos",
			birthday: "11/08/2010",
			contact: "(85) 93333-4444",
			cpf: "789.123.456-00",
			responsibleContact: "(85) 96666-5555",
			unity: "Águia Real",
			classId: 3,
		},
	];

	const membersFields = [
		{
			name: "name",
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
			name: "birthday",
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

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				if (selectedClassId === null) {
					const response = await api.get(`/members`);
					setMembers(response.data);
				} else {
					const response = await api.get("/members/class/", {
						params: {
							classCategory: selectedClassName.toUpperCase(),
						},
					});
					setMembers(response.data);
				}
			} catch (error) {
				console.error("Error fetching members:", error);
			}
		};

		fetchMembers();
	}, [selectedClassId]);

	const handleEditMember = async (member) => {
		try {
			const response = await api.put(`/members/${member.id}`, member);
			if (response.status === 200) {
				Toast.fire({
					icon: "success",
					title: "Membro editado com sucesso!",
				});
				setselectedClassId(null);
				setSelectedClassName(null);
				handleShowEditMemberModal();
			}
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Erro ao editar membro.",
			});
			console.error("Error editing member:", error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-self-center justify-around h-[82vh] w-[80vw]">
			{/* Header Section */}
			<div className="flex items-center justify-between w-full h-16 rounded-t-lg">
				<div className="flex items-center gap-2">
					{unities.map((unity) => (
						<img
							key={unity.id}
							src={unity.logo || "/placeholder.svg"}
							alt={`Unity ${unity.name}`}
							className={`h-15 cursor-pointer transition-all ${
								selectedClassId === unity.id
									? "h-20 grayscale-0"
									: "h-12 grayscale"
							}`}
							onClick={() => {
								setSelectedClassName(
									selectedClassId === unity.id
										? null
										: unity.name
								);
								setselectedClassId(
									selectedClassId === unity.id
										? null
										: unity.id
								);
							}}
						/>
					))}
				</div>
			</div>

			{/* Main Content Section */}
			<div className="flex flex-col items-center h-[65vh] w-full bg-[#EDEDED] rounded-[7px] shadow-md overflow-y-auto">
				{/* Counselor Section */}
				<div className="flex items-center justify-between w-full p-4 h-[10vh]">
					<div className="flex items-center gap-2">
						<div className="h-[5vh] w-2 bg-[#FCAE2D] rounded-full"></div>
						<span className="text-2xl">Conselheiro(a):</span>
						<span className="font-bold text-2xl">Ellen</span>
					</div>
					<button className="flex items-center gap-2 px-4 py-2 bg-[#D9D9D9] text-[#021c4f] shadow-md rounded hover:bg-gray-400">
						Adicionar Membros <LuCirclePlus />
					</button>
				</div>

				{/* Members Section */}
				<div className="flex flex-col gap-2 w-full h-[70vh] p-4 overflow-y-auto">
					{/* members.length > 0 ? (
						members.map((member) => (
							<MemberCard
								key={member.id}
								item={member}
								showModal={handleShowEditMemberModal}
								handleSelectMember={handleSelectMember}
							/>
						))
					)  */}
					{mockMembers.length > 0 ? (
						mockMembers
							.filter(
								(member) =>
									!selectedClassId ||
									member.classId === selectedClassId
							)
							.map((member) => (
								<MemberCard
									key={member.id}
									item={member}
									showModal={handleShowEditMemberModal}
									handleSelectMember={handleSelectMember}
								/>
							))
					) : (
						<p className="text-gray-500 text-center">
							Nenhum membro encontrado.
						</p>
					)}
					{showEditMemberModal && (
						<EditModal
							title="Editar Membro"
							fields={membersFields}
							editingItem={selectedMember}
							onClose={handleShowEditMemberModal}
							onSubmit={(data) => {
								handleEditMember(data);
								handleShowEditMemberModal();
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Classes;
