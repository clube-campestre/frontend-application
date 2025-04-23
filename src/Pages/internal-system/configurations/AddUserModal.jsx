import { useState, useEffect } from "react";

export default function AddUserModal({ onClose, onUserAdded, editingUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    permission: "",
  });

  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name,
        email: editingUser.email,
        password: "",
        permission: editingUser.access,
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      id: editingUser ? editingUser.id : Date.now(),
      name: form.name,
      email: form.email,
      access: form.permission,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-[#f3f3f3] p-8 rounded-xl shadow-lg min-w-[400px] relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">
          <span className="border-l-8 border-[#FCAE2D] mr-3"></span>
          {editingUser ? "Editar Usuário" : "Cadastrar Usuário"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="nome"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border"
            required
          />
          {editingUser ? null : (
            <input
              type="password"
              name="password"
              placeholder="senha"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border"
              required
            />
          )}

          <div>
            <p className="font-semibold">Permissões</p>
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
                    onChange={() => form.permission = permission}
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
          </div>

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
