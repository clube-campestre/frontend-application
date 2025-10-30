const TOKEN_KEY = "token";
const USER_KEY = "user";

export const setToken = (token) => {
  const tokenB64 = btoa(token);
  sessionStorage.setItem(TOKEN_KEY, tokenB64);
};

export const getToken = () => {
  const tokenB64 = sessionStorage.getItem(TOKEN_KEY);
  if (!tokenB64) return null;

  try {
    return atob(tokenB64);
  } catch {
    return null;
  }
};

export const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const setUser = (usuario) => {
  const usuarioString = JSON.stringify(usuario);
  const usuarioB64 = btoa(usuarioString);
  sessionStorage.setItem(USER_KEY, usuarioB64);
};

export const getUser = () => {
  const usuarioB64 = sessionStorage.getItem(USER_KEY);
  if (!usuarioB64) return null;

  try {
    return JSON.parse(atob(usuarioB64));
  } catch {
    return null;
  }
};

export const removeUser = () => {
  sessionStorage.removeItem(USER_KEY);
};

export const clearSession = () => {
  removeToken();
  removeUser();
};
