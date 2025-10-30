import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { api } from "../../../provider/api";
import Swal from "sweetalert2";
import { getUser } from "../../../utils/authStorage";

import loboImage from "../../../assets/images/lobo.png";
import falcaoImage from "../../../assets/images/falcao.png";
import pandaImage from "../../../assets/images/panda.png";
import panteraImage from "../../../assets/images/pantera.png";
import raposaImage from "../../../assets/images/raposa.png";
import tigreImage from "../../../assets/images/tigre.png";
import ursoImage from "../../../assets/images/urso.png";
import aguiaRealImage from "../../../assets/images/aguia-real.png";
import linceImage from "../../../assets/images/lince.png";
import leaoImage from "../../../assets/images/leao.png";

const InternalHome = () => {
	const [points, setPoints] = useState([]);
	const [tags, setTags] = useState([]);
	const [selectedTagId, setSelectedTagId] = useState("");
	const [collectedAmount, setCollectedAmount] = useState(0);
	const [goalAmount, setGoalAmount] = useState(0);
	const userRole = getUser()?.access;

	useEffect(() => {
		if (tags.length > 0) {
			setCollectedAmount(0);
			setGoalAmount(0);
		}
	}, [tags]);

	const handleTagChange = async (e) => {
		const tagId = e.target.value;
		setSelectedTagId(tagId);
		console.log("Entrei no handleTagChange", tagId);

		if (tagId) {
			try {
				console.log(
					"Fazendo a requisição para a API com tagId:",
					tagId
				);
				const response = await api.get(`/statements/goal`, {
					params: { tagId },
				});
				console.log("RESPONSE", response);
				setCollectedAmount(response.data.totalPrice || 0);
				setGoalAmount(response.data.tag?.goal || 0);
			} catch (error) {
				setCollectedAmount(0);
				setGoalAmount(0);
			}
		} else {
			setCollectedAmount(0);
			setGoalAmount(0);
		}
	};

	useEffect(() => {
		const fetchPoints = async () => {
			try {
				const response = await api.get("/units/ranking");
				console.log("RANKING", response.data);
				setPoints(response.data);
			} catch (error) {
				console.error("Erro ao buscar pontos:", error);
			}
		};

		const getTags = async () => {
			try {
				const response = await api.get("/tags");
				const filteredTags = response.data.filter(
					(tag) => tag.goal !== null
				);
				setTags(filteredTags);
			} catch (error) {
				console.error("Error fetcFhing tags:", error);
			}
		};

		fetchPoints();
		getTags();
	}, []);

	const temporyImage = pandaImage;

	ChartJS.register(ArcElement, Tooltip, Legend);

	const normalizeSurname = (name) =>
		name
			?.trim()
			.toLowerCase()
			.replace(/_/g, " ")
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");

	const unitImages = {
		lobo: loboImage,
		falcao: falcaoImage,
		panda: pandaImage,
		pantera: panteraImage,
		raposa: raposaImage,
		tigre: tigreImage,
		urso: ursoImage,
		"aguia real": aguiaRealImage,
		leao: leaoImage,
		lince: linceImage,
	};

	const remainingAmount = goalAmount - collectedAmount;

	const chartData = {
		labels: ["Arrecadado", "Restante"],
		datasets: [
			{
				data: [
					collectedAmount,
					remainingAmount > 0 ? remainingAmount : 0,
				],
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
			tooltip: {
				enabled: true,
				backgroundColor: "#111827",
				titleColor: "#ffffff",
				bodyColor: "#d1d5db",
				padding: 10,
				callbacks: {
					label: function (context) {
						const label = context.label || "";
						const value = context.parsed || 0;
						return `${label}: R$ ${value.toFixed(2)}`;
					},
				},
			},
		},
		interaction: {
			mode: "nearest",
			intersect: true,
		},
	};

	// Função para resetar pontuação com confirmação
	const handleResetPoints = async () => {
		const result = await Swal.fire({
			title: "Tem certeza?",
			text: "Essa ação irá resetar a pontuação de todas as unidades!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#5ccb5f",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sim, resetar!",
			cancelButtonText: "Cancelar",
		});

		if (result.isConfirmed) {
			try {
				await api.post("/units/reseted");
				Swal.fire("Resetado!", "A pontuação foi resetada.", "success");
				const response = await api.get("/units/ranking");
				setPoints(response.data);
			} catch (error) {
				Swal.fire(
					"Erro!",
					"Não foi possível resetar a pontuação.",
					"error"
				);
			}
		}
	};

	return (
		<div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto p-4">
			{/* Card da Meta */}
			<div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center gap-3 shadow-md">
				{/* Título e Select centralizados em linha */}
				<div className="flex flex-row items-center justify-center w-full mb-2 gap-3">
					<h2 className="text-xl font-bold text-gray-800 mb-0">
						Meta
					</h2>
					<select
						className="p-2 border border-gray-300 rounded bg-[#EDEDED] max-w-xs"
						value={selectedTagId}
						onChange={handleTagChange}
					>
						<option value="">Selecione uma Meta</option>
						{tags.length > 0 ? (
							tags
								.filter((tag) => {
									// Se for privada, verifica se o userRole está autorizado
									if (tag.privateGoal === true) {
										return [
											"DIRETOR",
											"EXECUTIVO",
											"TESOURARIA",
										].includes(userRole);
									}
									// Se não for privada, pode mostrar normalmente
									return true;
								})
								.map((tag) => (
									<option key={tag.id} value={tag.id}>
										{tag.surname.charAt(0).toUpperCase() +
											tag.surname.slice(1).toLowerCase()}
									</option>
								))
						) : (
							<option value="">Nenhuma tag foi encontrada</option>
						)}
					</select>
				</div>
				{/* Gráfico */}
				<div className="relative w-full h-64">
					<Doughnut data={chartData} options={chartOptions} />
					<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
						<span className="text-xs text-gray-500">
							R${" "}
							<span className="text-2xl font-bold">
								{collectedAmount.toFixed(2)}
							</span>
						</span>
						<span className="text-xs text-gray-500 text-center">
							Arrecadado de R$ {goalAmount.toFixed(2)}
						</span>
					</div>
				</div>
				{/* Legenda */}
				<div className="flex items-center mt-4 text-sm gap-6">
					<div className="flex items-center">
						<div className="w-3 h-3 rounded-full bg-[#FCAE2D] mr-2" />
						<span>Valor arrecadado</span>
					</div>
					<div className="flex items-center">
						<div className="w-3 h-3 rounded-full bg-gray-500 mr-2" />
						<span>Valor restante</span>
					</div>
				</div>
			</div>

			{/* Card do Ranking */}
			<div className="bg-gray-100 rounded-xl p-6 shadow-md">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-bold text-gray-800 mb-4">
						Ranking das Unidades
					</h2>
					{userRole === "EXECUTIVO" ||
						(userRole === "DIRETOR" && (
							<button
								className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-150"
								onClick={handleResetPoints}
							>
								Resetar Pontuação
							</button>
						))}
				</div>
				<div className="overflow-hidden rounded-md border border-gray-300 max-h-[400px] overflow-y-auto">
					<div className="grid grid-cols-2 bg-gray-500 text-white font-semibold text-sm sticky top-0 z-10">
						<div className="py-3 px-4 text-center">Unidade</div>
						<div className="py-3 px-4 text-center">Pontos</div>
					</div>
					{points.map((point, index) => {
						const normalizedName = normalizeSurname(point.surname);
						const imageSrc =
							unitImages[normalizedName] || temporyImage;
						return (
							<div
								key={point.id ?? index}
								className="grid grid-cols-2 items-center border-b border-gray-200 bg-white hover:bg-gray-50 transition duration-150 text-sm"
								title={`${point.surname} - ${point.score} pontos`}
							>
								<div className="py-2 px-4 flex items-center gap-3">
									<img
										src={imageSrc}
										alt={point.surname}
										className="w-6 h-6 object-contain"
									/>
									<span className="truncate max-w-[120px] font-medium text-gray-700">
										{point.surname}
									</span>
								</div>
								<div className="py-2 px-4 text-center text-gray-600 font-semibold">
									{point.score}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default InternalHome;
