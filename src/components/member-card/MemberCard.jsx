import { useState } from "react";
import { FaPencilAlt, FaTrash, FaEye } from "react-icons/fa";
import { getUser } from "../../utils/authStorage";
import { api } from "../../provider/api";
import Toast from "../../utils/Toast";
import Swal from "sweetalert2";
import MemberModalController from "../member-modal-controller/MemberModalController";
import EditModal from "../edit-modal/EditModal";

export const MemberCard = ({ item, editFields }) => {
  const isUserAbbleToDelete = getUser().access !== "SUPERVISOR";
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteMember = async (id) => {
    const result = await Swal.fire({
      title: "Deseja deletar este membro?",
      text: "Essa ação não pode ser desfeita.",
      icon: "warning",
      iconColor: "#d33",
      showCancelButton: true,
      confirmButtonColor: "#5ccb5f",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Deletar",
    });
    if (result.isConfirmed) {
      try {
        await api.delete(`/members/${id}`);
        Toast.fire({
          icon: "success",
          title: "Membro deletado com sucesso!",
        });
        // Aqui você pode emitir um evento ou chamar uma função para atualizar a lista no pai, se necessário
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "Ocorreu um erro ao deletar membro.",
        });
        console.error("Error deleting member:", err);
      }
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full min-h-[10vh] max-h-[10vh] bg-[#FAFAFA] rounded hover:bg-[#D9D9D9] shadow-md transition-all duration-200 ease-in-out">
      {/* Nome e Data de Aniversário */}
      <div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
        <div className="text-[16px] font-bold">
          <span>{item.username}</span>
        </div>
        <div className="text-[13px] text-[#8D8D8D]">
          <span>{new Date(item.birthDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Contato e CPF */}
      <div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
        <div className="text-[16px]">
          <span>{item.contact}</span>
        </div>
        <div className="text-[13px] text-[#8D8D8D]">
          <span>CPF: {item.cpf}</span>
        </div>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Contato do Responsável */}
      {item.fatherContact || item.motherContact ? (
        <>
          <div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
            <div className="text-[16px]">
              <span>{item.motherContact}</span>
            </div>
            <div className="text-[13px] text-[#8D8D8D]">
              <span>Contato da Mãe</span>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
            <div className="text-[16px]">
              <span>{item.fatherContact}</span>
            </div>
            <div className="text-[13px] text-[#8D8D8D]">
              <span>Contato do Pai</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
          <div className="text-[16px]">
            <span>{item.responsibleContact}</span>
          </div>
          <div className="text-[13px] text-[#8D8D8D]">
            <span>Responsável Legal</span>
          </div>
        </div>
      )}

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Unidade */}
      <div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
        <div className="text-[16px]">
          <span>{item.unit?.surname}</span>
        </div>
        <div className="text-[13px] text-[#8D8D8D]">
          <span>{item.unitRole}</span>
        </div>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Classe */}
      <div className="flex flex-col items-start justify-center w-[25%] h-full pl-3 pr-3">
        <div className="text-[16px]">
          <span>{item.classCategory}</span>
        </div>
        <div className="text-[11px] text-[#8D8D8D]">
          <span>{item.classRole}</span>
        </div>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Botão Editar */}
      <div className="flex items-center justify-center w-[10%]">
        <button
          onClick={() => setShowEditModal(true)}
          className="text-amber-500 hover:text-amber-600"
        >
          <FaPencilAlt size={18} className="cursor-pointer" />
        </button>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Botão Apagar */}
      {isUserAbbleToDelete && (
        <div className="flex items-center justify-center w-[10%] ">
          <button
            onClick={() => handleDeleteMember(item.cpf)}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTrash size={18} className="cursor-pointer" />
          </button>
        </div>
      )}

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Botão Detalhes */}
      <div className="flex items-center justify-center w-[10%]">
        <button
          onClick={() => setShowViewModal(true)}
          className="text-gray-400 hover:text-gray-600"
        >
          <FaEye size={18} className="cursor-pointer" />
        </button>
      </div>
      {/* Modal de Visualização */}
      {showViewModal && (
        <MemberModalController
          member={item}
          onClose={() => setShowViewModal(false)}
        />
      )}

      {/* Modal de Edição */}
      {showEditModal && (
        <EditModal
          editingItem={item}
          onClose={() => setShowEditModal(false)}
          onSubmit={() => setShowEditModal(false)}
          title="Editar Membro"
          fields={editFields} // Passe os campos corretos aqui
        />
      )}
    </div>
  );
};
