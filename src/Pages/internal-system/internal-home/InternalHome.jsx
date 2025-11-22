import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { api } from "../../../provider/api";
import Swal from "sweetalert2";
import { getUser } from "../../../utils/authStorage";

// Imagens (Mantine o imports originais)
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

        if (tagId) {
            try {
                const response = await api.get(`/statements/goal`, {
                    params: { tagId },
                });
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
                console.error("Error fetching tags:", error);
            }
        };

        fetchPoints();
        getTags();
    }, []);

    const temporyImage = pandaImage;

    ChartJS.register(ArcElement, Tooltip, Legend);

    const normalizeSurname = (name) =>
        name?.trim()
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
            legend: { display: false },
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
                Swal.fire("Erro!", "Não foi possível resetar.", "error");
            }
        }
    };

    return (
        /* CONTAINER PRINCIPAL:
           - p-4: Padding confortável para mobile.
           - max-w-7xl mx-auto: Centraliza em telas grandes.
           - grid-cols-1 (padrão) -> lg:grid-cols-2: Stacka em mobile, divide em desktops.
        */
        <div className="w-full max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* --- CARD DA META --- */}
            <div className="bg-gray-100 rounded-xl p-4 sm:p-6 flex flex-col items-center gap-4 shadow-md w-full">
                
                {/* Cabeçalho do Card: Flex-col no mobile para o Select não espremer o título */}
                <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
                    <h2 className="text-xl font-bold text-gray-800">
                        Meta
                    </h2>
                    {/* Select estilizado para parecer um input touch-friendly e ocupar 100% no mobile */}
                    <select
                        className="w-full sm:w-auto p-2.5 border border-gray-300 rounded-lg bg-[#EDEDED] text-gray-700 focus:ring-2 focus:ring-[#FCAE2D] outline-none cursor-pointer"
                        value={selectedTagId}
                        onChange={handleTagChange}
                    >
                        <option value="">Selecione uma Meta</option>
                        {tags.length > 0 ? (
                            tags
                                .filter((tag) => {
                                    if (tag.privateGoal === true) {
                                        return ["DIRETOR", "EXECUTIVO", "TESOURARIA"].includes(userRole);
                                    }
                                    return true;
                                })
                                .map((tag) => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.surname.charAt(0).toUpperCase() + tag.surname.slice(1).toLowerCase()}
                                    </option>
                                ))
                        ) : (
                            <option value="">Nenhuma tag encontrada</option>
                        )}
                    </select>
                </div>

                {/* Área do Gráfico */}
                <div className="relative w-full h-64 sm:h-72">
                    <Doughnut data={chartData} options={chartOptions} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs sm:text-sm text-gray-500 flex flex-col items-center">
                            R$
                            <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {collectedAmount.toFixed(2)}
                            </span>
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-500 text-center mt-1">
                            Meta: R$ {goalAmount.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Legenda adaptável */}
                <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#FCAE2D] mr-2" />
                        <span>Arrecadado</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-gray-500 mr-2" />
                        <span>Restante</span>
                    </div>
                </div>
            </div>

            {/* --- CARD DO RANKING --- */}
            <div className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-md w-full flex flex-col h-full">
                
                {/* Cabeçalho com Wrap para o botão não quebrar layout em telas pequenas */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                    <h2 className="text-xl font-bold text-gray-800 text-center sm:text-left">
                        Ranking
                    </h2>
                    {(userRole === "EXECUTIVO" || userRole === "DIRETOR") && (
                        <button
                            className="w-full sm:w-auto bg-red-500 text-white px-4 py-2.5 rounded-lg hover:bg-red-600 active:scale-95 transition-all text-sm font-medium shadow-sm"
                            onClick={handleResetPoints}
                        >
                            Resetar Pontuação
                        </button>
                    )}
                </div>

                {/* Tabela Responsiva */}
                <div className="overflow-hidden rounded-lg border border-gray-300 flex flex-col h-full max-h-[400px]">
                    {/* Header da Tabela */}
                    <div className="grid grid-cols-[1fr_80px] bg-gray-600 text-white font-semibold text-sm sticky top-0 z-10">
                        <div className="py-3 px-4 text-left">Unidade</div>
                        <div className="py-3 px-4 text-center">Pontos</div>
                    </div>
                    
                    {/* Corpo da Tabela com Scroll */}
                    <div className="overflow-y-auto bg-white flex-1">
                        {points.map((point, index) => {
                            const normalizedName = normalizeSurname(point.surname);
                            const imageSrc = unitImages[normalizedName] || temporyImage;
                            
                            return (
                                <div
                                    key={point.id ?? index}
                                    className="grid grid-cols-[1fr_80px] items-center border-b border-gray-100 hover:bg-gray-50 transition duration-150 text-sm py-2"
                                >
                                    <div className="px-4 flex items-center gap-3 min-w-0">
                                        <img
                                            src={imageSrc}
                                            alt={point.surname}
                                            className="w-8 h-8 object-contain flex-shrink-0"
                                        />
                                        {/* Truncate inteligente: usa min-w-0 do pai para não estourar */}
                                        <span className="font-medium text-gray-700 truncate block">
                                            {point.surname}
                                        </span>
                                    </div>
                                    <div className="px-2 text-center text-gray-900 font-bold bg-gray-50 h-full flex items-center justify-center">
                                        {point.score}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternalHome;