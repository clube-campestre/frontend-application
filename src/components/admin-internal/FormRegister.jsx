import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
//aaaaaaaaaaaaa 
const FormRegister = ({ formTitle, fields, onSubmit }) => {
	const [formData, setFormData] = useState(() =>
		fields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {
			nota: "",
		})
	);
	const [hoveredNota, setHoveredNota] = useState(0);

	const Toast = Swal.mixin({
		toast: true,
		position: "top",
		showConfirmButton: false,
		timer: 2500,
		timerProgressBar: true,
	});

	const handleChange = (id, valor) => {
		setFormData((prev) => ({ ...prev, [id]: valor }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	const getAddress = async (cep) => {
		try {
			const response = await fetch(
				`https://viacep.com.br/ws/${cep}/json/`
			);
			const data = await response.json();

			if (data.erro) {
				Toast.fire({
					icon: "error",
					title: "CEP não encontrado!",
				});
				return;
			}

			if (data.logradouro) handleChange("rua", data.logradouro);
			if (data.bairro) handleChange("bairro", data.bairro);
			if (data.uf) handleChange("estado", data.uf);
			if (data.localidade) handleChange("cidade", data.localidade);
		} catch (error) {
			console.error("Erro ao buscar CEP:", error);
			Toast.fire({
				icon: "error",
				title: "Erro ao buscar CEP",
			});
		}
	};

	const handleBlur = (id, valor) => {
		if (id === "cep" && valor.length === 8) {
			getAddress(valor);
		}
	};

	return (
		<div className="bg-gray-100 rounded-lg p-6 shadow-md max-w-4xl mx-auto">
			<div className="flex items-center mb-6">
				<div className="w-1 h-6 bg-[#FCAE2D] mr-2 rounded"></div>
				<h2 className="text-xl font-semibold text-gray-800">{formTitle}</h2>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="flex flex-wrap -mx-2">
					{fields.map((field) => (
						<div key={field.id} className="px-2 mb-4 w-1/3">
							<label
								htmlFor={field.id}
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								{field.label}
							</label>
							{renderizarCampo(
								field,
								formData,
								handleChange,
								handleBlur
							)}
						</div>
					))}

					<div className="px-2 mb-4 w-1/3">
						<label
							htmlFor="nota"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Nota
						</label>
						<div className="flex space-x-1">
							{[...Array(5).keys()].map((i) => {
								const valor = i + 1;
								return (
									<button
										key={valor}
										type="button"
										onClick={() => handleChange("nota", valor)}
										onMouseEnter={() => setHoveredNota(valor)}
										onMouseLeave={() => setHoveredNota(0)}
										className="w-8 h-8 rounded-full cursor-pointer"
									>
										{valor <= (formData.nota || hoveredNota) ? (
											<FaStar color="#FCAE2D" />
										) : (
											<FaRegStar color="#FCAE2D" />
										)}
									</button>
								);
							})}
						</div>
					</div>
				</div>



				<div className="flex justify-end mt-6">
					<button
						type="submit"
						className="px-6 py-2 bg-[#FCAE2D] text-white rounded-md hover:bg-[#e09a22] focus:outline-none focus:ring-2 focus:ring-[#FCAE2D] focus:ring-opacity-50"
					>
						Cadastrar
					</button>
				</div>
			</form>
		</div>
	);
};

const renderizarCampo = (campo, formData, handleChange, handleBlur) => {
	const { id, type, isRequired } = campo;

	return (
		<input
			type={type}
			id={id}
			value={formData[id] || ""}
			onChange={(e) => handleChange(id, e.target.value)}
			onBlur={(e) => handleBlur(id, e.target.value)}
			required={isRequired}
			className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCAE2D]"
		/>
	);
};

export default FormRegister;
