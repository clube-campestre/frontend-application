import { useState } from "react";
import ButtonPrimary from "../../../components/button-primary/ButtonPrimary";

const Header = () => {
  return (
    <section className="w-full h-view bg-gradient-to-b from-[#000000] to-[#00000000]">
      <div className="flex justify-between items-center p-4 text-black">
        <figure>
          <img src="/logo.png" alt="Logo" className="h-8" />
        </figure>
        <nav className="space-x-20 text-base">
          <a href="/" className="hover:text-gray-300">
            Início
          </a>
          <a href="/about" className="hover:text-gray-300">
            Sobre nós
          </a>
          <a href="/contact" className="hover:text-gray-300">
            Unidades
          </a>
          <a href="/services" className="hover:text-gray-300">
            Classes
          </a>
          <ButtonPrimary text="Entrar" onClick={() => console.log("Entrar")} />
        </nav>
      </div>
      <article className="flex flex-col items-center justify-center h-full w-view ">
        <h1 className="text-4xl font-bold text-white mb-4 w-xl text-center">
          Ser Desbravador Campestre é um chamado para servir, amar e
          transformar!
        </h1>
        <ButtonPrimary
          text="Saiba mais"
          onClick={() => console.log("Saiba mais")}
        />
      </article>
    </section>
  );
};

export default Header;
