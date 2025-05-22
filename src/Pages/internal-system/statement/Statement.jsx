import { api } from "../../../provider/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { LuCirclePlus } from "react-icons/lu";
import { StatementCard } from "../../../components/statement-card/StatementCard";
import { useState } from "react";
import EditModal from "../../../components/edit-modal/EditModal";
import { IoIosSearch } from "react-icons/io";
import { LuSearchX } from "react-icons/lu";



const Statement = () => {
	const statementFields = [
		{
			id: "information",
			type: "text",
			label: "Descrição",
			isRequired: true,
		},
		{ id: "price", type: "number", label: "Valor", isRequired: true },
		{
			id: "transactionDate",
			type: "date",
			label: "Data",
			isRequired: true,
		},
		{
			id: "transactionType",
			type: "text",
			label: "Tipo da Receita",
			isRequired: true,
		},
		{ id: "tag", type: "radio", label: "Tag", isRequired: true },
	];

	const [showEditModal, setShowEditModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [editingItem, setEditingItem] = useState(null);

	const handleShowEditModal = () => {
		setShowEditModal(!showEditModal);
	};

	const transactions = [
		{
			id: 1,
			type: "ENTRADA",
			amount: 1500,
			date: "2023-10-01",
			description: "Salário",
			category: "Receita",
		},
		{
			id: 2,
			type: "SAIDA",
			amount: 200,
			date: "2023-10-02",
			description: "Supermercado",
			category: "Despesa",
		},
	];

	const [isFiltering, setIsFiltering] = useState(false);

	const handleFilterTransactions = () => {
		setIsFiltering(!isFiltering);
		// Aqui você pode adicionar a lógica para filtrar os estratos
	};

	return (
		<div className="flex items-center justify-center w-full h-[82vh]">
			<div className="flex flex-col items-center justify-start w-[80vw] h-[82vh]">
				{/* Header Section */}
				<header className="flex items-center justify-between w-full h-18">
					<div className="flex items-center gap-2">
						<div className="h-8 w-2 bg-yellow-400 rounded"></div>
						<h2 className="text-xl font-normal">Lançar Receita</h2>
					</div>
					<button className="flex items-center gap-2 px-4 py-2 bg-[#D9D9D9] text-[#021C4F] rounded hover:bg-gray-400">
						Adicionar Transação <LuCirclePlus />
					</button>
				</header>

				{/* Filter Section */}
				<section className="flex flex-row w-full p-4 h-40 rounded justify-around shadow mb-6 bg-[#7C7C7C]">
					<div className="flex flex-col w-[60%] h-full">
						<div className="relative w-full mb-4">
							<input
								type="text"
								placeholder="Buscar por descrição"
								className="w-full p-2 pr-10 border border-gray-300 rounded bg-[#EDEDED]"
							/>
							<IoIosSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
						</div>
						<div className="flex flex-row w-full items-center justify-between gap-4">
							<div className="flex flex-col w-full gap-2">
								<h4 className="text-white">Periodo</h4>
								<div className="flex flex-row items-center gap-4">
									<input
										type="date"
										id="data-inicio"
										className="w-full p-2 border border-gray-300 rounded bg-[#EDEDED]"
									/>
									<input
										type="date"
										id="data-fim"
										className="w-full p-2 border border-gray-300 rounded bg-[#EDEDED]"
									/>
								</div>
							</div>
							<div className="flex flex-col w-full gap-2">
								<h4 className="text-white">Transação</h4>
								<select
									name="tipo-transacao"
									id="tipo-transacao"
									className="w-full p-2 border border-gray-300 rounded bg-[#EDEDED]"
								>
									<option value="entrada">Entrada</option>
									<option value="saida">Saída</option>
								</select>
							</div>
							<div className="flex flex-col w-full gap-2">
								<h4 className="text-white">Tag</h4>
								<select
									name="tag"
									id="tag"
									className="w-full p-2 border border-gray-300 rounded bg-[#EDEDED]"
								>
									<option value="receita">Receita</option>
									<option value="despesa">Despesa</option>
								</select>
							</div>
							<button
								onClick={handleFilterTransactions}
								className={`flex self-end items-center justify-center h-10 w-52 border-2 rounded ${
									isFiltering
										? "bg-red-500 border-red-500"
										: "border-[#FCAE2D]"
								}`}
							>
								{isFiltering ?
								<LuSearchX 
								size={30}
								color="#FFFFFF"/>

								 : <IoIosSearch
								size={30}
								color= "#FCAE2D"/>}

							</button>
						</div>
					</div>
					<div className="flex flex-col items-center justify-start w-[30%] h-full bg-[#EDEDED] rounded p-4">
						<div className="flex items-start justify-start w-full h-10 ">
							<span className="flex">Valor Total (R$)</span>
						</div>
						<div className="flex items-start h-full justify-center">
							<span className="text-5xl font-bold ml-1">1500,00</span>
						</div>
					</div>
				</section>

				<section className="w-full h-[48.5vh] bg-[#EDEDED] p-4 rounded shadow overflow-y-auto">
					<div className="flex flex-col gap-2">
						{transactions.length > 0 ? (
							transactions.map((transaction) => (
								<div key={transaction.id}>
									<StatementCard
										key={transaction.id}
										item={transaction}
										showModal={handleShowEditModal}
									/>
									{showEditModal && (
										<EditModal
											onClose={() =>
												setShowEditModal(false)
											}
											editingItem={editingItem}
											onSubmit={handleEditPlace}
											title="Editar Local"
											fields={statementFields}
										/>
									)}
								</div>
							))
						) : (
							<p className="text-gray-500 text-center">
								Nenhuma transação encontrada.
							</p>
						)}
					</div>
				</section>
			</div>
		</div>
	);
};

export default Statement;
