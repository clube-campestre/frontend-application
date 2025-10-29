import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LabelButton from "../../../components/label-button/LabelButton";
import userIcon from "../../../assets/icons/user.svg";
import computerIcon from "../../../assets/icons/computer-check.svg";
import exitIcon from "../../../assets/icons/exit.svg";
import logo from "../../../assets/images/logoDesbravadores.png";
import AddUserModal from "./AddUserModal";
import { getUser } from "../../../utils/authStorage";
import Toast from "../../../utils/Toast";
import { api } from "../../../provider/api";
import Swal from "sweetalert2";

const Configurations = () => {
	const [editingUser, setEditingUser] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setEditingUser(getUser());
	}, []);

	const handleAddUser = async (user) => {
		if (editingUser) {
			try {
				await api.put(`/accounts/${editingUser.userId}`, user);
				fetchUsers();
				setEditingUser(null);
				Toast.fire({
					icon: "success",
					title: "Usuário editado com sucesso!",
				});
			} catch (err) {
				Toast.fire({
					icon: "error",
					title: "Ocorreu um erro ao editar usuário.",
				});

				console.error("Error editing user:", err);
			}
		} else {
			try {
				await api.post("/accounts/register", user);
				fetchUsers();

				Toast.fire({
					icon: "success",
					title: "Usuário adicionado com sucesso!",
				});
			} catch (err) {
				Toast.fire({
					icon: "error",
					title: "Ocorreu um erro ao adicionar usuário.",
				});
				console.error("Error adding user:", err);
			}
		}

		setShowModal(false);
	};

	return (
		<div className="flex flex-row items-center justify-center gap-25 px-15 py-30 w-full h-full">
			<div className="flex flex-col gap-5">
				<LabelButton
					label="Gerenciar usuários"
					icon={userIcon}
					onClick={() => navigate("/user-management")}
				/>
				<LabelButton
					label="Editar conta"
					icon={computerIcon}
					onClick={() => setShowModal(true)}
				/>
				<LabelButton
					label="Sair"
					icon={exitIcon}
					onClick={() => {
						Swal.fire({
							title: "Tem certeza?",
							text: "Você deseja sair do sistema?",
							icon: "warning",
							iconColor: "#d33",
							showCancelButton: true,
							confirmButtonColor: "#5ccb5f",
							cancelButtonColor: "#d33",
							confirmButtonText: "Sim, sair",
							cancelButtonText: "Cancelar",
						}).then((result) => {
							if (result.isConfirmed) {
								navigate("/");
							}
						});
					}}
				/>
			</div>

			<img
				src={logo}
				alt="Desbravadores Logo"
				className="h-60 w-60 object-cover rounded-full shadow-lg"
			/>

			{showModal && (
				<AddUserModal
					onClose={() => setShowModal(false)}
					onUserAdded={handleAddUser}
					editingUser={editingUser}
					isOwnUser={true}
				/>
			)}
		</div>
	);
};

export default Configurations;
