import { useState } from "react";
import { FaPencilAlt, FaTrash, FaEye } from "react-icons/fa";
import { getUser } from "../../utils/authStorage";
import { api } from "../../provider/api";
import Toast from "../../utils/Toast";
import Swal from "sweetalert2";
import MemberModalController from "../member-modal-controller/MemberModalController";
import EditModal from "../edit-modal/EditModal";
import { maskCpf, maskPhone } from "../../utils/validators/addMemberValidator";

export const MemberCard = ({ item, editFields, onEdit, onDelete }) => {
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
        if (typeof onDelete === "function") {
          onDelete(); // Chama a função do pai para atualizar a lista
        }
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
      <div className="flex flex-col items-start justify-center min-w-[160px] max-w-[200px] w-[20%] h-full pl-3 pr-3">
        <div className="text-[16px] font-bold truncate w-full">
          <span className="truncate block">{item.username}</span>
        </div>
        <div className="text-[13px] text-[#8D8D8D] truncate w-full">
          <span className="truncate block">
            {new Date(item.birthDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Contato e CPF */}
      <div className="flex flex-col items-start justify-center min-w-[160px] max-w-[220px] w-[25%] h-full pl-3 pr-3">
        <div className="text-[16px] truncate w-full">
          <span className="truncate block">{maskPhone(item.contact)}</span>
        </div>
        <div className="text-[13px] text-[#8D8D8D] truncate w-full">
          <span className="truncate block">CPF: {maskCpf(item.cpf)}</span>
        </div>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Contato do Responsável */}
      {(() => {
        const contacts = [];
        if (item.motherContact) {
          contacts.push({
            label: "Contato da Mãe",
            value: maskPhone(item.motherContact),
          });
        }
        if (item.fatherContact) {
          contacts.push({
            label: "Contato do Pai",
            value: maskPhone(item.fatherContact),
          });
        }
        // Sempre mostra o responsável, se existir
        if (item.responsibleContact) {
          contacts.push({
            label: "Contato do Responsável",
            value: maskPhone(item.responsibleContact),
          });
        }
        return contacts.map((contact, idx) => (
          <div
            key={contact.label}
            className="flex flex-col items-start justify-center min-w-[160px] max-w-[220px] w-[25%] h-full pl-3 pr-3"
          >
            <div className="text-[16px] truncate w-full">
              <span className="truncate block">{contact.value}</span>
            </div>
            <div className="text-[13px] text-[#8D8D8D] truncate w-full">
              <span className="truncate block">{contact.label}</span>
            </div>
          </div>
        ));
      })()}

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Unidade */}
      <div className="flex flex-col items-start justify-center min-w-[120px] max-w-[180px] w-[25%] h-full pl-3 pr-3">
        <div className="text-[16px] truncate w-full">
          <span className="truncate block">{item.unit?.surname}</span>
        </div>
        <div className="text-[13px] text-[#8D8D8D] truncate w-full">
          <span className="truncate block">{item.unitRole}</span>
        </div>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Classe */}
      <div className="flex flex-col items-start justify-center min-w-[120px] max-w-[180px] w-[25%] h-full pl-3 pr-3">
        <div className="text-[16px] truncate w-full">
          <span className="truncate block">{item.classCategory}</span>
        </div>
        <div className="text-[11px] text-[#8D8D8D] truncate w-full">
          <span className="truncate block">{item.classRole}</span>
        </div>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Botão Editar */}
      <div className="flex items-center justify-center min-w-[60px] max-w-[80px] w-[10%]">
        <button
          onClick={() => {
            if (typeof onEdit === "function") {
              onEdit(item);
            } else {
              setShowEditModal(true);
            }
          }}
          className="text-amber-500 hover:text-amber-600"
        >
          <FaPencilAlt size={18} className="cursor-pointer" />
        </button>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Botão Apagar */}
      {isUserAbbleToDelete && (
        <div className="flex items-center justify-center min-w-[60px] max-w-[80px] w-[10%]">
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
      <div className="flex items-center justify-center min-w-[60px] max-w-[80px] w-[10%]">
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

      {/* Modal de Edição padrão */}
      {showEditModal && (
        <EditModal
          editingItem={item}
          onClose={() => setShowEditModal(false)}
          onSubmit={() => setShowEditModal(false)}
          title="Editar Membro"
          fields={editFields}
        />
      )}
    </div>
  );
};