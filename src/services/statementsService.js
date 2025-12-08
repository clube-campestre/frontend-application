import { api } from "../provider/api";
import Swal from "sweetalert2";

export const getStatements = async (params = {}) => {
  try {
    // Garantir parâmetros obrigatórios page e size
    const queryParams = { 
      page: params.page !== undefined ? params.page : 0, 
      size: params.size !== undefined ? params.size : 10,
      ...params 
    };
    const res = await api.get(`/statements`, { params: queryParams });
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao carregar extratos",
      text: "Tente novamente mais tarde.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const getStatementById = async (id) => {
  try {
    const res = await api.get(`/statements/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createStatement = async (payload) => {
  try {
    const res = await api.post(`/statements`, payload);
    Swal.fire({
      title: "Criado",
      text: "Lançamento criado com sucesso.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro",
      text: err?.response?.data?.message || "Tente novamente.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const updateStatement = async (payload) => {
  try {
    const res = await api.put(`/statements/${payload.id}`, payload);
    Swal.fire({
      title: "Atualizado",
      text: "Lançamento atualizado.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteStatement = async (id) => {
  try {
    await api.delete(`/statements/${id}`);
    Swal.fire({
      title: "Removido",
      text: "Lançamento removido.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteStatementsByTag = async (tagName) => {
  try {
    await api.delete(`/statements/tag`, { params: { tagName } });
    Swal.fire({
      title: "Removidos",
      text: "Lançamentos removidos pela tag.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getGoalByTag = async (tagId) => {
  try {
    // Validar parâmetro obrigatório
    if (!tagId) {
      Swal.fire({
        title: "Erro de validação",
        text: "tagId é obrigatório.",
        icon: "error",
        confirmButtonColor: "#FCAE2D",
      });
      return null;
    }
    const res = await api.get(`/statements/goal`, { params: { tagId } });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
