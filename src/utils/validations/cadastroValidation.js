export const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!password) return 'A senha é obrigatória';
    if (password.length < 8) return 'A senha deve ter no mínimo 8 caracteres';
    if (!regex.test(password)) return 'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais';
    return '';
  };
  
  export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return 'Confirme sua senha';
    if (password !== confirmPassword) return 'As senhas não coincidem';
    return '';
  }; 
  
  export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'O email é obrigatório';
    if (!regex.test(email)) return 'Digite um email válido';
    return '';
  };