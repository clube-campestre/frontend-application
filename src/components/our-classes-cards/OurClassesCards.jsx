import React from "react";

const CardClasse = ({ card, isFocused, onFocus }) => (
  <div
    className={`w-85 flex-shrink-0 mx-6 bg-white rounded-xl shadow-lg p-4 text-center transition-all duration-700 ${
      isFocused ? "scale-95 z-20" : "scale-90 opacity-70"
    }`}
    style={{
      minHeight: "150px",
    }}
    onMouseEnter={onFocus}
    onMouseLeave={() => onFocus(false)}
  >
    <img
      src={card.logo}
      alt="Logo"
      className="w-36 h-36 rounded-full mx-auto bg-white mb-4"
    />
    <div className={`${card.corTopo} text-white font-bold text-lg py-2 rounded-md`}>
      {card.titulo}
    </div>
    <div
      className={`${card.corTexto} mt-2 p-3 rounded-md text-lg min-h-[150px]`}
      style={{
        minHeight: "150px",
      }}
    >
      {card.descricao}
    </div>
    <img src={card.button} alt="Botão" className="w-55 mx-auto mt-4" />
  </div>
);

export default CardClasse;
