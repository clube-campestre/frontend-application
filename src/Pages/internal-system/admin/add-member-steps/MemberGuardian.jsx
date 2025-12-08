import React, { useState } from "react";
import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";

// --- MOCKS (Simulação de dependências externas) ---
const maskPhone = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2")
    .slice(0, 15);
};

// --- COMPONENTE PRINCIPAL ---

function MemberGuardian({ dados, setDados}) {
  const [responsavelUnico, setResponsavelUnico] = useState(false);

  return (
    // Container Principal: Centralizado, sem margens fixas laterais (ml-20 removido)
    <div className="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans">
      
      {/* Header da Seção */}
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="w-1.5 h-8 bg-amber-400 rounded-full"></div>
        <h2 className="font-bold text-xl md:text-2xl text-gray-800">Responsável Legal</h2>
      </div>

      {/* Área do Formulário */}
      <div className="flex flex-col w-full gap-6">
        {!responsavelUnico ? (
          /* --- OPÇÃO 1: PAI E MÃE --- */
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-6 animate-in fade-in duration-300">
            
            {/* Seção Pai */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-12">
                <AddMemberInput
                  id="fatherName"
                  type="text"
                  label="Nome do Pai"
                  value={dados.fatherName || ""}
                  onChange={(e) => setDados({...dados, fatherName: e.target.value})}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-7">
                <AddMemberInput
                  id="fatherEmail"
                  type="email"
                  label="Email do Pai"
                  value={dados.fatherEmail || ""}
                  onChange={(e) => setDados({...dados, fatherEmail: e.target.value})}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-5">
                <AddMemberInput
                  id="fatherContact"
                  type="text"
                  label="Contato do Pai"
                  value={maskPhone(dados.fatherContact || "")}
                  onChange={(e) =>
                    setDados({...dados, fatherContact: e.target.value.replace(/\D/g, "").slice(0, 11)})
                  }
                  className="w-full"
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Seção Mãe */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-12">
                <AddMemberInput
                  id="motherName"
                  type="text"
                  label="Nome da Mãe"
                  value={dados.motherName || ""}
                  onChange={(e) => setDados({...dados, motherName: e.target.value})}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-7">
                <AddMemberInput
                  id="motherEmail"
                  type="email"
                  label="Email da Mãe"
                  value={dados.motherEmail || ""}
                  onChange={(e) => setDados({...dados, motherEmail: e.target.value})}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-5">
                <AddMemberInput
                  id="motherContact"
                  type="text"
                  label="Contato da Mãe"
                  value={maskPhone(dados.motherContact || "")}
                  onChange={(e) =>
                    setDados({...dados, motherContact: e.target.value.replace(/\D/g, "").slice(0, 11)})
                  }
                  className="w-full"
                />
              </div>
            </div>

            {/* Botão de Toggle */}
            <div className="flex justify-end pt-2">
              <button
                className="text-[#022C81] text-sm font-medium hover:underline hover:text-blue-800 transition-colors cursor-pointer flex items-center gap-1"
                type="button"
                onClick={() => setResponsavelUnico(true)}
              >
                <span>Não se aplica? Clique aqui para Responsável Único</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        ) : (
          /* --- OPÇÃO 2: RESPONSÁVEL ÚNICO --- */
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-6 animate-in fade-in duration-300">
             <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-12">
                <AddMemberInput
                  id="responsibleName"
                  type="text"
                  label="Nome do Responsável"
                  value={dados.responsibleName || ""}
                  onChange={(e) => setDados({...dados, responsibleName: e.target.value})}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-7">
                <AddMemberInput
                  id="responsibleEmail"
                  type="email"
                  label="Email do Responsável"
                  value={dados.responsibleEmail || ""}
                  onChange={(e) => setDados({...dados, responsibleEmail: e.target.value})}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-5">
                <AddMemberInput
                  id="responsibleContact"
                  type="text"
                  label="Contato do Responsável"
                  value={maskPhone(dados.responsibleContact || "")}
                  onChange={(e) =>
                    setDados({...dados, responsibleContact: e.target.value.replace(/\D/g, "").slice(0, 11)})
                  }
                  className="w-full"
                />
              </div>
            </div>

            {/* Botão de Toggle */}
            <div className="flex justify-end pt-2">
              <button
                className="text-[#022C81] text-sm font-medium hover:underline hover:text-blue-800 transition-colors cursor-pointer flex items-center gap-1"
                type="button"
                onClick={() => setResponsavelUnico(false)}
              >
                <span aria-hidden="true">←</span>
                <span>Voltar para Pai e Mãe</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberGuardian;