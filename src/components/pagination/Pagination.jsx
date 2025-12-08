import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

/**
 * Componente de Paginação Reutilizável
 * @param {number} pageNumber - Página atual (0-indexed)
 * @param {number} totalPages - Total de páginas
 * @param {function} onPageChange - Callback quando a página muda: (newPageNumber) => void
 * @param {number} totalItems - Total de itens (opcional, para exibir contagem)
 * @param {number} itemsPerPage - Itens por página (opcional, para exibir contagem)
 */
const Pagination = ({ 
    pageNumber, 
    totalPages, 
    onPageChange,
    totalItems,
    itemsPerPage,
    className = ""
}) => {
    const handlePrev = () => {
        if (pageNumber > 0) {
            onPageChange(pageNumber - 1);
        }
    };

    const handleNext = () => {
        if (pageNumber + 1 < totalPages) {
            onPageChange(pageNumber + 1);
        }
    };

    return (
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
            {/* Contador de itens (opcional) */}
            {totalItems !== undefined && itemsPerPage !== undefined && (
                <span className="text-xs text-gray-600">
                    Mostrando <span className="font-bold text-gray-900">{itemsPerPage}</span> de {totalItems} registros
                </span>
            )}
            
            {/* Controles de paginação */}
            <div className="flex items-center gap-2">
                <button
                    onClick={handlePrev}
                    disabled={pageNumber === 0}
                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600"
                    aria-label="Página anterior"
                >
                    <FaChevronLeft size={14} />
                </button>
                <span className="text-xs font-medium px-2">
                    Pág {pageNumber + 1} de {totalPages || 1}
                </span>
                <button
                    onClick={handleNext}
                    disabled={pageNumber + 1 >= totalPages}
                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600"
                    aria-label="Próxima página"
                >
                    <FaChevronRight size={14} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;

