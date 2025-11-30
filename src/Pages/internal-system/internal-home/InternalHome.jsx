import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { api } from "../../../provider/api";
import { getGoalByTag } from "../../../services/statementsService";
import { getTags as fetchTagsService } from "../../../services/tagsService";
import Swal from "sweetalert2";
import { getUnitsRanking, resetAllUnitScores } from "../../../services/unitsService";
import { getUser } from "../../../utils/authStorage";
import { Trophy, Target, AlertTriangle, Medal } from "lucide-react"; // Ícones modernos

// Imagens (Mantendo imports originais)
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
                const response = await getGoalByTag(tagId);
                setCollectedAmount(response?.totalPrice || 0);
                setGoalAmount(response?.tag?.goal || 0);
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
                const response = await getUnitsRanking();
                setPoints(response || []);
            } catch (error) {
                console.error("Erro ao buscar pontos:", error);
            }
        };

        const getTags = async () => {
            try {
                const response = await fetchTagsService();
                const filteredTags = (response || []).filter((tag) => tag.goal !== null);
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

    // Design do Gráfico: Cores mais vibrantes e clean
    const chartData = {
        labels: ["Arrecadado", "Restante"],
        datasets: [
            {
                data: [
                    collectedAmount,
                    remainingAmount > 0 ? remainingAmount : 0,
                ],
                backgroundColor: ["#FCAE2D", "#E5E7EB"], // Amarelo vibrante e cinza claro
                hoverBackgroundColor: ["#fbbf24", "#D1D5DB"],
                borderWidth: 0,
                cutout: "75%", // Mais fino, mais elegante
                borderRadius: 20, // Bordas arredondadas nos segmentos
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
                backgroundColor: "rgba(0,0,0,0.8)",
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: function (context) {
                        const label = context.label || "";
                        const value = context.parsed || 0;
                        return ` ${label}: R$ ${value.toFixed(2)}`;
                    },
                },
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    const handleResetPoints = async () => {
        const result = await Swal.fire({
            title: "Zerar Ranking?",
            text: "Isso apagará a pontuação de todas as unidades permanentemente.",
            icon: "warning",
            iconColor: "#ef4444",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Sim, zerar tudo",
            cancelButtonText: "Cancelar",
            background: "#fff",
            borderRadius: "1rem"
        });

        if (result.isConfirmed) {
            try {
                await resetAllUnitScores();
                Swal.fire({
                    title: "Sucesso!",
                    text: "Pontuação resetada.",
                    icon: "success",
                    confirmButtonColor: "#10b981"
                });
                const response = await getUnitsRanking();
                setPoints(response || []);
            } catch (error) {
                Swal.fire("Erro!", "Não foi possível resetar.", "error");
            }
        }
    };

    // Função auxiliar para renderizar ícone de rank
    const renderRankIcon = (index) => {
        if (index === 0) return <Trophy className="text-yellow-500 fill-yellow-500" size={20} />;
        if (index === 1) return <Medal className="text-gray-400 fill-gray-400" size={20} />;
        if (index === 2) return <Medal className="text-orange-700 fill-orange-700" size={20} />;
        return <span className="text-gray-400 font-bold text-sm">#{index + 1}</span>;
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start font-sans">
            
            {/* --- COLUNA 1: META FINANCEIRA --- */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 flex flex-col h-full relative overflow-hidden">
                {/* Efeito de fundo decorativo */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>

                <div className="flex items-center justify-between mb-6 z-10">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                            <Target size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Metas Financeiras</h2>
                    </div>
                </div>

                {/* Seletor Customizado */}
                <div className="relative mb-8 z-10">
                    <select
                        className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all font-medium cursor-pointer"
                        value={selectedTagId}
                        onChange={handleTagChange}
                    >
                        <option value="">Selecione um Objetivo...</option>
                        {tags.length > 0 && tags
                            .filter((tag) => !tag.privateGoal || ["DIRETOR", "EXECUTIVO", "TESOURARIA"].includes(userRole))
                            .map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.surname}
                                </option>
                            ))
                        }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>

                {/* Área do Gráfico */}
                <div className="relative flex-1 min-h-[300px] flex items-center justify-center">
                    <div className="w-full h-64 md:h-72 relative z-10">
                        <Doughnut data={chartData} options={chartOptions} />
                        
                        {/* Texto Central Absoluto */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-sm text-gray-400 font-medium mb-1">Arrecadado</span>
                            <span className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
                                {collectedAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                            <div className="mt-2 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500 font-semibold">
                                de {goalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards de Resumo (Legenda) */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
                        <p className="text-yellow-600 text-xs font-bold uppercase tracking-wider mb-1">Conquistado</p>
                        <p className="text-lg font-bold text-gray-800">
                            {goalAmount > 0 ? ((collectedAmount / goalAmount) * 100).toFixed(1) : 0}%
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Falta</p>
                        <p className="text-lg font-bold text-gray-600">
                            {(remainingAmount > 0 ? remainingAmount : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                    </div>
                </div>
            </div>

            {/* --- COLUNA 2: RANKING / LEADERBOARD --- */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 flex flex-col h-full relative overflow-hidden">
                {/* Efeito de fundo decorativo */}
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 z-10">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Trophy size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Ranking das Unidades</h2>
                            <p className="text-xs text-gray-400">Atualizado em tempo real</p>
                        </div>
                    </div>

                    {(userRole === "EXECUTIVO" || userRole === "DIRETOR") && (
                        <button
                            onClick={handleResetPoints}
                            className="group flex items-center gap-2 px-4 py-2 bg-white border border-red-100 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all text-sm font-semibold shadow-sm"
                        >
                            <AlertTriangle size={16} className="group-hover:text-red-600" />
                            <span>Resetar</span>
                        </button>
                    )}
                </div>

                {/* Lista de Ranking (Estilo Leaderboard) */}
                <div className="flex-1 overflow-hidden flex flex-col z-10">
                    <div className="overflow-y-auto pr-2 space-y-3 max-h-[500px] custom-scrollbar">
                        {points.map((point, index) => {
                            const normalizedName = normalizeSurname(point.surname);
                            const imageSrc = unitImages[normalizedName] || temporyImage;
                            
                            return (
                                <div
                                    key={point.id ?? index}
                                    className={`
                                        relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300
                                        ${index === 0 
                                            ? "bg-gradient-to-r from-yellow-50 to-white border-yellow-200 shadow-sm" 
                                            : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Posição / Medalha */}
                                        <div className="w-8 flex justify-center">
                                            {renderRankIcon(index)}
                                        </div>

                                        {/* Imagem da Unidade */}
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-gray-50 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                                                <img
                                                    src={imageSrc}
                                                    alt={point.surname}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {index === 0 && (
                                                <div className="absolute -top-1 -right-1 bg-yellow-400 text-white text-[10px] px-1.5 rounded-full font-bold border border-white">
                                                    1º
                                                </div>
                                            )}
                                        </div>

                                        {/* Nome */}
                                        <div>
                                            <h3 className={`font-bold text-base ${index === 0 ? "text-gray-900" : "text-gray-700"}`}>
                                                {point.surname}
                                            </h3>
                                            {index === 0 && <span className="text-[10px] font-semibold text-yellow-600 uppercase tracking-wide">Líder</span>}
                                        </div>
                                    </div>

                                    {/* Pontuação */}
                                    <div className="flex flex-col items-end">
                                        <span className={`text-lg font-bold ${index === 0 ? "text-yellow-600" : "text-gray-800"}`}>
                                            {point.score}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-medium">pontos</span>
                                    </div>
                                </div>
                            );
                        })}
                        {points.length === 0 && (
                            <div className="text-center py-10 text-gray-400">
                                <Trophy size={48} className="mx-auto mb-2 opacity-20" />
                                <p>Nenhuma pontuação registrada.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternalHome;