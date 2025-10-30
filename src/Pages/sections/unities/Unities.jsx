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
	{
		imagePath: pandaImage,
		description: "Com espírito curioso e cheio de energia, as integrantes da unidade Panda iniciam sua jornada no clube com entusiasmo e muita vontade de aprender.",
		title: "Panda (10 anos)"
	},
	{
		imagePath: loboImage,
		description: "Ágeis e atentas, as desbravadoras da unidade Lince estão sempre prontas para novos desafios e descobertas.",
		title: "Lince (11 anos)"
	},
	{
		imagePath: aguiaRealImage,
		description: "Determinadas e visionárias, as Águias Reais buscam aprimorar suas habilidades e alcançar grandes alturas.",
		title: "Águia Real (12 anos)"
	},
	{
		imagePath: raposaImage,
		description: "Inteligentes e estratégicas, as desbravadoras da unidade Raposa demonstram criatividade e astúcia em cada atividade.",
		title: "Raposa (13 anos)"
	},
	{
		imagePath: panteraImage,
		description: "Destemidas e ágeis, as Panteras combinam força e elegância, sempre prontas para desafios que exigem coragem e estratégia.",
		title: "Pantera (14-15 anos)"
	},
	{
		imagePath: falcaoImage,
		description: "Os Falcões iniciam sua caminhada no clube com olhos atentos e asas prontas para voar rumo ao conhecimento.",
		title: "Falcão (10 anos)"
	},
	{
		imagePath: pandaImage,
		description: "Corajosos e cheios de energia, os membros da unidade Leão enfrentam desafios com determinação.",
		title: "Leão (11 anos)"
	},
	{
		imagePath: tigreImage,
		description: "Ágeis e focados, os Tigres demonstram força e disciplina em suas jornadas.",
		title: "Tigre (12 anos)" 
	},
	{
		imagePath: ursoImage,
		description: "Resilientes e estratégicos, os Ursos sabem quando agir e como trabalhar em equipe para superar desafios.",
		title: "Urso (13 anos)"
	},
	{
		imagePath: loboImage,
		description: "Líderes naturais, os Lobos combinam inteligência e coragem para trilhar caminhos e guiar os mais jovens.",
		title: "Lobo (14-15 anos)"
	},
];

const Unities = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const previous = () => {
		setActiveIndex((prev) => (prev - 1 + unityData.length) % unityData.length);
	};

	const next = () => {
		setActiveIndex((prev) => (prev + 1) % unityData.length);
	};

	const getItem = (offset) => {
		return unityData[
			(activeIndex + offset + unityData.length) % unityData.length
		];
	};

	return (
		<div id="unities" className="bg-black hidden text-white h-screen py-10 px-4 lg:flex flex-col items-center justify-center relative overflow-x-hidden">
			<h2 className="text-4xl font-bold mb-20 absolute top-20">Nossas Unidades</h2>
			<div className="flex items-center gap-16">
			<button
                    onClick={previous}
                    className="
                        text-[#FCAE2D] hover:scale-110 transition-transform z-10
                        
                        {/* Mobile: absolute, no meio, à esquerda */}
                        absolute top-1/2 left-1 -translate-y-1/2
                        
                        {/* Desktop ('lg:'): Volta ao normal (static) */}
                        lg:static lg:top-auto lg:left-auto lg:-translate-y-0
                    "
                >
                    {/*                      * Ícone Responsivo: 48px (w-12) no mobile, 96px (lg:w-24) no desktop
                     * Se usarmos 96px no mobile, a seta não caberá!
                    */}
                    <GoChevronLeft className="w-12 h-12 lg:w-24 lg:h-24" />
                </button>
				<UnityItem
					imagePath={getItem(-1).imagePath}
					description={getItem(-1).description}
					title={getItem(-1).title}
					isActive={false}
				/>
				<UnityItem
					imagePath={getItem(0).imagePath}
					description={getItem(0).description}
					title={getItem(0).title}
					isActive={true}
				/>
				<UnityItem
					imagePath={getItem(1).imagePath}
					description={getItem(1).description}
					title={getItem(1).title}
					isActive={false}
				/>

				<button
					onClick={next}
					className="text-[#FCAE2D] hover:scale-110 transition-transform"
				>
					<GoChevronRight size={96} />
				</button>
			</div>
		</div>
	);
};

export default Unities;
