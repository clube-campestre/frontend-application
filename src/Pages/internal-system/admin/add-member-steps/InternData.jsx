import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";

// Etapa 6 - InternData
function InternData({ dados, setDados }) {
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
							{ value: "1", label: "Panda" },
							{ value: "2", label: "Falção" },
							{ value: "3", label: "Lince" },
							{ value: "4", label: "Leão" },
							{ value: "5", label: "Águia Real" },
							{ value: "6", label: "Tigre" },
							{ value: "7", label: "Raposa" },
							{ value: "8", label: "Urso" },
							{ value: "9", label: "Pantera" },
							{ value: "10", label: "Lobo" },
							{ value: "", label: "Nenhuma" },
						]}
						label="Unidade"
						value={dados.unit ?? ""}
						onChange={(e) =>
							setDados({ ...dados, unit: e.target.value === "" ? "" : Number(e.target.value) })
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
							{ value: "NENHUMA", label: "Nenhuma"} // NO BACK NÂO ESTA PRONTO
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
									setDados({ ...dados, foto: file });
								}
							}}
						/>
						{dados.foto ? (
							<img
								src={
									typeof dados.foto === "string"
										? dados.foto
										: URL.createObjectURL(dados.foto)
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
		</div>
	);
}

export default InternData;
