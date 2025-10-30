import React, { useState } from "react";
import CardClasse from "../../../components/our-classes-cards/OurClassesCards";
import logoAzul from "../../../assets/images/amigo3.png";
import buttonAzul from "../../../assets/images/amigoAvançado.png";
import logoRoxo from "../../../assets/images/excursionista 3.svg";
import buttonRoxo from "../../../assets/images/excursionistaAvançado.png";
import logoCinza from "../../../assets/images/pioneiro 3.svg";
import buttonCinza from "../../../assets/images/pioneiroAvançado.svg";
import buttonVerde from "../../../assets/images/pesquisadorAvançado.svg";
import logoAmarelo from "../../../assets/images/guia 3.svg";
import logoVerde from "../../../assets/images/logoVerde.svg";
import logoVermelho from "../../../assets/images/logoVermelho.png";
import buttonVermelho from "../../../assets/images/companheiroAvançado.png";
import buttonAmarelo from "../../../assets/images/guiaAvançado.png";


const cards = [
  {
    logo: logoAzul,
    titulo: "AMIGO (10-11 anos)",
    descricao:
      "Nesta classe, os desbravadores aprendem a importância da amizade e do companheirismo, desenvolvendo habilidades para serem amigos de todos. Classe Avançada: Amigo da Natureza.",
    button: buttonAzul,
    corTopo: "bg-blue-500",
    corTexto: "bg-blue-100",
  },
  {
    logo: logoVermelho,
    titulo: "COMPANHEIRO (11-12 anos)",
    descricao:
      "Aqui, os desbravadores aprofundam suas habilidades, se tornando verdadeiros companheiros de excursões. Classe Avançada: Companheiro de Excursionismo.",
    button: buttonVermelho,
    corTopo: "bg-red-500",
    corTexto: "bg-red-100",
  },
  {
    logo: logoVerde,
    titulo: "PESQUISADOR (12-13 anos)",
    descricao:
      "Os participantes desta classe se tornam pesquisadores da natureza, adquirindo mais conhecimentos sobre a fauna, flora e o meio ambiente. Classe Avançada: Pesquisador de Campo e Bosque.",
    button: buttonVerde,
    corTopo: "bg-green-500",
    corTexto: "bg-green-100",
  },
  {
    logo: logoCinza,
    titulo: "PIONEIRO (13-14 anos)",
    descricao:
      "Nesta fase, os desbravadores aprendem técnicas pioneiras e desenvolvem habilidades de sobrevivência, tornando-se pioneiros da mata. Classe Avançada: Pioneiro de Novas Fronteiras.",
    button: buttonCinza,
    corTopo: "bg-gray-500",
    corTexto: "bg-gray-100",
  },
  {
    logo: logoRoxo,
    titulo: "EXCURSIONISTA (14-15 anos)",
    descricao:
      "A classe prepara os desbravadores para se tornarem excursionistas experientes, capazes de enfrentar desafios na natureza com autonomia. Classe Avançada: Excursionista na Mata.",
    button: buttonRoxo,
    corTopo: "bg-purple-500",
    corTexto: "bg-purple-100",
  },
  {
    logo: logoAmarelo,
    titulo: "GUIA (15-16 anos)",
    descricao:
      "Na última classe, os desbravadores consolidam seus conhecimentos e aprendem a liderar, tornando-se guias para os mais novos e exploradores habilidosos. Classe Avançada: Guia de Exploração.",
    button: buttonAmarelo,
    corTopo: "bg-yellow-500",
    corTexto: "bg-yellow-100",
  },
];

const OurClassesCards = () => {
  const [focusedCard, setFocusedCard] = useState(null);
  const duplicatedCards = [...cards, ...cards];

  const handleFocus = (index) => {
    setFocusedCard(index);
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-[1300px] overflow-hidden group">
        <div className="text-4xl font-bold text-center mb-6 mt-3">Nossas Classes</div>

        <div className="flex w-max animate-slide group-hover:paused justify-center items-center">
          {duplicatedCards.map((card, index) => (
            <CardClasse
              key={index}
              card={card}
              isFocused={focusedCard === index}
              onFocus={() => handleFocus(index)}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-slide {
            animation: slide 25s linear infinite;
          }
          .group:hover .animate-slide {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
};

export default OurClassesCards;
