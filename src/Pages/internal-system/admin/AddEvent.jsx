import React, { useState, useRef } from "react";

const AddEvent = () => {
	const [imagem, setImagem] = useState(null);
	const [arquivo, setArquivo] = useState(null);
	const fileInputRef = useRef(null);
	const imageInputRef = useRef(null);

	const handleImagemDrop = (e) => {
		e.preventDefault();

		const arquivos = e.dataTransfer?.files || e.target.files;
		if (arquivos && arquivos[0]) {
			const arquivo = arquivos[0];
			if (arquivo.type.startsWith("image/")) {
				setImagem(arquivo);
			}
		}
	};

	const handleArquivoChange = (e) => {
		const arquivos = e.target.files;
		if (arquivos && arquivos[0]) {
			setArquivo(arquivos[0]);
		}
	};

	[
		{
			id: "titulo",
			tipo: "texto",
			rotulo: "título",
			placeholder: "",
			obrigatorio: true,
		},
		{
			id: "descricao",
			tipo: "textarea",
			rotulo: "descrição",
			placeholder: "",
			obrigatorio: false,
		},
	];

	return (
		<div className="bg-gray-100 rounded-lg p-6 shadow-md max-w-4xl mx-auto">
			<div className="mb-6">
				<h2 className="text-xl font-semibold text-gray-800">
					Cadastrar evento
				</h2>
				<div className="w-8 h-1 bg-[#FCAE2D] mt-2"></div>
			</div>

			<div className="flex flex-wrap -mx-2">
				<div className="w-1/2 px-2 mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						título
					</label>
					<input
						type="text"
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCAE2D]"
					/>

					<label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
						descrição
					</label>
					<textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCAE2D] h-32" />

					<div className="mt-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							anexe um arquivo{" "}
							<span className="text-gray-400 text-xs">
								(opcional)
							</span>
						</label>
						<div className="flex items-center">
							<input
								type="file"
								ref={fileInputRef}
								onChange={handleArquivoChange}
								className="hidden"
							/>
							<button
								type="button"
								onClick={() => fileInputRef.current.click()}
								className="flex items-center text-sm border border-gray-300 rounded-md px-3 py-2"
							>
								{arquivo ? arquivo.name : "anexe um arquivo"}
								<span className="ml-2 text-[#FCAE2D]">
									<svg
										width="16"
										height="20"
										viewBox="0 0 16 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M2 0C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V6L10 0H2Z"
											fill="#FCAE2D"
										/>
									</svg>
								</span>
							</button>
						</div>
					</div>
				</div>

				<div className="w-1/2 px-2 mb-4">
					<div
						className="border-2 border-dashed border-gray-300 rounded-md h-40 flex flex-col items-center justify-center cursor-pointer"
						onClick={() => imageInputRef.current.click()}
						onDrop={handleImagemDrop}
						onDragOver={(e) => e.preventDefault()}
					>
						<input
							type="file"
							accept="image/*"
							ref={imageInputRef}
							onChange={handleImagemDrop}
							className="hidden"
						/>
						{imagem ? (
							<img
								src={URL.createObjectURL(imagem)}
								alt="Prévia"
								className="max-h-full max-w-full object-contain"
							/>
						) : (
							<>
								<p className="text-sm text-gray-500 mb-2">
									Arraste ou selecione
								</p>
								<p className="text-sm text-gray-500">
									a imagem aqui
								</p>
								<svg
									className="mt-2"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
										stroke="#FCAE2D"
										strokeWidth="2"
									/>
								</svg>
							</>
						)}
					</div>
				</div>
			</div>

			<div className="flex justify-end mt-6">
				<button
					type="submit"
					className="px-6 py-2 bg-[#FCAE2D] text-white rounded-md hover:bg-[#e09a22] focus:outline-none focus:ring-2 focus:ring-[#FCAE2D] focus:ring-opacity-50"
				>
					cadastrar
				</button>
			</div>
		</div>
	);
};

export default AddEvent;
