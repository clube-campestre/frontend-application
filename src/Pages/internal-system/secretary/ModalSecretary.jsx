import { IoMdClose } from "react-icons/io";

const InfoMember = ({ member, onClose }) => {
	if (!member) return null;

	console.log("Member Info:", member);
	return (
		<div className="fixed inset-0 bg-[#000000da]  bg-opacity-40 flex items-center justify-center z-50 font-sans">
			<div className="bg-white rounded-lg w-[90%] h-[90%] shadow-lg p-6 overflow-y-auto relative">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
				>
					<IoMdClose />
				</button>

				<div className="flex items-center space-x-2 border-b border-gray-300 pb-2 mb-4">
					<div className="w-2 h-6 bg-yellow-500 rounded"></div>
					<h2
						className="text-xl font-semibold"
						style={{ color: "#232222" }}
					>
						Dados pessoais
					</h2>
				</div>

				<div
					className="p-4 rounded-md grid grid-cols-3 gap-4 text-sm"
					style={{ backgroundColor: "#666666", color: "#fff" }}
				>
					<div className="flex items-center space-x-3 col-span-1">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEaBVDfj_YlWbHCteGTaLBQu8aYMC2o2LBuOHEkjC-GqXCnRoTrnd7fBF-bdjLK89Lv4&usqp=CAU"
							alt="Foto"
							className="rounded-full w-16 h-16"
						/>
						<div>
							<p className="font-bold">{member.username}</p>
							<p>
								<strong>Unidade:</strong> {member.unit?.surname}
							</p>
							<p>
								<strong>Função da unidade:</strong>{" "}
								{member.unitRole}
							</p>
							<p>
								<strong>Papel da classe:</strong>{" "}
								{member.classRole}
							</p>
							<p>
								<strong>Categoria da classe:</strong>{" "}
								{member.classCategory}
							</p>
						</div>
					</div>
					<div>
						<p>
							<strong>CPF:</strong>
							{member.cpf}
						</p>
						<p>
							<strong>Data Nasc:</strong>{" "}
							{new Date(member.birthDate).toLocaleDateString()}
						</p>
						<p>
							<strong>Contato:</strong> {member.contact}
						</p>
						<p>
							<strong>Sexo:</strong> {member.sex}
						</p>
						<p>
							<strong>Batizado:</strong>{" "}
							{member.isBaptized ? "Sim" : "Não"}
						</p>
					</div>
					<div>
						<p>
							<strong>CEP:</strong> {member.address.cep}
						</p>
						<p>
							<strong>Cidade:</strong> {member.address.city}
						</p>
						<p>
							<strong>Bairro:</strong> {member.address.district}
						</p>
						<p>
							<strong>Rua:</strong> {member.address.street}
						</p>
						<p>
							<strong>Número:</strong> {member.address.number}
						</p>
					</div>
				</div>
				<div className="mt-6 border rounded-md p-4 text-sm">
					<h3
						className="font-semibold mb-2"
						style={{ color: "#021C4F" }}
					>
						Contato do Responsável
					</h3>
					<div className="grid grid-cols-2 gap-4">
						{member.fatherName && (
							<div>
								<p>
									<strong>Nome do Pai:</strong>{" "}
									{member.fatherName}
								</p>
								<p>
									<strong>Contato:</strong>{" "}
									{member.fatherContact}
								</p>
								<p>
									<strong>Email:</strong> {member.fatherEmail}
								</p>
							</div>
						)}
						{member.motherName && (
							<div>
								<p>
									<strong>Nome da Mãe:</strong>{" "}
									{member.motherName}
								</p>
								<p>
									<strong>Contato:</strong>{" "}
									{member.motherContact}
								</p>
								<p>
									<strong>Email:</strong> {member.motherEmail}
								</p>
							</div>
						)}
						{!member.fatherName && !member.motherName && (
							<div>
								<p>
									<strong>Responsável Legal:</strong>{" "}
									{member.responsibleName}
								</p>
								<p>
									<strong>Contato:</strong>{" "}
									{member.responsibleContact}
								</p>
								<p>
									<strong>Email:</strong>{" "}
									{member.responsibleEmail}
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Dados Médicos */}
				<div className="mt-6 border rounded-md text-sm pb-6">
					<h3
						className="font-semibold px-4 py-3"
						style={{ color: "#021C4F" }}
					>
						Dados Médicos
					</h3>
					<div className="flex flex-col px-4">
						{member?.medicalData && (
							<div className="space-y-2">
								{[
									{ key: "catapora", label: "Catapora" },
									{ key: "meningite", label: "Meningite" },
									{ key: "hepatite", label: "Hepatite" },
									{ key: "dengue", label: "Dengue" },
									{ key: "pneumonia", label: "Pneumonia" },
									{ key: "malaria", label: "Malária" },
									{
										key: "febreAmarela",
										label: "Febre Amarela",
									},
									{ key: "sarampo", label: "Sarampo" },
									{ key: "tetano", label: "Tétano" },
									{ key: "variola", label: "Varíola" },
									{ key: "coqueluche", label: "Coqueluche" },
									{ key: "difteria", label: "Difteria" },
									{ key: "rinite", label: "Rinite" },
									{ key: "bronquite", label: "Bronquite" },
									{ key: "asma", label: "Asma" },
									{ key: "rubeola", label: "Rubéola" },
									{ key: "colera", label: "Cólera" },
									{ key: "covid19", label: "COVID-19" },
									{ key: "h1n1", label: "H1N1" },
									{ key: "caxumba", label: "Caxumba" },
									{
										key: "lactoseAllergy",
										label: "Alergia à Lactose",
									},
									{
										key: "bloodTransfusion",
										label: "Transfusão de Sangue",
									},
									{
										key: "faintingOrConvulsion",
										label: "Desmaio ou Convulsão",
										obsKey: "faintingOrSeizuresMedications",
									},
									{
										key: "skinAllergy",
										label: "Alergia de Pele",
										obsKey: "skinAllergyMedications",
									},
									{
										key: "allergy",
										label: "Alergia Geral",
										obsKey: "allergyMedications",
									},
									{
										key: "diabetic",
										label: "Diabetes",
										obsKey: "diabeticMedications",
									},
								].map((item, index) => {
									const hasCondition =
										member.medicalData[item.key];
									const observation = item.obsKey
										? member.medicalData[item.obsKey]
										: "";

									return (
										<div
											key={index}
											className="border-b pb-1"
										>
											<p className="font-medium">
												{item.label}:
											</p>
											{observation ? (
												<p className="ml-2 text-gray-700">
													<strong>Observação:</strong>{" "}
													{observation}
												</p>
											) : (
												<p className="ml-2 text-gray-700">
													{hasCondition
														? "Possui"
														: "Não possui"}
												</p>
											)}
										</div>
									);
								})}

								{/* Exibição dos campos livres (se tiverem conteúdo) */}
								{[
									{ key: "others", label: "Outras Doenças" },
									{
										key: "heartProblems",
										label: "Problemas Cardíacos",
									},
									{
										key: "drugAllergy",
										label: "Alergia a Medicamentos",
									},
									{ key: "deficiency", label: "Deficiência" },
									{
										key: "psychologicalDisorder",
										label: "Transtorno Psicológico",
									},
									{
										key: "recentFracture",
										label: "Fratura Recente",
									},
									{ key: "surgeries", label: "Cirurgias" },
									{
										key: "hospitalizationReasonLast5Years",
										label: "Internações nos últimos 5 anos",
									},
								].map((field, index) => {
									const value = member.medicalData[field.key];
									return value ? (
										<div
											key={index}
											className="border-b pb-1"
										>
											<p className="font-medium">
												{field.label}:
											</p>
											<p className="ml-2 text-gray-700">
												{value}
											</p>
										</div>
									) : null;
								})}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoMember;
