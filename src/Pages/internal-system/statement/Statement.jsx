import { api } from "../../../provider/api";
import Swal from "sweetalert2";
import { LuCirclePlus, LuTags } from "react-icons/lu"; // Adicionei ícone de Tags
import { StatementCard } from "../../../components/statement-card/StatementCard";
import { useState, useEffect } from "react";
import EditModal from "../../../components/edit-modal/EditModal";
import { IoMdSearch } from "react-icons/io"; // Ícone de busca moderno
import { FaFileInvoiceDollar } from "react-icons/fa6"; // Ícone de Extrato
import { FaFilter, FaBroom } from "react-icons/fa";
import Toast from "../../../utils/Toast";
import Pagination from "../../../components/pagination/Pagination";
import EmptyState from "../../../components/empty-state/EmptyState";
import TagsModal from "../../../components/tags-modal/TagsModal";
import {
    getStatements,
    createStatement,
    updateStatement,
    deleteStatement,
    getGoalByTag,
    deleteStatementsByTag,
} from "../../../services/statementsService";
import { getTags as fetchTagsService, createTag as createTagService, updateTag as updateTagService, deleteTag as deleteTagService } from "../../../services/tagsService";

const Statement = () => {
    // --- ESTADOS (MANTIDOS) ---
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

    // --- CAMPOS (MANTIDOS) ---
    const statementFields = [
        { name: "information", label: "Descrição", placeholder: "Ex: Compra de materiais", type: "text", isRequired: true },
        { name: "price", label: "Valor", placeholder: "0,00", type: "text", isRequired: true },
        { name: "transactionDate", label: "Data", placeholder: "Data", type: "datetime-local", isRequired: true },
        {
            name: "transactionType", label: "Tipo", placeholder: "Selecione", type: "select", isRequired: true,
            options: [{ value: "ENTRADA", label: "Entrada" }, { value: "SAIDA", label: "Saída" }],
        },
        {
            name: "tagSurname", placeholder: "Tag", type: "select", label: "Tag", isRequired: true,
            options: tags.length > 0 ? tags.map((tag) => ({ value: tag.surname, label: tag.surname })) : <option value="">Nenhuma tag</option>,
        },
    ];

    const tagFields = [
        { name: "surname", label: "Nome da Tag", placeholder: "Ex: Alimentação", type: "text", isRequired: true },
        { name: "color", label: "Cor", placeholder: "Cor", type: "color", isRequired: true },
        { name: "goal", label: "Meta (Opcional)", placeholder: "R$ 0,00", type: "text", isRequired: false },
        { name: "privateGoal", label: "Meta Privada", placeholder: "", type: "checkbox", isRequired: false }
    ];

    const tagEditFields = [
        { name: "surname", label: "Nome da Tag", placeholder: "Nome", type: "text", isRequired: true },
        { name: "color", label: "Cor", placeholder: "Cor", type: "color", isRequired: true },
        { name: "goal", label: "Meta", placeholder: "R$ 0,00", type: "text", isRequired: false },
        { name: "privateGoal", label: "Meta Privada", placeholder: "", type: "checkbox", isRequired: false },
    ];

    // --- FUNÇÕES (MANTIDAS) ---
    const handleFilterTransactions = async () => {
        const params = {
            ...filters,
            startDate: filters.startDate ? new Date(filters.startDate).toISOString() : "",
            endDate: filters.endDate ? new Date(filters.endDate).toISOString() : "",
            type: filters.type.toUpperCase(),
        };

        if (params.startDate == "" && params.endDate == "" && params.tagId == "" && params.type == "" && params.description == "") {
            Toast.fire({ icon: "info", title: "Por favor, insira pelo menos um filtro." });
            return;
        }

        try {
            const response = await getStatements({ ...params, page: pageNumber, size: pageSize });
            setTransactions(response.items || []);
            setTotalAmount(response.totalPrice || 0);
            setPageSize(response.pageSize || pageSize);
            setTotalItems(response.totalItems || 0);
            setTotalPages(response.totalPages || 1);
            Toast.fire({ icon: "success", title: "Filtrado com sucesso!" });
            setPageNumber(0);
        } catch (error) {
            Toast.fire({ icon: "error", title: "Erro ao filtrar." });
            console.error(error);
        }
    };

    const handleClearFilters = async () => {
        setFilters({ startDate: "", endDate: "", tagId: "", type: "", description: "" });
        const response = await getStatements({ page: pageNumber, size: pageSize });
        setTransactions(response.items || []);
        setTotalAmount(response.totalPrice || 0);
        setPageSize(response.pageSize || pageSize);
        setTotalItems(response.totalItems || 0);
        setTotalPages(response.totalPages || 1);
        Toast.fire({ icon: "info", title: "Filtros limpos!" });
    };

    const fetchTransactions = async () => {
        const params = {
            ...filters,
            startDate: filters.startDate ? new Date(filters.startDate).toISOString() : "",
            endDate: filters.endDate ? new Date(filters.endDate).toISOString() : "",
            type: filters.type.toUpperCase(),
        };
        try {
            const response = await getStatements({ page: pageNumber, size: pageSize, ...params });
            setTransactions(response.items || []);
            setTotalAmount(response.totalPrice || 0);
            setPageSize(response.pageSize || pageSize);
            setTotalItems(response.totalItems || 0);
            setTotalPages(response.totalPages || 1);
        } catch (error) {
            console.error(error);
        }
    };

    const getTags = async () => {
        try {
            const response = await fetchTagsService();
            setTags(response || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateTag = async (data) => {
        if (!data.surname || !data.color) {
            Toast.fire({ icon: "warning", title: "Preencha todos os campos." });
            return;
        }
        try {
            // Remover máscara do campo goal antes de enviar (enviar só número)
            const payload = {
                ...data,
                goal: data.goal ? parseFloat(data.goal.replace(/[^\d,]/g, "").replace(",", ".")) || null : null
            };
            const response = await createTagService(payload);
            if (response) {
                Toast.fire({ icon: "success", title: "Tag criada!" });
                setShowTagModal(false);
                getTags();
            }
        } catch (error) {
            Toast.fire({ icon: "error", title: "Erro ao criar tag." });
        }
    };

    const handleEditTag = async (data) => {
        try {
            // Remover máscara do campo goal antes de enviar (enviar só número)
            const payload = {
                ...data,
                goal: data.goal ? parseFloat(data.goal.replace(/[^\d,]/g, "").replace(",", ".")) || null : null
            };
            const response = await updateTagService(editingTag.id, payload);
            if (response) {
                Toast.fire({ icon: "success", title: "Tag editada!" });
                setEditingTag(null);
                getTags();
                setShowManageTagsModal(true);
            }
        } catch (error) {
            Toast.fire({ icon: "error", title: error.response?.data?.message || "Erro ao editar." });
        }
    };

    const handleDeleteTag = async (id) => {
        Swal.fire({
            title: "Deletar tag?",
            text: "Irreversível.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5ccb5f",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Deletar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteTagService(id);
                    Toast.fire({ icon: "success", title: "Deletado!" });
                    getTags();
                } catch (err) {
                    Toast.fire({ icon: "error", title: err.response?.data?.message || "Erro ao deletar." });
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
            // Remover máscara do campo price antes de enviar
            const cleanedPrice = data.price 
                ? parseFloat(String(data.price).replace(/[^\d,]/g, "").replace(",", ".")) 
                : null;
            const isoDate = data.transactionDate ? new Date(data.transactionDate).toISOString() : null;
            const payload = { 
                ...data, 
                price: cleanedPrice,
                transactionDate: isoDate 
            };
            const response = await createStatement(payload);
            if (response) {
                Toast.fire({ icon: "success", title: "Transação criada!" });
                setShowAddModal(false);
                fetchTransactions();
                setPageNumber(0);
            }
        } catch (error) {
            Toast.fire({ icon: "error", title: "Erro ao criar." });
        }
    };

    const handleDeleteTransaction = async (id) => {
        Swal.fire({
            title: "Deletar transação?",
            text: "Irreversível.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5ccb5f",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Deletar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteStatement(id);
                    Toast.fire({ icon: "success", title: "Deletado!" });
                    fetchTransactions();
                } catch (err) {
                    Toast.fire({ icon: "error", title: "Erro ao deletar." });
                }
            }
        });
    };

    const handleEditTransaction = async (data) => {
        try {
            // Remover máscara do campo price antes de enviar
            const cleanedPrice = data.price 
                ? parseFloat(String(data.price).replace(/[^\d,]/g, "").replace(",", ".")) 
                : null;
            const payload = { 
                ...data, 
                id: editingItem.id,
                price: cleanedPrice
            };
            const response = await updateStatement(payload);
            if (response) {
                Toast.fire({ icon: "success", title: "Editado!" });
                setShowEditModal(false);
                fetchTransactions();
                setPageNumber(0);
            }
        } catch (error) {
            Toast.fire({ icon: "error", title: "Erro ao editar." });
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
        <div className="h-screen flex flex-col bg-gray-50 overflow-hidden font-sans">
            
            {/* --- HEADER SUPERIOR (Ações e Totais) --- */}
            <div className="flex-shrink-0 bg-white shadow-sm z-20 border-b border-gray-200">
                <div className="max-w-[1920px] mx-auto p-4 md:px-6 md:py-4">
                    
                    {/* Linha 1: Título e Ações */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="">
                               
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-blue-900 leading-tight">Extrato Financeiro</h1>
                              
                            </div>
                        </div>

                        {/* Valor Total Destacado */}
                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 w-full md:w-auto justify-between md:justify-center">
                            <span className="text-sm font-semibold text-gray-600">Saldo Total:</span>
                            <span className={`text-xl font-bold ${totalAmount < 0 ? "text-red-500" : "text-[#021C4F]"}`}>
                                {totalAmount ? `R$ ${totalAmount.toFixed(2)}` : "R$ 0.00"}
                            </span>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex gap-2 w-full md:w-auto">
                            <button
                                onClick={() => setShowManageTagsModal(true)}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#FCAE2D] hover:border-[#FCAE2D] transition-all font-medium text-sm shadow-sm"
                            >
                                <LuTags /> Tags
                            </button>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#FCAE2D] text-white rounded-lg hover:bg-[#e0961a] active:scale-95 transition-all font-medium text-sm shadow-md"
                            >
                                <LuCirclePlus size={16} /> Nova Transação
                            </button>
                        </div>
                    </div>

                    {/* Linha 2: Filtros (Estilo "SecretaryPage") */}
                    <div className="flex flex-col lg:flex-row gap-3 items-end pt-2 border-t border-gray-100">
                        {/* Busca por Texto */}
                        <div className="w-full lg:flex-1">
                            <label className="text-gray-600 font-semibold text-xs mb-1 block">Descrição</label>
                            <div className="relative">
                                <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="w-full pl-9 pr-3 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-[#FCAE2D] focus:border-[#FCAE2D] transition-all"
                                    value={filters.description}
                                    onChange={(e) => setFilters({ ...filters, description: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Datas */}
                        <div className="flex gap-2 w-full lg:w-auto">
                            <div className="flex-1 lg:w-36">
                                <label className="text-gray-600 font-semibold text-xs mb-1 block">Início</label>
                                <input
                                    type="date"
                                    className="w-full h-10 px-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-[#FCAE2D] focus:border-[#FCAE2D]"
                                    value={filters.startDate}
                                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                                />
                            </div>
                            <div className="flex-1 lg:w-36">
                                <label className="text-gray-600 font-semibold text-xs mb-1 block">Fim</label>
                                <input
                                    type="date"
                                    className="w-full h-10 px-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-[#FCAE2D] focus:border-[#FCAE2D]"
                                    value={filters.endDate}
                                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Selects */}
                        <div className="flex gap-2 w-full lg:w-auto">
                            <div className="flex-1 lg:w-32">
                                <label className="text-gray-600 font-semibold text-xs mb-1 block">Tipo</label>
                                <select
                                    className="w-full h-10 px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-[#FCAE2D] focus:border-[#FCAE2D]"
                                    value={filters.type}
                                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                >
                                    <option value="">Todos</option>
                                    <option value="entrada">Entrada</option>
                                    <option value="saida">Saída</option>
                                </select>
                            </div>
                            <div className="flex-1 lg:w-40">
                                <label className="text-gray-600 font-semibold text-xs mb-1 block">Tag</label>
                                <select
                                    className="w-full h-10 px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-[#FCAE2D] focus:border-[#FCAE2D]"
                                    value={filters.tagId}
                                    onChange={(e) => setFilters({ ...filters, tagId: e.target.value })}
                                >
                                    <option value="">Todas</option>
                                    {tags.map((tag) => <option key={tag.id} value={tag.id}>{tag.surname}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Botões de Filtro */}
                        <div className="flex gap-2">
                            <button
                                onClick={handleFilterTransactions}
                                className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#FCAE2D] text-white hover:bg-[#e0961a] active:scale-95 transition-all shadow-sm"
                                title="Filtrar"
                            >
                                <FaFilter size={16} />
                            </button>
                            <button
                                onClick={handleClearFilters}
                                className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-100 text-red-500 border border-red-200 hover:bg-red-200 active:scale-95 transition-all"
                                title="Limpar"
                            >
                                <FaBroom size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- LISTA DE TRANSAÇÕES (Área Principal) --- */}
            <div className="flex-1 overflow-hidden relative max-w-[1920px] w-full mx-auto p-4 md:p-6">
                <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    
                    {/* Container com Scroll */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        <div className="space-y-3">
                            {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <StatementCard
                                        key={transaction.id}
                                        item={transaction}
                                        showModal={() => {
                                            setShowEditModal(true);
                                            setEditingItem({
                                                ...transaction,
                                                tagSurname: transaction.tag?.surname,
                                                tagColor: transaction.tag?.color,
                                            });
                                        }}
                                        handleDeleteTransaction={handleDeleteTransaction}
                                    />
                                ))
                            ) : (
                                <EmptyState
                                    icon={FaFileInvoiceDollar}
                                    title="Nenhuma transação encontrada"
                                    message="Use os filtros acima ou adicione uma nova transação."
                                />
                            )}
                        </div>
                    </div>

                    {/* Footer / Paginação */}
                    <div className="flex-shrink-0 bg-gray-50 border-t border-gray-200 px-6 py-3 z-10">
                        <Pagination
                            pageNumber={pageNumber}
                            totalPages={totalPages}
                            onPageChange={setPageNumber}
                            totalItems={totalItems}
                            itemsPerPage={transactions.length}
                        />
                    </div>
                </div>
            </div>

            {/* --- MODAIS --- */}
            {showAddModal && (
                <EditModal
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleCreateTransaction}
                    editingItem={{ transactionDate: getTodayDateTimeLocal() }}
                    title="Adicionar Transação"
                    fields={statementFields}
                    floatingLabels={true}
                />
            )}

            {showEditModal && (
                <EditModal
                    onClose={() => setShowEditModal(false)}
                    editingItem={editingItem}
                    onSubmit={handleEditTransaction}
                    title="Editar Transação"
                    fields={statementFields}
                />
            )}

            {/* Modal de Gerenciamento de Tags */}
            <TagsModal
                isOpen={showManageTagsModal}
                onClose={() => { setShowManageTagsModal(false); setEditingTag(null); setShowTagModal(false); }}
                tags={tags}
                editingTag={editingTag}
                onEditTag={setEditingTag}
                onCancelEdit={() => setEditingTag(null)}
                onSaveTag={handleEditTag}
                onDeleteTag={handleDeleteTag}
                showTagModal={showTagModal}
                onShowTagModal={setShowTagModal}
                onCreateTag={handleCreateTag}
                tagFields={tagFields}
                tagEditFields={tagEditFields}
            />
        </div>
    );
};

export default Statement;