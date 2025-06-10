import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";
import MedicalDataCard from "../../../../components/medical-data-card/MedicalDataCard";
import { maskCns } from "../../../../utils/validators/addMemberValidator";

// Etapa 4 - MedicalData
function MedicalData({ dados, setDados }) {
	return (
		<div className="flex flex-col w-full ">
			<div className="flex align-center items-center ml-20 gap-2">
				<div className="border-3 h-10 border-amber-400 rounded"></div>
				<h2 className="font-semibold text-xl">Dados Médicos</h2>
			</div>

			<div className="flex flex-col align-center justify-center items-center h-[90%] gap-6 mt-4 p-4 ">
				<div className="flex flex-row items-center justify-center gap-x-8 h-[20vh] w-[85%] self-center mx-auto">
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
						className="w-[8vw]"
					/>
					<AddMemberInput
						id="cns"
						type="text"
						label="Carteira SUS "
						value={maskCns(dados.cns || "")}
						onChange={(e) =>
							setDados({
								...dados,
								cns: e.target.value.replace(/\D/g, "").slice(0, 15), // Limita a 15 dígitos
							})
						}
						className="w-[22vw] self-end"
					/>
					<AddMemberInput
						id="agreement"
						type="text"
						label="Convenio"
						value={dados.agreement || ""}
						onChange={(e) =>
							setDados({ ...dados, agreement: e.target.value })
						}
						className="w-[22vw] self-end"
					/>
				</div>
				<div className="w-[85%] overflow-y-auto flex justify-center px-8 py-4">
					<MedicalDataCard
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
						answers={dados.medicalAnswers} // <-- Passa as respostas salvas
						onChange={(respostas) => {
							const novosDados = {
								...dados,
   								medicalAnswers: respostas, // <-- Salva todas as respostas
								heartProblems: respostas[0]?.value ? respostas[0]?.extra || "Sim" : "",
								drugAllergy: respostas[1]?.value ? respostas[1]?.extra || "Sim" : "",
								lactoseAllergy: respostas[2]?.value ?? false,
								deficiency: respostas[3]?.value ? respostas[3]?.extra || "Sim" : "",
								bloodTransfusion: respostas[4]?.value ?? false,
								skinAllergy: respostas[5]?.value ?? false,
								skinAllergyMedications: respostas[5]?.extra || "",
								faintingOrConvulsion: respostas[6]?.value ?? false,
								faintingOrSeizuresMedications: respostas[6]?.extra || "",
								psychologicalDisorder: respostas[7]?.value ? respostas[7]?.extra || "Sim" : "",
								allergy: respostas[8]?.value ?? false,
								allergyMedications: respostas[8]?.extra || "",
								diabetic: respostas[9]?.value ?? false,
								diabeticMedications: respostas[9]?.extra || "",
								recentSeriousInjury: respostas[10]?.value ?? false,
								recentFracture: respostas[11]?.value ? respostas[11]?.extra || "Sim" : "",
								surgeries: respostas[12]?.value ? respostas[12]?.extra || "Sim" : "",
								hospitalizationReasonLast5Years: respostas[13]?.extra || "",
								};

								// Só atualiza se mudou de verdade
								if (JSON.stringify(novosDados) !== JSON.stringify(dados)) {
								setDados(novosDados);
								}
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default MedicalData;
