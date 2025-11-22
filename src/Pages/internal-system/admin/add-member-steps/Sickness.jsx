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
    "tetano",
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
    // Container principal: Removemos ml-20 fixo e usamos mx-auto para centralizar
    // Adicionamos padding (p-4) para mobile e aumentamos (md:p-8) em telas maiores
    <div className="flex flex-col w-full max-w-screen-xl mx-auto p-4 md:p-8">
      
      {/* Header do componente */}
      <div className="flex items-center gap-2 mb-6">
        <div className="border-[3px] h-10 border-amber-400 rounded"></div>
        <h2 className="font-semibold text-xl text-gray-800">Doenças</h2>
      </div>

      {/* GRID LAYOUT:
          - Mobile (padrão): grid-cols-1 (uma coluna, cards empilhados)
          - Desktop (lg): grid-cols-3 (três colunas, cards lado a lado)
          - gap-6: Espaçamento uniforme entre os cards
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {sicknessGroups.map((group, idx) => (
          // Wrapper para cada card para garantir que ele ocupe a célula do grid
          <div key={idx} className="w-full">
            <SicknessCard
              sicknessList={group.map((key) => ({
                key,
                label: sicknessLabels[key] || key,
              }))}
              values={dados.sickness || {}}
              onChange={handleSicknessChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sickness;