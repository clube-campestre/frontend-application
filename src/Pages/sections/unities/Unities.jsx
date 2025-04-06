import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
		description:
			"Panda (10 anos) – Com espírito curioso e cheio de energia, as integrantes da unidade Panda iniciam sua jornada no clube com entusiasmo e muita vontade de aprender.",
	},
	{
		imagePath: '',
		description:
			"Lince (11 anos) – Ágeis e atentas, as desbravadoras da unidade Lince estão sempre prontas para novos desafios e descobertas.",
	},
	{
		imagePath: aguiaRealImage,
		description:
			"Águia Real (12 anos) – Determinadas e visionárias, as Águias Reais buscam aprimorar suas habilidades e alcançar grandes alturas.",
	},
	{
		imagePath: raposaImage,
		description:
			"Raposa (13 anos) – Inteligentes e estratégicas, as desbravadoras da unidade Raposa demonstram criatividade e astúcia em cada atividade.",
	},
	{
		imagePath: panteraImage,
		description:
			"Pantera (14-15 anos) – Destemidas e ágeis, as Panteras combinam força e elegância, sempre prontas para desafios que exigem coragem e estratégia.",
	},
	{
		imagePath: falcaoImage,
		description:
			"Falcão (10 anos) – Os Falcões iniciam sua caminhada no clube com olhos atentos e asas prontas para voar rumo ao conhecimento.",
	},
	{
		imagePath: '',
		description:
			"Leão (11 anos) – Corajosos e cheios de energia, os membros da unidade Leão enfrentam desafios com determinação.",
	},
	{
		imagePath: tigreImage,
		description:
			"Tigre (12 anos) – Ágeis e focados, os Tigres demonstram força e disciplina em suas jornadas.",
	},
	{
		imagePath: ursoImage,
		description:
			"Urso (13 anos) – Resilientes e estratégicos, os Ursos sabem quando agir e como trabalhar em equipe para superar desafios.",
	},
	{
		imagePath: loboImage,
		description:
			"Lobo (14-15 anos) – Líderes naturais, os Lobos combinam inteligência e coragem para trilhar caminhos e guiar os mais jovens.",
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
		<div className="bg-black text-white h-screen py-10 px-4 flex flex-col items-center justify-center relative">
			<h2 className="text-4xl font-bold mb-20 absolute top-20">Nossas Unidades</h2>
			<div className="flex items-center gap-16">
				<button
					onClick={previous}
					className="text-orange-400 hover:scale-110 transition-transform "
				>
					<FaChevronLeft size={96} />
				</button>

				<UnityItem
					imagePath={getItem(-1).imagePath}
					description={getItem(-1).description}
					isActive={false}
				/>
				<UnityItem
					imagePath={getItem(0).imagePath}
					description={getItem(0).description}
					isActive={true}
				/>
				<UnityItem
					imagePath={getItem(1).imagePath}
					description={getItem(1).description}
					isActive={false}
				/>

				<button
					onClick={next}
					className="text-orange-400 hover:scale-110 transition-transform"
				>
					<FaChevronRight size={96} />
				</button>
			</div>
		</div>
	);
};

export default Unities;
