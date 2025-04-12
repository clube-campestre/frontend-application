import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

import loboImage from "../../../assets/images/lobo.png";
import falcaoImage from "../../../assets/images/falcao.png";
import pandaImage from "../../../assets/images/panda.png";
import panteraImage from "../../../assets/images/pantera.png";
import raposaImage from "../../../assets/images/raposa.png";
import tigreImage from "../../../assets/images/tigre.png";
import ursoImage from "../../../assets/images/urso.png";
import aguiaRealImage from "../../../assets/images/aguia-real.png";
import axios, { Axios } from "axios";

const InternalHome = () => {
	const goalAmount = 9000;
	const collectedAmount = 8325.6;
	const remainingAmount = goalAmount - collectedAmount;
	const percentage = ((collectedAmount / goalAmount) * 100).toFixed(1);

	const chartData = {
		labels: ["Arrecadado", "Restante"],
		datasets: [
			{
				label: "Meta das Barracas",
				data: [collectedAmount, remainingAmount],
				backgroundColor: ["#FCAE2D", "#d1d5db"],
				borderWidth: 0,
				cutout: "70%",
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	const rankingData = [
		{ id: 1, name: "Lobo", logo: loboImage, points: 120 },
		{ id: 2, name: "Falcão", logo: falcaoImage, points: 115 },
		{ id: 3, name: "Panda", logo: pandaImage, points: 98 },
		{ id: 4, name: "Pantera", logo: panteraImage, points: 87 },
		{ id: 5, name: "Raposa", logo: raposaImage, points: 76 },
		{ id: 6, name: "Tigre", logo: tigreImage, points: 65 },
		{ id: 7, name: "Urso", logo: ursoImage, points: 54 },
		{ id: 8, name: "Águia Real", logo: aguiaRealImage, points: 42 },
	];

	return (
		<div className="grid md:grid-cols-2 gap-6">
			<div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center">
				<h2 className="text-xl font-semibold text-gray-800 mb-6">
					Meta das Barracas
				</h2>

				<div className="relative w-full h-64">
					<Doughnut data={chartData} options={chartOptions} />
					<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-xs text-gray-500">
							R${" "}
							<span className="text-2xl font-bold">
								{collectedAmount.toFixed(2)}
							</span>
						</span>

						<span className="text-xs text-gray-500 w-20 text-center">
							Arrecadado de R$ {goalAmount.toFixed(2)}
						</span>
					</div>
				</div>

				<div className="flex items-center mt-4 text-sm">
					<div className="flex items-center mr-4">
						<div className="w-3 h-3 rounded-full bg-[#FCAE2D] mr-1"></div>
						<span>Valor arrecadado</span>
					</div>
					<div className="flex items-center">
						<div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
						<span>Valor restante</span>
					</div>
				</div>
			</div>

			<div className="bg-gray-100 rounded-lg p-6">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Ranking das Unidades
				</h2>

				<div className="overflow-hidden rounded-md">
					<div className="grid grid-cols-2 bg-gray-500 text-white font-medium">
						<div className="py-3 px-4 text-center">Unidade</div>
						<div className="py-3 px-4 text-center">Pontos</div>
					</div>

					{rankingData.map((Unity) => (
						<div
							key={Unity.id}
							className="grid grid-cols-2 border-b border-gray-200 bg-white"
						>
							<div className="py-3 px-4 flex">
								<img
									src={Unity.logo || "/placeholder.svg"}
									alt={`Unity ${Unity.id}`}
									className="h-8"
								/>
								<p className="justify-center items-center flex text-gray-800 font-medium ml-2">
									{Unity.name}
								</p>
							</div>
							<div className="py-3 px-4 text-center">
								{Unity.points}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default InternalHome;
