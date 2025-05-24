import { useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

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
		
		if (newData.price) {
			const priceStr = String(newData.price);
			newData.price = priceStr
				.replace(/[^\d,]/g, "")
				.replace(",", ".");
		}
		if (newData.contact) {
			newData.contact = newData.contact.replace(/\D/g, "");
		}
		if (newData.driverContact) {
			newData.driverContact = newData.driverContact.replace(/\D/g, "");
		}
		if (newData.companyContact) {
			newData.companyContact = newData.companyContact.replace(/\D/g, "");
		}
		if (newData.cep) {
			newData.cep = newData.cep.replace(/\D/g, "");
		}
		return newData;
	};

	function applyFieldsMasks(name, valor) {
		if (valor === undefined || valor === null) return "";

		valor = String(valor); // Converte para string

		if (name === "cep") {
			const onlyNums = valor.replace(/\D/g, "").slice(0, 8);
			if (onlyNums.length <= 5) return onlyNums;
			return onlyNums.slice(0, 5) + "-" + onlyNums.slice(5);
		}

		if (name === "cotacao") {
			const numeric = valor.replace(/\D/g, "");
			const cents = (parseInt(numeric, 10) / 100).toFixed(2);
			return "R$ " + cents.replace(".", ",");
		}

		if (name === "telefone") {
			const nums = valor.replace(/\D/g, "").slice(0, 11);
			if (nums.length <= 10) {
				return nums.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
			}
			return nums.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
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
			name === "driverContact" ||
			name === "companyContact" ||
			name === "contact"
		) {
			newValue = formatPhone(value);
		}

		setForm({ ...form, [name]: newValue });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const cleanedForm = removeMasks(form);
		if (cleanedForm.transactionDate) {
			cleanedForm.transactionDate = new Date(
				cleanedForm.transactionDate
			);
		}
		onSubmit(cleanedForm);
		console.log("Form submitted:", cleanedForm);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000da]">
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

				<form onSubmit={handleSubmit} className="space-y-5">
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
												Selecione uma opção
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
