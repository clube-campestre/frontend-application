import Swal from "sweetalert2";
import { getMembersByClass, updateMemberUnitAndClass } from "./membersService";

export const getClasses = async () => {
  // Retorna uma lista estática das classes para uso no frontend
  return [
    { id: 1, name: "Amigo" },
    { id: 2, name: "Companheiro" },
    { id: 3, name: "Pesquisador" },
    { id: 4, name: "Pioneiro" },
    { id: 5, name: "Excursionista" },
    { id: 6, name: "Guia" },
  ];
};

export const getMembersForClass = async (className, page = 0, size = 10) => {
  try {
    const res = await getMembersByClass(className, page, size);
    return res;
  } catch (err) {
    console.error(err);
    Swal.fire({ title: "Erro ao carregar membros da classe", text: "Tente novamente mais tarde.", icon: "error", confirmButtonColor: "#FCAE2D" });
    return null;
  }
};

export const addMemberToClass = async (cpf, payload) => {
  try {
    const res = await updateMemberUnitAndClass(cpf, payload);
    return res;
  } catch (err) {
    console.error(err);
    Swal.fire({ title: "Erro", text: "Não foi possível adicionar membro à classe.", icon: "error", confirmButtonColor: "#FCAE2D" });
    return null;
  }
};
