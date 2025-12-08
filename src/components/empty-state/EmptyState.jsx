import React from "react";

/**
 * Componente de Estado Vazio Reutilizável
 * @param {React.Component|React.Element} icon - Ícone a ser exibido (componente React ou elemento)
 * @param {string} title - Título do estado vazio
 * @param {string} message - Mensagem descritiva (opcional)
 * @param {string} className - Classes CSS adicionais (opcional)
 */
const EmptyState = ({ 
    icon: Icon, 
    title, 
    message,
    className = ""
}) => {
    return (
        <div className={`flex flex-col items-center justify-center py-20 text-center ${className}`}>
            <div className="bg-gray-50 p-4 rounded-full mb-4">
                {typeof Icon === 'function' ? (
                    <Icon size={32} className="text-gray-300" />
                ) : (
                    Icon || <div className="w-8 h-8 bg-gray-300 rounded-full" />
                )}
            </div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {message && (
                <p className="text-gray-500 max-w-sm mt-1">{message}</p>
            )}
        </div>
    );
};

export default EmptyState;

