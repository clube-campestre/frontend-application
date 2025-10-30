import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import ButtonPrimary from "../../../components/button-primary/ButtonPrimary";
import desbravadoresHome from "../../../assets/images/desbravador-home.jpg";
import Logo from "../../../assets/images/Logo.png";

const Header = () => {
    // Estado para controlar se o menu mobile está aberto ou fechado
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // [BÔNUS] Trava o scroll da página quando o menu mobile está aberto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);


    return (
        <section
            className="w-full min-h-screen relative overflow-hidden"
            id="header"
        >
            <div className="absolute inset-0 z-0 clip-path-image">
                <img
                    src={desbravadoresHome}
                    alt="Desbravadores"
                    className="w-full min-h-screen object-cover" 
                />
                <div className="absolute inset-0 bg-black/85 z-10" />
            </div>

            {/* Z-index aumentado para 30 */}
            <div className="relative z-30 flex justify-between items-center p-4 md:p-6">
                <figure>
                    <img src={Logo} alt="Logo" className="h-12 md:h-16" />
                </figure>

                {/* 4. NAVEGAÇÃO DESKTOP (Com espaçamento melhorado) */}
                <nav className="hidden md:flex flex-1 items-center justify-end text-base">
                    {/* 4a. Grupo de Links de Navegação */}
                    <div className="flex items-center space-x-8 lg:space-x-10">
                        <a href="/" className="text-white hover:text-gray-300">
                            Início
                        </a>
                        <a href="#about-us" className="text-white hover:text-gray-300">
                            Sobre nós
                        </a>
                        <a href="#valores" className="text-white hover:text-gray-300">
                            Valores
                        </a>
                        <a href="#unities" className="text-white hover:text-gray-300">
                            Unidades
                        </a>
                        <a href="#classes" className="text-white hover:text-gray-300">
                            Classes
                        </a>
                    </div>

                    {/* 4b. Botão de Ação (separado) */}
                    <div className="ml-10 lg:ml-14">
                        <Link to="/login">
                            <ButtonPrimary text="LOGIN" />
                        </Link>
                    </div>
                </nav>


                {/* ======================================= */}
                {/* 5. OPÇÃO DE FECHAR #1 (Hamburger/X Principal) */}
                {/* Este botão controla o 'isMenuOpen' e troca o ícone */}
                {/* ======================================= */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-white z-50" // z-50 (acima do menu overlay z-40)
                    aria-label="Abrir ou fechar menu"
                >
                    {isMenuOpen ? (
                        // Se o menu está aberto, MOSTRA O 'X'
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        // Se o menu está fechado, MOSTRA O 'HAMBURGER'
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* 6. MENU OVERLAY (MOBILE) */}
            <div
                className={`
                    md:hidden fixed inset-0 bg-black/95 z-40
                    flex flex-col items-center justify-center 
                    transform transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {/* ======================================= */}
                {/* 6a. OPÇÃO DE FECHAR #2 (Botão 'X' Interno) */}
                {/* Este botão apenas fecha o menu (onClick={() => setIsMenuOpen(false)}) */}
                {/* ======================================= */}
                <button
                    onClick={() => setIsMenuOpen(false)} 
                    className="absolute top-6 right-5 text-white" 
                    aria-label="Fechar menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>


                {/* 6b. Links do Menu Mobile (com espaçamento ajustado) */}
                <div className="flex flex-col items-center space-y-8">
                    <a href="/" className="text-white text-3xl hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                        Início
                    </a>
                    <a href="#about-us" className="text-white text-3xl hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                        Sobre nós
                    </a>
                    <a href="#valores" className="text-white text-3xl hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                        Valores
                    </a>
                    <a href="#unities" className="text-white text-3xl hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                        Unidades
                    </a>
                    <a href="#classes" className="text-white text-3xl hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                        Classes
                    </a>
                    {/* OPÇÃO DE FECHAR #3: Clicar em qualquer link também fecha o menu (onClick) */}
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="pt-4"> 
                        <ButtonPrimary text="LOGIN" className="text-xl px-8 py-3" />
                    </Link>
                </div>
            </div>


            {/* 7. CONTEÚDO HERO (Texto Central) */}
            <article className="relative z-20 flex flex-col items-center justify-center h-[60vh] md:h-[60%] w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 w-11/12 md:w-2/3 text-center leading-tight">
                    Ser{" "}
                    <span className="text-[#FCAE2D]">
                        Desbravador Campestre
                    </span>
                    <br />é um chamado para servir,
                    <br />
                    amar e transformar!
                </h1>
            </article>

            {/* 8. BOTÃO "SAIBA MAIS" */}
            <div className="absolute z-20 left-1/2 transform -translate-x-1/2 bottom-[12%] md:bottom-[22%]">
                <a href="#about-us">
                    <ButtonPrimary text="SAIBA MAIS" />
                </a>
            </div>

            {/* 9. CLIP-PATH RESPONSIVO */}
            <style>{`
                .clip-path-image {
                    /* Corte para mobile (default) */
                    clip-path: polygon(0 0, 100% 0, 100% 85%, 50% 95%, 0 85%);
                }

                @media (min-width: 768px) {
                    /* Corte para desktop (md) */
                    .clip-path-image {
                        clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 96%, 0 70%);
                    }
                }
            `}</style>
        </section>
    );
};

export default Header;