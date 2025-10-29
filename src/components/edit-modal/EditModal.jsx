import { useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { maskCpf, maskBirthCertificate, maskPhone, maskCep } from "../../utils/validators/addMemberValidator";

export default function EditModal({
	onClose,
	onSubmit,
	editingItem,
	fields,
	title,
}) {
	const [form, setForm] = useState({});
	const [hoveredNota, setHoveredNota] = useState(0);

	useEffect(() => {
		if (editingItem) {
			setForm(editingItem);
		}
	}, [editingItem]);

	const formatBRL = (value) => {
		const numericValue = value.replace(/\D/g, "");
		const floatValue = parseFloat(numericValue) / 100;
		if (isNaN(floatValue)) return "";
		return floatValue.toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	};

	console.log("Form data:", form);

	const formatPhone = (value) => {
		const cleaned = value.replace(/\D/g, "").slice(0, 11);
		const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
		if (!match) return "";

		const [, ddd, first, second] = match;
		let result = "";
		if (ddd) result += `(${ddd}`;
		if (ddd.length === 2) result += `) `;
		if (first) result += first;
		if (second) result += `-${second}`;
		return result;
	};

	const formatCEP = (value) => {
		let cep = value.replace(/\D/g, "");
		if (cep.length > 5) {
			cep = cep.slice(0, 5) + "-" + cep.slice(5, 8);
		}
		return cep.slice(0, 9);
	};

	const removeMasks = (data) => {
		const newData = { ...data };
		console.log("Removing masks from data:", newData);

		if (newData.price) {
			const priceStr = String(newData.price);
			newData.price = priceStr.replace(/[^\d,]/g, "").replace(",", ".");
		}
		if (newData.contactCellphoneNumber) {
			newData.contactCellphoneNumber = newData.contactCellphoneNumber.replace(/\D/g, "");
		}
		if (newData.driverNumber) {
			newData.driverNumber = newData.driverNumber.replace(/\D/g, "");
		}
		if (newData.companyNumber) {
			newData.companyNumber = newData.companyNumber.replace(/\D/g, "");
		}
		if (newData.cep) {
			newData.cep = newData.cep.replace(/\D/g, "");
		}
		return newData;
	};

	function applyFieldsMasks(name, valor) {
		if (valor === undefined || valor === null) return "";

		valor = String(valor);

		if (name === "cpf") {
			return maskCpf(valor);
		}
		if (name === "birthCertificate") {
			return maskBirthCertificate(valor);
		}
		if (
			name === "contactCellphoneNumber" ||
			name === "driverNumber" ||
			name === "companyNumber" ||
			name === "fatherContact" ||
			name === "motherContact" ||
			name === "responsibleContact"
		) {
			return maskPhone(valor);
		}
		if (name === "cep") {
			return maskCep(valor);
		}

		return valor;
	}

	const handleChange = (e) => {
		const { name, value } = e.target;	
		let newValue = value;

		if (name === "cep") {
			newValue = formatCEP(value);
		} else if (name === "price") {
			newValue = formatBRL(value);
		} else if (
			name === "driverNumber" ||
			name === "companyNumber" ||
			name === "contactCellphoneNumber"
		) {
			newValue = formatPhone(value);
		}

		setForm({ ...form, [name]: newValue });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const cleanedForm = removeMasks(form);
		if (cleanedForm.transactionDate) {
			cleanedForm.transactionDate = new Date(cleanedForm.transactionDate);
		}
		onSubmit(cleanedForm);
		console.log("Form submitted:", cleanedForm);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-[#000000da]">
			<div className="bg-[#f3f3f3] p-10 rounded-xl shadow-lg min-w-[500px] relative">
				<button
					onClick={onClose}
					className="absolute top-1 right-3 text-3xl"
				>
					×
				</button>
				<h2 className="text-xl font-semibold mb-4">
					<span className="border-l-4 border-[#FCAE2D] mr-3"></span>
					{title}
				</h2>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						// onSubmit(form); // formData = dados editados
						onSubmit(handleSubmit(e));
					}}
					className="space-y-5"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{fields.map((field) => {
							if (field.type === "radio") {
								return (
									<div key={field.name}>
										<p className="font-semibold">
											{field.label}
										</p>
										<div className="grid grid-cols-2 gap-2 mt-2">
											{field.options.map((option) => (
												<label
													key={option}
													className="flex items-center gap-2 cursor-pointer"
												>
													<input
														type="radio"
														name={field.name}
														value={option}
														checked={
															form[
																field.name
															]?.toLowerCase?.() ===
															option.toLowerCase()
														}
														onChange={() =>
															setForm({
																...form,
																[field.name]:
																	option,
															})
														}
													/>
													<span>{option}</span>
												</label>
											))}
										</div>
									</div>
								);
							} else if (field.type === "color") {
								return (
									<div key={field.name}>
										<label>
											{field.label}
										</label>
										<div className="flex items-center gap-4">
											<input
												type="color"
												name={field.name}
												value={
													form[field.name] ||
													"#000000"
												}
												onChange={handleChange}
												required={field.required}
												className="w-24 h-11 rounded cursor-pointer"
												style={{
													backgroundColor:
														form[field.name],
												}}
											/>
											<span className="text-sm">
												{form[field.name]}
											</span>
										</div>
									</div>
								);
							} else if (field.type === "select") {
								return (
									<div key={field.name}>
										<label htmlFor={field.name}>
											{field.label}
										</label>
										<select
											className="w-full px-3 py-2 rounded border"
											name={field.name}
											value={form[field.name] || ""}
											onChange={handleChange}
											required={field.required}
										>
											<option value="">
												{field.selectedOption || "Selecione uma opção"}
											</option>
											{field.options.map((option) => (
												<option
													key={option.value}
													value={option.value}
												>
													{option.label}
												</option>
											))}
										</select>
									</div>
								);
							} else if (field.type === "date") {
								return (
									<div key={field.name}>
										<label htmlFor={field.name}>
											{field.label}
										</label>
										<input
											className="w-full px-3 py-2 rounded border"
											type={field.type}
											name={field.name}
											value={
												form[field.name]
													? new Date(form[field.name])
															.toISOString()
															.slice(0, 10)
													: ""
											}
											onChange={handleChange}
											required={field.required}
										/>
									</div>
								);
							} else if (field.name === "rating") {
								return (
									<div key={field.name}>
										<label className="block mb-1 font-medium">
											Nota
										</label>
										<div className="flex space-x-1">
											{[1, 2, 3, 4, 5].map((valor) => (
												<button
													key={valor}
													type="button"
													onClick={() =>
														setForm({
															...form,
															rating: valor,
														})
													}
													onMouseEnter={() =>
														setHoveredNota(valor)
													}
													onMouseLeave={() =>
														setHoveredNota(0)
													}
													className="w-8 h-8 rounded-full cursor-pointer"
												>
													{valor <=
													(hoveredNota ||
														form.rating ||
														0) ? (
														<FaStar color="#FCAE2D" />
													) : (
														<FaRegStar color="#FCAE2D" />
													)}
												</button>
											))}
										</div>
									</div>
								);
							} else if (field.type === "checkbox") {
								return (
									<div key={field.name} className="flex items-center gap-2 mb-4">
										<input
											type="checkbox"
											id={field.name}
											name={field.name}
											checked={!!form[field.name]}
											onChange={(e) =>
												setForm({
													...form,
													[field.name]: e.target.checked,
												})
											}
											className="accent-[#FCAE2D] w-5 h-5 rounded border-gray-300"
										/>
										<label htmlFor={field.name} className="text-gray-700 font-medium">
											{field.label}
										</label>
									</div>
								);
							} else {
								return (
									<div key={field.name}>
										<label htmlFor={field.name}>
											{field.label}
										</label>
										<input
											className="w-full px-3 py-2 rounded border"
											type={field.type}
											name={field.name}
											value={applyFieldsMasks(
												field.name,
												form[field.name] || ""
											)}
											onChange={handleChange}
											placeholder={
												field.placeholder || ""
											}
											required={field.required}
										/>
									</div>
								);
							}
						})}
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							className="bg-[#FCAE2D] text-white px-6 py-2 rounded font-semibold hover:bg-[#e29d23]"
						>
							Salvar Alterações
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
