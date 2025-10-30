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

const formData = new FormData();

export default function AddMemberPage({ initialData = {}, editMode = false, onClose, onSave }) {
    const navigate = useNavigate(); // Adicione este hook
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

    // const handleEnviar = async () => {
    //     const cleanCpf = (formDados.cpf || "").replace(/\D/g, "");
    //     const cleanContact = (formDados.contact || "").replace(/\D/g, "");
    //     const cleanBirthCertificate = (formDados.birthCertificate || "").slice(0,32);


	// 	const camposObrigatorios = [
	// 		"username",
	// 		"birthCertificate",
	// 		"cpf",
	// 		"issuingAuthority",
	// 		"contact",
	// 		"birthDate",
	// 		"sex",
	// 		"tshirtSize",
	// 		"isBaptized",
	// 		"cep",
	// 		"houseNumber",
	// 		"street",
	// 		"district",
	// 		"city",
	// 		"state",
	// 		"cns",
	// 		"blood_type",
	// 	];

	// 	// Tradução dos campos para mensagens amigáveis
	// 	const nomesCampos = {
	// 		username: "Nome",
	// 		birthCertificate: "Certidão de Nascimento",
	// 		cpf: "CPF",
	// 		issuingAuthority: "Órgão Expedidor",
	// 		contact: "Contato",
	// 		birthDate: "Data de Nascimento",
	// 		sex: "Sexo",
	// 		tshirtSize: "Tamanho da Camiseta",
	// 		isBaptized: "Batizado",
	// 		cep: "CEP",
	// 		houseNumber: "Número",
	// 		street: "Rua",
	// 		district: "Bairro",
	// 		city: "Cidade",
	// 		state: "Estado",
	// 		cns: "CNS",
	// 		blood_type: "Tipo Sanguíneo",
	// 	};

	// 	function validarCamposObrigatorios(dados) {
	// 		for (const campo of camposObrigatorios) {
	// 			if (!dados[campo] || dados[campo].toString().trim() === "") {
	// 				return `O campo "${nomesCampos[campo] || campo}" é obrigatório.`;
	// 			}
	// 		}

	// 		// Função auxiliar para checar se todos os campos de um grupo estão preenchidos
	// 		function grupoCompleto(prefix) {
	// 			return (
	// 				dados[`${prefix}Name`] && dados[`${prefix}Name`].trim() !== "" &&
	// 				dados[`${prefix}Email`] && dados[`${prefix}Email`].trim() !== "" &&
	// 				dados[`${prefix}Contact`] && dados[`${prefix}Contact`].trim() !== ""
	// 			);
	// 		}

	// 		const paiCompleto = grupoCompleto("father");
	// 		const maeCompleta = grupoCompleto("mother");
	// 		const responsavelCompleto = grupoCompleto("responsible");

	// 		if (!paiCompleto && !maeCompleta && !responsavelCompleto) {
	// 			return "Preencha todos os campos (nome, e-mail e contato) do pai, mãe ou responsável legal.";
	// 		}

	// 		return null; // Tudo ok
	// 	}

	// 	// No handleEnviar, antes de enviar:
	// 	const erroValidacao = validarCamposObrigatorios(formDados);
	// 	if (erroValidacao) {
	// 		Toast.fire({
	// 			icon: "error",
	// 			title: erroValidacao,
	// 		});
	// 		return;
	// 	}

    //     // Monta o objeto address conforme SaveAddressRequestDto
    //     const address = {
    //         houseNumber: formDados.houseNumber,
    //         district: formDados.district,
    //         city: formDados.city,
    //         state: formDados.state,
    //         street: formDados.street,
    //         cep: (formDados.cep || "").replace(/\D/g, ""),
    //         referenceHouse: formDados.referenceHouse || "",
    //     };

    //     // Monta o objeto medicalData conforme SaveMedicalDataRequestDto
    //     const medicalData = {
    //         cpf: cleanCpf,
    //         cns: formDados.cns || "000000000000000", // valor default se não preenchido
    //         agreement: formDados.agreement || "Publico", // valor default se não preenchido
    //         bloodType: (formDados.blood_type || "").toUpperCase(),
    //         catapora: formDados.sickness.catapora ?? false,
    //         meningite: formDados.sickness.meningite ?? false,
    //         hepatite: formDados.sickness.hepatite ?? false,
    //         dengue: formDados.sickness.dengue ?? false,
    //         pneumonia: formDados.sickness.pneumonia ?? false,
    //         malaria: formDados.sickness.malaria ?? false,
    //         febreAmarela: formDados.sickness.febreAmarela ?? false,
    //         sarampo: formDados.sickness.sarampo ?? false,
    //         tetano: formDados.sickness.tetano ?? false,
    //         variola: formDados.sickness.variola ?? false,
    //         coqueluche: formDados.sickness.coqueluche ?? false,
    //         difteria: formDados.sickness.difteria ?? false,
    //         rinite: formDados.sickness.rinite ?? false,
    //         bronquite: formDados.sickness.bronquite ?? false,
    //         asma: formDados.sickness.asma ?? false,
    //         rubeola: formDados.sickness.rubeola ?? false,
    //         colera: formDados.sickness.colera ?? false,
    //         covid19: formDados.sickness.covid19 ?? false,
    //         h1n1: formDados.sickness.h1n1 ?? false,
    //         caxumba: formDados.sickness.caxumba ?? false,
    //         others: formDados.sickness.others || "",
    //         heartProblems: formDados.heartProblems || "",
    //         drugAllergy: formDados.drugAllergy || "",
    //         lactoseAllergy: formDados.lactoseAllergy ?? false,
    //         deficiency: formDados.deficiency || "",
    //         bloodTransfusion: formDados.bloodTransfusion ?? false,
    //         skinAllergy: formDados.skinAllergy ?? false,
    //         skinAllergyMedications: formDados.skinAllergyMedications || "",
    //         faintingOrConvulsion: formDados.faintingOrConvulsion ?? false,
    //         faintingOrSeizuresMedications:
    //             formDados.faintingOrSeizuresMedications || "",
    //         psychologicalDisorder: formDados.psychologicalDisorder || "",
    //         allergy: formDados.allergy ?? false,
    //         allergyMedications: formDados.allergyMedications || "",
    //         diabetic: formDados.diabetic ?? false,
    //         diabeticMedications: formDados.diabeticMedications || "",
    //         recentSeriousInjury: formDados.recentSeriousInjury ?? false,
    //         recentFracture: formDados.recentFracture || "",
    //         surgeries: formDados.surgeries || "",
    //         hospitalizationReasonLast5Years:
    //             formDados.hospitalizationReasonLast5Years || "",
    //     };

    //     // Monta o objeto unit conforme esperado (id e surname)
    //     // const unit = {
    //     //     id: Number(formDados.unit),
    //     //     surname: formDados.unitSurname || "", // ajuste conforme sua lógica
    //     // };

    //     // Monta o payload principal conforme MemberDataDtoRequest
    //     const payload = {
    //         idImage: formDados.idImage || "",
    //         imagePath: formDados.imagePath || "",
    //         username: formDados.username,
    //         birthCertificate: cleanBirthCertificate,
    //         cpf: cleanCpf,
    //         issuingAuthority: formDados.issuingAuthority,
    //         contact: cleanContact,
    //         birthDate: new Date(formDados.birthDate).toISOString() || "",
    //         sex: (formDados.sex || "").toUpperCase(),
    //         tshirtSize: (formDados.tshirtSize || "").toUpperCase(),
    //         baptized: formDados.isBaptized == "true" ? true : false,
    //         address,
    //         medicalData,
    //         fatherName: formDados.fatherName || "",
    //         fatherContact: formDados.fatherContact || "",
    //         fatherEmail: formDados.fatherEmail || "",
    //         motherName: formDados.motherName || "",
    //         motherContact: formDados.motherContact || "",
    //         motherEmail: formDados.motherEmail || "",
    //         responsibleName: formDados.responsibleName || "",
    //         responsibleContact: formDados.responsibleContact || "",
    //         responsibleEmail: formDados.responsibleEmail || "",
    //         unitRole: (formDados.unitRole || "").toUpperCase(),
    //         unitName: formDados.unit,
    //         // unit,
    //         classCategory: (formDados.classCategory || "").toUpperCase(),
    //         classRole: (formDados.classRole || "").toUpperCase(),
    //     };
    //     console.log("FormDados: ", formDados);
    //     console.log("Payload enviado:", payload);
		

    //     if (editMode) {
    //         setLoading(true);
    //         try {
    //             // Atualiza os dados do membro
    //             const response = await api.put(`/members/${formDados.cpf}`, payload);

    //             if (response.status === 200) {
    //                 // Se o usuário selecionou uma nova imagem
    //                 if (formDados.foto && formDados.foto instanceof File) {
    //                     const formDataImg = new FormData();
    //                     formDataImg.append("file", formDados.foto);

    //                     if (formDados.idImage) {
    //                         // PUT para atualizar imagem existente
    //                         await api.put(
    //                             `/drive/update?fileId=${formDados.idImage}&cpf=${formDados.cpf}`,
    //                             formDataImg,
    //                             {
    //                                 headers: {
    //                                     "Content-Type": "multipart/form-data",
    //                                 },
    //                             }
    //                         );
    //                     } else {
    //                         // POST para adicionar nova imagem
    //                         await api.post(
    //                             `/drive/upload?cpf=${formDados.cpf}`,
    //                             formDataImg,
    //                             {
    //                                 headers: {
    //                                     "Content-Type": "multipart/form-data",
    //                                 },
    //                             }
    //                         );
    //                     }
    //                 }

    //                 Toast.fire({
    //                     icon: "success",
    //                     title: "Membro editado com sucesso!",
    //                 });
    //                 setTimeout(() => {
    //                     setLoading(false);
    //                     if (onSave) onSave();
    //                     if (onClose) onClose();
    //                     navigate("/secretary"); // Redireciona para secretary ao editar
    //                 }, 3000);
    //             }
    //         } catch (error) {
    //             setLoading(false);
    //             Toast.fire({
    //                 icon: "error",
    //                 title: "Erro ao editar membro.",
    //             });
    //             console.error("Error editing member:", error);
    //         }
    //         return;
    //     } else {
    //         await api.post("/members", payload);
    //         Toast.fire({
    //             icon: "success",
    //             title: "Membro cadastrado com sucesso!",
    //         });

    //         if (formDados.foto != null) {
    //             const formData = new FormData();
    //             // Era: formData.append("image", formDados.foto);
    //             formData.append("file", formDados.foto); // alinhar com o PUT de edição
    //             try {
    //                 const response = await api.post(
    //                     `/drive/upload?cpf=${formDados.cpf}`,
    //                     formData,
    //                     {
    //                         headers: { "Content-Type": "multipart/form-data" },
    //                     }
    //                 );
    //                 // opcional: atualizar formDados com retorno
    //                 // setFormDados((p) => ({ ...p, imagePath: response.data?.imagePath, idImage: response.data?.id }));
    //             } catch (error) {
    //                 console.error("Erro no upload:", error);
    //             }
    //         } else {
    //             console.log("TA NULL");
    //         }
    //         setTimeout(() => {
    //             navigate("/admin"); // Redireciona para admin ao cadastrar
    //         }, 2500);
    //     }
    // };

        const handleEnviar = async () => {
        const cleanCpf = (formDados.cpf || "").replace(/\D/g, "");
        const cleanContact = (formDados.contact || "").replace(/\D/g, "");
        const cleanBirthCertificate = (formDados.birthCertificate || "").slice(0, 32);

        // Campos obrigatórios
        const camposObrigatorios = [
            "username",
            "birthCertificate",
            "cpf",
            "issuingAuthority",
            "contact",
            "birthDate",
            "sex",
            "tshirtSize",
            "isBaptized",
            "cep",
            "houseNumber",
            "street",
            "district",
            "city",
            "state",
            "cns",
            "blood_type",
        ];

        // Tradução dos campos para mensagens amigáveis
        const nomesCampos = {
            username: "Nome",
            birthCertificate: "Certidão de Nascimento",
            cpf: "CPF",
            issuingAuthority: "Órgão Expedidor",
            contact: "Contato",
            birthDate: "Data de Nascimento",
            sex: "Sexo",
            tshirtSize: "Tamanho da Camiseta",
            isBaptized: "Batizado",
            cep: "CEP",
            houseNumber: "Número",
            street: "Rua",
            district: "Bairro",
            city: "Cidade",
            state: "Estado",
            cns: "CNS",
            blood_type: "Tipo Sanguíneo",
        };

        // ✅ Função para validar campos obrigatórios
        function validarCamposObrigatorios(dados) {
            for (const campo of camposObrigatorios) {
                if (!dados[campo] || dados[campo].toString().trim() === "") {
                    return `O campo "${nomesCampos[campo] || campo}" é obrigatório.`;
                }
            }

            // Verifica se pelo menos um grupo (pai, mãe ou responsável) está completo
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

            return null; // Tudo ok
        }

        // ✅ Executa a validação
        const erroValidacao = validarCamposObrigatorios(formDados);
        if (erroValidacao) {
            Toast.fire({
                icon: "error",
                title: erroValidacao,
            });
            return;
        }

        // Verifica se o usuário aceitou os termos (marcado via modal em InternData)
        if (!formDados.acceptTerms) {
            Toast.fire({
                icon: "error",
                title: "É necessário aceitar os termos de uso para cadastrar o membro.",
            });
            return;
        }

        // ✅ Monta o objeto address conforme SaveAddressRequestDto
        const address = {
            houseNumber: formDados.houseNumber,
            district: formDados.district,
            city: formDados.city,
            state: formDados.state,
            street: formDados.street,
            cep: (formDados.cep || "").replace(/\D/g, ""),
            referenceHouse: formDados.referenceHouse || "",
        };

        // ✅ Monta o objeto medicalData conforme SaveMedicalDataRequestDto
        const medicalData = {
            cpf: cleanCpf,
            cns: formDados.cns || "000000000000000",
            agreement: formDados.agreement || "Publico",
            bloodType: (formDados.blood_type || "").toUpperCase(),
            catapora: formDados.sickness.catapora ?? false,
            meningite: formDados.sickness.meningite ?? false,
            hepatite: formDados.sickness.hepatite ?? false,
            dengue: formDados.sickness.dengue ?? false,
            pneumonia: formDados.sickness.pneumonia ?? false,
            malaria: formDados.sickness.malaria ?? false,
            febreAmarela: formDados.sickness.febreAmarela ?? false,
            sarampo: formDados.sickness.sarampo ?? false,
            tetano: formDados.sickness.tetano ?? false,
            variola: formDados.sickness.variola ?? false,
            coqueluche: formDados.sickness.coqueluche ?? false,
            difteria: formDados.sickness.difteria ?? false,
            rinite: formDados.sickness.rinite ?? false,
            bronquite: formDados.sickness.bronquite ?? false,
            asma: formDados.sickness.asma ?? false,
            rubeola: formDados.sickness.rubeola ?? false,
            colera: formDados.sickness.colera ?? false,
            covid19: formDados.sickness.covid19 ?? false,
            h1n1: formDados.sickness.h1n1 ?? false,
            caxumba: formDados.sickness.caxumba ?? false,
            others: formDados.sickness.others || "",
            heartProblems: formDados.heartProblems || "",
            drugAllergy: formDados.drugAllergy || "",
            lactoseAllergy: formDados.lactoseAllergy ?? false,
            deficiency: formDados.deficiency || "",
            bloodTransfusion: formDados.bloodTransfusion ?? false,
            skinAllergy: formDados.skinAllergy ?? false,
            skinAllergyMedications: formDados.skinAllergyMedications || "",
            faintingOrConvulsion: formDados.faintingOrConvulsion ?? false,
            faintingOrSeizuresMedications: formDados.faintingOrSeizuresMedications || "",
            psychologicalDisorder: formDados.psychologicalDisorder || "",
            allergy: formDados.allergy ?? false,
            allergyMedications: formDados.allergyMedications || "",
            diabetic: formDados.diabetic ?? false,
            diabeticMedications: formDados.diabeticMedications || "",
            recentSeriousInjury: formDados.recentSeriousInjury ?? false,
            recentFracture: formDados.recentFracture || "",
            surgeries: formDados.surgeries || "",
            hospitalizationReasonLast5Years: formDados.hospitalizationReasonLast5Years || "",
        };

        // ✅ Monta o payload principal
        const payload = {
            username: formDados.username,
            birthCertificate: cleanBirthCertificate,
            cpf: cleanCpf,
            issuingAuthority: formDados.issuingAuthority,
            contact: cleanContact,
            birthDate: new Date(formDados.birthDate).toISOString().split("T")[0] || "",
            sex: (formDados.sex || "").toUpperCase(),
            tshirtSize: (formDados.tshirtSize || "").toUpperCase(),
            baptized: formDados.isBaptized == "true" ? true : false,
            address,
            medicalData,
            fatherName: formDados.fatherName || "",
            fatherContact: formDados.fatherContact || "",
            fatherEmail: formDados.fatherEmail || "",
            motherName: formDados.motherName || "",
            motherContact: formDados.motherContact || "",
            motherEmail: formDados.motherEmail || "",
            responsibleName: formDados.responsibleName || "",
            responsibleContact: formDados.responsibleContact || "",
            responsibleEmail: formDados.responsibleEmail || "",
            unitRole: (formDados.unitRole || "").toUpperCase(),
            unitName: formDados.unit,
            classCategory: (formDados.classCategory || "").toUpperCase(),
            classRole: (formDados.classRole || "").toUpperCase(),
        };

        console.log("Payload enviado:", payload);

        // ✅ Cria o FormData com o JSON + arquivo
        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));

        // Envia a foto: prioriza File; senão converte base64 -> Blob -> File
        if (formDados.imageFile instanceof File) {
            formData.append("file", formDados.imageFile);
        } else if (formDados.image && typeof formDados.image === "string" && formDados.image.trim() !== "") {
            const mime = (formDados.imageFormat && String(formDados.imageFormat)) || "image/jpeg";
            const blob = b64ToBlob(formDados.image, mime);
            const ext = mime.split("/")[1] || "jpg";
            formData.append("file", new File([blob], `foto.${ext}`, { type: mime }));
        }

        try {
            setLoading(true);

            if (editMode) {
                // 🔁 Atualização de membro
                const response = await api.put(`/members`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (response.status === 200) {
                    Toast.fire({ icon: "success", title: "Membro editado com sucesso!" });
                    setTimeout(() => {
                        setLoading(false);
                        if (onSave) onSave();
                        if (onClose) onClose();
                        navigate("/secretary");
                    }, 3000);
                }
            } else {
                // 🆕 Cadastro de novo membro
                const response = await api.post("/members", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (response.status === 200 || response.status === 201) {
                    Toast.fire({ icon: "success", title: "Membro cadastrado com sucesso!" });
                    setTimeout(() => navigate("/admin"), 2500);
                }
            }
        } catch (error) {
            console.error("Erro ao enviar membro:", error);
            Toast.fire({
                icon: "error",
                title: editMode ? error.response?.data?.message || "Erro ao editar membro." : error.response?.data?.message || "Erro ao cadastrar membro.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col justify-center align-center h-[73vh] w-[70vw] p-6 bg-[#EDEDED] shadow rounded">
                <div className="flex h-[80%] w-[90]">
                    {etapaAtual === 1 && (
                        <PersonalData
                            dados={formDados}
                            setDados={atualizarDadosEtapa}
                        />
                    )}
                    {etapaAtual === 2 && (
                        <Address
                            dados={formDados}
                            setDados={atualizarDadosEtapa}
                        />
                    )}
                    {etapaAtual === 3 && (
                        <Sickness
                            dados={formDados}
                            setDados={atualizarDadosEtapa}
                        />
                    )}
                    {etapaAtual === 4 && (
                        <MedicalData
                            dados={formDados}
                            setDados={atualizarDadosEtapa}
                        />
                    )}
                    {etapaAtual === 5 && (
                        <MemberGuardian
                            dados={formDados}
                            setDados={atualizarDadosEtapa}
                        />
                    )}
                    {etapaAtual === 6 && (
                        <InternData
                            dados={formDados}
                            setDados={atualizarDadosEtapa}
                        />
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
                            disabled={loading}
                            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                        >
                            {loading ? "Salvando..." : "Enviar"}
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
