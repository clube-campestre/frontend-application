import { useState } from "react";
import { FaEnvelope, FaKey, FaArrowLeft } from "react-icons/fa";
import anelImagem1 from "../../assets/images/anel1-login-cadastro.png";
import Logo from "../../assets/images/logo.png";
import anelImagem2 from "../../assets/images/anel2-login-cadastro.png";
import {
    loginService,
    forgotPasswordService,
    verifyCodeService,
    resetPasswordService
} from "../../services/userService";
import Toast from "../../utils/Toast";
import FloatingInput from "../../components/floating-input/FloatingInput";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [recoveryStep, setRecoveryStep] = useState(0);
    const [recoveryEmail, setRecoveryEmail] = useState("");
    const [recoveryCode, setRecoveryCode] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const user = await loginService(email, password);
        setLoading(false);
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

    const handleSendRecoveryEmail = async () => {
        if (!recoveryEmail) {
            Toast.fire({
                icon: "warning",
                title: "Informe o e-mail para recuperação!",
            });
            return;
        }
        setLoading(true);
        const result = await forgotPasswordService(recoveryEmail);
        setLoading(false);
        if (result) {
            setRecoveryStep(2);
        }
    };

    const handleValidateCode = async () => {
        const code = recoveryCode.join("");
        if (code.length !== 6) {
            Toast.fire({
                icon: "warning",
                title: "Digite o código completo!",
            });
            return;
        }
        setLoading(true);
        const result = await verifyCodeService(recoveryEmail, code);
        setLoading(false);
        if (result) {
            setRecoveryStep(3);
        }
    };

    const handleResetPassword = async () => {
        if (!newPassword || !confirmNewPassword) {
            Toast.fire({
                icon: "warning",
                title: "Preencha todos os campos de senha!",
            });
            return;
        }
        if (newPassword !== confirmNewPassword) {
            Toast.fire({
                icon: "warning",
                title: "As senhas não coincidem!",
            });
            return;
        }
        const code = recoveryCode.join("");
        setLoading(true);
        const result = await resetPasswordService(recoveryEmail, code, newPassword);
        setLoading(false);
        if (result) {
            setRecoveryStep(0);
            setEmail("");
            setPassword("");
            setRecoveryEmail("");
            setRecoveryCode(["", "", "", "", "", ""]);
            setNewPassword("");
            setConfirmNewPassword("");
            Toast.fire({
                icon: "success",
                title: "Senha redefinida com sucesso!",
            });
        }
    };

    // Função para voltar etapas
    const handleBack = () => {
        if (recoveryStep === 1) setRecoveryStep(0);
        if (recoveryStep === 2) setRecoveryStep(1);
        if (recoveryStep === 3) setRecoveryStep(2);
    };

    return (
        <div className="w-full h-screen flex relative bg-white overflow-hidden font-poppins">
            {/* <div className="w-1/2 h-full bg-gradient-to-br from-[#022C81] to-[#272727] relative"> */}
            <div className="w-3/4 h-full bg-gradient-to-br from-[#022C81] to-[#272727] relative"> {/* Se quiser deixar azul maior */}
                <div className="absolute left-[37vw]">
                    <img
                        src={anelImagem1 || "/placeholder.svg"}
                        className="h-[10vh]"
                    />
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-6 p-8 w-4/5 ml-8">
                    <h1 className="text-[#FCAE2D] text-4xl font-black w-[50vw]">
                        Desbravadores Campestre
                    </h1>
                    <h5 className="text-white text-xl font-normal mt-8 w-[22vw]">
                        Coragem para explorar, fé para seguir e serviço para
                        transformar!
                    </h5>
                    <img
                        src={Logo || "/placeholder.svg"}
                        className="w-[75px] h-[75px] object-contain mt-20"
                    />
                </div>

                <div className="absolute bottom-0 left-0 w-1/2 rotate-2">
                    <img
                        src={anelImagem2 || "/placeholder.svg"}
                        className="w-[25vw] h-[25vh]"
                    />
                </div>
            </div>
            <div className="p-12 w-1/2 h-full flex items-center flex-col justify-center text-center bg-white hover:border-[#FCAE2D] transition-all duration-800 relative">
                {(recoveryStep === 1 || recoveryStep === 2 || recoveryStep === 3) && (
                    <button
                        type="button"
                        onClick={handleBack}
                        className="absolute top-8 left-8 flex items-center gap-2 text-[#022C81] hover:text-[#FCAE2D] transition-colors font-semibold"
                        style={{ zIndex: 10 }}
                    >
                        <FaArrowLeft size={22} />
                        Voltar
                    </button>
                )}
                {recoveryStep === 0 && (
                    <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
                        <h1 className="text-[#021C4F] mb-8 font-semibold text-3xl">
                            Realize o seu login!
                        </h1>
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
                                icon={FaKey}
                            />
                        </div>
                        <button type="submit" className="w-[23vw] py-[14px] bg-[#FCAE2D] text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 mt-4 uppercase tracking-wider h-[9vh] hover:bg-[#F18E1E] hover:-translate-y-1 hover:shadow-lg active:translate-y-0" disabled={loading}>
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                        <button
                            type="button"
                            className="mt-4 text-[#022C81] underline hover:text-[#FCAE2D] transition-colors font-semibold"
                            onClick={() => setRecoveryStep(1)}
                        >
                            Esqueci minha senha
                        </button>
                    </form>
                )}
                {recoveryStep === 1 && (
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-6">Recuperação de senha</h2>
                        <FloatingInput
                            id="recoveryEmail"
                            type="email"
                            label="Informe seu e-mail"
                            value={recoveryEmail}
                            onChange={(e) => setRecoveryEmail(e.target.value)}
                            icon={FaEnvelope}
                        />
                        <button
                            className="w-[23vw] py-[14px] bg-[#FCAE2D] text-white rounded-full font-semibold mt-6"
                            onClick={handleSendRecoveryEmail}
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar código de recuperação"}
                        </button>
                    </div>
                )}
                {recoveryStep === 2 && (
                    <div className="w-full flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-6">Digite o código recebido</h2>
                        <div className="flex gap-2 mb-6">
                            {/* Input invisível para copiar/colar todo o código */}
                            <input
                                type="text"
                                maxLength={6}
                                value={recoveryCode.join("")}
                                onChange={e => {
                                    const val = e.target.value.replace(/[^0-9A-Za-z]/g, "").slice(0, 6);
                                    const arr = val.split("");
                                    while (arr.length < 6) arr.push("");
                                    setRecoveryCode(arr);
                                }}
                                style={{
                                    position: "absolute",
                                    opacity: 0,
                                    pointerEvents: "none",
                                    width: 0,
                                    height: 0,
                                }}
                                tabIndex={-1}
                                aria-hidden="true"
                            />
                            {recoveryCode.map((digit, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    maxLength={1}
                                    className="w-12 h-12 text-2xl text-center border rounded"
                                    value={digit}
                                    onChange={e => {
                                        let val = e.target.value.replace(/[^0-9A-Za-z]/, "");
                                        // Se colar vários dígitos, distribui nos campos
                                        if (val.length > 1) {
                                            const arr = val.slice(0, 6).split("");
                                            while (arr.length < 6) arr.push("");
                                            setRecoveryCode(arr);
                                        } else {
                                            const newCode = [...recoveryCode];
                                            newCode[idx] = val;
                                            setRecoveryCode(newCode);
                                            if (val && idx < 5) {
                                                document.getElementById(`code-${idx + 1}`)?.focus();
                                            }
                                        }
                                    }}
                                    onPaste={e => {
                                        const paste = e.clipboardData.getData("text").replace(/[^0-9A-Za-z]/g, "").slice(0, 6);
                                        const arr = paste.split("");
                                        while (arr.length < 6) arr.push("");
                                        setRecoveryCode(arr);
                                        e.preventDefault();
                                    }}
                                    id={`code-${idx}`}
                                />
                            ))}
                        </div>
                        <button
                            className="w-[23vw] py-[14px] bg-[#FCAE2D] text-white rounded-full font-semibold"
                            onClick={handleValidateCode}
                            disabled={loading}
                        >
                            {loading ? "Validando..." : "Validar código"}
                        </button>
                    </div>
                )}
                {recoveryStep === 3 && (
                    <div className="w-full flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-6">Defina sua nova senha</h2>
                        <FloatingInput
                            id="newPassword"
                            type="password"
                            label="Nova senha"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            icon={FaKey}
                        />
                        <FloatingInput
                            id="confirmNewPassword"
                            type="password"
                            label="Confirmar nova senha"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            icon={FaKey}
                        />
                        <button
                            className="w-[23vw] py-[14px] bg-[#FCAE2D] text-white rounded-full font-semibold mt-6"
                            onClick={handleResetPassword}
                            disabled={loading}
                        >
                            {loading ? "Salvando..." : "Salvar nova senha"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
