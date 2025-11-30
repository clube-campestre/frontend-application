import { api } from "../provider/api";
import Swal from "sweetalert2";
import { setToken, setUser } from "../utils/authStorage";

export const registerAccount = async (payload) => {
  try {
    const res = await api.post(`/accounts/register`, payload);
    Swal.fire({
      title: "Conta criada",
      text: "Usuário registrado com sucesso.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao criar conta",
      text: err?.response?.data?.message || "Tente novamente.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const loginAccount = async (email, password) => {
  try {
    const res = await api.post(`/accounts/login`, { email, password });
    // payload from backend may contain token
    if (res?.data?.token) {
      setToken(res.data.token);
      setUser(res.data);
    }
    return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Erro ao efetuar login",
      text: err?.response?.data?.message || "Email ou senha inválidos.",
      icon: "error",
      confirmButtonColor: "#FCAE2D",
    });
    return null;
  }
};

export const getAllAccounts = async () => {
  try {
    const res = await api.get(`/accounts`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getAccountById = async (id) => {
  try {
    const res = await api.get(`/accounts/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateAccount = async (id, payload) => {
  try {
    const res = await api.put(`/accounts/${id}`, payload);
    Swal.fire({
      title: "Atualizado",
      text: "Conta atualizada com sucesso.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteAccount = async (id) => {
  try {
    await api.delete(`/accounts/${id}`);
    Swal.fire({
      title: "Removido",
      text: "Conta removida.",
      icon: "success",
      confirmButtonColor: "#FCAE2D",
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
