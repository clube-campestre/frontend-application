import React from "react";

export default function ViewModal({ onClose, item, title, labels }) {
  const formatCurrency = (value) => {
    if (typeof value === "number" || !isNaN(value)) {
      return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    return value;
  };

  const formatPhone = (value) => {
    if (typeof value !== "string") return value;
    const digits = value.replace(/\D/g, "");
    if (digits.length === 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    if (digits.length === 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return value;
  };

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

            if (key === "cep" && typeof value === "string") {
              displayValue = value.replace(/^(\d{5})(\d{3})$/, "$1-$2");
            }

            if (key === "price") {
              displayValue = formatCurrency(value);
            }

            if (
              key === "companyContact" ||
              key === "driverContact" ||
              key === "contact"
            ) {
              displayValue = formatPhone(value);
            }

            return (
              <div
                key={key}
                className="flex flex-col md:flex-row md:justify-between border-b border-gray-300 pb-3"
              >
                <span className="font-semibold text-gray-700 mb-1 md:mb-0">
                  {labels[key]}:
                </span>
                <span className="text-gray-900">{displayValue || "-"}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
