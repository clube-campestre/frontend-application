import React, { useState } from "react";
import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";

// Etapa 5 - MemberGuardian
function MemberGuardian({ dados, setDados }) {
  const [responsavelUnico, setResponsavelUnico] = useState(false);

  return (
    <div className="flex flex-col w-full ">
      <div className="flex align-center items-center ml-20 gap-2">
        <div className="border-3 h-10 border-amber-400 rounded"></div>
        <h2 className="font-semibold text-xl">Responsável Legal</h2>
      </div>

      <div className="flex flex-col align-center justify-center items-center h-[90%] gap-3 mt-8">
        {!responsavelUnico ? (
          <>
            <div className="flex flex-row justify-between items-center w-[85%] ">
              <AddMemberInput
                id="fatherName"
                type="text"
                label="Nome do Pai"
                value={dados.fatherName || ""}
                onChange={(e) => setDados({ ...dados, fatherName: e.target.value })}
                className="h-[8vh] w-full"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
              <AddMemberInput
                id="fatherEmail"
                type="text"
                label="Email do Pai"
                value={dados.fatherEmail || ""}
                onChange={(e) => setDados({ ...dados, fatherEmail: e.target.value })}
                className="h-[8vh] w-[30vw]"
              />
              <AddMemberInput
                id="fatherContact"
                type="text"
                label="Contato do Pai"
                value={dados.fatherContact || ""}
                onChange={(e) => setDados({ ...dados, fatherContact: e.target.value })}
                className="h-[8vh] w-[22vw]"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%] ">
              <AddMemberInput
                id="motherName"
                type="text"
                label="Nome da Mãe"
                value={dados.motherName || ""}
                onChange={(e) => setDados({ ...dados, motherName: e.target.value })}
                className="h-[8vh] w-full"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
              <AddMemberInput
                id="motherEmail"
                type="text"
                label="Email da Mãe"
                value={dados.motherEmail || ""}
                onChange={(e) => setDados({ ...dados, motherEmail: e.target.value })}
                className="h-[8vh] w-[30vw]"
              />
              <AddMemberInput
                id="motherContact"
                type="text"
                label="Contato da Mãe"
                value={dados.motherContact || ""}
                onChange={(e) => setDados({ ...dados, motherContact: e.target.value })}
                className="h-[8vh] w-[22vw]"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
              <button
                className="text-[#022C81] italic hover:underline"
                type="button"
                onClick={() => setResponsavelUnico(true)}
              >
                Caso não se aplique, clique aqui
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row justify-between items-center w-[85%] ">
              <AddMemberInput
                id="responsibleName"
                type="text"
                label="Nome do Responsável"
                value={dados.responsibleName || ""}
                onChange={(e) => setDados({ ...dados, responsibleName: e.target.value })}
                className="h-[8vh] w-full"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
              <AddMemberInput
                id="responsibleEmail"
                type="text"
                label="Email do Responsável"
                value={dados.responsibleEmail || ""}
                onChange={(e) => setDados({ ...dados, responsibleEmail: e.target.value })}
                className="h-[8vh] w-[30vw]"
              />
              <AddMemberInput
                id="responsibleContact"
                type="text"
                label="Contato do Responsável"
                value={dados.responsibleContact || ""}
                onChange={(e) => setDados({ ...dados, responsibleContact: e.target.value })}
                className="h-[8vh] w-[22vw]"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
              <button
                className="text-[#022C81] italic hover:underline"
                type="button"
                onClick={() => setResponsavelUnico(false)}
              >
                Voltar para Pai/Mãe
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MemberGuardian;