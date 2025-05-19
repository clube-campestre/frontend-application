import React from "react";
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

const menuItems = [
	{ icon: FaHome, label: "Início", path: "/internal-home" },
	{ icon: FaUserPlus, label: "Administração", path: "/admin" },
	{ icon: LuFolderCheck, label: "Secretaria", path: "/secretaria" },
	{ icon: FaFileInvoiceDollar, label: "Tesouraria", path: "/statement" },
	{ icon: FaUsers, label: "Unidades", path: "/unities" },
	{ icon: GiCampingTent, label: "Classes", path: "/classes" },
	{ icon: FaCalendarAlt, label: "Eventos", path: "/events" },
	{ icon: FaCog, label: "Configurações", path: "/configurations" },
	{ icon: HiLogout, label: "Sair", path: "/" },
];

function SideBar({ activePath }) {
	return (
		<aside className="h-[90vh] w-16 bg-black flex flex-col items-center py-7 space-y-8 ml-6 mt-5 rounded-xl justify-between">
			{menuItems.map((item, index) => {
				const isActive = activePath === item.path;
				const Icon = item.icon;

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

							return <Icon size={35} fill={fill} color={color} />;
						}}
					</NavLink>
				);
			})}
		</aside>
	);
}

export default SideBar
