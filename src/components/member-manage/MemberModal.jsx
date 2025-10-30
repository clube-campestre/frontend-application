import React, { useState } from "react";

function MemberModal({
	members,
	unitId,
	unitName,
	className,
	onConfirm,
	onClose,
}) {
	const [availableMembers, setAvailableMembers] = useState(
		members.filter(
			(member) =>
				(unitId && member.unitId !== unitId) ||
				(className && member.classCategory !== className)
		)
	);

	// Estado para armazenar os membros selecionados
	const [selectedMembers, setSelectedMembers] = useState([]);
	console.log("Membros:", members);
	console.log("Membros disponíveis:", availableMembers);
	console.log("Membros selecionados:", selectedMembers);

	// Estado para armazenar o termo de pesquisa
	const [searchTerm, setSearchTerm] = useState("");

	// Função para selecionar um membro da lista de disponíveis
	const handleSelectMember = (cpf) => {
		console.log("Selecionando membro com cpf:", cpf);
		const memberToSelect = availableMembers.find(
			(member) => member.cpf === cpf
		);
		if (memberToSelect) {
			// Adiciona o membro à lista de selecionados
			setSelectedMembers((prev) => [...prev, memberToSelect]);
			// Remove o membro da lista de disponíveis
			setAvailableMembers((prev) =>
				prev.filter((member) => member.cpf !== cpf)
			);
		}
	};

	// Função para remover um membro da lista de selecionados
	const handleDeselectMember = (cpf) => {
		const memberToDeselect = selectedMembers.find(
			(member) => member.cpf === cpf
		);
		if (memberToDeselect) {
			// Adiciona o membro de volta à lista de disponíveis
			setAvailableMembers((prev) => [...prev, memberToDeselect]);
			// Remove o membro da lista de selecionados
			setSelectedMembers((prev) =>
				prev.filter((member) => member.cpf !== cpf)
			);
		}
	};

	// Função para confirmar a seleção de membros
	const handleConfirm = () => {
		// Atualiza os membros selecionados com o ID da unidade
		const updatedMembers = selectedMembers.map((member) => ({
			...member,
			unit: {
				id: unitId || member.unit.id,
			},

			classCategory: className || member.classCategory,
			className,
		}));
		// Chama a função de callback passada como prop
		onConfirm(updatedMembers);
	};

	// Filtra os membros disponíveis com base no termo de pesquisa
	const filteredMembers = availableMembers.filter((member) =>
		member.username.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div
			// Fundo escuro para o modal
			className="fixed inset-0 bg-[#000000da] flex items-center justify-center z-50"
			onClick={onClose} // Fecha o modal ao clicar fora dele
		>
			<div
				// Conteúdo do modal
				className="bg-white p-6 rounded-lg shadow-lg w-[80%] h-[80%] flex gap-6 overflow-hidden"
				onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro do modal
			>
				{/* Lista de membros disponíveis */}

				<div className="w-1/2 max-h-full overflow-y-auto border border-gray-300 rounded p-3">
					<h3 className="font-semibold mb-3">Todos os membros</h3>
					{/* Campo de pesquisa */}
					<input
						type="text"
						placeholder="Pesquisar membro..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
						className="w-full mb-3 p-2 border border-gray-300 rounded"
					/>
					{/* Lista de membros filtrados */}
					{filteredMembers.map((member) => (
						<div
							key={member.cpf}
							className="flex flex-row items-center justify-between w-full h-16 bg-[#FAFAFA] rounded hover:bg-[#D9D9D9] cursor-pointer shadow-md transition-all duration-200 ease-in-out mb-4"
							onClick={() => handleSelectMember(member.cpf)} // Seleciona o membro ao clicar
						>
							{/* Nome e Data de Aniversário */}
							<div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
								<div className="text-[16px] font-bold">
									<span>{member.username}</span>
								</div>
								<div className="text-[11px] text-[#8D8D8D]">
									<span>
										{new Date(
											member.birthDate
										).toLocaleDateString()}
									</span>
								</div>
							</div>

							<div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

							{/* Unidade */}
							<div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
								<div className="text-[16px]">
									<span>{member.unit.surname}</span>
								</div>
								<div className="text-[11px] text-[#8D8D8D]">
									<span>{member.unitRole}</span>
								</div>
							</div>

							<div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

							{/* Classe */}
							<div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
								<div className="text-[16px]">
									<span>{member.classCategory}</span>
								</div>
								<div className="text-[11px] text-[#8D8D8D]">
									<span>{member.classRole}</span>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Lista de membros selecionados */}
				<div className="w-1/2 max-h-full overflow-y-auto border border-gray-300 rounded p-3 flex flex-col">
					<div className="flex justify-between items-center mb-3">
						<h3 className="font-semibold">
							Adicionando em {unitName || className}
						</h3>
						{/* Botão de confirmar */}
						<button
							onClick={handleConfirm} // Confirma a seleção ao clicar
							disabled={selectedMembers.length === 0} // Desabilita se nenhum membro for selecionado
							className={`px-3 py-1 rounded text-white ${
								selectedMembers.length === 0
									? "bg-gray-400 cursor-not-allowed"
									: "bg-blue-600 hover:bg-blue-700"
							}`}
						>
							Confirmar
						</button>
					</div>

					{/* Exibe mensagem se nenhum membro for selecionado */}
					{selectedMembers.length === 0 ? (
						<p className="text-gray-500">
							Nenhum membro selecionado.
						</p>
					) : (
						// Lista de membros selecionados
						selectedMembers.map((member) => (
							<div
								key={member.cpf}
								className="flex flex-row items-center justify-between w-full h-16 bg-[#FAFAFA] rounded hover:bg-[#D9D9D9] cursor-pointer shadow-md transition-all duration-200 ease-in-out mb-4"
								onClick={() => handleDeselectMember(member.cpf)} // Remove o membro ao clicar
							>
								{/* Nome e Data de Nascimento */}
								<div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
									<div className="text-[16px] font-bold">
										<span>{member.username}</span>
									</div>
									<div className="text-[11px] text-[#8D8D8D]">
										<span>
											{new Date(
												member.birthDate
											).toLocaleDateString()}
										</span>
									</div>
								</div>

								<div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

								{/* Unidade */}
								<div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
									<div className="text-[16px]">
										<span>{member.unit.surname}</span>
									</div>
									<div className="text-[11px] text-[#8D8D8D]">
										<span>{member.unitRole}</span>
									</div>
								</div>

								<div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

								{/* Classe */}
								<div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
									<div className="text-[16px]">
										<span>{member.classCategory}</span>
									</div>
									<div className="text-[11px] text-[#8D8D8D]">
										<span>{member.classRole}</span>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default MemberModal;
