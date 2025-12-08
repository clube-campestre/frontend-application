import { api } from "../provider/api";
import Swal from "sweetalert2";

export const getAllMembers = async () => {
  try {
    const res = await api.get("/members");
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao carregar membros",
      text: "Tente novamente mais tarde.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const getMemberByCpf = async (cpf) => {
  try {
    const res = await api.get(`/members/${cpf}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createMember = async (formData) => {
  try {
    // expecting multipart/form-data
    const res = await api.post(`/members`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    Swal.fire({
      title: "Membro criado",
      text: "Membro cadastrado com sucesso.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao criar membro",
      text: err?.response?.data?.message || "Tente novamente.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const updateMember = async (formData) => {
  try {
    const res = await api.put(`/members`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    Swal.fire({
      title: "Atualizado",
      text: "Dados do membro atualizados.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao atualizar",
      text: err?.response?.data?.message || "Tente novamente.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const deleteMember = async (cpf) => {
  try {
    await api.delete(`/members/${cpf}`);
    Swal.fire({
      title: "Removido",
      text: "Membro removido com sucesso.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return true;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao remover",
      text: "Tente novamente.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return false;
  }
};

export const getMembersByUnit = async (unitName, page = 0, size = 10) => {
  try {
    const res = await api.get(`/members/unit`, { params: { unitName, page, size } });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMembersByFilter = async (filter = {}) => {
  try {
    // Garantir parâmetros obrigatórios page e size
    const params = { 
      page: filter.page !== undefined ? filter.page : 0, 
      size: filter.size !== undefined ? filter.size : 10,
      ...filter 
    };
    const res = await api.get(`/members/filter`, { params });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMembersByClass = async (classCategory, page = 0, size = 10) => {
  try {
    const res = await api.get(`/members/class`, { params: { classCategory, page, size } });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// REMOVIDO: updateMemberByCpf - A rota PUT /members/{cpf} não existe no Swagger
// Use updateMember (PUT /members) com CPF no body (data) para atualizar membro completo
// Use updateMemberUnitAndClass (PUT /members/unit-and-class/{cpf}) para atualizar apenas unidade e classe

export const updateMemberUnitAndClass = async (cpf, payload) => {
  try {
    const res = await api.put(`/members/unit-and-class/${cpf}`, payload);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
