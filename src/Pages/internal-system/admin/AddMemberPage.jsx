import React, { useState } from "react";
import PersonalData from "./add-member-steps/PersonalData";
import Address from "./add-member-steps/Address";
import Sickness from "./add-member-steps/Sickness";
import MedicalData from "./add-member-steps/MedicalData";
import MemberGuardian from "./add-member-steps/MemberGuardian";
import InternData from "./add-member-steps/InternData";

//Obs.: Para capturar os dados de Sickness acesse o objeto `dados.sickness`
const formData = new FormData();



export default function CadastroMembro() {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [formDados, setFormDados] = useState({});

  const atualizarDadosEtapa = (novosDados) => {
    setFormDados((prev) => ({ ...prev, ...novosDados }));
  };

  const handleProximo = () => {
    setEtapaAtual((prev) => Math.min(prev + 1, 6));
  };

  const handleVoltar = () => {
    setEtapaAtual((prev) => Math.max(prev - 1, 1));
  };

  const handleEnviar = () => {
    alert("Dados enviados:\n" + JSON.stringify(formDados, null, 2));
    console.log("Dados enviados:", formDados);
    // Aqui você pode fazer o envio para sua API
  };


  // // Exemplo de como enviar para a API a parte de salvar a imagem no google drive
  // formData.append('foto', dados.foto ||'');
  // formData.append('cpf', dados.cpf || '');

return (
    <div className="flex flex-col items-center w-full">
        <div className="flex flex-col justify-center align-center h-[73vh] w-[70vw] p-6 bg-[#EDEDED] shadow rounded">
            <div className="flex h-[80%] w-[90]">
                {etapaAtual === 1 && (
                    <PersonalData dados={formDados} setDados={atualizarDadosEtapa} />
                )}
                {etapaAtual === 2 && (
                    <Address dados={formDados} setDados={atualizarDadosEtapa} />
                )}
                {etapaAtual === 3 && (
                    <Sickness dados={formDados} setDados={atualizarDadosEtapa} />
                )}
                {etapaAtual === 4 && (
                    <MedicalData dados={formDados} setDados={atualizarDadosEtapa} />
                )}
                {etapaAtual === 5 && (
                    <MemberGuardian dados={formDados} setDados={atualizarDadosEtapa} />
                )}
                {etapaAtual === 6 && (
                    <InternData dados={formDados} setDados={atualizarDadosEtapa} />
                )}
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={handleVoltar}
                    disabled={etapaAtual === 1}
                    className={`px-4 py-2 rounded ${
                        etapaAtual === 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-gray-600 text-white hover:bg-gray-700"
                    }`}
                >
                    Voltar
                </button>

                {etapaAtual < 6 ? (
                    <button
                        onClick={handleProximo}
                        className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                        Próximo
                    </button>
                ) : (
                    <button
                        onClick={handleEnviar}
                        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                        Enviar
                    </button>
                )}
            </div>
        </div>
        {/* Navegação por etapas*/}
        <div className="flex justify-center gap-4 mt-8">
            {[1, 2, 3, 4, 5, 6].map((etapa) => (
                <button
                    key={etapa}
                    onClick={() => setEtapaAtual(etapa)}
                    className={`
                        w-8 h-8 flex items-center justify-center rounded-full border-1  
                        transition
                        ${
                            etapaAtual === etapa
                                ? "bg-blue-600 border-blue-700 text-white"
                                : etapa < etapaAtual
                                ? "bg-yellow-500 border-yellow-600 text-white"
                                : "bg-gray-200 border-gray-400 text-gray-600"
                        }
                        font-bold text-lg
                        hover:scale-110
                    `}
                    aria-label={`Ir para etapa ${etapa}`}
                >
                    {etapa}
                </button>
            ))}
        </div>
    </div>
);
}
