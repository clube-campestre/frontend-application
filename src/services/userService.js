import Swal from "sweetalert2";
import {
	validateEmail,
	validatePassword,
	validateConfirmPassword,
} from "../utils/validators/registerValidator";
import { api } from "../provider/api";
import { validateLogin } from "../utils/validators/loginValidator";
import { setUser, setToken, getToken, getUser } from "../utils/authStorage";

export const loginService = async (email, password) => {
	let loginValidation = validateLogin(email, password);

	if (loginValidation !== "") {
		Swal.fire({
			title: "Login não efetuado!",
			text: loginValidation,
			icon: "warning",
			confirmButtonColor: "#FCAE2D",
		});
		return;
	}

	try {
		const response = await api.post("/accounts/login", {
			email,
			password,
		});

		setToken(response.data.token);
		setUser(response.data);

		return response.data;
	} catch (error) {
		Swal.fire({
			title: "Login não efetuado!",
			text: "Email ou senha inválidos.",
			icon: "error",
			confirmButtonColor: "#FCAE2D",
		});
		console.error(error);
		return;
	}
};

export const registerService = async (
	name,
	email,
	password,
	confirmPassword
) => {
	const emailError = validateEmail(email);
	const passwordError = validatePassword(password);
	const confirmPasswordError = validateConfirmPassword(
		password,
		confirmPassword
	);

	if (!name || !email || !password || !confirmPassword) {
		Swal.fire({
			title: "Erro ao cadastrar",
			text: "Preencha todos os campos.",
			icon: "warning",
			confirmButtonColor: "#FCAE2D",
		});

		return false;
	}

	if (emailError || confirmPasswordError || passwordError) {
		Swal.fire({
			title: "Erro ao cadastrar",
			text: emailError || confirmPasswordError || passwordError,
			icon: "warning",
			confirmButtonColor: "#FCAE2D",
		});

		return false;
	}

	const duplicatedUser = await fetch(`${API_URL}?email=${email}`);
	const user = await duplicatedUser.json();

	if (user.length > 0) {
		Swal.fire({
			title: "Erro ao cadastrar",
			text: "Email já cadastrado.",
			icon: "error",
			confirmButtonColor: "#FCAE2D",
		});

		return false;
	}

	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, password }),
		});

		return true;
	} catch (error) {
		Swal.fire({
			title: "Erro ao cadastrar",
			text: "Tente novamente mais tarde.",
			icon: "error",
			confirmButtonColor: "#FCAE2D",
		});

		console.error(error);
		return false;
	}
};

export const forgotPasswordService = async (email) => {
    try {
        const response = await api.post("/auth/forgot-password", null, {
            params: { email }
        });
        Swal.fire({
            title: "Código enviado!",
            text: "Verifique seu e-mail para o código de recuperação.",
            icon: "success",
            confirmButtonColor: "#FCAE2D",
        });
        return response.data;
    } catch (error) {
        Swal.fire({
            title: "Erro ao enviar código!",
            text: "E-mail não cadastrado ou inserido incorretamente.	 Tente novamente.",
            icon: "error",
            confirmButtonColor: "#FCAE2D",
        });
        console.error(error);
        return null;
    }
};

export const verifyCodeService = async (email, code) => {
    try {
        const response = await api.post("/auth/verify-code", null, {
            params: { email, code }
        });
		Swal.fire({
            title: "Código verificado!",
            text: "Você pode agora definir uma nova senha.",
            icon: "success",
            confirmButtonColor: "#FCAE2D",
        });
        return response.data;
    } catch (error) {
        Swal.fire({
            title: "Código inválido!",
            text: "O código informado está incorreto ou expirado.",
            icon: "error",
            confirmButtonColor: "#FCAE2D",
        });
        console.error(error);
        return null;
    }
};

export const resetPasswordService = async (email, code, newPassword) => {
    try {
        const response = await api.post("/auth/reset-password", null, {
            params: { email, code, newPassword }
        });
        Swal.fire({
            title: "Senha redefinida!",
            text: "Sua senha foi alterada com sucesso.",
            icon: "success",
            confirmButtonColor: "#FCAE2D",
        });
        return response.data;
    } catch (error) {
        Swal.fire({
            title: "Erro ao redefinir senha!",
            text: "Não foi possível redefinir a senha. Tente novamente.",
            icon: "error",
            confirmButtonColor: "#FCAE2D",
        });
        console.error(error);
        return null;
    }
};
