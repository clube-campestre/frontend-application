import React, { useEffect } from "react";
import SicknessCard from "../../../../components/sickness-card/SicknessCard";

// Mapeamento: chave do JSON -> nome exibido
const sicknessLabels = {
  catapora: "Catapora",
  meningite: "Meningite",
  hepatite: "Hepatite",
  dengue: "Dengue",
  pneumonia: "Pneumonia",
  malaria: "Malária",
  febreAmarela: "Febre Amarela",
  sarampo: "Sarampo",
  tetano: "Tétano",
  variola: "Varíola",
  coqueluche: "Coqueluche",
  difteria: "Difteria",
  rinite: "Rinite",
  bronquite: "Bronquite",
  asma: "Asma",
  rubeola: "Rubéola",
  colera: "Cólera",
  covid19: "Covid-19",
  h1n1: "H1N1",
  caxumba: "Caxumba",
};

const sicknessGroups = [
  [
    "catapora",
    "meningite",
    "hepatite",
    "dengue",
    "pneumonia",
    "malaria",
    "febreAmarela",
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
    "rubeola",
    "colera",
    "covid19",
    "h1n1",
    "caxumba",
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
              sicknessList={group.map((key) => ({
                key,
                label: sicknessLabels[key] || key,
              }))}
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