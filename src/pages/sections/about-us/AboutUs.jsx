import React from "react";
import AboutUsCard from "../../../components/about-us-cards/AboutUsCard";
import whoWeAre from "../../../assets/icons/who.svg";
import mission from "../../../assets/icons/mission.svg";
import values from "../../../assets/icons/values.svg";
import desbravador1 from "../../../assets/images/desbravador-1.png";
import desbravador2 from "../../../assets/images/desbravador-2.png";
import desbravador3 from "../../../assets/images/desbravador-3.png";
import desbravador4 from "../../../assets/images/desbravador-4.png";

const AboutUs = () => {
  return (
    <section
      id="about-us"
      className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-16 py-12"
    >
      {/* Título */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
        Conheça um pouco mais sobre nós
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 w-full max-w-6xl">
        <AboutUsCard
          imagePath={whoWeAre}
          title="QUEM SOMOS"
          description="O Clube tem como principal objetivo promover o crescimento físico, mental e espiritual dos integrantes por meio de atividades práticas, desafios ao ar livre e aprendizado em equipe."
        />
        <AboutUsCard
          imagePath={mission}
          title="MISSÃO"
          description="Inspirar e capacitar jovens a desenvolverem caráter, habilidades e liderança por meio de atividades educativas, recreativas e comunitárias e o compromisso com valores cristãos."
        />
        <AboutUsCard
          imagePath={values}
          title="VALORES"
          description="São constituidos por fé, liderança, disciplina, cooperação, aventura e serviço. Juntos, esses princípios moldam o caráter de cada Desbravador e tornam nossa jornada ainda mais significativa!"
        />
      </div>

      {/* Imagens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-5xl">
        <img
          src={desbravador1}
          className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg"
          alt="Desbravador 1"
        />
        <img
          src={desbravador3}
          className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg"
          alt="Desbravador 3"
        />
        <img
          src={desbravador4}
          className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg"
          alt="Desbravador 4"
        />
        <img
          src={desbravador2}
          className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg"
          alt="Desbravador 2"
        />
      </div>
    </section>
  );
};

export default AboutUs;
