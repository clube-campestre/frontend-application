// Máscara para visualização

export function maskCpf(value = "") {
  // CPF: 11 dígitos
  let digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskBirthCertificate(value = "") {
  let raw = (value || "")
    .replace(/[^a-zA-Z0-9]/g, "") // permite letras e números
    .toUpperCase()
    .slice(0, 32);

  // Formato tradicional: começa com letra
  if (/^[A-Z]/.test(raw)) {
    let letra = raw.substring(0, 1);
    let livro = raw.substring(1, 6);
    let folha = raw.substring(6, 9);
    let termo = raw.substring(9, 13);

    let formatado = letra;
    if (livro) formatado += ' ' + livro;
    if (folha) formatado += ' ' + folha;
    if (termo) formatado += ' ' + termo;

    return formatado.trim();
  }
  // Formato novo: só números, até 32 dígitos
  else if (/^\d{10,32}$/.test(raw)) {
    let digits = raw.slice(0, 32);
    let partes = [
      digits.substring(0, 6),
      digits.substring(6, 8),
      digits.substring(8, 10),
      digits.substring(10, 14),
      digits.substring(14, 15),
      digits.substring(15, 20),
      digits.substring(20, 24),
      digits.substring(24, 28),
      digits.substring(28, 32)
    ];
    return partes.filter(Boolean).join('.');
  }
  // Caso não se encaixe em nenhum formato, retorna só os caracteres válidos (limitado a 32)
  return raw;
}

export function maskPhone(value = "") {
  // Telefone: 11 dígitos (com DDD)
  let digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

export function maskCep(value = "") {
  // CEP: 8 dígitos
  let digits = value.replace(/\D/g, "").slice(0, 8);
  return digits
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}

export function maskCns(value = "") {
  let digits = value.replace(/\D/g, "");

  // Formato antigo: 15 dígitos
  digits = digits.slice(0, 15);
  return digits
    .replace(/^(\d{3})(\d)/, "$1 $2")
    .replace(/^(\d{3}) (\d{4})(\d)/, "$1 $2 $3")
    .replace(/^(\d{3}) (\d{4}) (\d{4})(\d)/, "$1 $2 $3 $4")
    .trim();
}