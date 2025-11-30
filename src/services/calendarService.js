import Swal from "sweetalert2";

// Note: current frontend uses Google Calendar embed (iframe).
// These functions are placeholders for a future backend calendar API.

export const getEvents = async (params) => {
  // Placeholder: return empty list to avoid breaking UI that may call it
  try {
    return [];
  } catch (err) {
    console.error(err);
    Swal.fire({ title: "Erro ao carregar eventos", text: "Tente novamente mais tarde.", icon: "error", confirmButtonColor: "#FCAE2D" });
    return null;
  }
};

export const createEvent = async (payload) => {
  Swal.fire({ title: "Não implementado", text: "API de calendário não disponível.", icon: "info", confirmButtonColor: "#FCAE2D" });
  return null;
};

export const updateEvent = async (id, payload) => {
  Swal.fire({ title: "Não implementado", text: "API de calendário não disponível.", icon: "info", confirmButtonColor: "#FCAE2D" });
  return null;
};

export const deleteEvent = async (id) => {
  Swal.fire({ title: "Não implementado", text: "API de calendário não disponível.", icon: "info", confirmButtonColor: "#FCAE2D" });
  return false;
};
