export const validateLogin = (email, password) => {
    if (!email || !password) {
      return "Preencha todos os campos.";
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Digite um email válido.";
    }
  
    return "";
  };
  