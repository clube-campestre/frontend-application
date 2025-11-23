import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// Importando ícones modernos da biblioteca Lucide-React
import { UserCog, MonitorCheck, LogOut } from "lucide-react";
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
        // ...Lógica mantida idêntica à original...
        if (editingUser) {
            try {
                await api.put(`/accounts/${editingUser.userId}`, user);
                setEditingUser(null);
                Toast.fire({ icon: "success", title: "Usuário editado com sucesso!" });
            } catch (err) {
                Toast.fire({ icon: "error", title: "Erro ao editar usuário." });
                console.error(err);
            }
        } else {
            try {
                await api.post("/accounts/register", user);
                Toast.fire({ icon: "success", title: "Usuário adicionado com sucesso!" });
            } catch (err) {
                Toast.fire({ icon: "error", title: "Erro ao adicionar usuário." });
                console.error(err);
            }
        }
        setShowModal(false);
    };

    // Componente interno para os Botões Modernos (Reutilizável neste arquivo)
    const ModernButton = ({ label, icon: Icon, onClick, variant = "primary" }) => (
        <button
            onClick={onClick}
            className={`
                group w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                border shadow-sm hover:shadow-md
                ${variant === 'danger' 
                    ? 'bg-white border-red-100 hover:bg-red-50 text-red-600' 
                    : 'bg-white border-gray-100 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-700'
                }
            `}
        >
            <div className={`
                p-2 rounded-lg transition-colors
                ${variant === 'danger' ? 'bg-red-100 group-hover:bg-red-200' : 'bg-gray-100 group-hover:bg-blue-200 group-hover:text-blue-800'}
            `}>
                {/* O ícone agora é um componente React, permitindo controle total de tamanho */}
                <Icon size={20} strokeWidth={2} />
            </div>
            <span className="font-semibold text-sm md:text-base tracking-wide">{label}</span>
        </button>
    );

    return (
        // 1. Fundo da Página (Background Clean)
        <div className="min-h-full w-full bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">
            
            {/* 2. Card Principal (Glassmorphism sutil / Clean UI) */}
            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row ring-1 ring-gray-900/5">
                
                {/* LADO ESQUERDO: Área de Ações */}
                <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    
                    <div className="mb-8 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Configurações</h1>
                       
                    </div>

                    <div className="space-y-4 w-full max-w-md mx-auto md:mx-0">
                        <ModernButton 
                            label="Gerenciar Usuários" 
                            icon={UserCog} 
                            onClick={() => navigate("/user-management")} 
                        />
                        
                        <ModernButton 
                            label="Editar Minha Conta" 
                            icon={MonitorCheck} 
                            onClick={() => setShowModal(true)} 
                        />

                        {/* Divisor Visual */}
                        <div className="h-px bg-gray-100 w-full my-4"></div>

                        <ModernButton 
                            label="Sair da Conta" 
                            icon={LogOut} 
                            variant="danger"
                            onClick={() => {
                                Swal.fire({
                                    title: "Encerrar sessão?",
                                    text: "Você precisará fazer login novamente.",
                                    icon: "warning",
                                    iconColor: "#ef4444",
                                    showCancelButton: true,
                                    confirmButtonColor: "#ef4444",
                                    cancelButtonColor: "#6b7280",
                                    confirmButtonText: "Sair",
                                    cancelButtonText: "Cancelar"
                                }).then((res) => {
                                    if (res.isConfirmed) navigate("/");
                                });
                            }} 
                        />
                    </div>
                </div>

                {/* LADO DIREITO: Identidade Visual (Destaque) */}
                <div className="w-full md:w-2/5 bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center p-10 text-white relative overflow-hidden">
                    
                    {/* Círculos decorativos de fundo (Efeito moderno) */}
                    <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="p-1 bg-white/20 rounded-full backdrop-blur-sm mb-6">
                            <img
                                src={logo}
                                alt="Desbravadores Logo"
                                className="
                                    w-28 h-28 md:w-48 md:h-48 
                                    object-cover rounded-full 
                                    border-4 border-white shadow-2xl
                                    transform transition-transform hover:scale-105 duration-500
                                "
                            />
                        </div>
                        
                       
                        
                            
                     
                    </div>
                </div>

            </div>

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