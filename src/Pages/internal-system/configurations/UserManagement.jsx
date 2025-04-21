import { api } from "../../../provider/api";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash, FaPlusCircle } from "react-icons/fa";

export default function UserManagement() {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await api.get("/accounts");
				setUsers(response.data);
				setError(null);
			} catch (err) {
				setError("Ocorreu um erro ao buscar os usuários.");
				console.error("Error fetching users:", err);
			}
		};

		fetchUsers();
	}, []);

	const handleEdit = (id) => {
		console.log(`Edit user with ID: ${id}`);
	};

	const handleDelete = (id) => {
		console.log(`Delete user with ID: ${id}`);
	};

	const handleAddUser = () => {
		console.log("Add new user");
	};

	return (
		<div className="w-full px-15 py-10">
			<div className="p-4 bg-[#EDEDED] rounded-lg">
				<div className="flex justify-between items-center py-4">
					<h1 className="text-lg font-medium">
						<span className="border-l-8 border-[#FCAE2D] mr-3"></span>
						Usuários Cadastrados
					</h1>
					<button
						onClick={handleAddUser}
						className="flex items-center gap-1 bg-[#D9D9D9] hover:bg-gray-300 px-3 py-1 rounded-md transition-colors"
					>
						<span>Adicionar Usuário</span>
						<FaPlusCircle size={18} />
					</button>
				</div>
				<div className="bg-white">
					{error ? (
						<div className="p-6 text-center text-red-500">
							{error}
						</div>
					) : (
						<ul
							className="flex flex-col gap-4 bg-[#EDEDED]"
							style={{
								maxHeight: "60vh",
								overflowY: "auto",
								scrollbarWidth: "thin",
								scrollbarColor: "#FFCC00 #E5E7EB",
							}}
						>
							{users.length > 0 ? (
								users.map((user) => (
									<li
										key={user.id}
										className="flex justify-between items-center p-6 hover:bg-gray-50 rounded-xl bg-white"
									>
										<div>
											<h3 className="font-medium">
												{user.name}
											</h3>
											<p className="text-sm text-gray-600">
												{user.email}
											</p>
											<p className="text-xs text-gray-500">
												Acesso: {user.access}
											</p>
										</div>
										<div className="flex gap-5">
											<button
												onClick={() =>
													handleEdit(user.id)
												}
												className="text-amber-500 hover:text-amber-600"
												aria-label="Editar usuário"
											>
												<FaPencilAlt size={18} />
											</button>
											<button
												onClick={() =>
													handleDelete(user.id)
												}
												className="text-gray-400 hover:text-gray-600"
												aria-label="Deletar usuário"
											>
												<FaTrash size={18} />
											</button>
										</div>
									</li>
								))
							) : (
								<p className="text-gray-500 italic">
									Nenhum usuário foi encontrado
								</p>
							)}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
