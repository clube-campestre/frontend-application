import React, { useState, useEffect } from "react";
import { getUser } from "../../../utils/authStorage";
import { getAllMembers, getMembersByFilter, getMembersByClass, updateMemberUnitAndClass } from "../../../services/membersService";
import Toast from "../../../utils/Toast";

// Imagens
import amigoImage from "../../../assets/images/amigo3.png";
import companheiroImage from "../../../assets/images/logoVermelho.png";
import pesquisadorImage from "../../../assets/images/logoVerde.svg";
import pioneiroImage from "../../../assets/images/pioneiro 3.svg";
import excursionistaImage from "../../../assets/images/excursionista 3.svg";
import guiaImage from "../../../assets/images/guia 3.svg";

// Ícones e Componentes
import { LuCirclePlus, LuUser, LuUsers } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { MemberCard } from "../../../components/member-card/MemberCard";
import MemberModal from "../../../components/member-manage/MemberModal";
import EditModal from "../../../components/edit-modal/EditModal";
import Pagination from "../../../components/pagination/Pagination";
import InfoCard from "../../../components/info-card/InfoCard";

const Classes = () => {
    // --- ESTADOS (MANTIDOS) ---
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

    // --- NOVO ESTADO PARA CARROSSEL MOBILE ---
    const [currentMobileSlide, setCurrentMobileSlide] = useState(0);

    // --- DADOS ESTÁTICOS ---
    const classes = [
        { id: 1, name: "Amigo", logo: amigoImage },
        { id: 2, name: "Companheiro", logo: companheiroImage },
        { id: 3, name: "Pesquisador", logo: pesquisadorImage },
        { id: 4, name: "Pioneiro", logo: pioneiroImage },
        { id: 5, name: "Excursionista", logo: excursionistaImage },
        { id: 6, name: "Guia", logo: guiaImage },
    ];

    // --- FUNÇÃO AUXILIAR PARA DIVIDIR O ARRAY EM GRUPOS DE 3 (MOBILE) ---
    const chunkArray = (array, size) => {
        const chunked = [];
        for (let i = 0; i < array.length; i += size) {
            chunked.push(array.slice(i, i + size));
        }
        return chunked;
    };
    
    // Cria os grupos de 3 para o mobile
    const mobileChunks = chunkArray(classes, 3);

    const membersFields = [
        { name: "username", label: "Nome", placeholder: "Nome", type: "text", isRequired: true },
        { name: "cpf", label: "CPF", placeholder: "CPF", type: "text", isRequired: true },
        { name: "birthDate", label: "Nascimento", placeholder: "Data", type: "date", isRequired: true },
        { name: "contact", label: "Contato", placeholder: "Contato", type: "text", isRequired: true },
        { name: "motherName", label: "Mãe", placeholder: "Nome da mãe", type: "text", isRequired: true },
        { name: "motherContact", label: "Contato Mãe", placeholder: "Contato", type: "text", isRequired: true },
        { name: "fatherName", label: "Pai", placeholder: "Nome do pai", type: "text", isRequired: true },
        { name: "fatherContact", label: "Contato Pai", placeholder: "Contato", type: "text", isRequired: true },
        { name: "responsibleName", label: "Responsável", placeholder: "Nome", type: "text", isRequired: true },
        { name: "responsibleContact", label: "Contato Resp.", placeholder: "Contato", type: "text", isRequired: true },
    ];

    // --- HANDLERS ---
    const handleShowEditMemberModal = () => setShowEditMemberModal(!showEditMemberModal);
    const handleShowAddMemberModal = () => setShowAddMemberModal((prev) => !prev);

    // Navegação do Carrossel Mobile
    const nextMobileSlide = () => {
        setCurrentMobileSlide((prev) => (prev + 1) % mobileChunks.length);
    };
    const prevMobileSlide = () => {
        setCurrentMobileSlide((prev) => (prev - 1 + mobileChunks.length) % mobileChunks.length);
    };

    // --- API FUNCTIONS (MANTIDAS) ---
    const fetchMembers = async () => {
        try {
            const allMembersResponse = await getAllMembers();
            setAllMembers(allMembersResponse || []);
            if (selectedClassName === null) {
                const response = await getMembersByFilter({ page: pageNumber, size: pageSize });
                setMembers(response?.items || []);
                setTotalItems(response?.totalItems || 0);
                setTotalPages(response?.totalPages || 1);
            } else {
                const response = await getMembersByClass(selectedClassName.toUpperCase(), pageNumber, pageSize);
                setMembers(response?.members || []);
                setTotalItems(response?.totalItems || 0);
                setTotalPages(response?.totalPages || 1);
                setClassInstructor(response?.instructorName || null);
            }
        } catch (error) {
            setMembers([]);
            setClassInstructor(null);
            setTotalItems(0);
            Toast.fire({ icon: "error", title: `${error.response?.data?.message || "Erro ao buscar membros."}` });
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [selectedClassName, pageNumber]);

    const handleEditMember = async (member) => {
        // Apenas permitir edição de unidade e classe nesta tela
        try {
            const payload = {
                unitName: member.unitName || member.unit?.surname,
                unitRole: member.unitRole,
                classRole: member.classRole,
                classCategory: member.classCategory || selectedClassName?.toUpperCase(),
            };
            const response = await updateMemberUnitAndClass(member.cpf, payload);
            if (response) {
                Toast.fire({ icon: "success", title: "Membro editado com sucesso!" });
                setShowEditMemberModal(false);
                fetchMembers();
            }
        } catch (error) {
            Toast.fire({ icon: "error", title: "Erro ao editar membro." });
        }
    };

    const handleUpdateMemberUnit = async (membersList) => {
        try {
            await Promise.all(
                membersList.map(async (member) => {
                    const payload = {
                        classCategory: selectedClassName.toUpperCase(),
                        classRole: member.classRole,
                        unitRole: member.unitRole,
                        unitName: member.unit.surname,
                    };
                    const response = await updateMemberUnitAndClass(member.cpf, payload);
                    if (response) {
                        Toast.fire({ icon: "success", title: `Membro adicionado à classe ${selectedClassName}!` });
                    }
                })
            );
            handleShowAddMemberModal();
            // Recarregar membros da classe após adicionar
            fetchMembers();
        } catch (error) {
            Toast.fire({ icon: "error", title: `Erro ao adicionar membro.` });
        }
    };

    // --- COMPONENTE DE ITEM DA CLASSE (Reutilizável para Mobile e Desktop) ---
    const ClassItem = ({ unity, isSelected, onClick, className = "" }) => (
        <button
            onClick={onClick}
            className={`
                group flex flex-col items-center gap-2 outline-none
                transition-all duration-300 ease-out
                hover:scale-105 hover:-translate-y-1 
                ${isSelected ? "scale-105" : "opacity-70 hover:opacity-100"}
                ${className}
            `}
        >
            <div className={`
                relative p-2 rounded-full transition-all duration-300 h-14 w-14 md:h-16 md:w-16 flex items-center justify-center
                ${isSelected 
                    ? "border-2 border-[#FCAE2D] shadow-[0_0_15px_rgba(252,174,45,0.4)] bg-white" 
                    : "border-2 border-transparent group-hover:border-[#FCAE2D]/30 bg-gray-50/80"
                }
            `}>
                <img 
                    src={unity.logo || "/placeholder.svg"} 
                    alt={unity.name} 
                    className={`h-full w-full object-contain transition-all duration-300 ${!isSelected && "grayscale group-hover:grayscale-0"}`} 
                />
            </div>
            <span className={`
                text-[10px] md:text-xs font-bold transition-colors duration-300 text-center leading-tight
                ${isSelected ? "text-[#FCAE2D]" : "text-gray-500 group-hover:text-[#FCAE2D]"}
            `}>
                {unity.name}
            </span>
        </button>
    );


    // --- RENDER ---
    return (
        <div className="h-screen flex flex-col bg-gray-50 overflow-hidden font-sans">
            
            {/* --- TOP BAR: SELETOR DE CLASSES --- */}
            <div className="flex-shrink-0 bg-white shadow-sm z-20 border-b border-gray-200">
                <div className="max-w-[1920px] mx-auto px-4 py-3 md:py-4">
                    <h2 className="text-blue-900 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-3 md:mb-4 text-center md:text-left">
                        Selecione a Classe desejada
                    </h2>
                    
                    {/* === VERSÃO MOBILE: CARROSSEL PAGINADO (3 por vez com setas) === */}
                    <div className="flex md:hidden items-center justify-between relative px-2">
                        {/* Seta Esquerda */}
                        <button 
                            onClick={prevMobileSlide}
                            className={`p-2 rounded-full bg-gray-50 border border-gray-100 shadow-sm text-gray-400 hover:text-[#FCAE2D] transition-all ${mobileChunks.length <= 1 ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                            <FaChevronLeft size={14} />
                        </button>

                        {/* Grid de 3 Itens */}
                        <div className="grid grid-cols-3 gap-2 flex-1 mx-2 justify-items-center">
                            {mobileChunks[currentMobileSlide] && mobileChunks[currentMobileSlide].map((unity) => (
                                <ClassItem
                                    key={unity.id}
                                    unity={unity}
                                    isSelected={selectedClassName === unity.name}
                                    onClick={() => {
                                        setSelectedClassName(selectedClassName === unity.name ? null : unity.name);
                                        setPageNumber(0);
                                    }}
                                />
                            ))}
                        </div>

                        {/* Seta Direita */}
                        <button 
                            onClick={nextMobileSlide}
                            className={`p-2 rounded-full bg-gray-50 border border-gray-100 shadow-sm text-gray-400 hover:text-[#FCAE2D] transition-all ${mobileChunks.length <= 1 ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                            <FaChevronRight size={14} />
                        </button>
                         {/* Indicador de Página Mobile (Opcional) */}
                         {mobileChunks.length > 1 && (
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                                {mobileChunks.map((_, index) => (
                                    <div key={index} className={`h-1 w-1 rounded-full ${index === currentMobileSlide ? 'bg-[#FCAE2D]' : 'bg-gray-300'}`} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* === VERSÃO DESKTOP: SCROLL HORIZONTAL LIVRE === */}
                    <div className="hidden md:flex overflow-x-auto gap-6 pb-2 no-scrollbar snap-x px-1">
                        {classes.map((unity) => (
                            <ClassItem
                                key={unity.id}
                                unity={unity}
                                isSelected={selectedClassName === unity.name}
                                onClick={() => {
                                    setSelectedClassName(selectedClassName === unity.name ? null : unity.name);
                                    setPageNumber(0);
                                }}
                                className="min-w-[90px] snap-center"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* --- DASHBOARD DE INFORMAÇÕES --- */}
            <div className="flex-shrink-0 bg-gray-50 p-3 md:p-6">
                <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-4">
                    
                    {/* Info Cards (Empilhados no mobile, lado a lado no desktop) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                        {/* Classe Selecionada */}
                        <InfoCard
                            icon={LuUsers}
                            label="Classe Atual"
                            value={selectedClassName || "Todas"}
                            iconBgColor="bg-amber-100"
                            iconColor="text-[#FCAE2D]"
                        />

                        {/* Instrutor */}
                        <InfoCard
                            icon={LuUser}
                            label="Instrutor"
                            value={classInstructor || "N/A"}
                            iconBgColor="bg-blue-100"
                            iconColor="text-blue-600"
                        />
                    </div>

                    {/* Botão de Ação */}
                    <div className="w-full lg:w-auto flex items-center">
                        {selectedClassName && getUser().access !== "SUPERVISOR" && getUser().access !== "TESOURARIA" && (
                            <button
                                onClick={handleShowAddMemberModal}
                                className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FCAE2D] text-white rounded-xl hover:bg-[#e0961a] active:scale-95 transition-all font-bold text-sm shadow-md"
                            >
                                <LuCirclePlus size={18} /> <span className="sm:hidden">Adicionar</span> <span className="hidden sm:inline">Adicionar Membro</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* --- LISTA DE MEMBROS (Main Content - Scroll Interno) --- */}
            <div className="flex-1 overflow-hidden relative max-w-[1920px] w-full mx-auto px-3 md:px-6 pb-3">
                <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    
                    {/* Header da Tabela (Apenas Desktop) */}
                    <div className="hidden md:flex items-center bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <div className="w-[10%] text-center">Foto</div>
                        <div className="w-[30%] pl-4">Nome / Info</div>
                        <div className="w-[25%] pl-3">Função</div>
                        <div className="w-[25%] pl-3">Contato</div>
                        <div className="w-[10%] text-center">Ações</div>
                    </div>

                    {/* Lista Scrollável */}
                    <div className="flex-1 overflow-y-auto p-3 md:p-4 custom-scrollbar bg-gray-50/30">
                        <div className="space-y-2 md:space-y-3">
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
                                <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center h-full">
                                    <div className="bg-gray-100 p-4 rounded-full mb-3">
                                        <LuUsers size={28} className="text-gray-400" />
                                    </div>
                                    <h3 className="text-base md:text-lg font-medium text-gray-900">Lista Vazia</h3>
                                    <p className="text-sm text-gray-500 max-w-xs mt-1">
                                        {selectedClassName ? "Esta classe ainda não possui membros." : "Selecione uma classe acima."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer / Paginação */}
                    {members.length > 0 && (
                        <div className="flex-shrink-0 bg-white border-t border-gray-200 px-4 py-3 z-10">
                            <div className="flex flex-row items-center justify-between gap-4">
                                <span className="text-[10px] md:text-xs text-gray-500">
                                    Total: <strong className="text-gray-800">{totalItems}</strong>
                                </span>
                                
                                <Pagination
                                    pageNumber={pageNumber}
                                    totalPages={totalPages}
                                    onPageChange={setPageNumber}
                                    totalItems={totalItems}
                                    itemsPerPage={members.length}
                                    className="justify-end"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODAIS --- */}
            {showAddMemberModal && (
                <MemberModal
                    members={allMembers}
                    className={selectedClassName}
                    isOpen={showAddMemberModal}
                    onClose={handleShowAddMemberModal}
                    onConfirm={(selectedMembers) => handleUpdateMemberUnit(selectedMembers)}
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
    );
};

export default Classes;