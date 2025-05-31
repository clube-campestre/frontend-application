import React, { useEffect } from "react";
import SicknessCard from "../../../../components/sickness-card/SicknessCard";

const sicknessGroups = [
  [
    "catapora",
    "meningite",
    "hepatite",
    "dengue",
    "pneumonia",
    "malaria",
    "febre amarela",
  ],
  [
    "sarampo",
    "tétano",
    "variola",
    "coqueluche",
    "difteria",
    "rinite",
  ],
  [
    "bronquite",
    "asma",
    "rubéola",
    "colera",
    "covid-19",
    "H1N1",
    "caxumbba",
  ],
];

// Etapa 3 - Sickness
function Sickness({ dados, setDados }) {
  // Inicializa os valores das doenças se não existirem
  useEffect(() => {
    if (!dados.sickness) {
      const initial = {};
      sicknessGroups.flat().forEach((s) => (initial[s] = null));
      setDados({ ...dados, sickness: initial });
    }
    // eslint-disable-next-line
  }, []);

  const handleSicknessChange = (sickness, value) => {
    setDados({
      ...dados,
      sickness: {
        ...dados.sickness,
        [sickness]: value,
      },
    });
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="flex align-center items-center ml-20 gap-2 mb-4">
        <div className="border-3 h-10 border-amber-400 rounded"></div>
        <h2 className="font-semibold text-xl">Doenças</h2>
      </div>
      <div className="flex flex-col align-center justify-center items-center h-[90%]">
        <div className="flex flex-row justify-between items-start w-[85%] gap-4 ">
          {sicknessGroups.map((group, idx) => (
            <SicknessCard
              key={idx}
              sicknessList={group}
              values={dados.sickness || {}}
              onChange={handleSicknessChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sickness;