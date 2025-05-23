import { api } from "../../../provider/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { LuCirclePlus } from "react-icons/lu";
import { StatementCard } from "../../../components/statement-card/StatementCard";
import { use, useState } from "react";
import EditModal from "../../../components/edit-modal/EditModal";
import { IoIosSearch } from "react-icons/io";
import { LuSearchX } from "react-icons/lu";
import { useEffect } from "react";

const Statement = () => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top",
		showConfirmButton: false,
		timer: 2500,
		timerProgressBar: true,
	});
	const statementFields = [
		{
			name: "information",
			label: "Descrição",
			placeholder: "Descrição",
			type: "text",
			isRequired: true,
		},
		{
			name: "price",
			label: "Valor",
			placeholder: "Valor",
			type: "text",
			isRequired: true,
		},
		{
			name: "transactionDate",
			label: "Data",
			placeholder: "Data",
			type: "date",
			isRequired: true,
		},
		{
			name: "transactionType",
			label: "Tipo da Receita",
			placeholder: "Tipo da Receita",
			type: "select",
			isRequired: true,
			options: [
				{ value: "ENTRADA", label: "Entrada" },
				{ value: "SAIDA", label: "Saída" },
			],
		},
		{
			name: "tagName",
			placeholder: "Tag",
			type: "select",
			label: "Tag",
			isRequired: true,
			options: [
				{ value: "RECEITA", label: "Receita" },
				{ value: "DESPESA", label: "Despesa" },
			],
		},
	];

	const [showAddModal, setShowAddModal] = useState(false);
	const [isFiltering, setIsFiltering] = useState(false);
	const [tags, setTags] = useState([]);
	const [transactions, setTransactions] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	const handleFilterTransactions = () => {
		setIsFiltering(!isFiltering);
	};

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const response = await api.get("/statements", {
					params: {
						page: pageNumber,
						size: pageSize,
					},
				});
				setTransactions(response.data);
			} catch (error) {
				console.error("Error fetching transactions:", error);
			}
		};

		const getTags = async () => {
			try {
				const response = await api.get("/tags");
				setTags(response.data);
			} catch (error) {
				console.error("Error fetching tags:", error);
			}
		};

		fetchTransactions();
		getTags();
	}, [pageNumber, pageSize]);

	const handleCreateTransaction = async (data) => {
		try {
			const response = await api.post("/statements", data);
			if (response.status === 201) {
				Toast.fire({
					icon: "success",
					title: "Transação criada com sucesso!",
				});
				setShowAddModal(false);
			}
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Erro ao criar transação.",
			});
		}
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
					<button
						className="flex items-center gap-2 px-4 py-2 bg-[#D9D9D9] text-[#021C4F] rounded hover:bg-gray-400"
						onClick={() => setShowAddModal(true)}
					>
						Adicionar Transação <LuCirclePlus />
					</button>
					{showAddModal && (
						<EditModal
							onClose={() => setShowAddModal(false)}
							onSubmit={handleCreateTransaction}
							editingItem={null}
							title="Adicionar Transação"
							fields={statementFields}
						/>
					)}
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
								{isFiltering ? (
									<LuSearchX size={30} color="#FFFFFF" />
								) : (
									<IoIosSearch size={30} color="#FCAE2D" />
								)}
							</button>
						</div>
					</div>
					<div className="flex flex-col items-center justify-start w-[30%] h-full bg-[#EDEDED] rounded p-4">
						<div className="flex items-start justify-start w-full h-10 ">
							<span className="flex">Valor Total (R$)</span>
						</div>
						<div className="flex items-start h-full justify-center">
							<span className="text-5xl font-bold ml-1">
								1500,00
							</span>
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
										showModal={"handleShowEditModal"}
									/>
									{/* {showEditModal && (
										<EditModal
											onClose={() =>
												setShowEditModal(false)
											}
											editingItem={editingItem}
											onSubmit={handleEditTransaction}
											title="Editar Transação"
											fields={statementFields}
										/>
									)} */}
								</div>
							))
						) : (
							<p className="text-gray-500 text-center">
								Nenhuma transação encontrada.
							</p>
						)}
					</div>
				</section>
				<section className="flex items-center justify-between w-full mt-4">
					<button
						onClick={() =>
							setPageNumber((prev) => Math.max(prev - 1, 1))
						}
						disabled={pageNumber === 1}
						className="px-4 py-2 bg-[#D9D9D9] rounded disabled:opacity-50"
					>
						Anterior
					</button>
					<span className="text-gray-700">Página {pageNumber}</span>
					<button
						onClick={() => setPageNumber((prev) => prev + 1)}
						className="px-4 py-2 bg-[#D9D9D9] rounded"
					>
						Próxima
					</button>
				</section>
			</div>
		</div>
	);
};

export default Statement;
