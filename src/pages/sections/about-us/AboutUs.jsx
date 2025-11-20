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
  // Array de imagens para limpar o JSX e facilitar manutenção
  const galleryImages = [desbravador1, desbravador3, desbravador4, desbravador2];

  return (
    <section 
      id="about-us" 
      className="w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 md:py-20 md:px-8 bg-white"
    >
      {/* Título Responsivo: menor no mobile, maior no desktop */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center text-gray-900">
        Conheça um pouco mais sobre nós
      </h2>

      {/* Container dos Cards: Flex Column no mobile -> Row no Desktop */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-stretch gap-6 md:gap-8 mb-12 md:mb-16 w-full max-w-7xl">
        <div className="flex-1 min-w-[280px] max-w-md mx-auto md:mx-0">
            <AboutUsCard
            imagePath={whoWeAre}
            title="QUEM SOMOS"
            description="O Clube tem como principal objetivo promover o crescimento físico, mental e espiritual dos integrantes por meio de atividades práticas, desafios ao ar livre e aprendizado em equipe."
            />
        </div>
        
        <div className="flex-1 min-w-[280px] max-w-md mx-auto md:mx-0">
            <AboutUsCard
            imagePath={mission}
            title="MISSÃO"
            description="Inspirar e capacitar jovens a desenvolverem caráter, habilidades e liderança por meio de atividades educativas, recreativas e comunitárias e o compromisso com valores cristãos."
            />
        </div>

        <div className="flex-1 min-w-[280px] max-w-md mx-auto md:mx-0">
            <AboutUsCard
            imagePath={values}
            title="VALORES"
            description="São constituidos por fé, liderança, disciplina, cooperação, aventura e serviço. Juntos, esses princípios moldam o caráter de cada Desbravador e tornam nossa jornada ainda mais significativa!"
            />
        </div>
      </div>

      {/* Grid de Imagens Responsiva */}
      {/* Mobile: 2 colunas com gap pequeno */}
      {/* Tablet/Desktop: 4 colunas com gap maior */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-6xl">
        {galleryImages.map((imgSrc, index) => (
          <div key={index} className="aspect-square w-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <img
              src={imgSrc}
              alt={`Desbravador momento ${index + 1}`}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              loading="lazy" 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;