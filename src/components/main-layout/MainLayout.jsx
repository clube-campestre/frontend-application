import React from "react";
import Sidebar from "../side-bar/SideBar.jsx";
import { Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const MainLayout = () => {
	const location = useLocation();

	const sectionTitle = () => {
		switch (location.pathname) {
			case "/init":
				return "Início";
			case "/admin":
				return "Administração";
			case "/add-member":
				return "Adicionar Membro";
			case "/add-event":
				return "Adicionar Evento";
			case "/add-transport":
				return "Adicionar Transporte";
			case "/add-locate":
				return "Adicionar Local";
			case "/secretaria":
				return "Secretaria";
			case "/tesouraria":
				return "Tesouraria";
			case "/unidades":
				return "Unidades";
			case "/classes":
				return "Classes";
			case "/eventos":
				return "Eventos";
			case "/configuracoes":
				return "Configurações";
			default:
				return (
					location.pathname.slice(1).charAt(0).toUpperCase() +
					location.pathname.slice(2)
				);
		}
	};

	return (
		<div className="flex">
			<Sidebar activePath={location.pathname} />
			<div className="flex-1 bg-white px-6 py-4">
				<header className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-semibold text-[#022C81]">
						{sectionTitle()}
					</h1>
					<img src={logo} alt="Logo" className="h-10" />
				</header>
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
