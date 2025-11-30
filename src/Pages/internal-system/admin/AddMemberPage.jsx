import React, { useEffect, useState, useRef } from "react";
import { api } from "../../../provider/api";
import { createMember, updateMember } from "../../../services/membersService";
import Toast from "../../../utils/Toast";
import PersonalData from "./add-member-steps/PersonalData";
import Address from "./add-member-steps/Address";
import Sickness from "./add-member-steps/Sickness";
import MedicalData from "./add-member-steps/MedicalData";
import MemberGuardian from "./add-member-steps/MemberGuardian";
import InternData from "./add-member-steps/InternData";
import { useNavigate } from "react-router-dom";

// === UI/UX SYSTEM ===
// Padronização visual para garantir consistência entre todos os passos
const uiStyles = {
    // Input: Altura 48px (Mobile) / 44px (Desktop) para toque confortável. Text-base evita zoom no iOS.
    input: `
        w-full h-12 md:h-11 
        bg-white border border-gray-300 rounded-lg 
        px-4 text-base text-gray-900 
        placeholder:text-gray-400 placeholder:font-normal
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 
        transition-all duration-200 ease-in-out
        disabled:bg-gray-100 disabled:text-gray-500
    `,
    label: `
        block text-sm font-semibold text-gray-700 mb-1.5 ml-1
    `,
    gridContainer: `
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6
    `,
    sectionTitle: `
        text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200
    `
};

