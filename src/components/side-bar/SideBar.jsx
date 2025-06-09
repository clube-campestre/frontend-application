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
	const allowedMenuItems = menuItems.filter((item) =>
		item.roles.includes(userRole)
	);

	return (
		<aside className="h-[90vh] w-16 bg-black flex flex-col items-center py-7 space-y-8 ml-6 mt-5 rounded-xl justify-between">
			{allowedMenuItems.map((item, index) => {
				const isActive = activePath === item.path;
				const Icon = item.icon;

				if (item.label === "Sair") {
					return (
						<NavLink
							key={index}
							title={item.label}
							className="w-12 flex items-center justify-center rounded-full transition hover:bg-gray-600"
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
										window.location.href = item.path;
									}
								});
							}}
						>
							<Icon size={35} fill="#CCC" color="#000" />
						</NavLink>
					);
				} else {
					return (
						<NavLink
							key={index}
							to={item.path}
							title={item.label}
							className="w-12 flex items-center justify-center rounded-full transition hover:bg-gray-600"
						>
							{() => {
								const fill = isActive ? "#FCAE2D" : "#CCC";
								const color = isActive ? "#022C81" : "#000";

								return (
									<Icon size={35} fill={fill} color={color} />
								);
							}}
						</NavLink>
					);
				}
			})}
		</aside>
	);
}

export default SideBar;
