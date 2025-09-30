import React from "react";
import Sidebar from "../side-bar/SideBar.jsx"; // Garanta que o caminho para a Sidebar está correto
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

    const userRole = getUser()?.access;

    return (
        // ALTERAÇÃO: O 'md:flex' cria o layout de duas colunas apenas no desktop.
        // Adicionado um fundo cinza claro para a área externa.
        <div className="relative min-h-screen bg-gray-100 md:flex">
            
            <Sidebar activePath={location.pathname} userRole={userRole} />
            
            {/* ALTERAÇÃO: A tag <main> é semanticamente melhor para o conteúdo principal.
                - 'flex-1' faz ela ocupar o espaço restante no desktop.
                - 'p-4 md:p-6' cria um padding responsivo.
                - 'pb-24 md:pb-6' é a chave: 
                    - 'pb-24' (padding-bottom) no mobile para não esconder conteúdo atrás da barra de navegação.
                    - 'md:pb-6' reseta o padding para o normal no desktop.
            */}
            <main className="flex-1 bg-white p-4 md:p-6 pb-24 md:pb-6">
                <header className="flex justify-between items-center mb-6">
                    {/* ALTERAÇÃO: Título com tamanho de fonte responsivo. */}
                    <h1 className="text-xl md:text-2xl font-semibold text-[#022C81]">
                        {sectionTitle()}
                    </h1>
                    {/* ALTERAÇÃO: Logo com altura responsiva. */}
                    <img src={logo} alt="Logo" className="h-8 md:h-10" />
                </header>
                
                {/* O Outlet renderiza o conteúdo da página atual (Admin, Home, etc.) */}
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;