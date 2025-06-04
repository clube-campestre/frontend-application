import React, { useState } from "react";
import { api } from "../../../provider/api";
import Toast from "../../../utils/Toast";
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
		 console.log("✅ dados atualizados:", formDados);
	};

	const handleVoltar = () => {
		setEtapaAtual((prev) => Math.max(prev - 1, 1));
		 console.log("✅ dados atualizados:", fo);
	};

	const handleEnviar = async () => {
		const cleanCpf = (formDados.cpf || "").replace(/\D/g, "");
		const cleanContact = (formDados.contact || "").replace(/\D/g, "");
		const cleanBirthCertificate = (formDados.birthCertificate || "").slice(
			0,
			32
		);

		// Monta o objeto address conforme SaveAddressRequestDto
		const address = {
			houseNumber: formDados.houseNumber,
			district: formDados.district,
			city: formDados.city,
			state: formDados.state,
			street: formDados.street,
			cep: (formDados.cep || "").replace(/\D/g, ""),
			referenceHouse: formDados.referenceHouse || "",
		};

		// Monta o objeto medicalData conforme SaveMedicalDataRequestDto
		const medicalData = {
			cpf: cleanCpf,
			cns: formDados.cns || "000000000000000", // valor default se não preenchido
			agreement: formDados.agreement || "Publico", // valor default se não preenchido
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
			faintingOrSeizuresMedications:
				formDados.faintingOrSeizuresMedications || "",
			psychologicalDisorder: formDados.psychologicalDisorder || "",
			allergy: formDados.allergy ?? false,
			allergyMedications: formDados.allergyMedications || "",
			diabetic: formDados.diabetic ?? false,
			diabeticMedications: formDados.diabeticMedications || "",
			recentSeriousInjury: formDados.recentSeriousInjury ?? false,
			recentFracture: formDados.recentFracture || "",
			surgeries: formDados.surgeries || "",
			hospitalizationReasonLast5Years:
				formDados.hospitalizationReasonLast5Years || "",
		};

		// Monta o objeto unit conforme esperado (id e surname)
		const unit = {
		  id: Number(formDados.unit),
		  surname: formDados.unitSurname || "" // ajuste conforme sua lógica
		};

		// Monta o payload principal conforme MemberDataDtoRequest
		const payload = {
			idImage: formDados.idImage || "",
			imagePath: formDados.imagePath || "",
			username: formDados.username,
			birthCertificate: cleanBirthCertificate,
			cpf: cleanCpf,
			issuingAuthority: formDados.issuingAuthority,
			contact: cleanContact,
			birthDate: new Date(formDados.birthDate).toISOString() || "",
			sex: (formDados.sex || "").toUpperCase(),
			tshirtSize: (formDados.tshirtSize || "").toUpperCase(),
			// isBaptized: typeof formDados.isBaptized === "boolean" ? formDados.isBaptized : formDados.isBaptized === "true" ? true : false,
			isBaptized: formDados.isBaptized == "true" ? true : false,
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
			// unit: formDados.unit,
			unit,
			classCategory: (formDados.classCategory || "").toUpperCase(),
			classRole: (formDados.classRole || "").toUpperCase(),
		};
		alert(`isBaptized: ${formDados.isBaptized}`);
		console.log('FormDados: ', formDados)
		console.log("Payload enviado:", payload);
		await api.post("/members", payload);
		Toast.fire({
			icon: "success",
			title: "Membro cadastrado com sucesso!",
		});

		// if(formDados.foto != null){
		// 	const formData = new FormData();
		// 	formData.append("image", formDados.foto); // nome esperado no backend
		// 	console.log("ENVIANDO IMAGEM")
		// 	try {
		// 		const response = await api	.post(`/drive/upload?cpf=${formDados.cpf}`,
		// 			formData,
		// 			{
		// 				headers: {
		// 					"Content-Type": "multipart/form-data",
		// 				},
		// 			}
		// 		);
		// 		alert("Upload realizado com sucesso!");
		// 		console.log(response.data);
		// 	} catch (error) {
		// 		console.error("Erro no upload:", error);
		// 		alert("Falha no upload");
		// 	}
		// }
		// else{
		// 	console.log("TA NULL")
		// }
	};

	// // Exemplo de como enviar para a API a parte de salvar a imagem no google drive
	// formData.append('foto', dados.foto ||'');
	// formData.append('cpf', dados.cpf || '');

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
