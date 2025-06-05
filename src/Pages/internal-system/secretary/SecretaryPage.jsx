import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MemberCard } from "../../../components/member-card/MemberCard";
import EditModal from "../../../components/edit-modal/EditModal";
import MemberModalController from "../../../components/member-modal-controller/MemberModalController";
import { GiBroom } from "react-icons/gi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import Swal from "sweetalert2";
import Toast from "../../../utils/Toast";
import { api } from "../../../provider/api";

const SecretaryPage = () => {
  const initialMemberData = [
    {
      id: 1,
      name: "Fulano de Tal",
      birthday: "01/01/2000",
      contact: "(00) 00000-0000",
      cpf: "000.000.000-00",
      responsibleContact: "(00) 99999-9999",
    },
    {
      id: 2,
      name: "Ciclano de Tal",
      birthday: "02/02/2001",
      contact: "(01) 11111-1111",
      cpf: "111.111.111-11",
      responsibleContact: "(01) 88888-8888",
    },
  ];
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddUnitPointModal, setShowAddUnitPointModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);


  const handleShowEditMemberModal = () => {
    setShowEditMemberModal(!showEditMemberModal);
  };

  const handleSelectMember = (member) => {
    setSelectedMember(member);
  };

  const handleShowAddMemberModal = () => {
    setShowAddMemberModal((prev) => !prev);
  };

  const classes = [
    { id: 1, name: "Amigo" },
    { id: 2, name: "Companheiro" },
    { id: 3, name: "Pesquisador" },
    { id: 4, name: "Pioneiro" },
    { id: 5, name: "Excurionista" },
    { id: 6, name: "Guia" },
    { id: 7, name: "Agrupadas" },
    { id: 8, name: "Desbravadores_Completo" },
    { id: 9, name: "Lider" },
    { id: 10, name: "Lider_Master" },
    { id: 10, name: "Lider_Master_Avancado" },
  ];

  const unities = [
    { id: 1, name: "Panda" },
    { id: 2, name: "Falcão" },
    { id: 3, name: "Águia Real" },
    { id: 4, name: "Tigre" },
    { id: 5, name: "Raposa" },
    { id: 6, name: "Urso" },
    { id: 7, name: "Pantera" },
    { id: 8, name: "Lobo" },
  ];

  const [filters, setFilters] = useState({
    name: "",
    unidade: "",
    classe: "",
  });


  const membersFields = [
  {
    name: "idImage",
    label: "ID da Imagem",
    placeholder: "ID da imagem",
    type: "text",
    isRequired: false,
  },
  {
    name: "imagePath",
    label: "Caminho da Imagem",
    placeholder: "URL ou caminho da imagem",
    type: "text",
    isRequired: false,
  },
  {
    name: "username",
    label: "Nome do Membro",
    placeholder: "Digite o nome do membro",
    type: "text",
    isRequired: true,
  },
  {
    name: "birthCertificate",
    label: "Certidão de Nascimento",
    placeholder: "Digite a certidão de nascimento",
    type: "text",
    isRequired: false,
  },
  {
    name: "cpf",
    label: "CPF",
    placeholder: "XXX.XXX.XXX-XX",
    type: "text",
    isRequired: true,
  },
  {
    name: "issuingAuthority",
    label: "Órgão Expedidor",
    placeholder: "Digite o órgão expedidor",
    type: "text",
    isRequired: false,
  },
  {
    name: "contact",
    label: "Contato",
    placeholder: "(XX) XXXXX-XXXX",
    type: "text",
    isRequired: true,
  },
  {
    name: "birthDate",
    label: "Data de Nascimento",
    placeholder: "DD/MM/AAAA",
    type: "date",
    isRequired: true,
  },
  {
    name: "sex",
    label: "Sexo",
    placeholder: "Selecione o sexo",
    type: "select",
    options: [
      { value: "MASCULINO", label: "Masculino" },
      { value: "FEMININO", label: "Feminino" },
      { value: "OUTRO", label: "Outro" },
    ],
    isRequired: true,
  },
  {
    name: "tshirtSize",
    label: "Tamanho da Camiseta",
    placeholder: "Selecione o tamanho",
    type: "select",
    options: [
      { value: "PP", label: "PP" },
      { value: "P", label: "P" },
      { value: "M", label: "M" },
      { value: "G", label: "G" },
      { value: "GG", label: "GG" },
      { value: "XG", label: "XG" },
    ],
    isRequired: false,
  },
  {
    name: "isBaptized",
    label: "Batizado",
    placeholder: "Selecione...",
    type: "select",
    options: [
      { value: true, label: "Sim" },
      { value: false, label: "Não" },
    ],
    isRequired: false,
  },
  {
    name: "address",
    label: "Endereço",
    placeholder: "Preencha o endereço completo",
    type: "object", // ou "group", se for um grupo de campos
    isRequired: true,
  },
  {
    name: "medicalData",
    label: "Dados Médicos",
    placeholder: "Preencha os dados médicos",
    type: "object", // ou "group"
    isRequired: false,
  },
  {
    name: "fatherName",
    label: "Nome do Pai",
    placeholder: "Digite o nome do pai",
    type: "text",
    isRequired: false,
  },
  {
    name: "fatherContact",
    label: "Contato do Pai",
    placeholder: "(XX) XXXXX-XXXX",
    type: "text",
    isRequired: false,
  },
  {
    name: "fatherEmail",
    label: "Email do Pai",
    placeholder: "Digite o email do pai",
    type: "email",
    isRequired: false,
  },
  {
    name: "motherName",
    label: "Nome da Mãe",
    placeholder: "Digite o nome da mãe",
    type: "text",
    isRequired: false,
  },
  {
    name: "motherContact",
    label: "Contato da Mãe",
    placeholder: "(XX) XXXXX-XXXX",
    type: "text",
    isRequired: false,
  },
  {
    name: "motherEmail",
    label: "Email da Mãe",
    placeholder: "Digite o email da mãe",
    type: "email",
    isRequired: false,
  },
  {
    name: "responsibleName",
    label: "Nome do Responsável",
    placeholder: "Digite o nome do responsável",
    type: "text",
    isRequired: false,
  },
  {
    name: "responsibleContact",
    label: "Contato do Responsável",
    placeholder: "(XX) XXXXX-XXXX",
    type: "text",
    isRequired: false,
  },
  {
    name: "responsibleEmail",
    label: "Email do Responsável",
    placeholder: "Digite o email do responsável",
    type: "email",
    isRequired: false,
  },
  {
    name: "unitRole",
    label: "Função na Unidade",
    placeholder: "Selecione a função",
    type: "select",
    options: [
      { value: "CONSELHEIRO", label: "Conselheiro" },
      { value: "CONSELHEIRO_AUXILIAR", label: "Conselheiro Auxiliar" },
      { value: "CAPITAO", label: "Capitão" },
      { value: "VICE_CAPITAO", label: "Vice-Capitão" },
      { value: "SECRETARIO", label: "Secretário" },
      { value: "VICE_SECRETARIO", label: "Vice-Secretário" },
      { value: "PADIOLEIRO", label: "Padioleiro" },
      { value: "CAPELAO", label: "Capelão" },
      { value: "ALMOXARIFADO", label: "Almoxarifado" },
      { value: "MEMBRO", label: "Membro" },
      { value: "NENHUMA", label: "Nenhuma" },
    ],
    isRequired: false,
  },
  {
    name: "unit",
    label: "Unidade",
    placeholder: "Selecione a unidade",
    type: "object", // ou "select" se for apenas o id
    isRequired: true,
  },
  {
    name: "classCategory",
    label: "Categoria da Classe",
    placeholder: "Selecione a categoria",
    type: "select",
    options: [
      { value: "AMIGO", label: "Amigo" },
      { value: "COMPANHEIRO", label: "Companheiro" },
      { value: "PESQUISADOR", label: "Pesquisador" },
      { value: "PIONEIRO", label: "Pioneiro" },
      { value: "EXCURSIONISTA", label: "Excursionista" },
      { value: "GUIA", label: "Guia" },
      { value: "AGRUPADAS", label: "Agrupadas" },
      { value: "DESBRAVADORES_COMPLETO", label: "Desbravadores Completo" },
      { value: "LIDER", label: "Líder" },
      { value: "LIDER_MASTER", label: "Líder Master" },
      { value: "LIDER_MASTER_AVANCADO", label: "Líder Master Avançado" },
      { value: "NENHUMA", label: "Nenhuma" },
    ],
    isRequired: false,
  },
  {
    name: "classRole",
    label: "Função na Classe",
    placeholder: "Selecione a função",
    type: "select",
    options: [
      { value: "INSTRUTOR", label: "Instrutor" },
      { value: "INSTRUTOR_AUXILIAR", label: "Instrutor Auxiliar" },
      { value: "MEMBRO", label: "Membro" },
      { value: "NENHUMA", label: "Nenhuma" },
    ],
    isRequired: false,
  },
   // Campos de endereço
  {
    name: "houseNumber",
    label: "Número",
    placeholder: "Digite o número",
    type: "text",
    isRequired: false,
  },
  {
    name: "district",
    label: "Bairro",
    placeholder: "Digite o bairro",
    type: "text",
    isRequired: false,
  },
  {
    name: "city",
    label: "Cidade",
    placeholder: "Digite a cidade",
    type: "text",
    isRequired: false,
  },
  {
    name: "state",
    label: "Estado",
    placeholder: "Digite o estado",
    type: "text",
    isRequired: false,
  },
  {
    name: "street",
    label: "Rua",
    placeholder: "Digite a rua",
    type: "text",
    isRequired: false,
  },
  {
    name: "cep",
    label: "CEP",
    placeholder: "Digite o CEP",
    type: "text",
    isRequired: false,
  },
  {
    name: "referenceHouse",
    label: "Referência",
    placeholder: "Ponto de referência",
    type: "text",
    isRequired: false,
  },

  // Campos de unidade
  {
    name: "unitId",
    label: "ID da Unidade",
    placeholder: "Digite o ID da unidade",
    type: "number",
    isRequired: true,
  },
  {
    name: "unitSurname",
    label: "Nome da Unidade",
    placeholder: "Digite o nome da unidade",
    type: "text",
    isRequired: false,
  },

  // Campos de dados médicos
  {
    name: "cns",
    label: "CNS",
    placeholder: "Digite o CNS",
    type: "text",
    isRequired: false,
  },
  {
    name: "agreement",
    label: "Convênio",
    placeholder: "Digite o convênio",
    type: "text",
    isRequired: false,
  },
  {
    name: "bloodType",
    label: "Tipo Sanguíneo",
    placeholder: "Digite o tipo sanguíneo",
    type: "text",
    isRequired: false,
  },

  // Doenças (checkbox)
  { name: "catapora", label: "Catapora", type: "checkbox", isRequired: false },
  { name: "meningite", label: "Meningite", type: "checkbox", isRequired: false },
  { name: "hepatite", label: "Hepatite", type: "checkbox", isRequired: false },
  { name: "dengue", label: "Dengue", type: "checkbox", isRequired: false },
  { name: "pneumonia", label: "Pneumonia", type: "checkbox", isRequired: false },
  { name: "malaria", label: "Malária", type: "checkbox", isRequired: false },
  { name: "febreAmarela", label: "Febre Amarela", type: "checkbox", isRequired: false },
  { name: "sarampo", label: "Sarampo", type: "checkbox", isRequired: false },
  { name: "tetano", label: "Tétano", type: "checkbox", isRequired: false },
  { name: "variola", label: "Varíola", type: "checkbox", isRequired: false },
  { name: "coqueluche", label: "Coqueluche", type: "checkbox", isRequired: false },
  { name: "difteria", label: "Difteria", type: "checkbox", isRequired: false },
  { name: "rinite", label: "Rinite", type: "checkbox", isRequired: false },
  { name: "bronquite", label: "Bronquite", type: "checkbox", isRequired: false },
  { name: "asma", label: "Asma", type: "checkbox", isRequired: false },
  { name: "rubeola", label: "Rubéola", type: "checkbox", isRequired: false },
  { name: "colera", label: "Cólera", type: "checkbox", isRequired: false },
  { name: "covid19", label: "Covid-19", type: "checkbox", isRequired: false },
  { name: "h1n1", label: "H1N1", type: "checkbox", isRequired: false },
  { name: "caxumba", label: "Caxumba", type: "checkbox", isRequired: false },
  {
    name: "others",
    label: "Outras doenças",
    placeholder: "Descreva outras doenças",
    type: "text",
    isRequired: false,
  },

  // Dados médicos adicionais
  {
    name: "heartProblems",
    label: "Problemas Cardíacos",
    placeholder: "Descreva se houver",
    type: "text",
    isRequired: false,
  },
  {
    name: "drugAllergy",
    label: "Alergia a Medicamentos",
    placeholder: "Descreva se houver",
    type: "text",
    isRequired: false,
  },
  { name: "lactoseAllergy", label: "Alergia à Lactose", type: "checkbox", isRequired: false },
  {
    name: "deficiency",
    label: "Deficiência",
    placeholder: "Descreva se houver",
    type: "text",
    isRequired: false,
  },
  { name: "bloodTransfusion", label: "Transfusão de Sangue", type: "checkbox", isRequired: false },
  { name: "skinAllergy", label: "Alergia de Pele", type: "checkbox", isRequired: false },
  {
    name: "skinAllergyMedications",
    label: "Medicamentos para Alergia de Pele",
    placeholder: "Descreva se houver",
    type: "text",
    isRequired: false,
  },
  { name: "faintingOrConvulsion", label: "Desmaio ou Convulsão", type: "checkbox", isRequired: false },
  {
    name: "faintingOrSeizuresMedications",
    label: "Medicamentos para Desmaio/Convulsão",
    placeholder: "Descreva se houver",
    type: "text",
    isRequired: false,
  },
  {
    name: "psychologicalDisorder",
    label: "Distúrbio Psicológico",
    placeholder: "Descreva se houver",
    type: "text",
    isRequired: false,
  },
  { name: "allergy", label: "Alergia", type: "checkbox", isRequired: false },
  {
    name: "allergyMedications",
    label: "Medicamentos para Alergia",
    placeholder: "Descreva se houver",
    type: "text",
    isRequired: false,
  },
  { name: "diabetic", label: "Diabético", type: "checkbox", isRequired: false },
  {
    name: "diabeticMedications",
    label: "Medicamentos para Diabetes",
    placeholder: "Descreva se houver",
    type: "text",
    isRequired: false,
  },
  { name: "recentSeriousInjury", label: "Lesão Grave Recente", type: "checkbox", isRequired: false },
  {
    name: "recentFracture",
    label: "Fratura Recente",
    placeholder: "Descreva se houver",
    type: "text",
    isRequired: false,
  },
  {
    name: "surgeries",
    label: "Cirurgias",
    placeholder: "Descreva se houver",
    type: "text",
    isRequired: false,
  },
  {
    name: "hospitalizationReasonLast5Years",
    label: "Motivo de Internação nos Últimos 5 Anos",
    placeholder: "Descreva se houver",
    type: "text",
    isRequired: false,
  },
];

  const handleFilterMembers = async () => {
    const params = {
      name: filters.name || "",
      classCategory: filters.classe || "",
      unity: filters.unidade || "",
    };

    if (!params.name && !params.classCategory && !params.unity) {
      Toast.fire({
        icon: "info",
        title: "Por favor, insira pelo menos um filtro.",
      });
      return;
    }

    try {
      const response = await api.get("/members/filter", {
        params: {
          ...params,
          page: pageNumber,
          size: pageSize,
        },
      });

      setMembers(response.data || []);
      // setMembers(response.data.items || []);
      setPageSize(response.data.pageSize);
      setTotalItems(response.data.totalItems);
      setTotalPages(response.data.totalPages);
      Toast.fire({
        icon: "success",
        title: "Membros filtrados com sucesso!",
      });

      setPageNumber(0);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Erro ao filtrar membros.",
      });
      console.error("Error fetching filtered members:", error);
    }
  };

  const handleClearFilters = async () => { 
    setFilters({
      name: "",
      classe: "",
      unidade: "",
    });

    const response = await api.get("/members", {
      params: {
        page: pageNumber,
        size: pageSize,
      },
    });

    // setMembers(response.data.items || []);
    setMembers(response.data);
    setPageSize(response.data.pageSize);
    setTotalItems(response.data.totalItems);
    setTotalPages(response.data.totalPages);

    Toast.fire({
      icon: "info",
      title: "Todos os filtros foram limpos!",
    });
  };

  const fetchMembers = async () => {
    try {
      const response = await api.get("/members", {
        params: {
          page: pageNumber,
          size: pageSize,
        },
      });
      setMembers(response.data || initialMemberData);
      // setMembers(response.data.items);
      setPageSize(response.data.pageSize);
      setTotalItems(response.data.totalItems);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [pageNumber]);

  const handleEdit = (member) => {
    setSelectedMember(member);
    setEditModalOpen(true);
  };

  console.log("Members:", members);

  const handleDelete = (memberToDelete) => {
    setMembers(members.filter((member) => member.id !== memberToDelete.id));
    console.log("Deleting member:", memberToDelete);
  };

  const handleSave = (updatedMember) => {
    setMembers(
      members.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
    console.log("Saving member:", updatedMember);
    setIsModalOpen(false);
  };

  return (
    <div className="max-h-screen bg-white p-6">
      <div className="flex justify-center">
        <div className="w-full max-w-10xl">
          <div className="flex space-x-4 bg-[#7C7C7C] p-4 rounded-md mb-6 h-24 items-center">
            <Dropdown
              label="Unidade"
              options={unities}
              handleFilters={setFilters}
              filters={filters}
            />
            <Dropdown
              label="Classe"
              options={classes}
              handleFilters={setFilters}
              filters={filters}
            />
            <div>
              <label className="text-white font-semibold">Nome</label>
              <div className="flex-1 relative flex items-center">
                <FaSearch
                  size={20}
                  className="absolute left-3 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  className="w-full rounded shadow-inner bg-white h-12 pl-10 pr-4 text-gray-700 outline-none"
                  placeholder="Pesquisar..."
                  value={filters.name}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-6">
              <button
                onClick={handleFilterMembers}
                className="flex items-center justify-center h-10 px-2 border-2 rounded border-[#FCAE2D]"
              >
                <IoIosSearch size={24} color="#FCAE2D" />
              </button>
              <button
                onClick={handleClearFilters}
                className="flex items-center justify-center h-10 px-2 border-2 rounded border-[#f85858]"
              >
                <GiBroom size={24} color="#f85858" />
              </button>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-md">
            <div className=" rounded-md flex flex-col gap-2 w-[98%] h-[50vh] p-4 ">
              {members.length > 0 ? (
                members.map((member) => (
                  <div key={member.id}>
                <MemberCard
                  key={member.id}
                  item={member}
                  showModal={handleShowEditMemberModal}
                  handleSelectMember={handleSelectMember}
                  editFields={membersFields}
                />
                  </div>
                ))
              ) : (
                <div className="p-4 text-gray-500">
                  Nenhum membro encontrado.
                </div>
              )}
            </div>
          </div>
          {members.length > 0 && (
            <>
              <section className="flex items-center justify-center gap-4 w-full mt-4">
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
                  Exibindo {members.length} de {totalItems} membros
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      {isModalOpen && selectedMember && (
        <MemberModalController
          member={selectedMember}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
      {editModalOpen && (
        <EditModal
          onClose={() => setEditModalOpen(false)}
          editingItem={selectedMember}
          onSubmit={"handleEditTransaction"}
          title="Editar Transação"
          fields={statementFields}
        />
      )}
    </div>
  );
};

const Dropdown = ({ label, options, handleFilters, filters }) => {
  const key = label.toLowerCase();

  return (
    <div className="flex-1 relative">
      <label className="text-white font-semibold">{label}</label>
      <div className="bg-white w-full px-4 py-2 rounded shadow-inner flex justify-between items-center cursor-pointer h-12">
        <select
          className="outline-none w-full bg-white text-gray-700 rounded h-full"
          value={filters[key]}
          onChange={(e) =>
            handleFilters({
              ...filters,
              [key]: e.target.value,
            })
          }
        >
          <option value="">Selecione uma {label}</option>
          {options &&
            options.map((option, index) => (
              <option
                key={index}
                value={
                  key === "unidade"
                    ? option.name == "Águia Real"
                      ? "aguia_real"
                      : option.name
                    : option.name.toUpperCase()
                }
              >
                {option.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default SecretaryPage;
