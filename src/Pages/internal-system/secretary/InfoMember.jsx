import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaUser, FaUsers, FaNotesMedical } from "react-icons/fa";
import avatarImage from "../../../assets/images/avatar.png"; // novo

const InfoMember = ({ member, onClose }) => {
	if (!member) return null;

	const resolveImageSrc = (m) => {
		const preview = (m?.imagePreview || "").trim();
		if (preview && preview.startsWith("data:")) return preview;

		const raw = (m?.image || m?.imageMostrar || "").trim();
		const fmt = (m?.imageFormat || "").trim(); // ex: image/png
		if (raw) {
			if (raw.startsWith("data:")) return raw; // já vem completo
			const mime = fmt && fmt.includes("/") ? fmt : "image/jpeg";
			return `data:${mime};base64,${raw}`;
		}

		const path = (m?.imagePath || "").trim();
		if (path) {
			if (path.startsWith("http") || path.startsWith("data:")) return path;
			const looksBase64 = /^[A-Za-z0-9+/]+=*$/.test(path) && path.length > 100;
			if (looksBase64) return `data:image/jpeg;base64,${path}`;
		}

		if (m?.idImage && /^[\w-]{20,}$/.test(m.idImage)) {
			return `https://drive.google.com/thumbnail?id=${m.idImage}`;
		}
		return avatarImage;
	};

	return (
		<div className="fixed inset-0 bg-white z-50 overflow-y-auto flex items-center justify-center p-10 font-sans">
			<div className="bg-white rounded-md shadow p-14 flex justify-between items-start max-w-4xl w-full">
				<div className="flex flex-col w-1/2 space-y-8">
					<button
						onClick={onClose}
						className="flex items-center text-blue-900 font-bold text-base mb-8"
					>
						<div className="bg-blue-900 rounded-full p-2 mr-3">
							<IoIosArrowBack className="text-white text-lg" />
						</div>
						Voltar
					</button>

					<h2 className="text-xl font-bold text-gray-800 border-l-4 border-yellow-400 pl-4 mb-6">
						Dados Gerais
					</h2>

					<InfoButton
						icon={<FaUser className="text-xl" />}
						label="Dados pessoais"
						color="bg-purple-500"
					/>
					<InfoButton
						icon={<FaUsers className="text-xl" />}
						label="Dados dos responsáveis"
						color="bg-blue-400"
					/>
					<InfoButton
						icon={<FaNotesMedical className="text-xl" />}
						label="Dados médicos"
						color="bg-green-500"
					/>
				</div>

				<div className="flex flex-col items-center space-y-4 w-1/3">
					<img
						src={resolveImageSrc(member)}
						alt="Foto do membro"
						className="w-32 h-32 rounded-full object-cover"
					/>

					<h3 className="text-2xl font-bold text-gray-800">
						{member.name}
					</h3>
					<p className="text-lg text-gray-600">
						Categoria da classe: {member.category || "-"}
					</p>
					<p className="text-lg text-gray-600">
						Função da unidade: {member.role || "-"}
					</p>
				</div>
			</div>
		</div>
	);
};

const InfoButton = ({ icon, label, color }) => (
	<div className="w-[320px] bg-white shadow border rounded-md px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
		<div className="flex items-center space-x-4">
			<span className="text-blue-900">{icon}</span>
			<span className="text-gray-800 font-semibold text-lg">{label}</span>
		</div>
		<span className={`w-5 h-5 ${color} rounded-full`} />
	</div>
);

export default InfoMember;
