import { api } from "../provider/api";
import Swal from "sweetalert2";

export const getTags = async () => {
  try {
    const res = await api.get(`/tags`);
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao carregar tags",
      text: "Tente novamente mais tarde.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const getTagById = async (id) => {
  try {
    const res = await api.get(`/tags/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createTag = async (payload) => {
  try {
    const res = await api.post(`/tags`, payload);
    Swal.fire({
      title: "Tag criada",
      text: "Tag adicionada com sucesso.",
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

export const updateTag = async (id, payload) => {
  try {
    const res = await api.put(`/tags/${id}`, payload);
    Swal.fire({
      title: "Atualizado",
      text: "Tag atualizada.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteTag = async (id) => {
  try {
    await api.delete(`/tags/${id}`);
    Swal.fire({
      title: "Removido",
      text: "Tag removida.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
