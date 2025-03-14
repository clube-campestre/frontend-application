import Swal from "sweetalert2";

export const loginService = async (email, password) => {
	const API_URL = "http://localhost:3001/users";

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
