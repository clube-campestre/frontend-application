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
    const [fieldErrors, setFieldErrors] = useState({});
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

    // Função de validação por etapa - retorna objeto de erros por campo
    const validarEtapa = (etapa) => {
        const errors = {};
        const dados = formDados;

        switch(etapa) {
            case 1: // PersonalData
                if (!dados.username?.trim()) errors.username = "Este campo é obrigatório";
                if (!dados.cpf?.replace(/\D/g, "") || dados.cpf.replace(/\D/g, "").length !== 11) errors.cpf = "CPF é obrigatório e deve ter 11 dígitos";
                if (!dados.birthDate) errors.birthDate = "Este campo é obrigatório";
                if (!dados.sex) errors.sex = "Este campo é obrigatório";
                if (!dados.birthCertificate?.trim()) errors.birthCertificate = "Este campo é obrigatório";
                if (!dados.issuingAuthority?.trim()) errors.issuingAuthority = "Este campo é obrigatório";
                if (!dados.contact?.replace(/\D/g, "") || dados.contact.replace(/\D/g, "").length < 10) errors.contact = "Este campo é obrigatório";
                if (!dados.tshirtSize) errors.tshirtSize = "Este campo é obrigatório";
                if (dados.isBaptized === "" || dados.isBaptized === undefined || dados.isBaptized === null) errors.isBaptized = "Este campo é obrigatório";
                break;

            case 2: // Address
                if (!dados.cep?.replace(/\D/g, "") || dados.cep.replace(/\D/g, "").length !== 8) errors.cep = "CEP é obrigatório";
                if (!dados.houseNumber?.trim()) errors.houseNumber = "Este campo é obrigatório";
                if (!dados.district?.trim()) errors.district = "Este campo é obrigatório";
                if (!dados.city?.trim()) errors.city = "Este campo é obrigatório";
                if (!dados.state?.trim()) errors.state = "Este campo é obrigatório";
                if (!dados.street?.trim()) errors.street = "Este campo é obrigatório";
                // complement e referenceHouse são opcionais
                break;

            case 3: // Sickness - Todos são booleanos, não precisa validar
                break;

            case 4: // MedicalData
                if (!dados.blood_type) errors.blood_type = "Este campo é obrigatório";
                if (!dados.cns?.replace(/\D/g, "")) errors.cns = "Este campo é obrigatório";
                // agreement é opcional
                break;

            case 5: // MemberGuardian
                // Regra: pelo menos um responsável completo (nome, email, contato)
                const paiCompleto = dados.fatherName?.trim() && dados.fatherEmail?.trim() && dados.fatherContact?.replace(/\D/g, "").length >= 10;
                const maeCompleto = dados.motherName?.trim() && dados.motherEmail?.trim() && dados.motherContact?.replace(/\D/g, "").length >= 10;
                const responsavelCompleto = dados.responsibleName?.trim() && dados.responsibleEmail?.trim() && dados.responsibleContact?.replace(/\D/g, "").length >= 10;

                if (!paiCompleto && !maeCompleto && !responsavelCompleto) {
                    // Se nenhum responsável completo, marcar campos incompletos
                    if (dados.fatherName?.trim() || dados.fatherEmail?.trim() || dados.fatherContact) {
                        if (!dados.fatherName?.trim()) errors.fatherName = "Necessário para completar dados do pai";
                        if (!dados.fatherEmail?.trim()) errors.fatherEmail = "Necessário para completar dados do pai";
                        if (!dados.fatherContact?.replace(/\D/g, "") || dados.fatherContact.replace(/\D/g, "").length < 10) errors.fatherContact = "Necessário para completar dados do pai";
                    }
                    if (dados.motherName?.trim() || dados.motherEmail?.trim() || dados.motherContact) {
                        if (!dados.motherName?.trim()) errors.motherName = "Necessário para completar dados da mãe";
                        if (!dados.motherEmail?.trim()) errors.motherEmail = "Necessário para completar dados da mãe";
                        if (!dados.motherContact?.replace(/\D/g, "") || dados.motherContact.replace(/\D/g, "").length < 10) errors.motherContact = "Necessário para completar dados da mãe";
                    }
                    if (dados.responsibleName?.trim() || dados.responsibleEmail?.trim() || dados.responsibleContact) {
                        if (!dados.responsibleName?.trim()) errors.responsibleName = "Necessário para completar dados do responsável";
                        if (!dados.responsibleEmail?.trim()) errors.responsibleEmail = "Necessário para completar dados do responsável";
                        if (!dados.responsibleContact?.replace(/\D/g, "") || dados.responsibleContact.replace(/\D/g, "").length < 10) errors.responsibleContact = "Necessário para completar dados do responsável";
                    }
                    if (!paiCompleto && !maeCompleto && !responsavelCompleto && Object.keys(errors).length === 0) {
                        errors.fatherName = "Preencha pelo menos um responsável completo (nome, email e contato)";
                        errors.motherName = "Preencha pelo menos um responsável completo (nome, email e contato)";
                        errors.responsibleName = "Preencha pelo menos um responsável completo (nome, email e contato)";
                    }
                }
                break;

            case 6: // InternData
                // unitRole, classCategory e classRole podem ser "NENHUMA", mas devem estar preenchidos
                if (!dados.unitRole || dados.unitRole === "") errors.unitRole = "Este campo é obrigatório";
                if (!dados.classCategory || dados.classCategory === "") errors.classCategory = "Este campo é obrigatório";
                if (!dados.classRole || dados.classRole === "") errors.classRole = "Este campo é obrigatório";
                if (!dados.acceptTerms) errors.acceptTerms = "Você deve aceitar os termos de uso";
                // image/imagePreview é opcional
                break;
        }

        return errors;
    };

    const handleProximo = () => {
        const errors = validarEtapa(etapaAtual);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            Toast.fire({ 
                icon: 'error', 
                title: 'Campos obrigatórios não preenchidos',
                text: 'Por favor, preencha todos os campos obrigatórios marcados com *'
            });
            // Scroll para o topo para ver os erros
            document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        // Limpar erros ao avançar
        setFieldErrors({});
        setEtapaAtual((prev) => Math.min(prev + 1, 6));
        // Scroll para o topo ao mudar de etapa para UX melhor
        document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleVoltar = () => {
        setEtapaAtual((prev) => Math.max(prev - 1, 1));
    };

    const buildPayloadData = (data) => {
        // Transformar dados do formulário para o formato esperado pela API
        
        // 1. Construir objeto address
        const address = {
            id: data.address?.id || 0,
            houseNumber: data.houseNumber || "",
            district: data.district || "",
            city: data.city || "",
            state: data.state || "",
            street: data.street || "",
            cep: data.cep || "",
            referenceHouse: data.referenceHouse || "",
            complement: data.complement || ""
        };

        // 2. Construir objeto unit
        // Se unit for string (nome da unidade), precisamos converter para objeto
        // Por enquanto, assumindo que unit pode ser string ou objeto
        let unit = { id: 0, surname: "", score: 0 };
        if (data.unit) {
            if (typeof data.unit === 'string') {
                // Se for string, usar como surname
                unit = {
                    id: data.unitId || 0,
                    surname: data.unit,
                    score: data.unitScore || 0
                };
            } else if (typeof data.unit === 'object') {
                unit = {
                    id: data.unit.id || 0,
                    surname: data.unit.surname || data.unit || "",
                    score: data.unit.score || 0
                };
            }
        }

        // 3. Consolidar medicalData
        // Mover campos de sickness para dentro de medicalData
        const sickness = data.sickness || {};
        const medicalAnswers = data.medicalAnswers || [];
        
        // Extrair dados médicos dos medicalAnswers e campos diretos
        const medicalData = {
            cpf: data.cpf || "",
            cns: data.cns || "",
            agreement: data.agreement || "",
            bloodType: data.blood_type || "",
            // Doenças (sickness) - garantir boolean
            catapora: Boolean(sickness.catapora),
            meningite: Boolean(sickness.meningite),
            hepatite: Boolean(sickness.hepatite),
            dengue: Boolean(sickness.dengue),
            pneumonia: Boolean(sickness.pneumonia),
            malaria: Boolean(sickness.malaria),
            febreAmarela: Boolean(sickness.febreAmarela),
            sarampo: Boolean(sickness.sarampo),
            tetano: Boolean(sickness.tetano),
            variola: Boolean(sickness.variola),
            coqueluche: Boolean(sickness.coqueluche),
            difteria: Boolean(sickness.difteria),
            rinite: Boolean(sickness.rinite),
            bronquite: Boolean(sickness.bronquite),
            asma: Boolean(sickness.asma),
            rubeola: Boolean(sickness.rubeola),
            colera: Boolean(sickness.colera),
            covid19: Boolean(sickness.covid19),
            h1n1: Boolean(sickness.h1n1),
            caxumba: Boolean(sickness.caxumba),
            others: sickness.others || "",
            // Campos médicos das perguntas
            heartProblems: medicalAnswers[0]?.value === true ? (medicalAnswers[0]?.description || medicalAnswers[0]?.extra || "") : (data.heartProblems || ""),
            drugAllergy: medicalAnswers[1]?.value === true ? (medicalAnswers[1]?.description || medicalAnswers[1]?.extra || "") : (data.drugAllergy || ""),
            lactoseAllergy: Boolean(medicalAnswers[2]?.value === true || data.lactoseAllergy),
            deficiency: medicalAnswers[3]?.value === true ? (medicalAnswers[3]?.description || medicalAnswers[3]?.extra || "") : (data.deficiency || ""),
            bloodTransfusion: Boolean(medicalAnswers[4]?.value === true || data.bloodTransfusion),
            skinAllergy: Boolean(medicalAnswers[5]?.value === true || data.skinAllergy),
            skinAllergyMedications: medicalAnswers[5]?.value === true ? (medicalAnswers[5]?.description || medicalAnswers[5]?.extra || "") : (data.skinAllergyMedications || ""),
            faintingOrConvulsion: Boolean(medicalAnswers[6]?.value === true || data.faintingOrConvulsion),
            faintingOrSeizuresMedications: medicalAnswers[6]?.value === true ? (medicalAnswers[6]?.description || medicalAnswers[6]?.extra || "") : (data.faintingOrSeizuresMedications || ""),
            psychologicalDisorder: medicalAnswers[7]?.value === true ? (medicalAnswers[7]?.description || medicalAnswers[7]?.extra || "") : (data.psychologicalDisorder || ""),
            allergy: Boolean(medicalAnswers[8]?.value === true || data.allergy),
            allergyMedications: medicalAnswers[8]?.value === true ? (medicalAnswers[8]?.description || medicalAnswers[8]?.extra || "") : (data.allergyMedications || ""),
            diabetic: Boolean(medicalAnswers[9]?.value === true || data.diabetic),
            diabeticMedications: medicalAnswers[9]?.value === true ? (medicalAnswers[9]?.description || medicalAnswers[9]?.extra || "") : (data.diabeticMedications || ""),
            recentSeriousInjury: Boolean(medicalAnswers[10]?.value === true || data.recentSeriousInjury),
            recentFracture: medicalAnswers[11]?.value === true ? (medicalAnswers[11]?.description || medicalAnswers[11]?.extra || "") : (data.recentFracture || ""),
            surgeries: medicalAnswers[12]?.value === true ? (medicalAnswers[12]?.description || medicalAnswers[12]?.extra || "") : (data.surgeries || ""),
            hospitalizationReasonLast5Years: medicalAnswers[13]?.value === true ? (medicalAnswers[13]?.description || medicalAnswers[13]?.extra || "") : (data.hospitalizationReasonLast5Years || "")
        };

        // 4. Converter isBaptized para boolean
        let isBaptized = false;
        if (data.isBaptized === true || data.isBaptized === "true" || String(data.isBaptized).toLowerCase() === "true") {
            isBaptized = true;
        }

        // 5. Construir payload final no formato esperado pela API
        const payload = {
            cpf: data.cpf || "",
            // image: data.image || "",
            // imageFormat: data.imageFormat || "", //todo!: NECESSARIO APLICAR LOGICA PARA ATUALIZAÇÃOD E IMAGEM VIA FORM-DATA
            username: data.username || "",
            birthDate: data.birthDate || "",
            sex: data.sex || "",
            birthCertificate: data.birthCertificate || "",
            tshirtSize: data.tshirtSize || "",
            isBaptized: isBaptized,
            contact: (data.contact || "").replace(/\D/g, ""),
            issuingAuthority: data.issuingAuthority || "",
            // unit: unit,
            unitName: unit.surname || "",
            unitRole: data.unitRole || "",
            classCategory: data.classCategory || "",
            classRole: data.classRole || "",
            fatherName: data.fatherName || "",
            fatherContact: (data.fatherContact || "").replace(/\D/g, ""),
            fatherEmail: data.fatherEmail || "",
            motherName: data.motherName || "",
            motherContact: (data.motherContact || "").replace(/\D/g, ""),
            motherEmail: data.motherEmail || "",
            responsibleName: data.responsibleName || "",
            responsibleContact: (data.responsibleContact || "").replace(/\D/g, ""),
            responsibleEmail: data.responsibleEmail || "",
            address: address,
            medicalData: medicalData,
            acceptTerms: data.acceptTerms || false,
        };

        console.log("[buildPayloadData] Payload construído:", payload);

        return payload;
    };

    const buildFormData = (data) => {
        const form = new FormData();

        console.log("[buildFormData] Dados recebidos:", data);
        
        // Transformar dados para o formato esperado pela API
        const payloadData = buildPayloadData(data);
        
        console.log("[buildFormData] Payload transformado:", payloadData);
        
        // Processar imagem separadamente
        let imageFile = null;
        if (data.imageFile && data.imageFile instanceof File) {
            imageFile = data.imageFile;
        } else if (data.image && typeof data.image === 'string' && data.image.trim()) {
            // Se for base64 string, converter para Blob
            try {
                const base64Data = data.image.includes(',') ? data.image.split(',')[1] : data.image;
                const mimeType = data.imageFormat || 'image/jpeg';
                const byteCharacters = atob(base64Data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                imageFile = new Blob([byteArray], { type: mimeType });
            } catch (e) {
                console.warn('Erro ao converter base64 para Blob:', e);
            }
        }

        // Adicionar arquivo se existir
        if (imageFile) {
            form.append('file', imageFile);
        }

        // Adicionar objeto de dados como string JSON no campo 'data'
        form.append('data', JSON.stringify(payloadData));
        
        console.log("[buildFormData] Objeto de dados a ser enviado:", payloadData);
        
        return form;
    };

    const handleEnviar = async () => {
        // Validar todas as etapas antes de enviar
        const allErrors = {};
        let firstErrorStep = 6;
        for (let i = 1; i <= 6; i++) {
            const errors = validarEtapa(i);
            if (Object.keys(errors).length > 0) {
                Object.assign(allErrors, errors);
                if (firstErrorStep === 6) firstErrorStep = i;
            }
        }

        if (Object.keys(allErrors).length > 0) {
            setFieldErrors(allErrors);
            Toast.fire({ 
                icon: 'error', 
                title: 'Campos obrigatórios não preenchidos',
                text: 'Por favor, preencha todos os campos obrigatórios marcados com *'
            });
            // Ir para a primeira etapa com erro
            setEtapaAtual(firstErrorStep);
            document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        // Limpar erros antes de enviar
        setFieldErrors({});

        setLoading(true);
        try {
            const form = buildFormData(formDados);
            console.log("MEMBER DATA:", form);
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
                // Redirecionar para /admin após cadastro
                if (!editMode) {
                    setTimeout(() => navigate("/admin"), 1200);
                }
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
                        
                        {/* Passamos os ESTILOS e ERROS via props para os filhos */}
                        {etapaAtual === 1 && <PersonalData dados={formDados} setDados={atualizarDadosEtapa} styles={uiStyles} errors={fieldErrors} setErrors={setFieldErrors} />}
                        {etapaAtual === 2 && <Address dados={formDados} setDados={atualizarDadosEtapa} styles={uiStyles} errors={fieldErrors} setErrors={setFieldErrors} />}
                        {etapaAtual === 3 && <Sickness dados={formDados} setDados={atualizarDadosEtapa} styles={uiStyles} errors={fieldErrors} setErrors={setFieldErrors} />}
                        {etapaAtual === 4 && <MedicalData dados={formDados} setDados={atualizarDadosEtapa} styles={uiStyles} errors={fieldErrors} setErrors={setFieldErrors} />}
                        {etapaAtual === 5 && <MemberGuardian dados={formDados} setDados={atualizarDadosEtapa} styles={uiStyles} errors={fieldErrors} setErrors={setFieldErrors} />}
                        {etapaAtual === 6 && <InternData dados={formDados} setDados={atualizarDadosEtapa} styles={uiStyles} errors={fieldErrors} setErrors={setFieldErrors} />}
                    
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

function normalizeMemberToForm(member) {
    if (!member) return {};

	console.log("Normalizando membro:", member);

    // Endereço
    const address = member.address || {};
    // Dados médicos
    const medical = member.medicalData || {};

    // Sickness (doenças)
    const sickness = {
        catapora: medical.catapora ?? false,
        meningite: medical.meningite ?? false,
        hepatite: medical.hepatite ?? false,
        dengue: medical.dengue ?? false,
        pneumonia: medical.pneumonia ?? false,
        malaria: medical.malaria ?? false,
        febreAmarela: medical.febreAmarela ?? false,
        sarampo: medical.sarampo ?? false,
        tetano: medical.tetano ?? false,
        variola: medical.variola ?? false,
        coqueluche: medical.coqueluche ?? false,
        difteria: medical.difteria ?? false,
        rinite: medical.rinite ?? false,
        bronquite: medical.bronquite ?? false,
        asma: medical.asma ?? false,
        rubeola: medical.rubeola ?? false,
        colera: medical.colera ?? false,
        covid19: medical.covid19 ?? false,
        h1n1: medical.h1n1 ?? false,
        caxumba: medical.caxumba ?? false,
        others: medical.others ?? "",
    };

    // MedicalAnswers (para perguntas extras)
    const medicalAnswers = [
        { value: !!medical.heartProblems, extra: medical.heartProblems || "" },
        { value: !!medical.drugAllergy, extra: medical.drugAllergy || "" },
        { value: !!medical.lactoseAllergy, extra: medical.lactoseAllergy || "" },
        { value: !!medical.deficiency, extra: medical.deficiency || "" },
        { value: !!medical.bloodTransfusion, extra: medical.bloodTransfusion || "" },
        { value: !!medical.skinAllergy, extra: medical.skinAllergyMedications || "" },
        { value: !!medical.faintingOrConvulsion, extra: medical.faintingOrSeizuresMedications || "" },
        { value: !!medical.psychologicalDisorder, extra: medical.psychologicalDisorder || "" },
        { value: !!medical.allergy, extra: medical.allergyMedications || "" },
        { value: !!medical.diabetic, extra: medical.diabeticMedications || "" },
        { value: !!medical.recentSeriousInjury, extra: medical.recentSeriousInjury || "" },
        { value: !!medical.recentFracture, extra: medical.recentFracture || "" },
        { value: !!medical.surgeries, extra: medical.surgeries || "" },
        { value: !!medical.hospitalizationReasonLast5Years, extra: medical.hospitalizationReasonLast5Years || "" },
    ];

    // FOTO: só gera a URL se houver idImage
    let foto = null;
    console.log(member.image, "aaaaa")
        console.log(member.image.image, "bbb")
    if (member.image && typeof member.image === "string" && member.image.trim() !== "") {
        foto = `data:${member.imageFormat};base64,${member.image}`;
    }

    const normalizedMember = {
        idImage: member.idImage || "",
        imagePath: member.imagePath || "",
        username: member.username || "",
        birthCertificate: member.birthCertificate || "",
        cpf: member.cpf || "",
        issuingAuthority: member.issuingAuthority || "",
        contact: member.contact || "",
        birthDate: member.birthDate ? member.birthDate.slice(0, 10) : "",
        sex: member.sex || "",
        tshirtSize: member.tshirtSize || "",
        isBaptized: member.isBaptized ? "true" : "false",
        cep: address.cep || "",
        houseNumber: address.houseNumber || "",
        street: address.street || "",
        district: address.district || "",
        city: address.city || "",
        state: address.state || "",
        complement: address.complement || "",
        sickness,
        medicalAnswers,
        heartProblems: medical.heartProblems || "",
        drugAllergy: medical.drugAllergy || "",
        lactoseAllergy: medical.lactoseAllergy ?? false,
        deficiency: medical.deficiency || "",
        bloodTransfusion: medical.bloodTransfusion ?? false,
        skinAllergy: medical.skinAllergy ?? false,
        skinAllergyMedications: medical.skinAllergyMedications || "",
        faintingOrConvulsion: medical.faintingOrConvulsion ?? false,
        faintingOrSeizuresMedications: medical.faintingOrSeizuresMedications || "",
        psychologicalDisorder: medical.psychologicalDisorder || "",
        allergy: medical.allergy ?? false,
        allergyMedications: medical.allergyMedications || "",
        diabetic: medical.diabetic ?? false,
        diabeticMedications: medical.diabeticMedications || "",
        recentSeriousInjury: medical.recentSeriousInjury ?? false,
        recentFracture: medical.recentFracture || "",
        surgeries: medical.surgeries || "",
        hospitalizationReasonLast5Years: medical.hospitalizationReasonLast5Years || "",
        blood_type: medical.bloodType || "",
        cns: medical.cns || "",
        agreement: medical.agreement || "",
        fatherName: member.fatherName || "",
        fatherEmail: member.fatherEmail || "",
        fatherContact: member.fatherContact || "",
        motherName: member.motherName || "",
        motherEmail: member.motherEmail || "",
        motherContact: member.motherContact || "",
        responsibleName: member.responsibleName || "",
        responsibleEmail: member.responsibleEmail || "",
        responsibleContact: member.responsibleContact || "",
        unitRole: member.unitRole || "",
        classCategory: member.classCategory || "",
        classRole: member.classRole || "",
        foto, // agora é null ou a URL correta
        unit: member.unit?.id ?? "",
        unitSurname: member.unit?.surname ?? "",
    };
	console.log("Membro normalizado:", normalizedMember);

	return normalizedMember;
}

function initializeMemberDefaults(data = {}) {
    const defaultSickness = {
        catapora: false, meningite: false, hepatite: false, dengue: false,
        pneumonia: false, malaria: false, febreAmarela: false, sarampo: false,
        tetano: false, variola: false, coqueluche: false, difteria: false,
        rinite: false, bronquite: false, asma: false, rubeola: false,
        colera: false, covid19: false, h1n1: false, caxumba: false,
        others: "",
    };

    const defaultMedical = {
        heartProblems: "",
        drugAllergy: "",
        lactoseAllergy: false,
        deficiency: "",
        bloodTransfusion: false,
        skinAllergy: false,
        skinAllergyMedications: "",
        faintingOrConvulsion: false,
        faintingOrSeizuresMedications: "",
        psychologicalDisorder: "",
        allergy: false,
        allergyMedications: "",
        diabetic: false,
        diabeticMedications: "",
        recentSeriousInjury: false,
        recentFracture: "",
        surgeries: "",
        hospitalizationReasonLast5Years: "",
    };

    const defaultMedicalAnswers = Array(14).fill(0).map(() => ({ value: false, extra: "" }));

    return {
        ...defaultMedical,
        ...data,
        sickness: { ...defaultSickness, ...(data.sickness || {}) },
        medicalAnswers: data.medicalAnswers || defaultMedicalAnswers,
    };
}