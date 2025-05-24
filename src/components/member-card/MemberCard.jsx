import { FaPencilAlt, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/authStorage";
import { api } from "../../provider/api";
import Swal from "sweetalert2";

export const MemberCard = ({ item, showModal, handleSelectMember }) => {
  const navigate = useNavigate();
  const isUserAbbleToDelete = getUser().access !== "SUPERVISOR";
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  const handleDeleteMember = (id) => {
    Swal.fire({
      title: "Deseja deletar este membro?",
      text: "Essa ação não pode ser desfeita.",
      icon: "warning",
      iconColor: "#d33",
      showCancelButton: true,
      confirmButtonColor: "#5ccb5f",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Deletar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/members/${id}`);
          Toast.fire({
            icon: "success",
            title: "Membro deletado com sucesso!",
          });
        } catch (err) {
          setError("Ocorreu um erro ao deletar o membro.");
          Toast.fire({
            icon: "error",
            title: "Ocorreu um erro ao deletar membro.",
          });
          console.error("Error deleting member:", err);
        }
      }
    });
  };

  return (
    <div
      className="flex flex-row items-center justify-between w-full h-15 bg-[#FAFAFA] rounded border-2"
      style={{ borderColor: "#86D946" }}
    >
      {/* Nome e Data de Aniversário */}
      <div className="flex flex-col items-start w-[25%] h-full pl-3 pr-3">
        <div className="text-[16px] font-bold">
          <span>{item.name}</span>
        </div>
        <div className="text-[11px] text-[#8D8D8D]">
          <span>{new Date(item.birthday).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Contato e CPF */}
      <div className="flex flex-col items-start w-[25%] h-full pl-3 pr-3">
        <div className="text-[16px]">
          <span>{item.contact}</span>
        </div>
        <div className="text-[11px] text-[#8D8D8D]">
          <span>CPF: {item.cpf}</span>
        </div>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Contato do Responsável */}
      <div className="flex flex-col items-start w-[25%] h-full pl-3 pr-3">
        <div className="text-[16px]">
          <span>{item.responsibleContact}</span>
        </div>
        <div className="text-[11px] text-[#8D8D8D]">
          <span>Responsável</span>
        </div>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Botão Editar */}
      <div className="flex items-center justify-center w-[10%]">
        <button
          onClick={() => {
            showModal();
            handleSelectMember(item);
          }}
          className="text-amber-500 hover:text-amber-600"
        >
          <FaPencilAlt size={18} />
        </button>
      </div>

      <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

      {/* Botão Apagar */}
      {isUserAbbleToDelete && (
        <>
          <div className="flex items-center justify-center w-[10%]">
            <button
              onClick={() => handleDeleteMember(item.cpf)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTrash size={18} />
            </button>
          </div>
          <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>
        </>
      )}

      {/* Botão Detalhes */}
      <div className="flex items-center justify-center w-[10%]">
        <button
          onClick={() => {
            showModal();
            handleSelectMember(item);
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <FaEye size={18} />
        </button>
      </div>
    </div>
  );
};
