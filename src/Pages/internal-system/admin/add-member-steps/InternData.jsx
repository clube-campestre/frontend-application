import React, { useState } from "react";
import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";

// Etapa 6 - InternData
function InternData({ dados, setDados }) {
	const [showTermsModal, setShowTermsModal] = useState(false);
	console.log("EDITANDO", dados);
	return (
		<div className="flex flex-col w-full justify-center items-center">
			<div className="flex align-center self-start items-center ml-20 gap-2">
				<div className="border-3 h-10 border-amber-400 rounded"></div>
				<h2 className="font-semibold text-xl">Dados Internos</h2>
			</div>

			<div className="flex flex-row justify-around items-center h-[90%] w-[85%]">
				<div className="flex flex-col justify-between items-center gap-5">
					<AddMemberInput
						id="unit"
						type="select"
						options={[
							{ value: "PANDA", label: "Panda" },
							{ value: "FALCAO", label: "Falcão" },
							{ value: "LINCE", label: "Lince" },
							{ value: "LEAO", label: "Leão" },
							{ value: "AGUIA_REAL", label: "Águia Real" },
							{ value: "TIGRE", label: "Tigre" },
							{ value: "RAPOSA", label: "Raposa" },
							{ value: "URSO", label: "Urso" },
							{ value: "PANTERA", label: "Pantera" },
							{ value: "LOBO", label: "Lobo" },
							{ value: null, label: "Nenhuma" },
						]}
						label="Unidade"
						value={dados.unit ?? ""}
						onChange={(e) =>
							setDados({
								...dados,
								unit: e.target.value === "" ? "" : e.target.value,
							})
						}
						className="h-[8vh] w-[20vw]"
					/>
					{/* ...outros AddMemberInput... */}
					<AddMemberInput
						id="unitRole"
						type="select"
						options={[
							{ value: "CONSELHEIRO", label: "Conselheiro" },
							{
								value: "CONSELHEIRO_AUXILIAR",
								label: "Conselheiro Auxiliar",
							},
							{ value: "CAPITAO", label: "Capitão" },
							{ value: "VICE_CAPITAO", label: "Vice-Capitão" },
							{ value: "SECRETARIO", label: "Secretário" },
							{
								value: "VICE_SECRETARIO",
								label: "Vice-Secretário",
							},
							{ value: "PADIOLEIRO", label: "Padioleiro" },
							{ value: "CAPELAO", label: "Capelão" },
							{ value: "ALMOXARIFADO", label: "Almoxarifado" },
							{ value: "MEMBRO", label: "Membro" },
							{ value: "NENHUMA", label: "Nenhuma" }, // NO BACK NÂO ESTA PRONTO
						]}
						label="Função na Unidade"
						value={dados.unitRole || ""}
						onChange={(e) =>
							setDados({ ...dados, unitRole: e.target.value })
						}
						className="h-[8vh] w-[20vw]"
					/>
					<AddMemberInput
						id="classCategory"
						type="select"
						options={[
							{ value: "AMIGO", label: "Amigo" },
							{ value: "COMPANHEIRO", label: "Companheiro" },
							{ value: "PESQUISADOR", label: "Pesquisador" },
							{ value: "PIONEIRO", label: "Pioneiro" },
							{ value: "EXCURSIONISTA", label: "Excursionista" },
							{ value: "GUIA", label: "Guia" },
							{ value: "AGRUPADAS", label: "Agrupadas" },
							{
								value: "DESBRAVADORES_COMPLETO",
								label: "Desbravadores Completo",
							},
							{ value: "LIDER", label: "Líder" },
							{ value: "LIDER_MASTER", label: "Líder Master" },
							{
								value: "LIDER_MASTER_AVANCADO",
								label: "Líder Master Avançado",
							},
							{
								value: "NENHUMA",
								label: "Nenhuma",
							},
						]}
						label="Categoria da Classe"
						value={dados.classCategory || ""}
						onChange={(e) =>
							setDados({
								...dados,
								classCategory: e.target.value,
							})
						}
						className="h-[8vh] w-[20vw]"
					/>
					<AddMemberInput
						id="classRole"
						type="select"
						options={[
							{ value: "INSTRUTOR", label: "Instrutor" },
							{
								value: "INSTRUTOR_AUXILIAR",
								label: "Instrutor Auxiliar",
							},
							{ value: "MEMBRO", label: "Membro" },
							{ value: "NENHUMA", label: "Nenhuma" },
						]}
						label="Função na Classe"
						value={dados.classRole || ""}
						onChange={(e) =>
							setDados({ ...dados, classRole: e.target.value })
						}
						className="h-[8vh] w-[20vw]"
					/>
				</div>
				<div className="flex h-full items-center justify-center flex-col">
					<h3 className="mb-2 text-[15px] font-medium text-gray-700">
						Foto do membro
					</h3>
					<label className="flex flex-col items-center justify-center w-56 h-72 border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-amber-400 transition-colors">
						<input
							type="file"
							accept="image/*"
							className="hidden"
							onChange={(e) => {
								const file = e.target.files[0];
								if (file) {
									setDados({ ...dados, image: file });
								}
							}}
						/>
						{dados.image ? (
							<img
								src={
									`data:${dados.imageFormat};base64,${dados.image}` 
								}
								alt="Pré-visualização"
								className="object-cover w-full h-full rounded"
							/>
						) : (
							<span className="text-gray-400 text-center">
								Clique para adicionar
								<br />
								uma foto
							</span>
						)}
					</label>
				</div>
			</div>

			{/* Checkbox e termo de uso */}
			<div className="w-[85%] mt-4 mb-6 flex items-center gap-3 self-start ml-20">
				<input
					type="checkbox"
					checked={!!dados.acceptTerms}
					onChange={() => {
						/* não permitir marcar manualmente — só via modal de aceite */
					}}
					className="w-4 h-4"
					aria-label="Aceito os termos de uso"
				/>
				<span className="text-sm">
					Aceito e tenho ciência dos{" "}
					<button
						type="button"
						onClick={() => setShowTermsModal(true)}
						className="underline text-blue-600 hover:text-blue-700"
					>
						termos de uso
					</button>
				</span>
			</div>

			{/* Modal de termos */}
			{showTermsModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
					<div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
						<button
							className="absolute top-3 right-3 text-2xl"
							onClick={() => setShowTermsModal(false)}
							aria-label="Fechar termos"
						>
							×
						</button>
						<h3 className="text-xl font-bold mb-4">Termos de Uso</h3>
						<div className="text-sm text-gray-700 space-y-3">
							<p>
								{/* Cole aqui os termos de uso reais. Abaixo há um placeholder. */}
							</p>
							<p>
								Ao aceitar, declaro que li e estou ciente dos termos e
								condições aplicáveis ao cadastro e uso dos serviços.
							</p>
							{/* ... conteúdo dos termos ... */}
						</div>
						<div className="flex justify-end gap-3 mt-6">
							<button
								onClick={() => setShowTermsModal(false)}
								className="px-4 py-2 rounded bg-gray-200"
							>
								Fechar
							</button>
							<button
								onClick={() => {
									// Marca aceite no estado do formulário (permite envio)
									setDados({ ...dados, acceptTerms: true });
									setShowTermsModal(false);
								}}
								className="px-4 py-2 rounded bg-green-600 text-white"
							>
								Aceitar e fechar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default InternData;