export default function AddMemberPage({ initialData = {}, editMode = false, onClose, onSave }) {
    const navigate = useNavigate();
    const [etapaAtual, setEtapaAtual] = useState(1);
    const [formDados, setFormDados] = useState(() =>
        editMode ? normalizeMemberToForm(initialData) : initializeMemberDefaults(initialData)
    );
    const [loading, setLoading] = useState(false);
    const initializedRef = useRef(false);

    useEffect(() => {
        if (editMode) {
            setFormDados((prev) => {
                const next = normalizeMemberToForm(initialData || {});
                return JSON.stringify(prev) === JSON.stringify(next) ? prev : next;
            });
        } else if (!initializedRef.current) {
            setFormDados((prev) => initializeMemberDefaults({ ...prev }));
            initializedRef.current = true;
        }
    }, [editMode, initialData?.cpf]);

    const atualizarDadosEtapa = (novosDados) => {
        setFormDados((prev) => ({ ...prev, ...novosDados }));
    };

    const handleProximo = () => {
        setEtapaAtual((prev) => Math.min(prev + 1, 6));
        // Scroll para o topo ao mudar de etapa para UX melhor
        document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleVoltar = () => {
        setEtapaAtual((prev) => Math.max(prev - 1, 1));
    };

    const buildFormData = (data) => {
        const form = new FormData();
        for (const key in data) {
            const value = data[key];
            if (value === undefined || value === null) continue;
            // Files
            if (value instanceof File) {
                form.append(key, value);
            } else if (value instanceof Blob) {
                form.append(key, value);
            } else if (Array.isArray(value)) {
                form.append(key, JSON.stringify(value));
            } else if (typeof value === "object") {
                form.append(key, JSON.stringify(value));
            } else {
                form.append(key, value);
            }
        }
        return form;
    };

    const handleEnviar = async () => {
        setLoading(true);
        try {
            const form = buildFormData(formDados);
            let result = null;
            if (editMode) {
                // updateMember expects multipart form
                result = await updateMember(form);
            } else {
                result = await createMember(form);
            }

            if (result) {
                Toast.fire({ icon: 'success', title: editMode ? 'Membro atualizado com sucesso' : 'Membro cadastrado com sucesso' });
                if (typeof onSave === 'function') onSave(result);
                if (typeof onClose === 'function') onClose();
            }
        } catch (err) {
            console.error(err);
            Toast.fire({ icon: 'error', title: err?.response?.data?.message || 'Erro ao salvar membro.' });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (onClose) onClose();
        navigate("/admin", { replace: true });
    };

    return (
        <div className="fixed inset-0 z-[99] flex flex-col bg-gray-100/50 backdrop-blur-sm md:py-6 md:px-4">
            
            {/* CARD PRINCIPAL */}
            <div className="flex flex-col w-full h-full bg-white md:rounded-2xl md:shadow-2xl md:max-w-6xl md:mx-auto border border-gray-200 overflow-hidden shadow-xl">
                
                {/* HEADER (STEPPER) */}
                <div className="shrink-0 bg-white px-5 py-5 md:px-10 border-b border-gray-100">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                {editMode ? "Editar Membro" : "Novo Cadastro"}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1 hidden sm:block">
                                Preencha as informações abaixo para registrar um desbravador.
                            </p>
                        </div>
                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            Etapa {etapaAtual} de 6
                        </span>
                    </div>

                    {/* Stepper Otimizado */}
                    <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto">
                        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-100 -z-0 rounded"></div>
                        <div 
                            className="absolute left-0 top-1/2 h-1 bg-blue-600 -z-0 rounded transition-all duration-500"
                            style={{ width: `${((etapaAtual - 1) / 5) * 100}%` }}
                        ></div>
                        
                        {[1, 2, 3, 4, 5, 6].map((etapa) => (
                            <button
                                key={etapa}
                                onClick={() => setEtapaAtual(etapa)}
                                className={`
                                    relative z-10 flex items-center justify-center 
                                    w-10 h-10 rounded-full border-2 text-sm font-bold transition-all duration-300
                                    ${etapaAtual === etapa 
                                        ? "bg-blue-600 border-blue-600 text-white shadow-lg scale-110 ring-4 ring-blue-100" 
                                        : etapa < etapaAtual 
                                            ? "bg-white border-blue-600 text-blue-600" 
                                            : "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
                                    }
                                `}
                            >
                                {etapa < etapaAtual ? "✓" : etapa}
                            </button>
                        ))}
                    </div>
                </div>

                {/* BODY (CONTEÚDO DO FORM) */}
                <div id="scroll-container" className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-10">
                    <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                        
                        {/* Passamos os ESTILOS via props para os filhos */}
                        {etapaAtual === 1 && <PersonalData dados={formDados} setDados={atualizarDadosEtapa} styles={uiStyles} />}
                        {etapaAtual === 2 && <Address dados={formDados} setDados={atualizarDadosEtapa} styles={uiStyles} />}
                        {etapaAtual === 3 && <Sickness dados={formDados} setDados={atualizarDadosEtapa} styles={uiStyles} />}
                        {etapaAtual === 4 && <MedicalData dados={formDados} setDados={atualizarDadosEtapa} styles={uiStyles} />}
                        {etapaAtual === 5 && <MemberGuardian dados={formDados} setDados={atualizarDadosEtapa} styles={uiStyles} />}
                        {etapaAtual === 6 && <InternData dados={formDados} setDados={atualizarDadosEtapa} styles={uiStyles} />}
                    
                    </div>
                    {/* Espaço extra para mobile */}
                    <div className="h-20 md:h-0"></div>
                </div>

                {/* FOOTER (AÇÕES) */}
                <div className="shrink-0 bg-white p-4 md:px-10 md:py-6 border-t border-gray-200 flex justify-between items-center gap-4 z-20">
                    {etapaAtual === 1 ? (
                        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2">
                            Cancelar
                        </button>
                    ) : (
                        <button onClick={handleVoltar} className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                            Voltar
                        </button>
                    )}

                    {etapaAtual < 6 ? (
                        <button 
                            onClick={handleProximo}
                            className="flex-1 md:flex-none px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                        >
                            Continuar
                        </button>
                    ) : (
                        <button 
                            onClick={handleEnviar} 
                            disabled={loading}
                            className="flex-1 md:flex-none px-8 py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg shadow-green-600/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Salvando..." : "Finalizar Cadastro"}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}

// ... (Mantive as funções normalizeMemberToForm e initializeMemberDefaults exatamente iguais ao código original para não quebrar lógica)
function normalizeMemberToForm(member) { return member ? member : {}; } // Simplificado para visualização, use o seu original
function initializeMemberDefaults(data = {}) { return data; } // Simplificado para visualização, use o seu original