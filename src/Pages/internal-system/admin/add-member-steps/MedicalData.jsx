import React from 'react';

// --- MOCKS PARA SIMULAR OS COMPONENTES AUSENTES ---

const maskCns = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/^(\d{3})(\d)/, "$1 $2")
        .replace(/^(\d{3})\s(\d{4})(\d)/, "$1 $2 $3")
        .replace(/^(\d{3})\s(\d{4})\s(\d{4})(\d)/, "$1 $2 $3 $4")
        .slice(0, 18);
};

const AddMemberInput = ({ id, label, type, value, onChange, options, className }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label htmlFor={id} className="text-sm font-semibold text-gray-600 ml-1">
            {label}
        </label>
        {type === 'select' ? (
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition-all"
            >
                <option value="">Selecione...</option>
                {options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        ) : (
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition-all"
            />
        )}
    </div>
);

const MedicalDataCard = ({ questions, answers = [], onChange, fieldNames = [], className }) => {
    const handleAnswer = (index, value) => {
        const newAnswers = [...answers];
        if (!newAnswers[index]) newAnswers[index] = {};
        newAnswers[index] = { ...newAnswers[index], value };
        // Limpar descrição se mudar para "Não"
        if (value === false && newAnswers[index].description) {
            newAnswers[index].description = "";
        }
        onChange(newAnswers);
    };

    const handleDescriptionChange = (index, description) => {
        const newAnswers = [...answers];
        if (!newAnswers[index]) newAnswers[index] = {};
        newAnswers[index] = { ...newAnswers[index], description };
        onChange(newAnswers);
    };

    return (
        <div className={className}>
            {questions.map((question, idx) => {
                const currentAnswer = answers[idx]?.value;
                const currentDescription = answers[idx]?.description || "";
                const fieldName = fieldNames[idx];
                
                return (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col gap-3">
                        <p className="font-medium text-gray-700 text-sm md:text-base">{question}</p>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name={`q-${idx}`} 
                                    checked={currentAnswer === true}
                                    onChange={() => handleAnswer(idx, true)}
                                    className="w-4 h-4 text-amber-400 focus:ring-amber-400"
                                />
                                <span className="text-gray-600">Sim</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name={`q-${idx}`} 
                                    checked={currentAnswer === false}
                                    onChange={() => handleAnswer(idx, false)}
                                    className="w-4 h-4 text-amber-400 focus:ring-amber-400"
                                />
                                <span className="text-gray-600">Não</span>
                            </label>
                        </div>
                        {currentAnswer === true && fieldName && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    placeholder="Descreva o motivo..."
                                    value={currentDescription}
                                    onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition-all text-gray-700"
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---

function MedicalData({ dados = {}, setDados = () => {} }) {
    // Garante que dados.medicalAnswers seja um array para evitar erros no mock
    if (!dados.medicalAnswers) dados.medicalAnswers = [];

    return (
        // Container Principal: Largura controlada e centralizada
        <div className="w-full max-w-screen-xl mx-auto p-2 md:p-4 font-sans">
            
            {/* Container Branco (Card Principal) 
                - h-auto: Cresce com o conteúdo
                - min-h-fit: Garante altura mínima
            */}
            <div className="bg-white w-full rounded-2xl shadow-sm flex flex-col p-5 md:p-10 gap-8 h-auto min-h-fit">
                
                {/* Cabeçalho da Seção */}
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-1.5 h-8 bg-amber-400 rounded-full"></div>
                    <h2 className="font-bold text-xl md:text-2xl text-gray-800">Dados Médicos</h2>
                </div>

                {/* Grid dos Inputs Superiores (Tipo, CNS, Convênio) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
                    {/* Tipo Sanguíneo */}
                    <div className="md:col-span-2">
                        <AddMemberInput
                            id="blood_type"
                            type="select"
                            options={[
                                { value: "A+", label: "A+" },
                                { value: "A-", label: "A-" },
                                { value: "B+", label: "B+" },
                                { value: "B-", label: "B-" },
                                { value: "AB+", label: "AB+" },
                                { value: "AB-", label: "AB-" },
                                { value: "O+", label: "O+" },
                                { value: "O-", label: "O-" },
                            ]}
                            label="Tipo Sanguíneo"
                            value={dados.blood_type || ""}
                            onChange={(e) =>
                                setDados({ ...dados, blood_type: e.target.value })
                            }
                            className="w-full"
                        />
                    </div>

                    {/* Carteira SUS */}
                    <div className="md:col-span-5">
                        <AddMemberInput
                            id="cns"
                            type="text"
                            label="Carteira SUS"
                            value={maskCns(dados.cns || "")}
                            onChange={(e) =>
                                setDados({ ...dados, cns: e.target.value.replace(/\D/g, "") })
                            }
                            className="w-full"
                        />
                    </div>

                    {/* Convênio */}
                    <div className="md:col-span-5">
                        <AddMemberInput
                            id="agreement"
                            type="text"
                            label="Convênio"
                            value={dados.agreement || ""}
                            onChange={(e) =>
                                setDados({ ...dados, agreement: e.target.value })
                            }
                            className="w-full"
                        />
                    </div>
                </div>

                {/* LISTA DE PERGUNTAS (SIM/NÃO)
                    - grid-cols-1: Força uma pergunta por linha (vertical)
                */}
                <div className="w-full mt-2">
                    <MedicalDataCard
                        className="grid grid-cols-1 gap-4 w-full" 
                        questions={[
                            "Problemas cardíacos?",
                            "Alergia a algum medicamento?",
                            "Tem alergia a lactose?",
                            "Tem alguma deficiência?",
                            "Transfusão de sangue?",
                            "Alergia de pele? Se sim, faz uso de medicamento?",
                            "Tem ou teve desmaio ou convulsão? Se sim, faz uso de qual medicamento?",
                            "Possui transtornos psicológicos? Se sim, quais?",
                            "Possui alergia? Se sim, quais e qual medicamento usa?",
                            "É diabético? Se sim, qual medicamento usa?",
                            "Teve algum ferimento grave recente?",
                            "Algum tipo de fratura recente? Se sim, quais?",
                            "Passou por cirurgias? Se sim, quais?",
                            "Motivo de internação nos últimos 5 anos:",
                        ]}
                        fieldNames={[
                            "heartProblems",
                            "drugAllergy",
                            "lactoseAllergy",
                            "deficiency",
                            "bloodTransfusion",
                            "skinAllergyMedications",
                            "faintingOrSeizuresMedications",
                            "psychologicalDisorder",
                            "allergyMedications",
                            "diabeticMedications",
                            "recentSeriousInjury",
                            "recentFracture",
                            "surgeries",
                            "hospitalizationReasonLast5Years",
                        ]}
                        answers={dados.medicalAnswers}
                        onChange={(respostas) => {
                            // Mapear respostas para os campos do payload
                            const medicalData = {
                                heartProblems: respostas[0]?.value === true ? respostas[0]?.description || "" : "",
                                drugAllergy: respostas[1]?.value === true ? respostas[1]?.description || "" : "",
                                lactoseAllergy: respostas[2]?.value === true,
                                deficiency: respostas[3]?.value === true ? respostas[3]?.description || "" : "",
                                bloodTransfusion: respostas[4]?.value === true,
                                skinAllergy: respostas[5]?.value === true,
                                skinAllergyMedications: respostas[5]?.value === true ? respostas[5]?.description || "" : "",
                                faintingOrConvulsion: respostas[6]?.value === true,
                                faintingOrSeizuresMedications: respostas[6]?.value === true ? respostas[6]?.description || "" : "",
                                psychologicalDisorder: respostas[7]?.value === true ? respostas[7]?.description || "" : "",
                                allergy: respostas[8]?.value === true,
                                allergyMedications: respostas[8]?.value === true ? respostas[8]?.description || "" : "",
                                diabetic: respostas[9]?.value === true,
                                diabeticMedications: respostas[9]?.value === true ? respostas[9]?.description || "" : "",
                                recentSeriousInjury: respostas[10]?.value === true,
                                recentFracture: respostas[11]?.value === true ? respostas[11]?.description || "" : "",
                                surgeries: respostas[12]?.value === true ? respostas[12]?.description || "" : "",
                                hospitalizationReasonLast5Years: respostas[13]?.value === true ? respostas[13]?.description || "" : "",
                            };
                            
                            const novosDados = {
                                ...dados,
                                medicalAnswers: respostas,
                                medicalData: medicalData,
                            };
                            
                            // Evita loop infinito no React
                            if (JSON.stringify(novosDados.medicalAnswers) !== JSON.stringify(dados.medicalAnswers)) {
                                setDados(novosDados);
                            }
                        }}
                    />
                </div>
            </div>
            
            {/* Espaçamento inferior extra para mobile */}
            <div className="h-8 md:hidden"></div>
        </div>
    );
}

export default MedicalData;