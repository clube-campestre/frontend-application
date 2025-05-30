import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { api } from "../../../provider/api";

import loboImage from "../../../assets/images/lobo.png";
import falcaoImage from "../../../assets/images/falcao.png";
import pandaImage from "../../../assets/images/panda.png";
import panteraImage from "../../../assets/images/pantera.png";
import raposaImage from "../../../assets/images/raposa.png";
import tigreImage from "../../../assets/images/tigre.png";
import ursoImage from "../../../assets/images/urso.png";
import aguiaRealImage from "../../../assets/images/aguia-real.png";
import linceImage from "../../../assets/images/lince.png";

const temporyImage = pandaImage;

ChartJS.register(ArcElement, Tooltip, Legend);

const goalAmount = 9000;
const collectedAmount = 8325.6;
const remainingAmount = goalAmount - collectedAmount;

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
  leao: temporyImage,
  lince: linceImage,
  "leão": linceImage,
};

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


const InternalHome = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await api.get("/units/ranking");
        setPoints(response.data);
      } catch (error) {
        console.error("Erro ao buscar pontos:", error);
      }
    };

    fetchPoints();
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto p-4">
      <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Meta das Barracas
        </h2>

        <div className="relative w-full h-64">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center  pointer-events-none">
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

      <div className="bg-gray-100 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Ranking das Unidades
        </h2>

        <div className="overflow-hidden rounded-md border border-gray-300 max-h-[400px] overflow-y-auto">
          <div className="grid grid-cols-2 bg-gray-500 text-white font-semibold text-sm sticky top-0 z-10">
            <div className="py-3 px-4 text-center">Unidade</div>
            <div className="py-3 px-4 text-center">Pontos</div>
          </div>

          {points.map((point, index) => {
            const normalizedName = normalizeSurname(point.surname);
            const imageSrc = unitImages[normalizedName] || temporyImage;

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
