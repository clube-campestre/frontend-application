import {
    FaHome,
    FaUserPlus,
    FaUsers,
    FaCalendarAlt,
    FaCog,
} from "react-icons/fa";
import { LuFolderCheck } from "react-icons/lu";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { GiCampingTent } from "react-icons/gi";
import { HiLogout } from "react-icons/hi";
import { NavLink, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const menuItems = [
    { icon: FaHome, label: "Início", path: "/internal-home", roles: ["DIRETOR", "EXECUTIVO", "TESOURARIA", "SUPERVISOR"] },
    { icon: FaUserPlus, label: "Administração", path: "/admin", roles: ["DIRETOR", "EXECUTIVO"] },
    { icon: LuFolderCheck, label: "Secretaria", path: "/secretary", roles: ["DIRETOR", "EXECUTIVO"] },
    { icon: FaFileInvoiceDollar, label: "Tesouraria", path: "/statement", roles: ["DIRETOR", "EXECUTIVO", "TESOURARIA"] },
    { icon: FaUsers, label: "Unidades", path: "/unities", roles: ["DIRETOR", "EXECUTIVO", "SUPERVISOR"] },
    { icon: GiCampingTent, label: "Classes", path: "/classes", roles: ["DIRETOR", "EXECUTIVO", "SUPERVISOR"] },
    { icon: FaCalendarAlt, label: "Eventos", path: "/events", roles: ["DIRETOR", "EXECUTIVO", "TESOURARIA", "SUPERVISOR"] },
    { icon: FaCog, label: "Configurações", path: "/configurations", roles: ["DIRETOR", "EXECUTIVO", "TESOURARIA", "SUPERVISOR"] },
    { icon: HiLogout, label: "Sair", path: "/", roles: ["DIRETOR", "EXECUTIVO", "TESOURARIA", "SUPERVISOR"] },
];

function SideBar({ userRole }) {
    const location = useLocation();
    const activePath = location.pathname;

    const allowedMenuItems = menuItems.filter((item) =>
        item.roles.includes(userRole)
    );

    const handleLogout = () => {
        Swal.fire({
            title: "Tem certeza?",
            text: "Você deseja sair do sistema?",
            icon: "warning",
            iconColor: "#d33",
            showCancelButton: true,
            confirmButtonText: "Sim, sair",
            cancelButtonText: "Cancelar",
            customClass: {
                confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded',
                cancelButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                // Adicione sua lógica de logout aqui (ex: limpar token)
                window.location.href = "/";
            }
        });
    };

    return (
        <aside
            className="
                /* --- Mobile: Barra Inferior --- */
                fixed bottom-0 left-0 z-50 w-full h-16 bg-black
                flex flex-row items-center justify-around
                
                /* --- Desktop: Barra Lateral --- */
                md:relative md:w-16 md:h-screen
                md:flex-col md:justify-start md:py-4 md:space-y-4 md:flex-shrink-0
            "
        >
            {allowedMenuItems.map((item) => (
                <NavLink
                    key={item.label}
                    to={item.path}
                    title={item.label}
                    onClick={(e) => {
                        if (item.label === "Sair") {
                            e.preventDefault();
                            handleLogout();
                        }
                    }}
                    // O NavLink do React Router V6 aplica a classe 'active' automaticamente
                    className={({ isActive }) => `
                        flex-1 flex flex-col items-center justify-center p-2 
                        rounded-md transition-colors duration-200 group 
                        md:flex-none md:w-full
                        ${isActive ? 'text-yellow-400' : 'text-gray-400 hover:text-white hover:bg-gray-700'}
                    `}
                >
                    <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-xs mt-1 md:hidden">
                        {item.label}
                    </span>
                </NavLink>
            ))}
        </aside>
    );
}

export default SideBar;