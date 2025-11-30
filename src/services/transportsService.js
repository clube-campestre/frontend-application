import { api } from "../provider/api";
import Swal from "sweetalert2";

export const getTransports = async () => {
  try {
    const res = await api.get(`/transports`);
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao carregar transportes",
      text: "Tente novamente mais tarde.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const getTransportById = async (id) => {
  try {
    const res = await api.get(`/transports/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createTransport = async (payload) => {
  try {
    const res = await api.post(`/transports`, payload);
    Swal.fire({
      title: "Transporte criado",
      text: "Transporte adicionado com sucesso.",
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

export const updateTransport = async (id, payload) => {
  try {
    const res = await api.put(`/transports/${id}`, payload);
    Swal.fire({
      title: "Atualizado",
      text: "Transporte atualizado.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteTransport = async (id) => {
  try {
    await api.delete(`/transports/${id}`);
    Swal.fire({
      title: "Removido",
      text: "Transporte removido.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
