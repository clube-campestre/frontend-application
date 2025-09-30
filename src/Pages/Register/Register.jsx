import { useState } from "react";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import anelImagem1 from "../../assets/images/anel1-login-cadastro.png";
import Logo from "../../assets/images/logo.png";
import anelImagem2 from "../../assets/images/anel2-login-cadastro.png";
import { registerService } from "../../services/userService";
import Swal from "sweetalert2";
import FloatingInput from "../../components/floating-input/FloatingInput";

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
    <div className="w-full h-screen flex flex-col md:flex-row relative bg-white overflow-hidden font-poppins">
      {/* Lado esquerdo - Banner */}
      <div className="w-full md:w-1/2 h-[35vh] md:h-full bg-gradient-to-r from-[#022C81] to-[#272727] relative flex items-center justify-center">
        {/* Anel superior */}
        <div className="absolute left-[60vw] md:left-[37vw] top-4 md:top-0">
          <img
            src={anelImagem1 || "/placeholder.svg"}
            alt="anel 1"
            className="h-[8vh] md:h-[10vh]"
          />
        </div>

        {/* Texto + Logo */}
        <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-4 md:gap-6 p-4 md:p-8 w-11/12 md:w-4/5 text-center md:text-left">
          <h1 className="text-[#FCAE2D] text-2xl md:text-4xl font-black">
            Desbravadores Campestre
          </h1>
          <h5 className="text-white text-base md:text-xl font-normal mt-4 md:mt-8">
            Junte-se a essa grande aventura!
          </h5>
          <img
            src={Logo || "/placeholder.svg"}
            alt="logo"
            className="w-[60px] h-[60px] md:w-[75px] md:h-[75px] object-contain mt-8 md:mt-20 mx-auto md:mx-0"
          />
        </div>

        {/* Anel inferior */}
        <div className="absolute bottom-0 left-0 w-1/2 rotate-2 hidden md:block">
          <img
            src={anelImagem2 || "/placeholder.svg"}
            alt="anel 2"
            className="w-[30vw] h-[25vh]"
          />
        </div>
      </div>

      {/* Formulário */}
      <form
        className="w-full md:w-1/2 h-full flex flex-col items-center justify-center text-center bg-white p-6 sm:p-12"
        onSubmit={handleRegister}
      >
        <h1 className="text-[#021C4F] mb-8 font-semibold text-2xl md:text-3xl">
          Criar Conta
        </h1>

        <div className="mb-7 w-full max-w-sm md:w-[23vw]">
          <FloatingInput
            id="name"
            type="text"
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={FaUser}
          />
        </div>

        <div className="mb-7 w-full max-w-sm md:w-[23vw]">
          <FloatingInput
            id="email"
            type="email"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={FaEnvelope}
          />
        </div>

        <div className="mb-7 w-full max-w-sm md:w-[23vw]">
          <FloatingInput
            id="password"
            type="password"
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={FaLock}
          />
        </div>

        <div className="mb-7 w-full max-w-sm md:w-[23vw]">
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
          className="w-full max-w-sm md:w-[23vw] py-[12px] bg-[#FCAE2D] text-white rounded-full text-sm md:text-base font-semibold cursor-pointer transition-all duration-300 mt-4 uppercase tracking-wider hover:bg-[#F18E1E] hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
        >
          Cadastrar
        </button>

        <p className="mt-6 text-sm md:text-base">Já tem uma conta?</p>
        <a
          href="/login"
          className="text-[#022977] no-underline font-semibold hover:underline text-sm md:text-base"
        >
          Faça login
        </a>
      </form>
    </div>
  );
};

export default Register;
