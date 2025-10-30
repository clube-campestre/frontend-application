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
    // 1. REMOVIDO 'h-screen'. 
    //    Adicionado padding vertical (py) e horizontal (px) responsivo.
    <section 
      id="about-us" 
      className="flex flex-col items-center text-center py-16 md:py-24 px-6 md:px-8"
    >
      {/* 2. Título responsivo e margem de baixo (mb) responsiva */}
      <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16">
        Conheça um pouco mais sobre nós
      </h2>

      {/* 3. O 'flex-wrap' aqui já funciona bem. Aumentei a margem de baixo. */}
      {/* Assume-se que o 'AboutUsCard' tenha uma largura (ex: max-w-sm) */}
      <div className="flex flex-wrap justify-center gap-8 mb-12 md:mb-16">
        <AboutUsCard 
          imagePath={whoWeAre}
          title="QUEM SOMOS"  
          description="O Clube tem como principal objetivo promover o crescimento físico,  mental e espiritual dos integrantes por meio de atividades práticas, desafios ao ar livre e aprendizado em equipe." 
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

      {/* 4. GRID DE IMAGENS:
           - 'grid-cols-2' (default para mobile)
           - 'md:grid-cols-4' (para desktop)
           - 'gap-4' (mobile) e 'md:gap-8' (desktop) - 'gap-12' era muito grande
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-6xl">
        {/* 5. IMAGENS:
             - Classes inválidas 'w-50 h-50' REMOVIDAS.
             - 'w-full': Ocupa 100% da coluna do grid.
             - 'aspect-square': Força a proporção 1:1 (quadrada).
             - 'object-cover': Garante que a imagem preencha o espaço sem distorcer.
        */}
        <img src={desbravador1} className="w-full aspect-square object-cover rounded-lg" alt="Desbravador 1" />
        <img src={desbravador3} className="w-full aspect-square object-cover rounded-lg" alt="Desbravador 3" />
        <img src={desbravador4} className="w-full aspect-square object-cover rounded-lg" alt="Desbravador 4" />
        <img src={desbravador2} className="w-full aspect-square object-cover rounded-lg" alt="Desbravador 2" />
      </div>
    </section>
  );
};

export default AboutUs;