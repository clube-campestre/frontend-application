import { useState } from "react";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import anelImagem1 from "../../assets/images/anel1-login-cadastro.png";
import Logo from "../../assets/images/logo.png";
import anelImagem2 from "../../assets/images//anel2-login-cadastro.png";
import { registerService } from "../../services/userService";
import Swal from "sweetalert2";
import FloatingInput from "../../components/floating-input/floating-input";

const Register = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();

		const register = await registerService(
			name,
			email,
			password,
			confirmPassword
		);

		if (register) {
			let timerInterval;
			Swal.fire({
				title: `Cadastro efetuado com sucesso!`,
				html: "Você será redirecionado para tela de login em <b></b> millisegundos.",
				timer: 2500,
				timerProgressBar: true,
				icon: "success",
				confirmButtonColor: "#FCAE2D",
				didOpen: () => {
					Swal.showLoading();
					const timer = Swal.getPopup().querySelector("b");
					timerInterval = setInterval(() => {
						timer.textContent = `${Swal.getTimerLeft()}`;
					}, 100);
				},
				willClose: () => {
					clearInterval(timerInterval);
				},
			}).then((result) => {
				if (result.dismiss === Swal.DismissReason.timer) {
					window.location.href = "/login";
				}
			});
		}
	};

	return (
		<div className="w-full h-screen flex relative bg-white overflow-hidden font-poppins">
			<div className="w-1/2 h-full bg-gradient-to-r from-[#022C81] to-[#272727] relative">
				<div className="absolute left-[37vw]">
					<img
						src={anelImagem1 || "/placeholder.svg"}
						alt=""
						className="h-[10vh]"
					/>
				</div>

				<div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-6 p-8 w-4/5 ml-8">
					<h1 className="text-[#FCAE2D] text-4xl font-black w-[50vw]">
						Desbravadores Campestre
					</h1>
					<h5 className="text-white text-xl font-normal mt-8 w-[22vw]">
						Junta-se a essa grande aventura!
					</h5>
					<img
						src={Logo || "/placeholder.svg"}
						alt=""
						className="w-[75px] h-[75px] object-contain mt-20"
					/>
				</div>

				<div className="absolute bottom-0 left-0 w-1/2 rotate-2">
					<img
						src={anelImagem2 || "/placeholder.svg"}
						alt=""
						className="w-[25vw] h-[25vh]"
					/>
				</div>
			</div>

			<form
				className="p-12 w-1/2 h-full flex items-center flex-col justify-center text-center bg-white hover:border-[#FCAE2D] transition-all duration-800"
				onSubmit={handleRegister}
			>
				<h1 className="text-[#021C4F] mb-8 font-semibold text-3xl">
					Criar Conta
				</h1>

				<div className="mb-7 w-[23vw]">
					<FloatingInput
						id="name"
						type="text"
						label="Nome"
						value={name}
						onChange={(e) => setName(e.target.value)}
						icon={FaUser}
					/>
				</div>

				<div className="mb-7 w-[23vw]">
					<FloatingInput
						id="email"
						type="email"
						label="E-mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						icon={FaEnvelope}
					/>
				</div>

				<div className="mb-7 w-[23vw]">
					<FloatingInput
						id="password"
						type="password"
						label="Senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						icon={FaLock}
					/>
				</div>

				<div className="mb-7 w-[23vw]">
					<FloatingInput
						id="confirmPassword"
						type="password"
						label="Confirmar Senha"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						icon={FaLock}
					/>
				</div>

				<button
					type="submit"
					className="w-[23vw] py-[14px] bg-[#FCAE2D] text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 mt-4 uppercase tracking-wider h-[9vh] hover:bg-[#F18E1E] hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
				>
					Cadastrar
				</button>

				<p className="mt-8">Já tem uma conta?</p>
				<a href="/login" className="text-[#022977] no-underline font-semibold hover:underline">Faça login</a>
			</form>
		</div>
	);
};

export default Register;
