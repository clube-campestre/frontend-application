import React from "react";

export default function ViewModal({ onClose, item, title, labels }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000da]">
      <div className="bg-[#f3f3f3] p-10 rounded-xl shadow-lg min-w-[500px] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-1 right-3 text-3xl"
          aria-label="Fechar modal"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-6">
          <span className="border-l-4 border-[#FCAE2D] mr-3"></span>
          {title}
        </h2>

        <div className="space-y-5">
          {Object.entries(item).map(([key, value]) => {
            if (!labels[key]) return null;

            let displayValue = value;

            if (typeof value === "boolean") {
              displayValue = value ? "Sim" : "Não";
            }

            // Formatar CEP (XXXXX-XXX)
            if (key === "cep" && typeof value === "string") {
              displayValue = value.replace(/^(\d{5})(\d{3})$/, "$1-$2");
            }

            return (
              <div key={key} className="flex flex-col md:flex-row md:justify-between border-b border-gray-300 pb-3">
                <span className="font-semibold text-gray-700 mb-1 md:mb-0">{labels[key]}:</span>
                <span className="text-gray-900">{displayValue || "-"}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
