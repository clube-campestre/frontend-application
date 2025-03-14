import Swal from "sweetalert2";
import { validateEmail, validatePassword, validateConfirmPassword } from '../utils/validations/cadastroValidation';
import { use } from "react";

const API_URL = "http://localhost:3001/users";

export const loginService = async (email, password) => {

	if (!email || !password) {
		Swal.fire({
			title: "Login não efetuado!",
            text: "Preencha todos os campos.",
			icon: "warning",
		});

		return;
	}

	const response = await fetch(`${API_URL}?email=${email}`);
	const users = await response.json();
    const user = users[0];

	if (users.length === 0 || user.password !== password) {
		Swal.fire({
			title: "Login não efetuado!",
            text: "Email ou senha incorretos.",
			icon: "error",
		});

        return;
	}

	return user;
};

export const registerService = async (name, email, password, confirmPassword) => {
	const emailError = validateEmail(email);
	const passwordError = validatePassword(password);
	const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

	if (!name || !email || !password || !confirmPassword) {
		Swal.fire({
			title: "Erro ao cadastrar",
			text: "Preencha todos os campos.",
			icon: "warning",
		});

		return false;
	}


	if (emailError || passwordError || confirmPasswordError) {
		Swal.fire({
			title: "Erro ao cadastrar",
			text: emailError || passwordError || confirmPasswordError,
			icon: "warning",
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
		});

		return false
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
		});
		
		console.error(error);
		return false;
	}

};
