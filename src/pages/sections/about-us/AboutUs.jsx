import React from "react";
import AboutUsCard from "../../../components/about-us-cards/AboutUsCard";
import whoWeAre from "../../../assets/icons/who.svg";
import mission from "../../../assets/icons/mission.svg";
import values from "../../../assets/icons/values.svg";
import desbravador1 from "../../../assets/images/desbravador-1.png"
import desbravador2 from "../../../assets/images/desbravador-2.png"
import desbravador3 from "../../../assets/images/desbravador-3.png"
import desbravador4 from "../../../assets/images/desbravador-4.png"

const AboutUs = () => {
  return (
    <section className="flex flex-col items-center text-center p-8">
      <h2 className="text-4xl font-bold mb-6">Conheça um pouco mais sobre nós</h2>
      <div className="flex flex-wrap justify-center gap-8 mb-8">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <img src={desbravador1} className="w-50 h-50 object-cover rounded-lg" />
        <img src={desbravador3} className="w-50 h-50 object-cover rounded-lg" />
        <img src={desbravador4} className="w-50 h-50 object-cover rounded-lg" />
        <img src={desbravador2} className="w-50 h-50 object-cover rounded-lg" />
      </div>
    </section>
  );
};

export default AboutUs;
