import { api } from "../provider/api";
import Swal from "sweetalert2";

export const getPlaces = async () => {
  try {
    const res = await api.get(`/places`);
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao carregar locais",
      text: "Tente novamente mais tarde.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const getPlaceById = async (id) => {
  try {
    const res = await api.get(`/places/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createPlace = async (payload) => {
  try {
    const res = await api.post(`/places`, payload);
    Swal.fire({
      title: "Local criado",
      text: "Local adicionado com sucesso.",
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

export const updatePlace = async (id, payload) => {
  try {
    const res = await api.put(`/places/${id}`, payload);
    Swal.fire({
      title: "Atualizado",
      text: "Local atualizado.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deletePlace = async (id) => {
  try {
    await api.delete(`/places/${id}`);
    Swal.fire({
      title: "Removido",
      text: "Local removido.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
