import React, { useState } from "react";
import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";

// Etapa 6 - InternData
function InternData({ dados, setDados }) {
	const [showTermsModal, setShowTermsModal] = useState(false);
	console.log("EDITANDO", dados.image);
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
								const file = e.target.files?.[0];
								if (file) {
									const reader = new FileReader();
									reader.onloadend = () => {
										const dataUrl = String(reader.result || "");
										const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1] : dataUrl;
										setDados({
											...dados,
											image: base64,                       // base64 (sem prefixo) para enviar
											imageFormat: file.type,              // ex: image/png
											imageFile: file,                     // File para multipart
											imagePreview: `data:${file.type};base64,${base64}`, // usado para visualizar
										});
									};
									reader.readAsDataURL(file);
								}
							}}
						/>
						{dados.imagePreview ? (
							<img
								src={dados.imagePreview}
								alt="Pré-visualização"
								className="object-cover w-full h-full rounded"
							/>
						) : dados.foto ? (
							<img
								src={dados.foto}
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

			<div className="w-[85%] mt-4 mb-6 flex items-center gap-3 self-start ml-20">
                <input
                    type="checkbox"
                    checked={!!dados.acceptTerms}
                    onChange={(e) => setDados({ ...dados, acceptTerms: e.target.checked })} 
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
						<div className="text-sm text-gray-700 space-y-3">
							<p>
								{
									<div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 text-gray-800 leading-relaxed">
										<h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Termos de Uso</h1>

										<section className="mb-6">
											<h2 className="text-xl font-semibold text-gray-800 mb-2">1. Aceitação dos Termos</h2>
											<p>
											Ao acessar e utilizar esta aplicação, o usuário declara ter lido, compreendido e aceitado integralmente os presentes Termos de Uso. 
											Caso não concorde com qualquer parte deste documento, o usuário não deverá utilizar a aplicação.
											</p>
										</section>

										<section className="mb-6">
											<h2 className="text-xl font-semibold text-gray-800 mb-2">2. Finalidade da Aplicação</h2>
											<p>
											Esta aplicação foi desenvolvida para uso interno do <strong>Clube Campestre</strong>, com o objetivo de facilitar a comunicação e o gerenciamento das informações dos membros.
											</p>
											<p className="mt-2">Os dados cadastrados são utilizados para:</p>
											<ul className="list-disc ml-6 mt-2 space-y-1">
											<li>Exibição controlada de informações entre os próprios membros do clube, com o intuito de promover interação e organização interna;</li>
											<li>Uso administrativo pela equipe da secretaria, visando à manutenção de cadastros, controle de pagamentos, agendamentos e outras atividades internas do clube.</li>
											</ul>
										</section>

										<section className="mb-6">
											<h2 className="text-xl font-semibold text-gray-800 mb-2">3. Coleta e Uso de Dados</h2>
											<p>
											Ao utilizar a aplicação, o usuário autoriza o clube a coletar, armazenar e processar seus dados pessoais, incluindo informações como nome, telefone, e-mail e dados de associação. 
											Esses dados serão utilizados exclusivamente para fins internos do clube e não serão compartilhados com terceiros sem autorização expressa do usuário, salvo quando exigido por lei.
											</p>
										</section>

										<section className="mb-6">
											<h2 className="text-xl font-semibold text-gray-800 mb-2">4. Compartilhamento Interno de Informações</h2>
											<p>
											As informações de perfil de cada membro poderão ser visualizadas por outros membros do clube dentro da aplicação, 
											com o único propósito de facilitar o convívio e a interação entre associados. 
											A equipe da secretaria também terá acesso aos dados para fins administrativos e operacionais.
											</p>
										</section>

										<section className="mb-6">
											<h2 className="text-xl font-semibold text-gray-800 mb-2">5. Segurança da Informação</h2>
											<p>
											O clube adota medidas de segurança técnicas e administrativas adequadas para proteger os dados pessoais contra acessos não autorizados, perdas, destruição ou alterações indevidas. 
											No entanto, o usuário reconhece que nenhum sistema é totalmente isento de riscos e concorda em utilizar a aplicação de forma responsável.
											</p>
										</section>

										<section className="mb-6">
											<h2 className="text-xl font-semibold text-gray-800 mb-2">6. Responsabilidade do Usuário</h2>
											<p>O usuário se compromete a:</p>
											<ul className="list-disc ml-6 mt-2 space-y-1">
											<li>Fornecer informações verdadeiras, completas e atualizadas ao se cadastrar;</li>
											<li>Utilizar a aplicação apenas para os fins propostos;</li>
											<li>Não divulgar, copiar ou utilizar dados de outros membros fora do ambiente do clube.</li>
											</ul>
										</section>

										<section className="mb-6">
											<h2 className="text-xl font-semibold text-gray-800 mb-2">7. Alterações nos Termos de Uso</h2>
											<p>
											O clube reserva-se o direito de modificar estes Termos de Uso a qualquer momento, mediante publicação da nova versão dentro da aplicação. 
											O uso continuado após as alterações será considerado como aceitação dos novos termos.
											</p>
										</section>

										<section>
											<h2 className="text-xl font-semibold text-gray-800 mb-2">8. Contato</h2>
											<p>
											Em caso de dúvidas sobre estes Termos de Uso ou sobre o tratamento de dados pessoais, o usuário poderá entrar em contato com a equipe administrativa do clube pelo e-mail:{" "}
											<a href="mailto:clube.campestre.br@gmail.com" className="text-blue-600 hover:underline">
												clube.campestre.br@gmail.com
											</a>.
											</p>
										</section>
									</div>
}
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
