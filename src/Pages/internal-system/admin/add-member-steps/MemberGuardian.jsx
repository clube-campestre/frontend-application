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
                id="nomePai"
                type="text"
                label="Nome do Pai"
                value={dados.nomePai || ""}
                onChange={(e) => setDados({ ...dados, nomePai: e.target.value })}
                className="h-[8vh] w-full"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
              <AddMemberInput
                id="emailPai"
                type="text"
                label="Email do Pai"
                value={dados.emailPai || ""}
                onChange={(e) => setDados({ ...dados, emailPai: e.target.value })}
                className="h-[8vh] w-[30vw]"
              />
              <AddMemberInput
                id="contatoPai"
                type="text"
                label="Contato do Pai"
                value={dados.contatoPai || ""}
                onChange={(e) => setDados({ ...dados, contatoPai: e.target.value })}
                className="h-[8vh] w-[22vw]"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%] ">
              <AddMemberInput
                id="nomeMae"
                type="text"
                label="Nome da Mãe"
                value={dados.nomeMae || ""}
                onChange={(e) => setDados({ ...dados, nomeMae: e.target.value })}
                className="h-[8vh] w-full"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
              <AddMemberInput
                id="emailMae"
                type="text"
                label="Email da Mãe"
                value={dados.emailMae || ""}
                onChange={(e) => setDados({ ...dados, emailMae: e.target.value })}
                className="h-[8vh] w-[30vw]"
              />
              <AddMemberInput
                id="contatoMae"
                type="text"
                label="Contato da Mãe"
                value={dados.contatoMae || ""}
                onChange={(e) => setDados({ ...dados, contatoMae: e.target.value })}
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
                id="nomeResponsavel"
                type="text"
                label="Nome do Responsável"
                value={dados.nomeResponsavel || ""}
                onChange={(e) => setDados({ ...dados, nomeResponsavel: e.target.value })}
                className="h-[8vh] w-full"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
              <AddMemberInput
                id="emailResponsavel"
                type="text"
                label="Email do Responsável"
                value={dados.emailResponsavel || ""}
                onChange={(e) => setDados({ ...dados, emailResponsavel: e.target.value })}
                className="h-[8vh] w-[30vw]"
              />
              <AddMemberInput
                id="contatoResponsavel"
                type="text"
                label="Contato do Responsável"
                value={dados.contatoResponsavel || ""}
                onChange={(e) => setDados({ ...dados, contatoResponsavel: e.target.value })}
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