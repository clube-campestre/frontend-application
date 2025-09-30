import React, { useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import UnityItem from "../../../components/unity-item/UnityItem";
import loboImage from "../../../assets/images/lobo.png";
import falcaoImage from "../../../assets/images/falcao.png";
import pandaImage from "../../../assets/images/panda.png";
import panteraImage from "../../../assets/images/pantera.png";
import raposaImage from "../../../assets/images/raposa.png";
import tigreImage from "../../../assets/images/tigre.png";
import ursoImage from "../../../assets/images/urso.png";
import aguiaRealImage from "../../../assets/images/aguia-real.png";

const unityData = [
    { imagePath: pandaImage, description: "Com espírito curioso e cheio de energia...", title: "Panda (10 anos)" },
    { imagePath: loboImage, description: "Ágeis e atentas, as desbravadoras...", title: "Lince (11 anos)" },
    { imagePath: aguiaRealImage, description: "Determinadas e visionárias...", title: "Águia Real (12 anos)" },
    { imagePath: raposaImage, description: "Inteligentes e estratégicas...", title: "Raposa (13 anos)" },
    { imagePath: panteraImage, description: "Destemidas e ágeis...", title: "Pantera (14-15 anos)" },
    { imagePath: falcaoImage, description: "Os Falcões iniciam sua caminhada...", title: "Falcão (10 anos)" },
    { imagePath: pandaImage, description: "Corajosos e cheios de energia...", title: "Leão (11 anos)" },
    { imagePath: tigreImage, description: "Ágeis e focados...", title: "Tigre (12 anos)" },
    { imagePath: ursoImage, description: "Resilientes e estratégicos...", title: "Urso (13 anos)" },
    { imagePath: loboImage, description: "Líderes naturais...", title: "Lobo (14-15 anos)" },
];

const Unities = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const previous = () => setActiveIndex((prev) => (prev - 1 + unityData.length) % unityData.length);
    const next = () => setActiveIndex((prev) => (prev + 1) % unityData.length);

    const getItem = (offset) => {
        return unityData[(activeIndex + offset + unityData.length) % unityData.length];
    };

    // Prepara os itens para evitar chamar a função getItem várias vezes no JSX
    const prevItem = getItem(-1);
    const activeItem = getItem(0);
    const nextItem = getItem(1);

    return (
        <div id="unities" className="bg-black text-white min-h-screen py-16 px-4 flex flex-col items-center justify-center relative">
            {/* Título responsivo */}
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Nossas Unidades</h2>

            <div className="flex items-center justify-center gap-2 sm:gap-4 w-full max-w-7xl">
                {/* Botão Esquerda */}
                <button
                    onClick={previous}
                    className="text-[#FCAE2D] hover:scale-110 transition-transform p-2"
                >
                    <GoChevronLeft className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" />
                </button>

                {/* ALTERAÇÃO: Container único para os cards com lógica de visibilidade responsiva */}
                <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 flex-grow">
                    
                    {/* Card Anterior: Visível apenas em telas grandes (lg) para cima */}
                    <div className="hidden lg:block">
                        <UnityItem {...prevItem} isActive={false} />
                    </div>

                    {/* Card Ativo: Sempre visível */}
                    <div>
                        <UnityItem {...activeItem} isActive={true} />
                    </div>

                    {/* Card Próximo: Visível em telas médias (md) para cima */}
                    <div className="hidden md:block">
                        <UnityItem {...nextItem} isActive={false} />
                    </div>
                </div>

                {/* Botão Direita */}
                <button
                    onClick={next}
                    className="text-[#FCAE2D] hover:scale-110 transition-transform p-2"
                >
                    <GoChevronRight className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" />
                </button>
            </div>
        </div>
    );
};

export default Unities;