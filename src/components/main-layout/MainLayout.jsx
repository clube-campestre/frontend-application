import React from "react";
import Sidebar from "../side-bar/SideBar.jsx";
import { Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/images/logoDesbravadores.png";
import { getSectionTitle } from "../../utils/routePaths.js";
import { getUser } from "../../utils/authStorage.js";

const MainLayout = () => {
	const location = useLocation();

	const sectionTitle = () => {
		const path = location.pathname;
		return getSectionTitle(path);
	};

	const userRole = getUser().access;

	return (
		<div className="flex">
			<Sidebar activePath={location.pathname} userRole={userRole} />
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
