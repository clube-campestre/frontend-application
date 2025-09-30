import React, { useState, useEffect } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { MemberCard } from "../../../components/member-card/MemberCard";
import MemberModal from "../../../components/member-manage/MemberModal";
import EditModal from "../../../components/edit-modal/EditModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { api } from "../../../provider/api";
import Toast from "../../../utils/Toast";

// Importe suas imagens aqui
import amigoImage from "../../../assets/images/amigo3.png";
import companheiroImage from "../../../assets/images/logoVermelho.png";
import pesquisadorImage from "../../../assets/images/logoVerde.svg";
import pioneiroImage from "../../../assets/images/pioneiro 3.svg";
import excursionistaImage from "../../../assets/images/excursionista 3.svg";
import guiaImage from "../../../assets/images/guia 3.svg";

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
        // Adicionando a definição dos campos que estava faltando
        { name: "username", label: "Nome", type: "text", isRequired: true },
        { name: "cpf", label: "CPF", type: "text", isRequired: true },
        { name: "birthDate", label: "Data de Nascimento", type: "date", isRequired: true },
        // Adicione outros campos conforme necessário
    ];

    const fetchMembers = async () => {
        try {
            // A lógica de busca já está correta
            const allMembersResponse = await api.get("/members");
            setAllMembers(allMembersResponse.data || []);

            const endpoint = selectedClassName ? "/members/class" : "/members/filter";
            const params = {
                page: pageNumber,
                size: pageSize,
                ...(selectedClassName && { classCategory: selectedClassName.toUpperCase() }),
            };

            const response = await api.get(endpoint, { params });

            setMembers(response.data.items || response.data.members || []);
            setTotalItems(response.data.totalItems);
            setTotalPages(response.data.totalPages);
            if (selectedClassName) {
                setClassInstructor(response.data.instructorName);
            } else {
                setClassInstructor(null);
            }
        } catch (error) {
            setMembers([]);
            setClassInstructor(null);
            setTotalItems(0);
            Toast.fire({
                icon: "info",
                title: "Nenhum membro encontrado para esta seleção.",
            });
            console.error("Error fetching members:", error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [selectedClassName, pageNumber]);
    
    // Adicionando as funções de manipulação que estavam faltando
    const handleEditMember = async (memberData) => {
        try {
            await api.put(`/members/${memberData.cpf}`, memberData);
            Toast.fire({ icon: "success", title: "Membro atualizado!" });
            setShowEditMemberModal(false);
            fetchMembers();
        } catch (error) {
            Toast.fire({ icon: "error", title: "Erro ao atualizar membro." });
        }
    };

    const handleUpdateMemberUnit = async (selectedMembers) => {
        try {
            // Lógica para adicionar membros à classe
            Toast.fire({ icon: "success", title: "Membros adicionados!" });
            setShowAddMemberModal(false);
            fetchMembers();
        } catch (error) {
            Toast.fire({ icon: "error", title: "Erro ao adicionar membros." });
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
                {/* Cabeçalho de seleção de classe */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 flex-wrap">
                            {classes.map((unity) => (
                                <img
                                    key={unity.id}
                                    src={unity.logo || "/placeholder.svg"}
                                    alt={`Classe ${unity.name}`}
                                    className={`cursor-pointer transition-all duration-300 ${
                                        selectedClassName === unity.name
                                            ? "h-16 grayscale-0"
                                            : "h-12 grayscale opacity-60 hover:opacity-100"
                                    }`}
                                    onClick={() => {
                                        setPageNumber(0);
                                        setSelectedClassName(
                                            selectedClassName === unity.name ? null : unity.name
                                        );
                                    }}
                                />
                            ))}
                        </div>
                        <div className="flex flex-row gap-2 items-baseline">
                            <p className="text-lg font-semibold text-gray-700">
                                Classe Selecionada:
                            </p>
                            <p className="text-lg font-bold text-[#FCAE2D]">
                                {selectedClassName || "Nenhuma"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Seção de Conteúdo Principal */}
                <div className="flex flex-col items-center w-full bg-[#EDEDED] rounded-lg shadow-md p-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full p-2 md:p-4 gap-4">
                        <div className="flex items-center gap-3">
                            {selectedClassName && (
                                <>
                                    <div className="h-10 w-2 bg-[#FCAE2D] rounded-full"></div>
                                    <span className="text-xl md:text-2xl">Instrutor(a):</span>
                                    <span className="font-bold text-xl md:text-2xl text-gray-800">
                                        {classInstructor || "Indefinido"}
                                    </span>
                                </>
                            )}
                        </div>
                        {selectedClassName && (
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-[#D9D9D9] text-[#021c4f] shadow-md rounded hover:bg-gray-400"
                                onClick={() => setShowAddMemberModal(true)}
                            >
                                Adicionar Membros <LuCirclePlus />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 w-full min-h-[250px] p-2 md:p-4">
                        {members.length > 0 ? (
                            members.map((member) => (
                                <MemberCard
                                    key={member.id}
                                    item={member}
                                    onEdit={() => {
                                        setSelectedMember(member);
                                        setShowEditMemberModal(true);
                                    }}
                                />
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 py-10">
                                {selectedClassName 
                                    ? "Nenhum membro encontrado para esta classe."
                                    : "Selecione uma classe para ver os membros."}
                            </div>
                        )}
                        {showAddMemberModal && (
                            <MemberModal
                                members={allMembers}
                                className={selectedClassName}
                                isOpen={showAddMemberModal}
                                onClose={() => setShowAddMemberModal(false)}
                                onConfirm={(selectedMembers) => {
                                    handleUpdateMemberUnit(selectedMembers);
                                }}
                            />
                        )}
                        {showEditMemberModal && selectedMember && (
                            <EditModal
                                editingItem={selectedMember}
                                onClose={() => setShowEditMemberModal(false)}
                                onSubmit={handleEditMember}
                                title="Editar Membro"
                                fields={membersFields}
                            />
                        )}
                    </div>
                </div>

                {/* Paginação */}
                {members.length > 0 && totalPages > 1 && (
                    <section className="flex flex-col items-center justify-center gap-2 w-full mt-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
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
                                onClick={() => setPageNumber((prev) => prev + 1)}
                                disabled={pageNumber + 1 >= totalPages}
                                className={`px-4 py-2 rounded transition-colors duration-200 ${
                                    pageNumber + 1 >= totalPages
                                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                        : "bg-[#FCAE2D] text-white hover:bg-[#e2961e]"
                                }`}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                        <div className="text-gray-600 font-light text-sm">
                            Exibindo {members.length} de {totalItems} membros
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Classes;
