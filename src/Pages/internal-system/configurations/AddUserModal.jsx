import { useState, useEffect } from "react";
import { X } from "lucide-react";

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
                email: editingUser.email || "",
                password: editingUser.password || "", // Nota: Normalmente senhas não vêm do back, mas mantive a lógica original
                name: editingUser.name || "",
                access: editingUser.access || "",
            });
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePermissionChange = (permission) => {
        setForm({ ...form, access: permission });
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

    // Verifica se a permissão está selecionada (Lógica case-insensitive mantida)
    const isSelected = (permission) => {
        return form.access && form.access.toLowerCase() === permission.toLowerCase();
    };

    return (
        // Overlay com Backdrop Blur e Padding para evitar toque nas bordas em mobile
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            
            {/* Modal Card: Largura responsiva, Scroll se necessário (max-h) */}
            <div className="
                bg-white w-full max-w-lg rounded-2xl shadow-2xl 
                flex flex-col relative overflow-hidden
                max-h-[90vh] animate-in fade-in zoom-in-95 duration-200
            ">
                
                {/* Cabeçalho */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        {/* Acento visual laranja */}
                        <span className="h-6 w-1.5 bg-[#FCAE2D] rounded-full block"></span>
                        {editingUser ? "Editar Usuário" : "Novo Cadastro"}
                    </h2>
                    
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
                        aria-label="Fechar"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Corpo do Formulário com Scroll Interno */}
                <div className="p-6 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        
                        {/* Grupo: Nome */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                Nome Completo
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="
                                    w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white
                                    focus:ring-2 focus:ring-[#FCAE2D]/50 focus:border-[#FCAE2D] focus:outline-none
                                    transition-all placeholder:text-gray-400
                                "
                                placeholder="Ex: João Silva"
                                required
                            />
                        </div>

                        {/* Grupo: Email */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                E-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="
                                    w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white
                                    focus:ring-2 focus:ring-[#FCAE2D]/50 focus:border-[#FCAE2D] focus:outline-none
                                    transition-all placeholder:text-gray-400
                                "
                                placeholder="nome@exemplo.com"
                                required
                            />
                        </div>

                        {/* Grupo: Senha (Condicional) */}
                        {!editingUser && (
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="password" show={!editingUser} className="text-sm font-semibold text-gray-700">
                                    Senha
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="
                                        w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white
                                        focus:ring-2 focus:ring-[#FCAE2D]/50 focus:border-[#FCAE2D] focus:outline-none
                                        transition-all
                                    "
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        )}

                        {/* Grupo: Permissões (Condicional) */}
                        {!isOwnUser && (
                            <div className="mt-2">
                                <p className="text-sm font-semibold text-gray-700 mb-3">Nível de Acesso</p>
                                {/* Grid responsivo: 1 coluna no mobile muito pequeno, 2 no padrão */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {permissionsList.map((permission) => {
                                        const active = isSelected(permission);
                                        return (
                                            <div
                                                key={permission}
                                                onClick={() => handlePermissionChange(permission)}
                                                className={`
                                                    relative cursor-pointer px-4 py-3 rounded-xl border-2 transition-all duration-200
                                                    flex items-center gap-3
                                                    ${active 
                                                        ? "border-[#FCAE2D] bg-[#FCAE2D]/10" 
                                                        : "border-gray-100 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                                                    }
                                                `}
                                            >
                                                {/* Radio Customizado Visual */}
                                                <div className={`
                                                    w-5 h-5 rounded-full border flex items-center justify-center shrink-0
                                                    ${active ? "border-[#FCAE2D]" : "border-gray-400 bg-white"}
                                                `}>
                                                    {active && <div className="w-2.5 h-2.5 rounded-full bg-[#FCAE2D]" />}
                                                </div>
                                                
                                                <span className={`font-medium ${active ? "text-gray-900" : "text-gray-600"}`}>
                                                    {permission}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Rodapé com Ações */}
                        <div className="pt-4 mt-2 flex flex-col-reverse sm:flex-row justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="
                                    px-8 py-2.5 rounded-lg font-semibold text-white shadow-lg shadow-orange-200
                                    bg-gradient-to-r from-[#FCAE2D] to-orange-400 
                                    hover:to-orange-500 transform active:scale-95 transition-all
                                "
                            >
                                {editingUser ? "Salvar Alterações" : "Cadastrar Usuário"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}