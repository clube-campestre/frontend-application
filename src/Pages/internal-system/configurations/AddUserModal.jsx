import { useState, useEffect } from "react";

export default function AddUserModal({
	onClose,
	onUserAdded,
	editingUser,
	isOwnUser,
}) {
	const [form, setForm] = useState({
		email: "",
		password: "",
		name: "",
		access: "",
	});

	useEffect(() => {
		if (editingUser) {
			setForm({
				email: editingUser.email,
				password: editingUser.password,
				name: editingUser.name,
				access: editingUser.access,
			});
		}
	}, [editingUser]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = {
			email: form.email,
			password: form.password,
			name: form.name,
			access: form.access.toUpperCase(),
		};

		onUserAdded(user);
	};

	const permissionsList = [
		"Tesouraria",
		"Supervisor",
		"Diretor",
		"Executivo",
	];

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000e7]">
			<div className="bg-[#f3f3f3] p-10 rounded-xl shadow-lg min-w-[400px] relative">
				<button
					onClick={onClose}
					className="absolute top-3 right-2 text-2xl"
				>
					×
				</button>
				<h2 className="text-xl font-semibold mb-4">
					<span className="border-l-8 border-[#FCAE2D] mr-3"></span>
					{editingUser ? "Editar Usuário" : "Cadastrar Usuário"}
				</h2>
				<form onSubmit={handleSubmit} className="space-y-5">
					<label htmlFor="name">Nome</label>
					<input
						type="text"
						name="name"
						value={form.name}
						onChange={handleChange}
						className="w-full px-3 py-2 rounded border"
						required
					/>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						className="w-full px-3 py-2 rounded border"
						required
					/>
					{editingUser ? null : (
						<>
							<label htmlFor="password">Senha</label>
							<input
								type="password"
								name="password"
								value={form.password}
								onChange={handleChange}
								className="w-full px-3 py-2 rounded border"
								required
							/>
						</>
					)}

					{isOwnUser ? null : (
						<div>
							<p className="font-semibold">Permissão de acesso</p>
							<div className="grid grid-cols-2 gap-2 mt-2">
								{permissionsList.map((permission) => (
									<label
										key={permission}
										className="flex items-center gap-2 cursor-pointer"
									>
										<input
											type="radio"
											name="permission"
											value={permission}
											onChange={() =>
												setForm({
													...form,
													access: permission,
												})
											}
											checked={
												editingUser
													? form.access.toLowerCase() ==
														permission.toLowerCase()
													: undefined
											}
										/>
										<span>{permission}</span>
									</label>
								))}
							</div>
						</div>
					)}

					<div className="flex justify-end">
						<button
							type="submit"
							className="bg-[#FCAE2D] text-white px-6 py-2 rounded font-semibold hover:bg-[#e29d23]"
						>
							{editingUser ? "Salvar Alterações" : "Cadastrar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
