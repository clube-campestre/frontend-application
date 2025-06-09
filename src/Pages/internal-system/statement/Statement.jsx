import { api } from "../../../provider/api";
import Swal from "sweetalert2";
import { LuCirclePlus } from "react-icons/lu";
import { StatementCard } from "../../../components/statement-card/StatementCard";
import { useState, useEffect } from "react";
import EditModal from "../../../components/edit-modal/EditModal";
import { IoIosSearch } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { GiBroom } from "react-icons/gi";
import Toast from "../../../utils/Toast";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const Statement = () => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showTagModal, setShowTagModal] = useState(false);
	const [showManageTagsModal, setShowManageTagsModal] = useState(false);
	const [editingItem, setEditingItem] = useState(null);
	const [editingTag, setEditingTag] = useState(null);
	const [tags, setTags] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [transactions, setTransactions] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [filters, setFilters] = useState({
		startDate: "",
		endDate: "",
		tagId: "",
		type: "",
		description: "",
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
			type: "datetime-local",
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
			options:
				tags.length > 0 ? (
					tags.map((tag) => ({
						value: tag.surname,
						label:
							tag.surname.toUpperCase().charAt(0) +
							tag.surname.toLowerCase().slice(1),
					}))
				) : (
					<option value="">Nenhuma tag foi encontrada</option>
				),
		},
	];

	const tagFields = [
		{
			name: "surname",
			label: "Nome da Tag",
			placeholder: "Nome da Tag",
			type: "text",
			isRequired: true,
		},
		{
			name: "color",
			label: "Cor da Tag",
			placeholder: "Cor da Tag",
			type: "color",
			isRequired: true,
		},
		{
			name: "goal",
			label: "Meta (Opcional)",
			placeholder: "Meta",
			type: "Number",
			isRequired: false,
		},
		{
			name: "privateGoal",
			label: "Meta Privada",
			placeholder: "Meta Privada",
			type: "checkbox",
			isRequired: false,
		}
	];

	// Campos para edição de tag
	const tagEditFields = [
		{ name: "surname", label: "Nome da Tag", placeholder: "Nome da Tag", type: "text", isRequired: true },
		{ name: "color", label: "Cor da Tag", placeholder: "Cor da Tag", type: "color", isRequired: true },
		{ name: "goal", label: "Meta (Opcional)", placeholder: "Meta", type: "number", isRequired: false },
		{ name: "privateGoal", label: "Meta Privada", placeholder: "Meta Privada", type: "checkbox", isRequired: false },
	];

	const handleFilterTransactions = async () => {
		const params = {
			...filters,
			startDate: filters.startDate
				? new Date(filters.startDate).toISOString()
				: "",
			endDate: filters.endDate
				? new Date(filters.endDate).toISOString()
				: "",
			type: filters.type.toUpperCase(),
		};

		if (
			params.startDate == "" &&
			params.endDate == "" &&
			params.tagId == "" &&
			params.type == "" &&
			params.description == ""
		) {
			Toast.fire({
				icon: "info",
				title: "Por favor, insira pelo menos um filtro.",
			});
			return;
		}

		try {
			const response = await api.get("/statements", {
				params: {
					...params,
					page: pageNumber,
					size: pageSize,
				},
			});

			setTransactions(response.data.items);
			setTotalAmount(response.data.totalPrice);
			setPageSize(response.data.pageSize);
			setTotalItems(response.data.totalItems);
			setTotalPages(response.data.totalPages);
			Toast.fire({
				icon: "success",
				title: "Transações filtradas com sucesso!",
			});

			setPageNumber(0);
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Erro ao filtrar transações.",
			});
			console.error("Error fetching filtered transactions:", error);
		}
	};

	const handleClearFilters = async () => {
		setFilters({
			startDate: "",
			endDate: "",
			tagId: "",
			type: "",
			description: "",
		});

		const response = await api.get("/statements", {
			params: {
				page: pageNumber,
				size: pageSize,
			},
		});
		setTransactions(response.data.items);
		setTotalAmount(response.data.totalPrice);
		setPageSize(response.data.pageSize);
		setTotalItems(response.data.totalItems);
		setTotalPages(response.data.totalPages);
		Toast.fire({
			icon: "info",
			title: "Todos os filtros foram limpos!",
		});
	};

	const fetchTransactions = async () => {
		const params = {
			...filters,
			startDate: filters.startDate
				? new Date(filters.startDate).toISOString()
				: "",
			endDate: filters.endDate
				? new Date(filters.endDate).toISOString()
				: "",
			type: filters.type.toUpperCase(),
		};

		try {
			const response = await api.get("/statements", {
				params: {
					page: pageNumber,
					size: pageSize,
					...params,
				},
			});
			setTransactions(response.data.items);
			setTotalAmount(response.data.totalPrice);
			setPageSize(response.data.pageSize);
			setTotalItems(response.data.totalItems);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error("Error fetching transactions:", error);
		}
	};

	const getTags = async () => {
		try {
			const response = await api.get("/tags");
			setTags(response.data);
		} catch (error) {
			console.error("Error fetcFhing tags:", error);
		}
	};

	const handleCreateTag = async (data) => {
		if (!data.surname || !data.color) {
			Toast.fire({
				icon: "warning",
				title: "Por favor, preencha todos os campos.",
			});
			return;
		}

		try {
			const response = await api.post("/tags", data);
			if (response.status === 200) {
				Toast.fire({
					icon: "success",
					title: "Tag criada com sucesso!",
				});
				setShowTagModal(false);
				getTags();
			}
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Erro ao criar tag.",
			});
			console.error("Error creating tag:", error);
		}
	};

	// Editar tag
	const handleEditTag = async (data) => {
		try {
			const response = await api.put(`/tags/${editingTag.id}`, data);
			if (response.status === 200) {
				Toast.fire({ icon: "success", title: "Tag editada com sucesso!" });
				setEditingTag(null);
				getTags();
				setShowManageTagsModal(true);
			}
		} catch (error) {
			Toast.fire({ icon: "error", title: "Erro ao editar tag." });
		}
	};

	// Deletar tag
	const handleDeleteTag = async (id) => {
		Swal.fire({
			title: "Deseja deletar esta tag?",
			text: "Essa ação não pode ser desfeita.",
			icon: "warning",
			iconColor: "#d33",
			showCancelButton: true,
			confirmButtonColor: "#5ccb5f",
			cancelButtonColor: "#d33",
			cancelButtonText: "Cancelar",
			confirmButtonText: "Deletar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await api.delete(`/tags/${id}`);
					Toast.fire({ icon: "success", title: "Tag deletada com sucesso!" });
					getTags();
				} catch (err) {
					Toast.fire({ icon: "error", title: "Erro ao deletar tag." });
				}
			}
		});
	};

	useEffect(() => {
		fetchTransactions();
		getTags();
	}, [pageNumber]);

	const handleCreateTransaction = async (data) => {
		try {
			// Remove tudo exceto dígitos, vírgula, ponto e sinal
			let cleanPrice = String(data.price || "")
				.replace(/[^\d.,-]/g, "") // remove tudo exceto dígitos, vírgula, ponto e sinal
				.replace(/\./g, "")       // remove pontos de milhar
				.replace(",", ".");       // troca vírgula decimal por ponto

			cleanPrice = cleanPrice ? Number(cleanPrice) : 0;

			// Ajuste: datetime-local já vem no formato correto para o Date
			const isoDate = data.transactionDate
				? new Date(data.transactionDate).toISOString()
				: null;

			const payload = {
				...data,
				price: cleanPrice,
				transactionDate: isoDate,
			};

			const response = await api.post("/statements", payload);
			if (response.status === 201) {
				Toast.fire({
					icon: "success",
					title: "Transação criada com sucesso!",
				});
				setShowAddModal(false);
				fetchTransactions();
				setPageNumber(0);
			}
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Erro ao criar transação.",
			});
		}
	};

	const handleDeleteTransaction = async (id) => {
		Swal.fire({
			title: "Deseja deletar esta transação?",
			text: "Essa ação não pode ser desfeita.",
			icon: "warning",
			iconColor: "#d33",
			showCancelButton: true,
			confirmButtonColor: "#5ccb5f",
			cancelButtonColor: "#d33",
			cancelButtonText: "Cancelar",
			confirmButtonText: "Deletar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await api.delete(`/statements/${id}`);
					Toast.fire({
						icon: "success",
						title: "Transação deletada com sucesso!",
					});
					fetchTransactions();
				} catch (err) {
					setError("Ocorreu um erro ao deletar a transação.");
					Toast.fire({
						icon: "error",
						title: "Ocorreu um erro ao deletar a transação.",
					});
					console.error("Error deleting transaction:", err);
				}
			}
		});
	};

	const handleEditTransaction = async (data) => {
		try {
			const response = await api.put(
				`/statements/${editingItem.id}`,
				data
			);
			if (response.status === 200) {
				Toast.fire({
					icon: "success",
					title: "Transação editada com sucesso!",
				});
				setShowEditModal(false);
				fetchTransactions();
				setPageNumber(0);
			}
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Erro ao editar transação.",
			});
			console.error("Error editing transaction:", error);
		}
	};

	const getTodayDateTimeLocal = () => {
		const now = new Date();
		const yyyy = now.getFullYear();
		const mm = String(now.getMonth() + 1).padStart(2, "0");
		const dd = String(now.getDate()).padStart(2, "0");
		const hh = String(now.getHours()).padStart(2, "0");
		const min = String(now.getMinutes()).padStart(2, "0");
		return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
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
					<div className="flex items-center gap-2">
						{/* Botão ÚNICO para Gerenciar Tags */}
						<button
							className="flex items-center gap-2 px-4 py-2 bg-[#D9D9D9] text-[#021C4F] rounded hover:bg-gray-400"
							onClick={() => setShowManageTagsModal(true)}
						>
							Gerenciar Tags <LuCirclePlus />
						</button>
						{/* Modal de Gerenciar Tags */}
						{showManageTagsModal && (
							<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000da]">
								<div className="bg-[#f3f3f3] p-8 rounded-xl shadow-lg min-w-[400px] max-h-[80vh] overflow-y-auto relative">
									<button
										onClick={() => { setShowManageTagsModal(false); setEditingTag(null); }}
										className="absolute top-3 right-2 text-2xl"
									>
										×
									</button>
									<div className="flex gap-2 items-center justify-between mb-4">
										<h2 className="text-xl font-semibold mb-4">
											<span className="border-l-4 border-[#FCAE2D] mr-3"></span>
											Gerenciar Tags
										</h2>
										{/* Botão para abrir modal de cadastro de tag */}
										{!editingTag && (
											<button
												className="mb-4 px-4 py-2 bg-[#FCAE2D] text-white rounded hover:bg-[#e2961e] font-semibold"
												onClick={() => setShowTagModal(true)}
											>
											 <LuCirclePlus />
											</button>
										)}
									{/* Modal para cadastrar nova tag */}
									{showTagModal && (
										<EditModal
											onClose={() => setShowTagModal(false)}
											onSubmit={handleCreateTag}
											editingItem={null}
											title="Adicionar Nova Tag"
											fields={tagFields}
										/>
									)}
									</div>
									{/* Modal para editar tag */}
									{editingTag ? (
										<EditModal
											onClose={() => setEditingTag(null)}
											onSubmit={handleEditTag}
											editingItem={editingTag}
											title="Editar Tag"
											fields={tagEditFields}
										/>
									) : (
										<div className="space-y-4">
											{tags.length === 0 && (
												<p className="text-gray-500">Nenhuma tag cadastrada.</p>
											)}
											{tags.map((tag) => (
												<div key={tag.id} className="flex items-center justify-between bg-white p-3 rounded shadow">
													<div className="flex items-center gap-3">
														<div className="w-5 h-5 rounded-full" style={{ background: tag.color }}></div>
														<span className="font-normal">{tag.surname}</span>
														{tag.goal && (
															<span className="text-xs text-gray-500 ml-2">Meta: {tag.goal}</span>
														)}
														{tag.privateGoal && (
															<span className="text-xs text-gray-500 ml-2">Privada</span>
														)}
													</div>
													<div className="flex gap-2">
														<button
															onClick={() => setEditingTag(tag)}
															className="text-amber-500 hover:text-amber-600"
															title="Editar"
														>
															<FaPencilAlt size={18} className="cursor-pointer" />
														</button>
														<button
															onClick={() => handleDeleteTag(tag.id)}
															className="text-gray-400 hover:text-gray-600"
															title="Excluir"
														>
															<FaTrash size={18} className="cursor-pointer" />
														</button>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						)}
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
								editingItem={{ transactionDate: getTodayDateTimeLocal() }}
								title="Adicionar Transação"
								fields={statementFields}
							/>
						)}
					</div>
				</header>

				{/* Filter Section */}
				<section className="flex flex-col lg:flex-row w-full p-4 rounded justify-around shadow mb-6 bg-[#7C7C7C] gap-4">
					<div className="flex flex-col w-full lg:w-[65%] h-full">
						<div className="relative w-full mb-4">
							<input
								type="text"
								placeholder="Buscar por descrição"
								className="w-full p-2 pr-10 border border-gray-300 rounded bg-[#EDEDED]"
								value={filters.description}
								onChange={(e) =>
									setFilters({
										...filters,
										description: e.target.value,
									})
								}
							/>
						</div>

						<div className="flex flex-col md:flex-row w-full items-center justify-between gap-4">
							<div className="flex flex-col w-full gap-2">
								<h4 className="text-white">Período</h4>
								<div className="flex flex-col sm:flex-row items-center gap-4">
									<input
										type="date"
										value={filters.startDate}
										onChange={(e) =>
											setFilters({
												...filters,
												startDate: e.target.value,
											})
										}
										className="w-full p-2 border border-gray-300 rounded bg-[#EDEDED]"
									/>
									<input
										type="date"
										value={filters.endDate}
										onChange={(e) =>
											setFilters({
												...filters,
												endDate: e.target.value,
											})
										}
										className="w-full p-2 border border-gray-300 rounded bg-[#EDEDED]"
									/>
								</div>
							</div>

							<div className="flex flex-col w-full gap-2">
								<h4 className="text-white">Transação</h4>
								<select
									className="w-full p-2 border border-gray-300 rounded bg-[#EDEDED]"
									value={filters.type}
									onChange={(e) =>
										setFilters({
											...filters,
											type: e.target.value,
										})
									}
								>
									<option value="">Selecione o tipo</option>
									<option value="entrada">Entrada</option>
									<option value="saida">Saída</option>
								</select>
							</div>

							<div className="flex flex-col w-full gap-2">
								<h4 className="text-white">Tag</h4>
								<select
									className="w-full p-2 border border-gray-300 rounded bg-[#EDEDED]"
									value={filters.tagId}
									onChange={(e) =>
										setFilters({
											...filters,
											tagId: e.target.value,
										})
									}
								>
									<option value="">Selecione uma tag</option>
									{tags.length > 0 ? (
										tags.map((tag) => (
											<option key={tag.id} value={tag.id}>
												{tag.surname
													.charAt(0)
													.toUpperCase() +
													tag.surname
														.slice(1)
														.toLowerCase()}
											</option>
										))
									) : (
										<option value="">
											Nenhuma tag foi encontrada
										</option>
									)}
								</select>
							</div>

							<div className="flex gap-2 mt-2 md:mt-6">
								<button
									onClick={handleFilterTransactions}
									className="flex items-center justify-center h-10 px-2 border-2 rounded border-[#FCAE2D]"
								>
									<IoIosSearch size={24} color="#FCAE2D" />
								</button>
								<button
									onClick={handleClearFilters}
									className="flex items-center justify-center h-10 px-2 border-2 rounded border-[#f85858]"
								>
									<GiBroom size={24} color="#f85858"/>
								</button>
							</div>
						</div>
					</div>

					<div className="flex flex-col items-center justify-start w-full lg:w-[30%] bg-[#EDEDED] rounded p-4">
						<div className="flex items-start w-full h-10">
							<span>Valor Total:</span>
						</div>
						<div className="flex items-center justify-center w-full h-full">
							<span className={`text-4xl lg:text-5xl font-bold` + (totalAmount < 0 ? " text-red-500" : "")}>
								<span className="text-2xl">R$</span> {totalAmount  ? totalAmount.toFixed(2) : "0.00"}
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
										showModal={() => {
											setShowEditModal(true);
											setEditingItem({
												...transaction,
												tagName:
													transaction.tag?.surname,
												tagColor: transaction.tag?.color,
											});
										}}
										handleDeleteTransaction={
											handleDeleteTransaction
										}
									/>
									{showEditModal && (
										<EditModal
											onClose={() =>
												setShowEditModal(false)
											}
											editingItem={editingItem}
											onSubmit={handleEditTransaction}
											title="Editar Transação"
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
				{transactions.length > 0 && (
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
								Exibindo {transactions.length} de {totalItems}{" "}
								transações
							</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Statement;