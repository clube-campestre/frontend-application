import { useState, useEffect } from "react";
// Substituindo react-icons por lucide-react para design mais limpo e moderno
import { Pencil, Trash2, UserPlus, Users, SearchX } from "lucide-react";
import Toast from "../../../utils/Toast";
import AddUserModal from "./AddUserModal";
import { getAllAccounts, updateAccount, registerAccount, deleteAccount } from "../../../services/accountsService";
import Swal from "sweetalert2";
import { getUser } from "../../../utils/authStorage";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isOwnUser, setIsOwnUser] = useState(false);

    useEffect(() => {
        const currentUser = getUser();
        setIsOwnUser(currentUser.userId === editingUser?.id);
    }, [editingUser]);

    const fetchUsers = async () => {
        try {
            const data = await getAllAccounts();
            if (data) {
                setUsers(data);
                setError(null);
            } else {
                setUsers([]);
            }
            setLoading(false);
        } catch (err) {
            setError("Ocorreu um erro ao buscar os usuários.");
            setLoading(false);
            console.error("Error fetching users:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = async (user) => {
        if (editingUser) {
            try {
                const result = await updateAccount(editingUser.id, user);
                if (result) {
                    setEditingUser(null);
                    // Recarregar página após editar usuário
                    window.location.reload();
                }
            } catch (err) {
                Toast.fire({ icon: "error", title: "Ocorreu um erro ao editar usuário." });
                console.error("Error editing user:", err);
            }
        } else {
            try {
                const result = await registerAccount(user);
                if (result) {
                    // Recarregar página após cadastrar novo usuário
                    window.location.reload();
                }
            } catch (err) {
                Toast.fire({ icon: "error", title: "Ocorreu um erro ao adicionar usuário." });
                console.error("Error adding user:", err);
            }
        }
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Deseja deletar?",
            text: "Essa ação não pode ser desfeita.",
            icon: "warning",
            iconColor: "#ef4444",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sim, deletar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const success = await deleteAccount(id);
                    if (success) {
                        // Recarregar página após excluir usuário
                        window.location.reload();
                    }
                } catch (err) {
                    setError("Ocorreu um erro ao deletar o usuário.");
                    Toast.fire({ icon: "error", title: "Erro ao deletar usuário." });
                    console.error("Error deleting user:", err);
                }
            }
        });
    };

    const handleShowAddModal = () => {
        setEditingUser(null);
        setShowModal(true);
    };

    const handleShowEditModal = (user) => {
        setEditingUser(user);
        setShowModal(true);
    };

    return (
        // Container Principal: Ajuste de padding responsivo (p-4 mobile, p-8 desktop)
        <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                
                {/* Header: Flex Column no Mobile, Row no Desktop */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="bg-amber-400 w-2 h-8 rounded-full inline-block"></span>
                            Gestão de Usuários
                        </h1>
                        <p className="text-gray-500 text-sm mt-1 ml-4">
                            Gerencie o acesso e permissões da equipe.
                        </p>
                    </div>

                    <button
                        onClick={handleShowAddModal}
                        className="
                            w-full md:w-auto
                            flex items-center justify-center gap-2 
                            bg-blue-900 hover:bg-blue-800 text-white 
                            px-5 py-3 rounded-xl 
                            shadow-lg shadow-blue-900/20 
                            transition-all active:scale-95
                        "
                    >
                        <UserPlus size={20} />
                        <span className="font-semibold">Novo Usuário</span>
                    </button>
                </div>

                {/* Área de Conteúdo */}
                <div className="space-y-4">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2">
                            <SearchX size={20} /> {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="p-12 text-center text-gray-400 flex flex-col items-center animate-pulse">
                            <Users size={48} className="mb-4 opacity-20" />
                            <p>Carregando usuários...</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {users.length === 0 && !error ? (
                                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                                    <Users size={48} className="mx-auto text-gray-300 mb-3" />
                                    <p className="text-gray-500 font-medium">Nenhum usuário encontrado</p>
                                </div>
                            ) : (
                                users.map((user) => (
                                    // Card do Usuário: Flex Column (Mobile) -> Flex Row (Desktop)
                                    <div
                                        key={user.id}
                                        className="
                                            bg-white p-5 rounded-2xl 
                                            border border-gray-100 shadow-sm hover:shadow-md 
                                            transition-all duration-300
                                            flex flex-col md:flex-row md:items-center justify-between
                                            gap-4
                                        "
                                    >
                                        {/* Informações do Usuário */}
                                        <div className="flex items-start gap-4">
                                            {/* Avatar Placeholder estilizado */}
                                            <div className="hidden sm:flex h-12 w-12 rounded-full bg-blue-50 items-center justify-center text-blue-700 font-bold text-lg shrink-0">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>

                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-gray-800 text-lg leading-tight">
                                                    {user.name}
                                                </h3>
                                                <span className="text-gray-500 text-sm break-all">
                                                    {user.email}
                                                </span>
                                                
                                                {/* Badge de Acesso */}
                                                <div className="mt-2">
                                                    <span className="
                                                        inline-flex items-center px-2.5 py-0.5 rounded-full 
                                                        text-xs font-medium bg-gray-100 text-gray-800
                                                    ">
                                                        {user.access}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ações: Botões grandes no mobile (full width se quiser, ou flex row) */}
                                        <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 w-full md:w-auto justify-end">
                                            <button
                                                onClick={() => handleShowEditModal(user)}
                                                className="
                                                    p-2 rounded-lg 
                                                    text-amber-500 bg-amber-50 hover:bg-amber-100 
                                                    transition-colors
                                                "
                                                title="Editar"
                                            >
                                                <Pencil size={20} />
                                            </button>
                                            
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="
                                                    p-2 rounded-lg 
                                                    text-red-500 bg-red-50 hover:bg-red-100 
                                                    transition-colors
                                                "
                                                title="Excluir"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <AddUserModal
                    onClose={() => setShowModal(false)}
                    onUserAdded={handleAddUser}
                    editingUser={editingUser}
                    isOwnUser={isOwnUser}
                />
            )}
        </div>
    );
}