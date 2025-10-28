import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { maskCpf, maskBirthCertificate, maskPhone, maskCep } from "../../utils/validators/addMemberValidator";
import AddMemberInput from "../add-member-input/AddMemberInput"; // <— novo

const EditModal = ({
    onClose,
    onSubmit,
    editingItem,
    title,
    fields,
    containerClassName = "",   // <— existente
    floatingLabels = false,     // <— novo
    ...props
}) => {
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

		valor = String(valor);

		if (name === "cpf") {
			return maskCpf(valor);
		}
		if (name === "birthCertificate") {
			return maskBirthCertificate(valor);
		}
		if (
			name === "contact" ||
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
			cleanedForm.transactionDate = new Date(cleanedForm.transactionDate);
		}
		onSubmit(cleanedForm);
		console.log("Form submitted:", cleanedForm);
	};

	// Fechar com ESC
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") onClose && onClose();
		};
		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [onClose]);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
			onClick={onClose} // clique no fundo fecha
		>
			<div
				className={`bg-white rounded-xl shadow-lg p-6 max-w-[90vw] relative ${containerClassName}`}
				onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
			>
				{/* Botão X para fechar */}
				<button
					type="button"
					aria-label="Fechar"
					onClick={onClose}
					className="absolute top-3 right-3 text-2xl leading-none text-gray-500 hover:text-gray-700 cursor-pointer"
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
						onSubmit(form);
					}}
					className="space-y-4"
				>
					<div className="grid grid-cols-1 gap-4">
						{fields?.map((field) => {
                            const { name, label, type = "text", options } = field;
                            const value = form?.[name] ?? "";

                            if (
                                floatingLabels &&
                                ["text", "number"].includes(String(type).toLowerCase())
                            ) {
                                return (
                                    <div key={name}>
                                        <AddMemberInput
                                            id={name}
                                            name={name}
                                            type={String(type).toLowerCase()}
                                            label={label}
                                            value={applyFieldsMasks(name, value)}
                                            onChange={handleChange}
                                            className="w-full"
                                        />
                                    </div>
                                );
                            }

                            return (
                                <div key={name} className="flex flex-col">
                                    <label htmlFor={name} className="font-medium text-gray-700 mb-1">
                                        {label}
                                    </label>
                                    {type === "radio" ? (
										<div className="flex gap-4">
											{options.map((option) => (
												<label
													key={option}
													className="flex items-center gap-2 cursor-pointer"
												>
													<input
														type="radio"
														name={name}
														value={option}
														checked={
															form[
																name
															]?.toLowerCase?.() ===
															option.toLowerCase()
														}
														onChange={() =>
															setForm({
																...form,
																[name]:
																	option,
															})
														}
														className="accent-[#FCAE2D]"
													/>
													<span className="text-gray-700">
														{option}
													</span>
												</label>
											))}
										</div>
									) : type === "color" ? (
										<div className="flex items-center gap-4">
											<input
												type="color"
												name={name}
												value={
													form[name] ||
													"#000000"
												}
												onChange={handleChange}
												required={field.required}
												className="w-24 h-11 rounded cursor-pointer"
												style={{
													backgroundColor:
														form[name],
												}}
											/>
											<span className="text-sm">
												{form[name]}
											</span>
										</div>
									) : type === "select" ? (
										<select
											className="w-full px-3 py-2 rounded border"
											name={name}
											value={form[name] || ""}
											onChange={handleChange}
											required={field.required}
										>
											<option value="">
												{field.selectedOption || "Selecione uma opção"}
											</option>
											{options.map((option) => (
												<option
													key={option.value}
													value={option.value}
												>
													{option.label}
												</option>
											))}
										</select>
									) : type === "date" ? (
										<input
											className="w-full px-3 py-2 rounded border"
											type={type}
											name={name}
											value={
												form[name]
													? new Date(form[name])
															.toISOString()
															.slice(0, 10)
													: ""
											}
											onChange={handleChange}
											required={field.required}
										/>
									) : name === "rating" ? (
										<div>
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
									) : type === "checkbox" ? (
										<div className="flex items-center gap-2 mb-4">
											<input
												type="checkbox"
												id={name}
												name={name}
												checked={!!form[name]}
												onChange={(e) =>
													setForm({
														...form,
														[name]: e.target.checked,
													})
												}
												className="accent-[#FCAE2D] w-5 h-5 rounded border-gray-300"
											/>
											<label htmlFor={name} className="text-gray-700 font-medium">
												{label}
											</label>
										</div>
									) : (
										<input
											className="w-full px-3 py-2 rounded border"
											type={type}
											name={name}
											value={applyFieldsMasks(
												name,
												form[name] || ""
											)}
											onChange={handleChange}
											placeholder={
												field.placeholder || ""
											}
											required={field.required}
										/>
									)}
								</div>
							);
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
};

export default EditModal;
