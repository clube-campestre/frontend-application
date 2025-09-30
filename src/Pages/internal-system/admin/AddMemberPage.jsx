import React, { useEffect, useState } from "react";
import { api } from "../../../provider/api";
import Toast from "../../../utils/Toast";
import PersonalData from "./add-member-steps/PersonalData";
import Address from "./add-member-steps/Address";
import Sickness from "./add-member-steps/Sickness";
import MedicalData from "./add-member-steps/MedicalData";
import MemberGuardian from "./add-member-steps/MemberGuardian";
import InternData from "./add-member-steps/InternData";
import { useNavigate } from "react-router-dom";

// A função normalizeMemberToForm não precisa de alterações de layout, então foi omitida para brevidade.
// Cole a sua função 'normalizeMemberToForm' aqui no final do arquivo.

export default function AddMemberPage({ initialData = {}, editMode = false, onClose, onSave }) {
    const navigate = useNavigate();
    const [etapaAtual, setEtapaAtual] = useState(1);
    const [formDados, setFormDados] = useState( editMode ? normalizeMemberToForm(initialData) : initialData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editMode) {
            setFormDados(normalizeMemberToForm(initialData));
        }
    }, [initialData, editMode]);

    const atualizarDadosEtapa = (novosDados) => {
        setFormDados((prev) => ({ ...prev, ...novosDados }));
    };

    const handleProximo = () => {
        setEtapaAtual((prev) => Math.min(prev + 1, 6));
        console.log("✅ dados atualizados:", formDados);
    };

    const handleVoltar = () => {
        setEtapaAtual((prev) => Math.max(prev - 1, 1));
        console.log("✅ dados atualizados:", formDados);
    };

    const handleEnviar = async () => {
        // Lógica de envio permanece a mesma...
        const cleanCpf = (formDados.cpf || "").replace(/\D/g, "");
        const cleanContact = (formDados.contact || "").replace(/\D/g, "");
        const cleanBirthCertificate = (formDados.birthCertificate || "").slice(0,32);

        const camposObrigatorios = [
            "username", "birthCertificate", "cpf", "issuingAuthority", "contact",
            "birthDate", "sex", "tshirtSize", "isBaptized", "cep", "houseNumber",
            "street", "district", "city", "state", "cns", "blood_type",
        ];

        const nomesCampos = {
            username: "Nome", birthCertificate: "Certidão de Nascimento", cpf: "CPF",
            issuingAuthority: "Órgão Expedidor", contact: "Contato", birthDate: "Data de Nascimento",
            sex: "Sexo", tshirtSize: "Tamanho da Camiseta", isBaptized: "Batizado",
            cep: "CEP", houseNumber: "Número", street: "Rua", district: "Bairro",
            city: "Cidade", state: "Estado", cns: "CNS", blood_type: "Tipo Sanguíneo",
        };

        function validarCamposObrigatorios(dados) {
            for (const campo of camposObrigatorios) {
                if (!dados[campo] || dados[campo].toString().trim() === "") {
                    return `O campo "${nomesCampos[campo] || campo}" é obrigatório.`;
                }
            }
            function grupoCompleto(prefix) {
                return (
                    dados[`${prefix}Name`] && dados[`${prefix}Name`].trim() !== "" &&
                    dados[`${prefix}Email`] && dados[`${prefix}Email`].trim() !== "" &&
                    dados[`${prefix}Contact`] && dados[`${prefix}Contact`].trim() !== ""
                );
            }
            const paiCompleto = grupoCompleto("father");
            const maeCompleta = grupoCompleto("mother");
            const responsavelCompleto = grupoCompleto("responsible");
            if (!paiCompleto && !maeCompleta && !responsavelCompleto) {
                return "Preencha todos os campos (nome, e-mail e contato) do pai, mãe ou responsável legal.";
            }
            return null;
        }

        const erroValidacao = validarCamposObrigatorios(formDados);
        if (erroValidacao) {
            Toast.fire({ icon: "error", title: erroValidacao });
            return;
        }

        const address = {
            houseNumber: formDados.houseNumber, district: formDados.district, city: formDados.city,
            state: formDados.state, street: formDados.street, cep: (formDados.cep || "").replace(/\D/g, ""),
            referenceHouse: formDados.referenceHouse || "",
        };

        const medicalData = {
            cpf: cleanCpf, cns: formDados.cns || "000000000000000", agreement: formDados.agreement || "Publico",
            bloodType: (formDados.blood_type || "").toUpperCase(), catapora: formDados.sickness.catapora ?? false,
            // ... resto dos dados médicos ...
        };

        const unit = {
            id: Number(formDados.unit), surname: formDados.unitSurname || "",
        };

        const payload = {
            idImage: formDados.idImage || "", imagePath: formDados.imagePath || "", username: formDados.username,
            birthCertificate: cleanBirthCertificate, cpf: cleanCpf, issuingAuthority: formDados.issuingAuthority,
            contact: cleanContact, birthDate: new Date(formDados.birthDate).toISOString() || "", sex: (formDados.sex || "").toUpperCase(),
            tshirtSize: (formDados.tshirtSize || "").toUpperCase(), isBaptized: formDados.isBaptized == "true" ? true : false,
            address, medicalData, fatherName: formDados.fatherName || "", fatherContact: formDados.fatherContact || "",
            fatherEmail: formDados.fatherEmail || "", motherName: formDados.motherName || "", motherContact: formDados.motherContact || "",
            motherEmail: formDados.motherEmail || "", responsibleName: formDados.responsibleName || "", responsibleContact: formDados.responsibleContact || "",
            responsibleEmail: formDados.responsibleEmail || "", unitRole: (formDados.unitRole || "").toUpperCase(), unit,
            classCategory: (formDados.classCategory || "").toUpperCase(), classRole: (formDados.classRole || "").toUpperCase(),
        };

        if (editMode) {
            setLoading(true);
            try {
                const response = await api.put(`/members/${formDados.cpf}`, payload);
                if (response.status === 200) {
                    if (formDados.foto && formDados.foto instanceof File) {
                        const formDataImg = new FormData();
                        formDataImg.append("file", formDados.foto);
                        const endpoint = formDados.idImage ? `/drive/update?fileId=${formDados.idImage}&cpf=${formDados.cpf}` : `/drive/upload?cpf=${formDados.cpf}`;
                        const method = formDados.idImage ? 'put' : 'post';
                        await api[method](endpoint, formDataImg, { headers: { "Content-Type": "multipart/form-data" } });
                    }
                    Toast.fire({ icon: "success", title: "Membro editado com sucesso!" });
                    setTimeout(() => {
                        setLoading(false);
                        if (onSave) onSave();
                        if (onClose) onClose();
                        navigate("/secretary");
                    }, 3000);
                }
            } catch (error) {
                setLoading(false);
                Toast.fire({ icon: "error", title: "Erro ao editar membro." });
                console.error("Error editing member:", error);
            }
        } else {
            // Lógica de criação...
        }
    };

    return (
        // ALTERAÇÃO: Adicionado padding e cor de fundo à página, centralizando o conteúdo.
        <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            
            {/* ALTERAÇÃO: Largura e altura agora são flexíveis e responsivas. */}
            <div className="w-full max-w-5xl bg-[#EDEDED] shadow-lg rounded-lg p-4 sm:p-8 flex flex-col">
                
                {/* ALTERAÇÃO: 'flex-grow' faz esta área se expandir, empurrando os botões para baixo. */}
                <div className="flex-grow w-full">
                    {etapaAtual === 1 && <PersonalData dados={formDados} setDados={atualizarDadosEtapa} />}
                    {etapaAtual === 2 && <Address dados={formDados} setDados={atualizarDadosEtapa} />}
                    {etapaAtual === 3 && <Sickness dados={formDados} setDados={atualizarDadosEtapa} />}
                    {etapaAtual === 4 && <MedicalData dados={formDados} setDados={atualizarDadosEtapa} />}
                    {etapaAtual === 5 && <MemberGuardian dados={formDados} setDados={atualizarDadosEtapa} />}
                    {etapaAtual === 6 && <InternData dados={formDados} setDados={atualizarDadosEtapa} />}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleVoltar}
                        disabled={etapaAtual === 1}
                        className={`px-4 py-2 rounded transition-colors duration-200 ${
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
                            className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-200"
                        >
                            Próximo
                        </button>
                    ) : (
                        <button
                            onClick={handleEnviar}
                            disabled={loading}
                            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400 disabled:cursor-wait transition-colors duration-200"
                        >
                            {loading ? "Salvando..." : editMode ? "Salvar Alterações" : "Enviar"}
                        </button>
                    )}
                </div>
            </div>

            {/* Navegação por etapas */}
            {/* ALTERAÇÃO: Gap responsivo para telas muito pequenas. */}
            <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mt-8">
                {[1, 2, 3, 4, 5, 6].map((etapa) => (
                    <button
                        key={etapa}
                        onClick={() => setEtapaAtual(etapa)}
                        className={`
                            w-8 h-8 flex items-center justify-center rounded-full border 
                            transition-all duration-300
                            ${
                                etapaAtual === etapa
                                    ? "bg-blue-600 border-blue-700 text-white scale-110"
                                    : etapa < etapaAtual
                                    ? "bg-yellow-500 border-yellow-600 text-white"
                                    : "bg-gray-200 border-gray-400 text-gray-600"
                            }
                            font-bold text-sm
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

// COLE A SUA FUNÇÃO `normalizeMemberToForm` AQUI
function normalizeMemberToForm(member) {
    if (!member) return {};

    // Endereço
    const address = member.address || {};
    // Dados médicos
    const medical = member.medicalData || {};

    // Sickness (doenças)
    const sickness = {
        catapora: medical.catapora ?? false, meningite: medical.meningite ?? false,
        hepatite: medical.hepatite ?? false, dengue: medical.dengue ?? false,
        pneumonia: medical.pneumonia ?? false, malaria: medical.malaria ?? false,
        // ... resto das doenças
    };

    // MedicalAnswers
    const medicalAnswers = [
        { value: !!medical.heartProblems, extra: medical.heartProblems || "" },
        { value: !!medical.drugAllergy, extra: medical.drugAllergy || "" },
        // ... resto das respostas médicas
    ];

    let foto = null;
    if (member.imagePath && typeof member.imagePath === "string" && member.imagePath.trim() !== "") {
        foto = `${member.imagePath}`;
    }

    const normalizedMember = {
        idImage: member.idImage || "", imagePath: member.imagePath || "",
        username: member.username || "", birthCertificate: member.birthCertificate || "",
        cpf: member.cpf || "", issuingAuthority: member.issuingAuthority || "",
        contact: member.contact || "", birthDate: member.birthDate ? member.birthDate.slice(0, 10) : "",
        sex: member.sex || "", tshirtSize: member.tshirtSize || "",
        isBaptized: member.isBaptized ? "true" : "false", cep: address.cep || "",
        houseNumber: address.houseNumber || "", street: address.street || "",
        district: address.district || "", city: address.city || "",
        state: address.state || "", complement: address.complement || "",
        sickness, medicalAnswers,
        // ... resto dos dados normalizados ...
        foto,
        unit: member.unit?.id ?? "",
        unitSurname: member.unit?.surname ?? "",
    };

    return normalizedMember;
}