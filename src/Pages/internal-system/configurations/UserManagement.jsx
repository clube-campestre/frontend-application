import { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash, FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import AddUserModal from "../configurations/AddUserModal";
import { api } from "../../../provider/api"

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  const fetchUsers = async () => {
    try {
      const response = await api.get("/accounts");
      setUsers(response.data);
      setError(null);
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

  const handleUserAdded = (user) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      Toast.fire({
        icon: "success",
        title: "Usuário editado com sucesso!",
      });
    } else {
      setUsers([...users, { ...user, id: users.length + 1 }]);
      Toast.fire({
        icon: "success",
        title: "Usuário adicionado com sucesso!",
      });
    }
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Deseja deletar este usuário?",
      text: "Essa ação não pode ser desfeita.",
      icon: "warning",
      iconColor: "#d33",
      showCancelButton: true,
      confirmButtonColor: "#5ccb5f",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Deletar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/accounts/${id}`);
          const response = await api.get("/accounts");
          setUsers(response.data);
          Toast.fire({
            icon: "success",
            title: "Usuário deletado com sucesso!",
          });
        } catch (err) {
          setError("Ocorreu um erro ao deletar o usuário.");
          Toast.fire({
            icon: "error",
            title: "Ocorreu um erro ao deletar usuário.",
          });
          console.error("Error deleting user:", err);
        }
      }
    });
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full px-15 py-10">
      <div className="p-4 bg-[#EDEDED] rounded-lg">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-lg font-medium">
            <span className="border-l-8 border-[#FCAE2D] mr-3"></span>
            Usuários Cadastrados
          </h1>
          <button
            onClick={handleAddUser}
            className="flex items-center gap-1 bg-[#D9D9D9] hover:bg-gray-300 px-3 py-1 rounded-md transition-colors"
          >
            <span>Adicionar Usuário</span>
            <FaPlusCircle size={18} />
          </button>
        </div>

        <div className="bg-white">
          {error && <div className="p-6 text-center text-red-500">{error}</div>}
          {loading ? (
            <div className="p-6 text-center text-gray-500">Carregando...</div>
          ) : (
            <ul className="flex flex-col gap-4 bg-[#EDEDED] p-4 rounded-md">
              {users.length === 0 && !error ? (
                <p className="text-gray-500 italic">
                  Nenhum usuário foi encontrado
                </p>
              ) : (
                users.map((user) => (
                  <li
                    key={user.id}
                    className="flex justify-between items-center p-6 hover:bg-gray-50 rounded-xl bg-white"
                  >
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">
                        Acesso: {user.access}
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-amber-500 hover:text-amber-600"
                      >
                        <FaPencilAlt size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>

      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onUserAdded={handleUserAdded}
          editingUser={editingUser}
        />
      )}
    </div>
  );
}
