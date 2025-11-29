import { useState } from "react";
import { FaEnvelope, FaKey, FaArrowLeft } from "react-icons/fa";
// Imagens removidas pois pertenciam ao lado azul decorativo, 
// mas mantive os imports caso queira reincorporar o Logo no futuro.
// import anelImagem1 from "../../assets/images/anel1-login-cadastro.png";
// import Logo from "../../assets/images/logo.png";
// import anelImagem2 from "../../assets/images/anel2-login-cadastro.png";
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
        // CONTAINER PRINCIPAL
        // min-h-screen: Garante altura total
        // flex items-center justify-center: Centraliza vertical e horizontalmente
        // p-4: Garante espaçamento interno em telas muito pequenas (mobile)
        <div className="w-full min-h-screen flex items-center justify-center bg-white font-poppins p-4 overflow-y-auto">
            
            {/* CONTAINER DO FORMULÁRIO 
                w-full: Ocupa largura disponível em mobile
                max-w-md: Trava a largura em 28rem (aprox 448px) em desktop para não esticar demais
            */}
            <div className="w-full max-w-md flex flex-col relative">

                {/* Botão Voltar - Posicionado no fluxo normal para evitar sobreposição em mobile */}
                {(recoveryStep === 1 || recoveryStep === 2 || recoveryStep === 3) && (
                    <button
                        type="button"
                        onClick={handleBack}
                        className="self-start mb-6 flex items-center gap-2 text-[#022C81] hover:text-[#FCAE2D] transition-colors font-semibold"
                    >
                        <FaArrowLeft size={22} />
                        Voltar
                    </button>
                )}

                {/* --- STEP 0: LOGIN --- */}
                {recoveryStep === 0 && (
                    <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
                        <h1 className="text-[#021C4F] mb-8 font-semibold text-3xl text-center">
                            Realize o seu login!
                        </h1>
                        
                        {/* Substituído w-[23vw] por w-full para responsividade */}
                        <div className="mb-7 w-full">
                            <FloatingInput
                                id="email"
                                type="email"
                                label="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={FaEnvelope}
                            />
                        </div>
                        <div className="mb-7 w-full">
                            <FloatingInput
                                id="password"
                                type="password"
                                label="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={FaKey}
                            />
                        </div>
                        
                        {/* Botão agora ocupa 100% do container pai */}
                        <button 
                            type="submit" 
                            className="w-full py-[14px] bg-[#FCAE2D] text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 mt-4 uppercase tracking-wider hover:bg-[#F18E1E] hover:-translate-y-1 hover:shadow-lg active:translate-y-0" 
                            disabled={loading}
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                        
                        <button
                            type="button"
                            className="mt-6 text-[#022C81] underline hover:text-[#FCAE2D] transition-colors font-semibold"
                            onClick={() => setRecoveryStep(1)}
                        >
                            Esqueci minha senha
                        </button>
                    </form>
                )}

                {/* --- STEP 1: EMAIL RECUPERAÇÃO --- */}
                {recoveryStep === 1 && (
                    <div className="w-full flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-6 text-center">Recuperação de senha</h2>
                        <div className="w-full">
                             <FloatingInput
                                id="recoveryEmail"
                                type="email"
                                label="Informe seu e-mail"
                                value={recoveryEmail}
                                onChange={(e) => setRecoveryEmail(e.target.value)}
                                icon={FaEnvelope}
                            />
                        </div>
                       
                        <button
                            className="w-full py-[14px] bg-[#FCAE2D] text-white rounded-full font-semibold mt-6 transition-all hover:bg-[#F18E1E]"
                            onClick={handleSendRecoveryEmail}
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar código de recuperação"}
                        </button>
                    </div>
                )}

                {/* --- STEP 2: CÓDIGO --- */}
                {recoveryStep === 2 && (
                    <div className="w-full flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-6 text-center">Digite o código recebido</h2>
                        
                        {/* Container flexível para os inputs do código */}
                        <div className="flex justify-center gap-2 mb-6 w-full relative">
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
                                    // w-12 é fixo, em telas muito pequenas (iPhone SE) pode quebrar. 
                                    // Adicionei flex-1 e max-w para garantir
                                    className="w-12 h-12 flex-1 max-w-[3rem] text-2xl text-center border rounded focus:border-[#FCAE2D] focus:outline-none transition-colors"
                                    value={digit}
                                    onChange={e => {
                                        let val = e.target.value.replace(/[^0-9A-Za-z]/, "");
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
                            className="w-full py-[14px] bg-[#FCAE2D] text-white rounded-full font-semibold transition-all hover:bg-[#F18E1E]"
                            onClick={handleValidateCode}
                            disabled={loading}
                        >
                            {loading ? "Validando..." : "Validar código"}
                        </button>
                    </div>
                )}

                {/* --- STEP 3: NOVA SENHA --- */}
                {recoveryStep === 3 && (
                    <div className="w-full flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-6 text-center">Defina sua nova senha</h2>
                        <div className="w-full flex flex-col gap-4">
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
                        </div>

                        <button
                            className="w-full py-[14px] bg-[#FCAE2D] text-white rounded-full font-semibold mt-6 transition-all hover:bg-[#F18E1E]"
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