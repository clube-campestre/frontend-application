import { api } from "../provider/api";
import Swal from "sweetalert2";

export const getUnitsRanking = async () => {
  try {
    const res = await api.get(`/units/ranking`);
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao carregar ranking",
      text: "Tente novamente mais tarde.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const updateUnitScore = async (surname, newScore) => {
  try {
    const params = {};
    if (surname !== undefined && surname !== null) params.surname = surname;
    if (newScore !== undefined && newScore !== null) params.newScore = newScore;
    const res = await api.put(`/units/score`, null, { params });
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao atualizar score",
      text: err?.response?.data?.message || "Tente novamente.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const changeUnitScore = async (surname, score, isSum = true) => {
  try {
    // Accept either { id } or { surname }
    let params = {};
    if (typeof surname === 'object' && surname !== null) {
      // called with object: { id, surname, score, isSum }
      params = { ...(surname.id !== undefined ? { id: surname.id } : {}), ...(surname.surname !== undefined ? { surname: surname.surname } : {}), score: surname.score, isSum: surname.isSum };
    } else {
      params = { surname, score, isSum };
    }
    const res = await api.post(`/units/score`, null, { params });
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao alterar score",
      text: err?.response?.data?.message || "Tente novamente.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const resetAllUnitScores = async () => {
  try {
    const res = await api.post(`/units/reseted`);
    Swal.fire({
      title: "Reset realizado",
      text: "Todos os scores foram resetados.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao resetar",
      text: "Tente novamente.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};
