import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MemberCard } from "../../../components/member-card/MemberCard";
import EditModal from "../../../components/edit-modal/EditModal";
import MemberModalController from "../../../components/member-modal-controller/MemberModalController";
import { GiBroom } from "react-icons/gi";
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
  const [selectedMember, setSelectedMember] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const classes = [
    { id: 1, name: "Amigo" },
    { id: 2, name: "Companheiro" },
    { id: 3, name: "Pesquisador" },
    { id: 4, name: "Pioneiro" },
    { id: 5, name: "Excurionista" },
    { id: 6, name: "Guia" },
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

  const handleFilterMembers = async () => {
    const params = {
      name: filters.name || "",
      classId: filters.classe || "",
      unity: filters.unidade || "",
    };

    if (!params.name && !params.classId && !params.unity) {
      Toast.fire({
        icon: "info",
        title: "Por favor, insira pelo menos um filtro.",
      });
      return;
    }

    try {
      const response = await api.get("/members", {
        params: {
          ...params,
          page: pageNumber,
          size: pageSize,
        },
      });

      setMembers(response.data.items || []);
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
      classId: "",
      unity: "",
    });

    const response = await api.get("/members", {
      params: {
        page: pageNumber,
        size: pageSize,
      },
    });

    setMembers(response.data.items || []);
    setPageSize(response.data.pageSize);
    setTotalItems(response.data.totalItems);
    setTotalPages(response.data.totalPages);

    Toast.fire({
      icon: "info",
      title: "Todos os filtros foram limpos!",
    });
  };

  console.log(filters)

  const handleEdit = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

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
                    setFilters({ ...filters, name: e.target.value })
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
            <div className="bg-white rounded-md shadow border">
              {members.length > 0 ? (
                members.map((item) => (
                  <div key={item.id} className="mb-4">
                    <MemberCard
                      item={item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      showModal={() => setIsModalOpen(true)}
                      handleSelectMember={(member) => setSelectedMember(member)}
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
        </div>
      </div>
      {isModalOpen && selectedMember && (
        <MemberModalController
          member={selectedMember}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

const Dropdown = ({ label, options, handleFilters, filters }) => (
  <div className="flex-1 relative">
    <label className="text-white font-semibold">{label}</label>
    <div className="bg-white w-full px-4 py-2 rounded shadow-inner flex justify-between items-center cursor-pointer h-12">
      <select
        className="outline-none w-full bg-white text-gray-700 rounded h-full"
        // value={filters[label.toLowerCase()]}
        onChange={(e) =>
          handleFilters({
            ...filters,
            [label.toLowerCase()]: e.target.value,
          })
        }
      >
        <option value="">Selecione uma {label}</option>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  </div>
);

export default SecretaryPage;
