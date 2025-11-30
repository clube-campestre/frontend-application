import { getStatements, getStatementById, createStatement, updateStatement, deleteStatement, getGoalByTag } from "./statementsService";
import Swal from "sweetalert2";

export const fetchStatements = async (params) => {
  try {
    return await getStatements(params);
  } catch (err) {
    console.error(err);
    Swal.fire({ title: "Erro ao carregar extratos", text: "Tente novamente mais tarde.", icon: "error", confirmButtonColor: "#FCAE2D" });
    return null;
  }
};

export const fetchStatement = async (id) => {
  try {
    return await getStatementById(id);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createTransaction = async (payload) => {
  try {
    return await createStatement(payload);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateTransaction = async (id, payload) => {
  try {
    return await updateStatement(id, payload);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteTransaction = async (id) => {
  try {
    return await deleteStatement(id);
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const fetchGoalByTag = async (tagId) => {
  try {
    return await getGoalByTag(tagId);
  } catch (err) {
    console.error(err);
    return null;
  }
};
