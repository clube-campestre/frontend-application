import { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import anelImagem1 from "../../assets/images/anel1-login-cadastro.png";
import Logo from "../../assets/images/logo.png";
import anelImagem2 from "../../assets/images/anel2-login-cadastro.png";
import { loginService } from "../../services/userService";
import Toast from "../../utils/Toast";
import FloatingInput from "../../components/floating-input/FloatingInput";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const user = await loginService(email, password);
        if (user) {
            Toast.fire({
                icon: "success",
                title: "Login realizado com sucesso!",
            });

            setTimeout(() => {
                navigate("/internal-home");
            }, 2500);
        }
    };

    return (
        // ALTERAÇÃO: Garante altura da tela em todos os dispositivos e esconde overflow
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden font-poppins">
            
            {/* --- Lado Esquerdo - Banner --- */}
            {/* ALTERAÇÃO: Altura ajustada para mobile e desktop para melhor encaixe */}
            <div className="w-full md:w-1/2 h-[45vh] md:h-screen bg-gradient-to-br from-[#022C81] to-[#272727] relative flex items-center justify-center p-4">
                
                {/* Anel superior - Posição ajustada para melhor visibilidade */}
                <img
                    src={anelImagem1 || "/placeholder.svg"}
                    className="absolute h-[8vh] md:h-[12vh] -top-2 right-0 md:left-auto md:right-4 md:top-4 opacity-50 md:opacity-100"
                    alt="anel decorativo 1"
                />

                {/* Texto + Logo */}
                {/* ALTERAÇÃO: Tamanhos de fonte e espaçamentos responsivos */}
                <div className="relative z-10 flex flex-col gap-4 text-center md:text-left w-full max-w-md">
                    <h1 className="text-[#FCAE2D] text-3xl md:text-4xl font-black">
                        Desbravadores Campestre
                    </h1>
                    <h5 className="text-white text-base md:text-xl font-light mt-2 md:mt-4">
                        Coragem para explorar, fé para seguir e serviço para transformar!
                    </h5>
                    <img
                        src={Logo || "/placeholder.svg"}
                        className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-contain mt-6 mx-auto md:mx-0"
                        alt="logo"
                    />
                </div>

                {/* Anel inferior */}
                <img
                    src={anelImagem2 || "/placeholder.svg"}
                    className="absolute bottom-0 left-0 w-2/5 md:w-1/2 max-w-[250px] md:max-w-xs opacity-40 md:opacity-100"
                    alt="anel decorativo 2"
                />
            </div>

            {/* --- Formulário --- */}
            {/* ALTERAÇÃO: flex-grow permite que o formulário ocupe o espaço vertical restante no mobile */}
            <form
                className="w-full md:w-1/2 flex-grow flex flex-col items-center justify-center bg-white p-6 sm:p-12"
                onSubmit={handleLogin}
            >
                <div className="w-full max-w-sm">
                    <h1 className="text-[#021C4F] mb-8 font-semibold text-2xl md:text-3xl text-center">
                        Realize o seu login!
                    </h1>

                    {/* Input de E-mail */}
                    {/* ALTERAÇÃO: Removido 'md:w-[23vw]' para usar max-w-sm que é mais consistente */}
                    <div className="mb-6 w-full">
                        <FloatingInput
                            id="email"
                            type="email"
                            label="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={FaEnvelope}
                        />
                    </div>

                    {/* Input de Senha */}
                    <div className="mb-6 w-full">
                        <FloatingInput
                            id="password"
                            type="password"
                            label="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={FaKey}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#FCAE2D] text-white rounded-full text-sm md:text-base font-semibold cursor-pointer transition-all duration-300 mt-4 uppercase tracking-wider hover:bg-[#F18E1E] hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
                    >
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
