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
    // Validar parâmetros obrigatórios
    if (!surname || newScore === undefined || newScore === null) {
      Swal.fire({
        title: "Erro de validação",
        text: "surname e newScore são obrigatórios.",
        icon: "error",
        confirmButtonColor: "#FCAE2D",
      });
      return null;
    }
    const params = { surname, newScore };
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
    // Validar parâmetros obrigatórios
    if (!surname || score === undefined || score === null || isSum === undefined || isSum === null) {
      Swal.fire({
        title: "Erro de validação",
        text: "surname, score e isSum são obrigatórios.",
        icon: "error",
        confirmButtonColor: "#FCAE2D",
      });
      return null;
    }
    // Simplificar: sempre usar parâmetros nomeados
    const params = { surname, score, isSum };
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
