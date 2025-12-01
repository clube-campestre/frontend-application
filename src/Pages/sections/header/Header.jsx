import { useState } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../../components/button-primary/ButtonPrimary";
import desbravadoresHome from "../../../assets/images/desbravador-home.jpg";
import Logo from "../../../assets/images/Logo.png";

const Header = () => {
  // Estado para controlar a abertura do menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar o menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Lista de links para facilitar a manutenção e evitar repetição
  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Sobre nós", href: "#about-us" },
    { name: "Unidades", href: "#unities" },
    { name: "Classes", href: "#classes" },
  ];

  return (
    <section
      className="w-full h-screen relative overflow-hidden"
      id="header"
    >
      {/* --- Background Image & Overlay --- */}
      <div className="absolute inset-0 z-0 clip-path-image">
        <img
          src={desbravadoresHome}
          alt="Desbravadores"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/85 z-10" />
      </div>

      {/* --- Header Navigation Bar --- */}
      <div className="relative z-50 flex justify-between items-center p-4 md:px-8 md:py-6">
        {/* Logo */}
        <figure className="flex-shrink-0">
          <img 
            src={Logo} 
            alt="Logo" 
            className="h-12 md:h-16 transition-all duration-300" 
          />
        </figure>

        {/* Botão Mobile (Hambúrguer) - Só aparece em telas < md */}
        <button
          className="text-white md:hidden focus:outline-none p-2"
          onClick={toggleMenu}
          aria-label="Alternar menu"
        >
          {isMenuOpen ? (
            // Ícone Fechar (X)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Ícone Menu (Hambúrguer)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Navegação Desktop - Escondida em Mobile (hidden md:flex) */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12 text-base">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-white hover:text-gray-300 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link to="/login">
            <ButtonPrimary text="LOGIN" />
          </Link>
        </nav>
      </div>

      {/* --- Menu Mobile Overlay --- */}
      {/* Aparece quando o estado isMenuOpen é true */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMenuOpen(false)} // Fecha o menu ao clicar
            className="text-white text-2xl font-semibold hover:text-[#FCAE2D]"
          >
            {link.name}
          </a>
        ))}
        <div onClick={() => setIsMenuOpen(false)}>
          <Link to="/login">
            <ButtonPrimary text="LOGIN" />
          </Link>
        </div>
      </div>

      {/* --- Hero Content --- */}
      <article className="relative z-20 flex flex-col items-center justify-center h-[60%] w-full px-4 text-center">
        {/* Texto responsivo: Começa com text-3xl e aumenta em telas maiores */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 w-full md:w-2/3 leading-tight drop-shadow-lg">
          Ser{" "}
          {/* Quebra de linha forçada em mobile (block) para destaque */}
          <span className="text-[#FCAE2D] block md:inline my-2 md:my-0">
            Desbravador Campestreeeee
          </span>
          <span className="block">
             é um chamado para servir, amar e transformar!
          </span>
        </h1>
      </article>

      {/* --- CTA Button --- */}
      <div className="absolute z-30 left-1/2 transform -translate-x-1/2 bottom-[15%] md:bottom-[22%] w-max">
        <a href="#about-us">
          <ButtonPrimary text="SAIBA MAIS" />
        </a>
      </div>

      {/* --- Styles (Clip Path Responsivo) --- */}
      <style>{`
        /* Mobile: Corte mais suave para não comer o conteúdo */
        .clip-path-image {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 50% 98%, 0 85%);
        }
        
        /* Desktop: Corte original agressivo */
        @media (min-width: 768px) {
          .clip-path-image {
             clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 96%, 0 70%);
          }
        }
      `}</style>
    </section>
  );
};

export default Header;