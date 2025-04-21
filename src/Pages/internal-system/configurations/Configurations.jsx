import { useNavigate } from "react-router-dom";
import LabelButton from "../../../components/label-button/LabelButton";
import userIcon from "../../../assets/icons/user.svg";
import computerIcon from "../../../assets/icons/computer-check.svg";
import exitIcon from "../../../assets/icons/exit.svg";
import logo from "../../../assets/images/logoDesbravadores.png";

const Configurations = () => {
	const navigate = useNavigate();

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
					onClick={() => alert("Button clicked!")}
				/>
				<LabelButton
					label="Sair"
					icon={exitIcon}
					onClick={() => alert("Button clicked!")}
				/>
			</div>

			<img
				src={logo}
				alt="Desbravadores Logo"
				className="h-60 w-60 object-cover rounded-full shadow-lg"
			/>
		</div>
	);
};

export default Configurations;
