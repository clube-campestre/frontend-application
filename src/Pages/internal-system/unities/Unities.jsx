import React, { useState, useEffect, useRef } from "react";
import { api } from "../../../provider/api";
import Toast from "../../../utils/Toast";

// Componentes
import { MemberCard } from "../../../components/member-card/MemberCard";
import EditModal from "../../../components/edit-modal/EditModal";
import MemberModal from "../../../components/member-manage/MemberModal";

// Imagens
import loboImage from "../../../assets/images/lobo.png";
import falcaoImage from "../../../assets/images/falcao.png";
import pandaImage from "../../../assets/images/panda.png";
import panteraImage from "../../../assets/images/pantera.png";
import raposaImage from "../../../assets/images/raposa.png";
import tigreImage from "../../../assets/images/tigre.png";
import ursoImage from "../../../assets/images/urso.png";
import aguiaRealImage from "../../../assets/images/aguia-real.png";
import linceImage from "../../../assets/images/lince.png";
import leaoImage from "../../../assets/images/leao.png";

// Ícones
import { LuCirclePlus, LuTrophy, LuUser } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaUsersSlash } from "react-icons/fa";

const Unities = () => {
    // --- ESTADOS ---
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

    // Ref para o carrossel de unidades
    const scrollRef = useRef(null);

    // --- HANDLERS ---
    const handleShowEditMemberModal = () => setShowEditMemberModal(!showEditMemberModal);
    const handleSelectMember = (member) => setSelectedMember(member);
    const handleShowAddMemberModal = () => setShowAddMemberModal((prev) => !prev);

    // Função de Scroll do Carrossel
    const scrollUnits = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            // No mobile, rola a largura da tela (mostrando o próximo grupo de 3)
            // No desktop, rola uma quantidade fixa
            const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // --- DADOS ---
    const unities = [
        { id: 1, name: "Panda", formatedName: "PANDA", logo: pandaImage },
        { id: 2, name: "Falcão", formatedName: "FALCAO", logo: falcaoImage },
        { id: 3, name: "Lince", formatedName: "LINCE", logo: linceImage },
        { id: 4, name: "Leão", formatedName: "LEAO", logo: leaoImage },
        { id: 5, name: "Águia Real", formatedName: "AGUIA_REAL", logo: aguiaRealImage },
        { id: 6, name: "Tigre", formatedName: "TIGRE", logo: tigreImage },
        { id: 7, name: "Raposa", formatedName: "RAPOSA", logo: raposaImage },
        { id: 8, name: "Urso", formatedName: "URSO", logo: ursoImage },
        { id: 9, name: "Pantera", formatedName: "PANTERA", logo: panteraImage },
        { id: 10, name: "Lobo", formatedName: "LOBO", logo: loboImage },
    ];

    const unitPointsFields = [
        {
            name: "unit", label: "Unidade", placeholder: "Selecione", type: "select", isRequired: true,
            options: unities.map((unit) => ({ value: unit.id, label: unit.name })), selectedOption: "Selecione",
        },
        {
            name: "isSum", label: "Ação", placeholder: "Selecione", type: "select", isRequired: true,
            options: [{ value: true, label: "Adicionar Pontos" }, { value: false, label: "Remover Pontos" }], selectedOption: "Selecione",
        },
        { name: "points", label: "Pontos", placeholder: "Qtd", type: "number", isRequired: true },
    ];

    const membersFields = [
        { name: "username", label: "Nome", placeholder: "Nome", type: "text", isRequired: true },
        { name: "cpf", label: "CPF", placeholder: "CPF", type: "text", isRequired: true },
        { name: "birthDate", label: "Data Nasc.", placeholder: "Data", type: "date", isRequired: true },
        { name: "contact", label: "Contato", placeholder: "Contato", type: "text", isRequired: true },
        { name: "motherName", label: "Mãe", placeholder: "Nome", type: "text", isRequired: true },
        { name: "motherContact", label: "Contato Mãe", placeholder: "Contato", type: "text", isRequired: true },
        { name: "fatherName", label: "Pai", placeholder: "Nome", type: "text", isRequired: true },
        { name: "fatherContact", label: "Contato Pai", placeholder: "Contato", type: "text", isRequired: true },
        { name: "responsibleName", label: "Responsável", placeholder: "Nome", type: "text", isRequired: true },
        { name: "responsibleContact", label: "Contato Resp.", placeholder: "Contato", type: "text", isRequired: true },
    ];

    // --- API ---
    const fetchMembers = async () => {
        try {
            const allMembersResponse = await api.get("/members");
            setAllMembers(allMembersResponse.data || []);
            if (selectedUnit === null) {
                const response = await api.get(`/members/filter`, { params: { page: pageNumber, size: pageSize } });
                setMembers(response.data.items || []);
                setTotalItems(response.data.totalItems);
                setTotalPages(response.data.totalPages);
            } else {
                const response = await api.get(`/members/unit`, { params: { unitName: selectedUnitName, page: pageNumber, size: pageSize } });
                setMembers(response.data.members || []);
                setUnitPoints(response.data.score);
                setUnitCounselor(response.data.counselorName);
                setTotalItems(response.data.totalItems);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.error("Error:", error);
            setMembers([]);
            setUnitCounselor(null);
            setUnitPoints(null);
            Toast.fire({ icon: "error", title: "Erro ao buscar dados." });
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [selectedUnit, pageNumber]);

    const handleEditMember = async (member) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(member));
        try {
            const response = await api.put(`/members`, formData);
            if (response.status === 200) {
                Toast.fire({ icon: "success", title: "Editado com sucesso!" });
                setShowEditMemberModal(false);
                fetchMembers();
            }
        } catch (error) {
            Toast.fire({ icon: "error", title: "Erro ao editar." });
        }
    };

    const handleUpdateMemberUnit = async (membersList) => {
        try {
            await Promise.all(
                membersList.map(async (member) => {
                    const response = await api.put(
                        `members/unit-and-class/${member.cpf}`,
                        { unitName: selectedUnitName, unitRole: member.unitRole, classRole: member.classRole, classCategory: member.classCategory }
                    );
                    if (response.status === 200) Toast.fire({ icon: "success", title: `Membro adicionado!` });
                    handleShowAddMemberModal();
                    fetchMembers();
                })
            );
        } catch (error) {
            Toast.fire({ icon: "error", title: `Erro ao adicionar.` });
        }
    };

    const handleAddUnitPoint = async (data) => {
        if (!data.unit || !data.points) return Toast.fire({ icon: "error", title: "Dados inválidos." });
        if (data.points < 0) return Toast.fire({ icon: "error", title: "A pontuação não pode ser negativa." });

        try {
            const response = await api.post("/units/score", {}, {
                params: { id: data.unit, score: data.points, isSum: data.isSum }
            });
            if (response.status === 200) {
                Toast.fire({ icon: "success", title: "Pontuação atualizada!" });
                if (selectedUnit === parseInt(data.unit)) fetchMembers();
            }
        } catch (error) {
            Toast.fire({ icon: "error", title: "Erro ao alterar pontuação." });
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50 overflow-hidden font-sans">
            
            {/* --- TOP BAR: CARROSSEL DE UNIDADES --- */}
            <div className="flex-shrink-0 bg-white shadow-sm z-20 border-b border-gray-200 relative">
                <div className="max-w-[1920px] mx-auto py-3">
                    <div className="px-4 mb-2 flex justify-between items-end">
                        <h2 className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                            Selecione a unidade desejada
                        </h2>
                        {/* Indicador visual de scroll para UX */}
                       
                    </div>
                    
                    <div className="relative group px-2 md:px-8">
                        {/* Botão Esquerda */}
                        <button 
                            onClick={() => scrollUnits('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-[#FCAE2D] transition-all backdrop-blur-sm border border-gray-100"
                        >
                            <FaChevronLeft size={14} />
                        </button>

                        {/* Container Scrollável */}
                        <div 
                            ref={scrollRef}
                            className="flex overflow-x-auto gap-0 scroll-smooth no-scrollbar snap-x snap-mandatory"
                        >
                            {unities.map((unit) => {
                                const isSelected = selectedUnit === unit.id;
                                return (
                                    // Mobile: w-1/3 (3 itens). Desktop: w-auto (fluido)
                                    <div key={unit.id} className="min-w-[33.33%] md:min-w-[100px] snap-start flex justify-center py-2">
                                        <button
                                            onClick={() => {
                                                setSelectedUnit(isSelected ? null : unit.id);
                                                setSelectedUnitName(selectedUnitName === unit.formatedName ? null : unit.formatedName);
                                                setPageNumber(0);
                                            }}
                                            className={`
                                                flex flex-col items-center gap-2 outline-none transition-all duration-300 group/item
                                                hover:-translate-y-2 hover:scale-110
                                                ${isSelected ? "-translate-y-1 scale-105" : "opacity-70 hover:opacity-100"}
                                            `}
                                        >
                                            <div className={`
                                                relative p-1.5 rounded-full transition-all duration-300
                                                ${isSelected 
                                                    ? "border-2 border-[#FCAE2D] shadow-[0_4px_15px_rgba(252,174,45,0.4)] bg-white" 
                                                    : "border-2 border-transparent group-hover/item:border-[#FCAE2D] group-hover/item:shadow-lg bg-gray-50"
                                                }
                                            `}>
                                                <img 
                                                    src={unit.logo || "/placeholder.svg"} 
                                                    alt={unit.name} 
                                                    className={`h-10 w-10 md:h-14 md:w-14 object-contain transition-all duration-300 ${!isSelected && "grayscale group-hover/item:grayscale-0"}`} 
                                                />
                                            </div>
                                            <span className={`
                                                text-[10px] md:text-xs font-bold transition-colors duration-300
                                                ${isSelected ? "text-[#FCAE2D]" : "text-gray-400 group-hover/item:text-[#FCAE2D]"}
                                            `}>
                                                {unit.name}
                                            </span>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Botão Direita */}
                        <button 
                            onClick={() => scrollUnits('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-[#FCAE2D] transition-all backdrop-blur-sm border border-gray-100"
                        >
                            <FaChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- DASHBOARD & ACTIONS --- */}
            <div className="flex-shrink-0 bg-gray-50 p-3 md:p-6">
                <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-4">
                    
                    {/* Grid Mobile (2 cols) / Flex Desktop */}
                    <div className="grid grid-cols-2 md:flex md:flex-row gap-3 flex-1">
                        <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-center md:gap-4 text-center md:text-left">
                            <div className="bg-amber-100 p-2 md:p-3 rounded-full text-[#FCAE2D] mb-2 md:mb-0">
                                <LuTrophy className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold">Pontuação</p>
                                <p className="text-lg md:text-2xl font-bold text-gray-800">
                                    {selectedUnit ? (unitPoints || 0) : "-"}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-center md:gap-4 text-center md:text-left flex-1">
                            <div className="bg-blue-100 p-2 md:p-3 rounded-full text-blue-600 mb-2 md:mb-0">
                                <LuUser className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div className="w-full overflow-hidden">
                                <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold">Conselheiro(a)</p>
                                <p className="text-sm md:text-lg font-bold text-gray-800 truncate">
                                    {selectedUnit ? (unitCounselor || "Indefinido") : "Selecione..."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-2 w-full xl:w-auto">
                        {selectedUnit && (
                            <button
                                onClick={handleShowAddMemberModal}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-[#FCAE2D] text-white rounded-xl hover:bg-[#e0961a] active:scale-95 transition-all font-bold text-xs md:text-sm shadow-md"
                            >
                                <LuCirclePlus size={16} /> <span className="hidden xs:inline">Adicionar</span>
                            </button>
                        )}
                        <button
                            onClick={() => setShowAddUnitPointModal(true)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-[#FCAE2D] hover:text-[#FCAE2D] transition-all font-bold text-xs md:text-sm shadow-sm"
                        >
                            <LuTrophy size={16} /> <span className="hidden xs:inline">Pontos</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- LISTA (Scroll Interno) --- */}
            <div className="flex-1 overflow-hidden relative max-w-[1920px] w-full mx-auto px-3 md:px-6 pb-3">
                <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header Desktop */}
                    <div className="hidden md:flex items-center bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <div className="w-[10%] text-center">Foto</div>
                        <div className="w-[30%] pl-4">Nome / Info</div>
                        <div className="w-[25%] pl-3">Função</div>
                        <div className="w-[25%] pl-3">Contato</div>
                        <div className="w-[10%] text-center">Ações</div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 md:p-4 custom-scrollbar bg-gray-50/30">
                        <div className="space-y-2">
                            {members.length > 0 ? (
                                members.map((member) => (
                                    <MemberCard
                                        key={member.id}
                                        item={member}
                                        editFields={membersFields}
                                        onEdit={() => { setSelectedMember(member); setShowEditMemberModal(true); }}
                                    />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                                    <div className="bg-gray-100 p-4 rounded-full mb-3">
                                        <FaUsersSlash size={24} className="text-gray-400" />
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-900">Lista Vazia</h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {selectedUnit ? "Sem membros." : "Selecione uma unidade."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    {members.length > 0 && (
                        <div className="flex-shrink-0 bg-white border-t border-gray-200 px-4 py-2 z-10">
                            <div className="flex flex-row items-center justify-between gap-2">
                                <span className="text-[10px] text-gray-500">Total: {totalItems}</span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setPageNumber((p) => Math.max(p - 1, 0))} disabled={pageNumber === 0} className="p-1.5 rounded-md bg-gray-100 disabled:opacity-50 text-gray-600"><FaChevronLeft size={10} /></button>
                                    <span className="text-xs font-medium text-gray-700">{pageNumber + 1}/{totalPages}</span>
                                    <button onClick={() => setPageNumber((p) => p + 1)} disabled={pageNumber + 1 === totalPages} className="p-1.5 rounded-md bg-gray-100 disabled:opacity-50 text-gray-600"><FaChevronRight size={10} /></button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODAIS --- */}
            {showAddUnitPointModal && <EditModal title="Pontuação" fields={unitPointsFields} onClose={() => setShowAddUnitPointModal(false)} onSubmit={(data) => { handleAddUnitPoint(data); setShowAddUnitPointModal(false); }} />}
            {showAddMemberModal && <MemberModal members={allMembers} unitId={selectedUnit} unitName={selectedUnitName} isOpen={showAddMemberModal} onClose={handleShowAddMemberModal} onConfirm={(selectedMembers) => handleUpdateMemberUnit(selectedMembers)} />}
            {showEditMemberModal && selectedMember && <EditModal editingItem={selectedMember} onClose={handleShowEditMemberModal} onSubmit={handleEditMember} title="Editar" fields={membersFields} />}
        </div>
    );
};

export default Unities;