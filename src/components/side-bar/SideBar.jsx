import { useState } from "react";
import {
    FaHome,
    FaUserPlus,
    FaUsers,
    FaCalendarAlt,
    FaCog,
    FaBars,
    FaTimes
} from "react-icons/fa";
import { LuFolderCheck } from "react-icons/lu";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { GiCampingTent } from "react-icons/gi";
import { HiLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const menuItems = [
    { icon: FaHome, label: "Início", path: "/internal-home", roles: ["DIRETOR", "EXECUTIVO", "TESOURARIA", "SUPERVISOR"]},
    { icon: FaUserPlus, label: "Administração", path: "/admin", roles: ["DIRETOR", "EXECUTIVO"]},
    { icon: LuFolderCheck, label: "Secretaria", path: "/secretary", roles: ["DIRETOR", "EXECUTIVO"]},
    { icon: FaFileInvoiceDollar, label: "Tesouraria", path: "/statement", roles: ["DIRETOR", "EXECUTIVO", "TESOURARIA"]},
    { icon: FaUsers, label: "Unidades", path: "/unities", roles: ["DIRETOR", "EXECUTIVO", "SUPERVISOR"]},
    { icon: GiCampingTent, label: "Classes", path: "/classes", roles: ["DIRETOR", "EXECUTIVO", "SUPERVISOR"]},
    { icon: FaCalendarAlt, label: "Eventos", path: "/events", roles: ["DIRETOR", "EXECUTIVO", "TESOURARIA", "SUPERVISOR"]},
    { icon: FaCog, label: "Configurações", path: "/configurations", roles: ["DIRETOR", "EXECUTIVO", "TESOURARIA", "SUPERVISOR"]},
    { icon: HiLogout, label: "Sair", path: "/", roles: ["DIRETOR", "EXECUTIVO", "TESOURARIA", "SUPERVISOR"]},
];

function SideBar({ activePath, userRole }) {
    const [isOpen, setIsOpen] = useState(false);

    const allowedMenuItems = menuItems.filter((item) =>
        item.roles.includes(userRole)
    );

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* --- 1. BOTÃO FLUTUANTE (MOBILE) --- 
                Fica fixo na tela mesmo com scroll. Efeito 'Glass'.
            */}
            <button 
                onClick={toggleMenu}
                className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-slate-900/80 backdrop-blur-md text-white rounded-full shadow-lg border border-slate-700 hover:bg-[#FCAE2D] hover:text-slate-900 transition-all active:scale-95"
                aria-label="Abrir Menu"
            >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* --- 2. OVERLAY (Fundo escuro mobile) --- */}
            <div 
                className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsOpen(false)}
            />

            {/* --- 3. SIDEBAR --- */}
            <aside 
                className={`
                    /* BASE VISUAL */
                    bg-gradient-to-b from-slate-900 to-slate-800 text-white
                    flex flex-col items-center py-6
                    shadow-2xl border-r border-slate-700/50
                    transition-all duration-300 ease-in-out z-50
                    
                    /* SCROLLBAR PERSONALIZADA (Esconde a barra mas permite scroll se precisar) */
                    scrollbar-hide 

                    /* --- MOBILE BEHAVIOR (Gaveta) --- */
                    fixed top-0 left-0 h-full w-72 
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    
                    /* --- DESKTOP BEHAVIOR (Sticky & Bonito) --- */
                    lg:translate-x-0 
                    lg:sticky lg:top-5 lg:left-0  /* O segredo para não "sumir" no scroll */
                    lg:h-[calc(100vh-40px)]       /* Altura calculada para ficar centralizado */
                    lg:w-20 lg:rounded-2xl lg:ml-5 lg:my-5 
                    lg:border lg:border-slate-700
                    lg:shadow-xl
                `}
            >
                {/* Logo / Header Mobile */}
                <div className="lg:hidden w-full px-6 mb-6 flex items-center justify-between border-b border-slate-700 pb-4">
                    <span className="font-bold text-xl text-[#FCAE2D] tracking-wide">Menu</span>
                </div>

                {/* Lista de Itens */}
                <nav className="flex-1 w-full flex flex-col lg:items-center gap-2 overflow-y-auto px-3 lg:px-0">
                    {allowedMenuItems.map((item, index) => {
                        const isActive = activePath === item.path;
                        const Icon = item.icon;
                        const isLogout = item.label === "Sair";

                        // Estilos do Item
                        const itemClasses = `
                            relative flex items-center transition-all duration-300 group rounded-xl
                            
                            /* Mobile Styles */
                            w-full px-4 py-3 gap-4
                            
                            /* Desktop Styles */
                            lg:w-12 lg:h-12 lg:justify-center lg:p-0 lg:gap-0
                            
                            /* Hover Effects */
                            ${!isActive && "hover:bg-white/10 hover:translate-x-1 lg:hover:translate-x-0 lg:hover:scale-110"}
                            
                            /* Active State */
                            ${isActive 
                                ? "bg-[#FCAE2D] text-slate-900 shadow-lg shadow-orange-500/20 font-bold" 
                                : "text-slate-400 hover:text-white"
                            }
                            
                            /* Logout Special Style */
                            ${isLogout && "mt-auto hover:bg-red-500/10 hover:text-red-400 lg:mt-auto lg:mb-2"}
                        `;

                        const handleClick = (e) => {
                            if (window.innerWidth < 1024) setIsOpen(false);

                            if (isLogout) {
                                e.preventDefault();
                                Swal.fire({
                                    title: "Sair do sistema?",
                                    text: "Você precisará fazer login novamente.",
                                    icon: "warning",
                                    iconColor: "#ef4444",
                                    background: "#1e293b", // Dark theme alert
                                    color: "#fff",
                                    showCancelButton: true,
                                    confirmButtonColor: "#ef4444",
                                    cancelButtonColor: "#475569",
                                    confirmButtonText: "Sim, sair",
                                    cancelButtonText: "Cancelar",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.href = item.path;
                                    }
                                });
                            }
                        };

                        return (
                            <NavLink
                                key={index}
                                to={item.path}
                                title={item.label} // Tooltip nativo
                                className={itemClasses}
                                onClick={handleClick}
                            >
                                {/* Ícone */}
                                <Icon 
                                    size={24} 
                                    className={`transition-colors ${isActive ? "text-slate-900" : "text-current"}`}
                                />
                                
                                {/* Label (Mobile Only) */}
                                <span className="lg:hidden text-sm font-medium tracking-wide">
                                    {item.label}
                                </span>

                                {/* Indicador Desktop (Bolinha lateral ao passar o mouse) */}
                                {!isActive && !isLogout && (
                                    <span className="hidden lg:block absolute -right-2 w-1 h-1 bg-[#FCAE2D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}

export default SideBar;