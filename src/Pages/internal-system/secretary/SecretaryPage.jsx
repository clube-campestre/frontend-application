import React, { useState } from "react"; 
import { FaSearch } from "react-icons/fa"; 
import { MemberCard } from "../../../components/member-card/MemberCard";
import EditModal from "../../../components/edit-modal/EditModal";

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
  const [members, setMembers] = useState(initialMemberData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleEdit = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleDelete = (memberToDelete) => {
    setMembers(members.filter(member => member.id !== memberToDelete.id));
    console.log("Deleting member:", memberToDelete);
  };

  const handleSave = (updatedMember) => {
    setMembers(members.map(member => member.id === updatedMember.id ? updatedMember : member));
    console.log("Saving member:", updatedMember);
    setIsModalOpen(false);
  };

  return (
    <div className="max-h-screen bg-white p-6">
      <div className="flex justify-center">
        <div className="w-full max-w-10xl">
          <div className="flex space-x-4 bg-[#7C7C7C] p-4 rounded-md mb-6 h-24 items-center">
            <Dropdown label="Unidade" />
            <Dropdown label="Classe" />
            <div className="flex-1 relative flex items-center">
              <FaSearch
                size={20}
                className="absolute left-3 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                className="w-full rounded shadow-inner border border-gray-200 bg-white h-12 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Pesquisar..."
              />
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-md">
            <div className="bg-white rounded-md shadow border">
              {members.map((item) => (
                <div key={item.id} className="mb-4">
                  <MemberCard item={item} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && selectedMember && (
        <EditModal 
          member={selectedMember} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
};

const Dropdown = ({ label }) => (
  <div className="flex-1 relative">
    <div className="bg-white w-full px-4 py-2 rounded shadow-inner flex justify-between items-center cursor-pointer h-12">
      <span className="text-gray-900 font-semibold">{label}</span>
      <span className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-600 font-bold text-xs">
        v
      </span>
    </div>
  </div>
);

export default SecretaryPage;
