import Swal from "sweetalert2";
import { validateEmail, validatePassword, validateConfirmPassword } from '../utils/validators/registerValidator';

const API_URL = "http://localhost:3001/users";

export const loginService = async (email, password) => {

	if (!email || !password) {
		Swal.fire({
			title: "Login não efetuado!",
            text: "Preencha todos os campos.",
			icon: "warning",
			confirmButtonColor: "#FCAE2D"
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
			confirmButtonColor: "#FCAE2D"
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
			confirmButtonColor: "#FCAE2D"
		});

		return false;
	}


	if (emailError || confirmPasswordError || passwordError) {
		Swal.fire({
			title: "Erro ao cadastrar",
			text: emailError || confirmPasswordError || passwordError,
			icon: "warning",
			confirmButtonColor: "#FCAE2D"
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
			confirmButtonColor: "#FCAE2D"
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
			confirmButtonColor: "#FCAE2D"
		});
		
		console.error(error);
		return false;
	}

};
