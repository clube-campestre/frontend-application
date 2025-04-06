import React from "react";
import AboutUsCard from "../../../components/about-us-cards/AboutUsCard";

const InfoCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-4 max-w-xs">
      <div className="text-yellow-500 text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-bold text-blue-900">{title}</h3>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  );
};

const InfoSection = () => {
  return (
    <section className="flex flex-col items-center text-center p-8">
      <h2 className="text-2xl font-bold mb-6">Conheça um pouco mais sobre nós</h2>
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        <AboutUsCard 
          image="" 
          title="QUEM SOMOS"  
          description="O Clube tem como principal objetivo promover o crescimento físico, mental e espiritual dos integrantes por meio de atividades práticas, desafios ao ar livre e aprendizado em equipe." 
        />
        <AboutUsCard 
          image="" 
          title="MISSÃO" 
          description="Inspirar e capacitar jovens a desenvolverem caráter, habilidades e liderança por meio de atividades educativas, recreativas e comunitárias e o compromisso com valores cristãos." 
        />
        <AboutUsCard 
          image="" 
          title="VALORES" 
          description="São constituídos por fé, liderança, disciplina, cooperação, aventura e serviço. Juntos, esses princípios moldam o caráter de cada Desbravador e tornam nossa jornada ainda mais significativa!" 
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <img src="/path-to-image1.jpg" alt="Imagem 1" className="w-40 h-40 object-cover rounded-lg" />
        <img src="/path-to-image2.jpg" alt="Imagem 2" className="w-40 h-40 object-cover rounded-lg" />
        <img src="/path-to-image3.jpg" alt="Imagem 3" className="w-40 h-40 object-cover rounded-lg" />
        <img src="/path-to-image4.jpg" alt="Imagem 4" className="w-40 h-40 object-cover rounded-lg" />
      </div>
    </section>
  );
};

export default InfoSection;
