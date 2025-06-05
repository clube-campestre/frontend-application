import { IoMdClose } from "react-icons/io";

const InfoMember = ({ member, onClose }) => {
	if (!member) return null;

	return (
		<div className="fixed inset-0 bg-[#000000da]  bg-opacity-40 flex items-center justify-center z-50 font-sans">
			<div className="bg-white rounded-lg w-[90%] h-[90%] shadow-lg p-6 overflow-y-auto relative">
				<button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black">
					<IoMdClose />
				</button>

				<div className="flex items-center space-x-2 border-b border-gray-300 pb-2 mb-4">
					<div className="w-2 h-6 bg-yellow-500 rounded"></div>
					<h2 className="text-xl font-semibold" style={{ color: "#232222" }}>Dados pessoais</h2>
				</div>

				<div className="p-4 rounded-md grid grid-cols-3 gap-4 text-sm" style={{ backgroundColor: "#666666", color: "#fff" }}>
					<div className="flex items-center space-x-3 col-span-1">
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEaBVDfj_YlWbHCteGTaLBQu8aYMC2o2LBuOHEkjC-GqXCnRoTrnd7fBF-bdjLK89Lv4&usqp=CAU" alt="Foto" className="rounded-full w-16 h-16" />
						<div>
							<p className="font-bold">{member.name}</p>
							<p>Papel da classe: Auditor</p>
							<p>Categoria da classe: Amigo</p>
							<p>Função da unidade: Capitão</p>
							<p>email: up-aventureiros@gmail.com</p>
						</div>
					</div>
					<div>
						<p><strong>CPF:</strong> 43476657641</p>
						<p><strong>Data Nasc:</strong> 15/07/2000</p>
						<p><strong>Batizado:</strong> Sim</p>
						<p><strong>Telefone:</strong> (11) 96778-5520</p>
						<p><strong>Contato:</strong> (11) 96587-5023</p>
					</div>
					<div>
						<p><strong>CEP:</strong> 07135682</p>
						<p><strong>Estado:</strong> São Paulo</p>
						<p><strong>Cidade:</strong> Guarulhos</p>
						<p><strong>Bairro:</strong> Jardim altas aventuras</p>
						<p><strong>Endereço:</strong> Rua Up o melhor desbravador</p>
					</div>
				</div>

				<div className="mt-6 border rounded-md p-4 text-sm">
					<h3 className="font-semibold mb-2" style={{ color: "#021C4F" }}>Contato do Responsável</h3>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p><strong>Nome:</strong> Ellie Rodrigues da Silva Lima</p>
							<p><strong>Email:</strong> ellie@gmail.com.br</p>
							<p><strong>Contato:</strong> (11)8526-6548</p>
						</div>
						<div>
							<p><strong>Nome:</strong> Carll Velaskes Rodrigues Lima</p>
							<p><strong>Email:</strong> carll@gmail.com.br</p>
							<p><strong>Contato:</strong> (11)96926-6541</p>
						</div>
					</div>
				</div>

			
				<div className="mt-6 border rounded-md text-sm pb-6">
					<h3 className="font-semibold px-4 py-3" style={{ color: "#021C4F" }}>Dados Médicos</h3>
					<div className="flex flex-col">
						<div className="px-4 py-1" style={{ backgroundColor: "#D9D9D9" }}>
							<p><strong>Rinite:</strong> Sim</p>
						</div>
						<div className="px-4 py-1 bg-white">
							<p><strong>Alergia:</strong> Sim</p>
						</div>
						<div className="px-4 py-1" style={{ backgroundColor: "#D9D9D9" }}>
							<p><strong>Bronquite:</strong> Sim</p>
						</div>
						<div className="px-4 py-1 bg-white">
							<p><strong>Possui alergia? Se sim, quais e qual medicamento usa?</strong></p>
							<p>Alergia a peixe. Uso fenergan.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoMember;
