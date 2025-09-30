import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ButtonPrimary from "../../../components/button-primary/ButtonPrimary";
import desbravadoresHome from "../../../assets/images/desbravador-home.jpg";
import Logo from "../../../assets/images/Logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="w-full h-screen relative overflow-hidden" id="header">
      {/* Background */}
      <div className="absolute inset-0 z-0 clip-path-image">
        <img
          src={desbravadoresHome}
          alt="Desbravadores"
          className="w-full h-screen object-cover"
        />
        <div className="absolute inset-0 bg-black/85 z-10" />
      </div>

      {/* Navbar */}
      <div className="relative z-20 flex justify-between items-center p-4">
        <figure>
          <img src={Logo} alt="Logo" className="h-12 sm:h-16" />
        </figure>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-10 lg:space-x-20 text-sm lg:text-base">
          <a href="/" className="text-white hover:text-gray-300">Início</a>
          <a href="#about-us" className="text-white hover:text-gray-300">Sobre nós</a>
          <a href="#unities" className="text-white hover:text-gray-300">Unidades</a>
          <a href="#classes" className="text-white hover:text-gray-300">Classes</a>
          <Link to="/login">
            <ButtonPrimary text="LOGIN" />
          </Link>
        </nav>

        {/* Botão mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Menu mobile animado */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-20 left-0 w-full bg-black/95 z-30 flex flex-col items-center space-y-6 py-6 md:hidden"
          >
            <a href="/" className="text-white hover:text-gray-300" onClick={() => setMenuOpen(false)}>Início</a>
            <a href="#about-us" className="text-white hover:text-gray-300" onClick={() => setMenuOpen(false)}>Sobre nós</a>
            <a href="#unities" className="text-white hover:text-gray-300" onClick={() => setMenuOpen(false)}>Unidades</a>
            <a href="#classes" className="text-white hover:text-gray-300" onClick={() => setMenuOpen(false)}>Classes</a>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <ButtonPrimary text="LOGIN" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Text */}
      <article className="relative z-20 flex flex-col items-center justify-center h-[60%] w-full px-4 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight max-w-3xl">
          Ser <span className="text-[#FCAE2D]">Desbravador Campestre</span>
          <br /> é um chamado para servir,
          <br /> amar e transformar!
        </h1>
      </article>

      {/* Call to Action */}
      <div className="absolute z-30 left-1/2 transform -translate-x-1/2 bottom-[15%] sm:bottom-[20%]">
        <a href="#about-us">
          <ButtonPrimary text="SAIBA MAIS" />
        </a>
      </div>

      {/* Estilo da imagem recortada */}
      <style>{`
        .clip-path-image {
          clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 96%, 0 70%);
        }
      `}</style>
    </section>
  );
};

export default Header;
