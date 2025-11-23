import React, { useEffect, useState } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaFilter, FaBroom } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";

import { MemberCard } from "../../../components/member-card/MemberCard";
import EditModal from "../../../components/edit-modal/EditModal";
import MemberModalController from "../../../components/member-modal-controller/MemberModalController";
import AddMemberPage from "../admin/AddMemberPage";
import Toast from "../../../utils/Toast";
import { api } from "../../../provider/api";

const SecretaryPage = () => {
    // --- ESTADOS ---
    const [members, setMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [showEditMemberModal, setShowEditMemberModal] = useState(false);
    const [showEditMemberPage, setShowEditMemberPage] = useState(false);
    const [editMemberData, setEditMemberData] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // --- FUNÇÕES ---
    const handleShowEditMemberModal = () => setShowEditMemberModal(!showEditMemberModal);
    const handleSelectMember = (member) => setSelectedMember(member);
    const handleEditMember = (member) => {
        setEditMemberData(member);
        setShowEditMemberPage(true);
    };

    // --- DADOS ---
    const classes = [
        { id: "NONE", name: "Nenhum" },
        { id: "Amigo", name: "Amigo" },
        { id: "Companheiro", name: "Companheiro" },
        { id: "Pesquisador", name: "Pesquisador" },
        { id: "Pioneiro", name: "Pioneiro" },
        { id: "Excursionista", name: "Excursionista" },
        { id: "Guia", name: "Guia" },
        { id: "Agrupadas", name: "Agrupadas" },
        { id: "Desbravadores_Completo", name: "Desbravadores Completo" },
        { id: "Lider", name: "Líder" },
        { id: "Lider_Master", name: "Líder Master" },
        { id: "Lider_Master_Avancado", name: "Líder Master Avançado" },
    ];

    const unities = [
        { id: "NONE", name: "Nenhum" },
        { id: "PANDA", name: "Panda" },
        { id: "FALCAO", name: "Falcão" },
        { id: "LINCE", name: "Lince" },
        { id: "LEAO", name: "Leão" },
        { id: "AGUIA_REAL", name: "Águia Real" },
        { id: "TIGRE", name: "Tigre" },
        { id: "RAPOSA", name: "Raposa" },
        { id: "URSO", name: "Urso" },
        { id: "PANTERA", name: "Pantera" },
        { id: "LOBO", name: "Lobo" },
    ];

    const membersFields = [
        { name: "username", label: "Nome do Membro", placeholder: "Digite o nome", type: "text", isRequired: true },
        { name: "cpf", label: "CPF", placeholder: "XXX.XXX.XXX-XX", type: "text", isRequired: true },
        { name: "contact", label: "Contato", placeholder: "(XX) XXXXX-XXXX", type: "text", isRequired: true },
        { name: "birthDate", label: "Data de Nascimento", placeholder: "DD/MM/AAAA", type: "date", isRequired: true },
        { name: "sex", label: "Sexo", placeholder: "Selecione", type: "select", options: [{ value: "MASCULINO", label: "Masculino" }, { value: "FEMININO", label: "Feminino" }], isRequired: true },
        { name: "address", label: "Endereço", placeholder: "Endereço completo", type: "object", isRequired: true },
        { name: "unitId", label: "ID da Unidade", placeholder: "ID", type: "number", isRequired: true },
        { name: "unit", label: "Unidade", placeholder: "Selecione", type: "object", isRequired: true },
        { name: "classCategory", label: "Categoria", placeholder: "Selecione", type: "select", options: classes.map(c => ({value: c.id, label: c.name})), isRequired: false },
        { name: "unitRole", label: "Função", placeholder: "Selecione", type: "select", options: [{value: "MEMBRO", label: "Membro"}, {value: "CONSELHEIRO", label: "Conselheiro"}], isRequired: false }
    ];

    const [filters, setFilters] = useState({ name: "", unidade: "", classe: "" });

    const handleFilterMembers = async () => {
        const params = {
            name: filters.name || null,
            classCategory: filters.classe === "NONE" ? null : (filters.classe || null),
            unit: filters.unidade === "NONE" ? null : (filters.unidade || null),
        };

        if (!params.name && !params.classCategory && !params.unit) {
            Toast.fire({ icon: "info", title: "Por favor, insira pelo menos um filtro." });
            return;
        }

        try {
            const response = await api.get("/members/filter", { params: { ...params, page: pageNumber, size: pageSize } });
            setMembers(response.data.items || []);
            setTotalItems(response.data.totalItems);
            setTotalPages(response.data.totalPages);
            Toast.fire({ icon: "success", title: "Membros filtrados!" });
            setPageNumber(0);
        } catch (error) {
            Toast.fire({ icon: "error", title: "Erro ao filtrar." });
            console.error(error);
        }
    };

    const handleClearFilters = async () => {
        setFilters({ name: "", classe: "", unidade: "" });
        const response = await api.get("/members/filter", { params: { page: pageNumber, size: pageSize } });
        setMembers(response.data.items || []);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
        Toast.fire({ icon: "info", title: "Filtros limpos!" });
    };

    const fetchMembers = async () => {
        try {
            const response = await api.get("/members/filter", { params: { page: pageNumber, size: pageSize } });
            setMembers(response.data.items || []);
            setTotalItems(response.data.totalItems);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchMembers(); }, [pageNumber]);

    return (
        <div className="h-screen flex flex-col bg-gray-50 overflow-hidden font-sans">
            {/* --- HEADER DE FILTROS --- */}
            <div className="flex-shrink-0 p-4 md:p-6 bg-white shadow-sm z-20 border-b border-gray-200">
                <div className="max-w-[1920px] mx-auto">
                    <h1 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                       
                        Secretaria
                    </h1>
                    
                    <div className="flex flex-col lg:flex-row gap-4 items-end">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-auto flex-1">
                            <Dropdown label="Unidade" options={unities} handleFilters={setFilters} filters={filters} />
                            <Dropdown label="Classe" options={classes} handleFilters={setFilters} filters={filters} />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-[45%]">
                            <div className="relative flex-1 w-full group">
                                <label className="text-gray-600 font-semibold text-sm mb-1 block">Nome do Membro</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaSearch className="text-gray-400 group-focus-within:text-[#FCAE2D] transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-[#FCAE2D] focus:border-[#FCAE2D] block transition-all"
                                        placeholder="Pesquisar..."
                                        value={filters.name}
                                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 pb-[1px]">
                                <button
                                    onClick={handleFilterMembers}
                                    title="Pesquisar"
                                    className="h-11 w-12 flex items-center justify-center rounded-lg bg-[#FCAE2D] text-white hover:bg-[#e0961a] active:scale-95 transition-all shadow-md mt-auto"
                                >
                                    <IoMdSearch size={24} />
                                </button>
                                <button
                                    onClick={handleClearFilters}
                                    title="Limpar Filtros"
                                    className="h-11 w-12 flex items-center justify-center rounded-lg bg-red-100 text-red-500 border border-red-200 hover:bg-red-200 active:scale-95 transition-all mt-auto"
                                >
                                    <FaBroom size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- ÁREA PRINCIPAL --- */}
            <div className="flex-1 overflow-hidden relative max-w-[1920px] w-full mx-auto p-4 md:p-6">
                <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    
                    {/* --- CABEÇALHO DA TABELA (FIXO) ---
                       Colocado ANTES da div de scroll para garantir visibilidade permanente.
                    */}
                    <div className="hidden md:flex items-center bg-gray-100 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider shadow-sm flex-shrink-0">
                        <div className="w-[10%] text-center">Foto</div>
                        <div className="w-[30%]">Nome / Info</div>
                        <div className="w-[25%]">Unidade</div>
                        <div className="w-[25%]">Classe</div>
                        <div className="w-[10%] text-center">Ações</div>
                    </div>

                    {/* --- ÁREA DE SCROLL (LISTA) --- */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4 space-y-3">
                            {members.length > 0 ? (
                                members.map((member) => (
                                    <MemberCard
                                        key={member.id}
                                        item={member}
                                        editFields={membersFields}
                                        onEdit={() => { setEditMemberData(member); setShowEditMemberPage(true); }}
                                        onDelete={fetchMembers}
                                    />
                                ))
                            ) : (
                                /* Estado Vazio - Aparece abaixo do cabeçalho */
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="bg-gray-50 p-4 rounded-full mb-4">
                                        <FaSearch size={32} className="text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Nenhum membro encontrado</h3>
                                    <p className="text-gray-500 max-w-sm mt-1">
                                        Use os filtros acima para encontrar desbravadores.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer / Paginação (Fixo na parte inferior) */}
                    <div className="flex-shrink-0 bg-gray-50 border-t border-gray-200 px-6 py-4 z-20">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <span className="text-sm text-gray-600">
                                Mostrando <span className="font-semibold text-gray-900">{members.length}</span> de <span className="font-semibold text-gray-900">{totalItems}</span>
                            </span>
                            
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPageNumber((p) => Math.max(p - 1, 0))}
                                    disabled={pageNumber === 0}
                                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600"
                                >
                                    <FaChevronLeft />
                                </button>
                                <span className="text-sm font-medium px-2">
                                    Página {pageNumber + 1} de {totalPages}
                                </span>
                                <button
                                    onClick={() => setPageNumber((p) => p + 1)}
                                    disabled={pageNumber + 1 === totalPages}
                                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODAIS --- */}
            {isModalOpen && selectedMember && <MemberModalController member={selectedMember} onClose={() => setIsModalOpen(false)} />}
            {editModalOpen && <EditModal onClose={() => setEditModalOpen(false)} editingItem={selectedMember} onSubmit={"handleEditMember"} title="Editar" fields={membersFields} />}
            
            {showEditMemberPage && editMemberData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative animate-fadeIn">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-bold text-gray-800">Editar Membro</h2>
                            <button onClick={() => setShowEditMemberPage(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <span className="text-2xl leading-none">&times;</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            <AddMemberPage initialData={editMemberData} editMode={true} onClose={() => setShowEditMemberPage(false)} onSave={() => { setShowEditMemberPage(false); fetchMembers(); }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Dropdown = ({ label, options, handleFilters, filters }) => {
    const key = label.toLowerCase();
    return (
        <div className="w-full">
            <label className="text-gray-600 font-semibold text-sm mb-1 block">{label}</label>
            <div className="relative">
                <select
                    className="w-full h-11 px-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-[#FCAE2D] focus:border-[#FCAE2D] block appearance-none cursor-pointer transition-all"
                    value={filters[key]}
                    onChange={(e) => handleFilters({ ...filters, [key]: e.target.value })}
                >
                    <option value="">Selecione...</option>
                    {options && options.map((opt, i) => <option key={i} value={opt.id}>{opt.name}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
            </div>
        </div>
    );
};

export default SecretaryPage;