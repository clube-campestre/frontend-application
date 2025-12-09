import React from "react";
import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";
import { maskCpf, maskBirthCertificate, maskPhone } from "../../../../utils/validators/addMemberValidator";

// AJUSTE DE UI/UX:
// 1. Removi 'h-12' e bordas manuais, pois seu AddMemberInput já parece ter estilos internos.
// 2. Aumentei o 'gap-y' para 6 (24px) para dar respiro vertical no mobile.
// 3. Mantive w-full para garantir alinhamento.
const uiStyles = {
    gridContainer: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-6 w-full pb-4",
    // Apenas largura total. Se precisar de altura mínima, use min-h. 
    // Removemos bordas e cores daqui para não duplicar com seu componente.
    inputWrapper: "w-full min-w-0", 
    sectionTitle: "col-span-full text-xl font-bold text-gray-800 border-l-4 border-amber-400 pl-3 mb-4 mt-2",
};

function PersonalData({ dados, setDados, errors = {}, setErrors }) {
    const handleChange = (field, value) => {
        setDados({ ...dados, [field]: value });
        // Limpar erro ao digitar
        if (errors[field] && setErrors) {
            const newErrors = { ...errors };
            delete newErrors[field];
            setErrors(newErrors);
        }
    };

    return (
        <div className="w-full animate-fade-in">
            {/* Grid Principal */}
            <div className={uiStyles.gridContainer}>
                
                {/* Título da Seção */}
                <div className="col-span-full">
                    <h2 className={uiStyles.sectionTitle}>
                        Dados Pessoais
                    </h2>
                </div>

                {/* --- LINHA 1 --- */}
                {/* Nome Completo */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4">
                    <AddMemberInput
                        id="username"
                        type="text"
                        label="Nome Completo"
                        value={dados.username || ""}
                        onChange={(e) => handleChange("username", e.target.value)}
                        required={true}
                        error={errors.username}
                        className={uiStyles.inputWrapper}
                    />
                </div>

                {/* Certidão */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    <AddMemberInput
                        id="birthCertificate"
                        type="text"
                        label="Certidão de Nascimento"
                        value={maskBirthCertificate(dados.birthCertificate || "")}
                        onChange={(e) => {
                            const raw = e.target.value
                                .replace(/[^a-zA-Z0-9]/g, "")
                                .toUpperCase()
                                .slice(0, 32);
                            handleChange("birthCertificate", raw);
                        }}
                        required={true}
                        error={errors.birthCertificate}
                        className={uiStyles.inputWrapper}
                    />
                </div>

                {/* --- LINHA 2 --- */}
                {/* CPF */}
                <div className="col-span-1 md:col-span-1 lg:col-span-3">
                    <AddMemberInput
                        id="cpf"
                        type="text"
                        label="CPF"
                        value={maskCpf(dados.cpf || "")}
                        onChange={(e) =>
                            handleChange("cpf", e.target.value.replace(/\D/g, ""))
                        }
                        required={true}
                        error={errors.cpf}
                        className={uiStyles.inputWrapper}
                    />
                </div>

                {/* Órgão Expedidor */}
                <div className="col-span-1 md:col-span-1 lg:col-span-3">
                    <AddMemberInput
                        id="issuingAuthority"
                        type="text"
                        label="Órgão Expedidor"
                        value={dados.issuingAuthority || ""}
                        onChange={(e) =>
                            handleChange("issuingAuthority", e.target.value)
                        }
                        required={true}
                        error={errors.issuingAuthority}
                        className={uiStyles.inputWrapper}
                    />
                </div>

                {/* --- LINHA 3 --- */}
                {/* Data de Nascimento */}
                <div className="col-span-1 md:col-span-1 lg:col-span-3">
                    <AddMemberInput
                        id="birthDate"
                        type="date"
                        label="Data de Nascimento"
                        value={
                            typeof dados.birthDate === "string"
                                ? dados.birthDate.split("T")[0]
                                : dados.birthDate instanceof Date
                                ? dados.birthDate.toISOString().split("T")[0]
                                : ""
                        }
                        onChange={(e) => handleChange("birthDate", e.target.value)}
                        required={true}
                        error={errors.birthDate}
                        className={uiStyles.inputWrapper}
                    />
                </div>

                {/* Contato */}
                <div className="col-span-1 md:col-span-1 lg:col-span-3">
                    <AddMemberInput
                        id="contact"
                        type="text"
                        label="Contato (Celular)"
                        value={maskPhone(dados.contact || "")}
                        onChange={(e) =>
                            handleChange("contact", e.target.value.replace(/\D/g, ""))
                        }
                        required={true}
                        error={errors.contact}
                        className={uiStyles.inputWrapper}
                    />
                </div>

                {/* --- LINHA 4 (Selects) --- */}
                {/* Sexo */}
                <div className="col-span-1 md:col-span-1 lg:col-span-2">
                    <AddMemberInput
                        id="sex"
                        type="select"
                        label="Sexo"
                        options={[
                            { value: "", label: "Selecione..." },
                            { value: "MASCULINO", label: "Masculino" },
                            { value: "FEMININO", label: "Feminino" },
                            { value: "OUTRO", label: "Outro" },
                        ]}
                        value={dados.sex || ""}
                        onChange={(e) => handleChange("sex", e.target.value)}
                        required={true}
                        error={errors.sex}
                        className={uiStyles.inputWrapper}
                    />
                </div>

                {/* Tamanho Camiseta */}
                <div className="col-span-1 md:col-span-1 lg:col-span-2">
                    <AddMemberInput
                        id="tshirtSize"
                        type="select"
                        label="Camiseta"
                        options={[
                            { value: "", label: "Selecione..." },
                            { value: "PP", label: "PP" },
                            { value: "P", label: "P" },
                            { value: "M", label: "M" },
                            { value: "G", label: "G" },
                            { value: "GG", label: "GG" },
                            { value: "XG", label: "XG" },
                        ]}
                        value={dados.tshirtSize || ""}
                        onChange={(e) => handleChange("tshirtSize", e.target.value)}
                        required={true}
                        error={errors.tshirtSize}
                        className={uiStyles.inputWrapper}
                    />
                </div>

                {/* Batizado */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    <AddMemberInput
                        id="isBaptized"
                        type="select"
                        label="Batizado?"
                        options={[
                            { value: "", label: "Selecione..." },
                            { value: true, label: "Sim" },
                            { value: false, label: "Não" },
                        ]}
                        value={dados.isBaptized}
                        onChange={(e) =>
                            handleChange("isBaptized", e.target.value)
                        }
                        required={true}
                        error={errors.isBaptized}
                        className={uiStyles.inputWrapper}
                    />
                </div>

            </div>
        </div>
    );
}

export default PersonalData;