import React from "react";

/**
 * Componente de Card de Informação Reutilizável
 * @param {React.Component|React.Element} icon - Ícone a ser exibido
 * @param {string} label - Label do card (texto pequeno acima do valor)
 * @param {string|number|React.Element} value - Valor a ser exibido
 * @param {string} iconBgColor - Cor de fundo do ícone (classe Tailwind, ex: "bg-amber-100")
 * @param {string} iconColor - Cor do ícone (classe Tailwind, ex: "text-[#FCAE2D]")
 * @param {string} className - Classes CSS adicionais
 */
const InfoCard = ({ 
    icon: Icon, 
    label, 
    value,
    iconBgColor = "bg-amber-100",
    iconColor = "text-[#FCAE2D]",
    className = ""
}) => {
    return (
        <div className={`bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 transition-all hover:shadow-md ${className}`}>
            <div className={`${iconBgColor} p-2 md:p-3 rounded-full ${iconColor}`}>
                {typeof Icon === 'function' ? (
                    <Icon size={20} className="md:w-6 md:h-6" />
                ) : (
                    Icon
                )}
            </div>
            <div className="flex-1 overflow-hidden">
                <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold">{label}</p>
                <p className="text-base md:text-lg font-bold text-gray-800 leading-tight truncate">
                    {value || "-"}
                </p>
            </div>
        </div>
    );
};

export default InfoCard;

