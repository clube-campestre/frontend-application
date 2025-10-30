import React, { useEffect, useState } from "react";
import AddButton from "../../../components/admin-internal/AddButton";
import { useNavigate } from "react-router-dom";
import { api } from "../../../provider/api";
import { FaRegStar, FaStar, FaPencilAlt, FaTrash, FaEye } from "react-icons/fa";
import EditModal from "../../../components/edit-modal/EditModal";
import ViewModal from "../../../components/view-modal-admin/ViewModal";
import Toast from "../../../utils/Toast";
import Swal from "sweetalert2";

const Admin = () => {
  const navigate = useNavigate();

  const [transports, setTransports] = useState([]);
  const [places, setPlaces] = useState([]);

  const [showTransportModal, setShowTransportModal] = useState(false);
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewItem, setViewItem] = useState({});
  const [viewTitle, setViewTitle] = useState("");
  const [viewLabels, setViewLabels] = useState({});

  const [selectedTransport, setSelectedTransport] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  const transportLabels = {
    enterprise: "Empresa",
    price: "Cotação (R$)",
    travelDistance: "Distância Histórica (KM)",
    capacity: "Capacidade",
    companyContact: "Telefone",
    driverContact: "WhatsApp",
    rating: "Avaliação",
  };

  const placeLabels = {
    name: "Nome do Local",
    price: "Cotação (R$)",
    capacity: "Capacidade",
    contact: "Telefone",
    houseNumber: "Número",
    district: "Bairro",
    city: "Cidade",
    street: "Rua",
    state: "Estado",
    cep: "CEP",
    referenceHouse: "Ponto de Referência",
    rating: "Avaliação",
  };

  const getTransports = async () => {
    try {
      const response = await api.get("/transports");
      setTransports(response.data);
    } catch (error) {
      Toast.fire({ icon: "error", title: "Erro ao buscar transportes!" });
    }
  };

  const getPlaces = async () => {
    try {
      const response = await api.get("/places");
      const adaptedPlaces = response.data.map((place) => ({
        id: place.id,
        name: place.name,
        price: place.price,
        capacity: place.capacity,
        contact: place.contact,
        rating: place.rating,
        houseNumber: place.address.houseNumber,
        district: place.address.district,
        city: place.address.city,
        street: place.address.street,
        state: place.address.state,
        cep: place.address.cep,
        referenceHouse: place.address.referenceHouse,
      }));
      setPlaces(adaptedPlaces);
    } catch (error) {
      Toast.fire({ icon: "error", title: "Erro ao buscar locais!" });
    }
  };

  useEffect(() => {
    getTransports();
    getPlaces();
  }, []);

  const handleView = (item, title, type) => {
    setViewItem(item);
    setViewTitle(title);

    if (type === "transport") {
      setViewLabels(transportLabels);
    } else if (type === "place") {
      setViewLabels(placeLabels);
    } else {
      setViewLabels({});
    }

    setShowViewModal(true);
  };

  const handleEditTransport = async (updatedTransport) => {
    try {
      await api.put(`/transports/${updatedTransport.id}`, updatedTransport);
      Toast.fire({ icon: "success", title: "Transporte atualizado com sucesso!" });
      setShowTransportModal(false);
      getTransports();
    } catch (error) {
      Toast.fire({ icon: "error", title: "Erro ao atualizar transporte!" });
    }
  };

  const handleEditPlace = async (updatedPlace) => {
    try {
      const payload = {
        ...updatedPlace,
        address: {
          houseNumber: updatedPlace.houseNumber,
          district: updatedPlace.district,
          city: updatedPlace.city,
          street: updatedPlace.street,
          state: updatedPlace.state,
          cep: updatedPlace.cep,
          referenceHouse: updatedPlace.referenceHouse,
        },
      };

      await api.put(`/places/${updatedPlace.id}`, payload);
      Toast.fire({ icon: "success", title: "Local atualizado com sucesso!" });
      setShowPlaceModal(false);
      getPlaces();
    } catch (error) {
      Toast.fire({ icon: "error", title: "Erro ao atualizar local!" });
    }
  };

  const handleDeleteTransport = async (id) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/transports/${id}`);
        Toast.fire({ icon: "success", title: "Transporte deletado com sucesso!" });
        getTransports();
      } catch (error) {
        Toast.fire({ icon: "error", title: "Erro ao deletar transporte!" });
      }
    }
  };

  const handleDeletePlace = async (id) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/places/${id}`);
        Toast.fire({ icon: "success", title: "Local deletado com sucesso!" });
        getPlaces();
      } catch (error) {
        Toast.fire({ icon: "error", title: "Erro ao deletar local!" });
      }
    }
  };

  return (
    <div className="p-15 w-full mx-auto">
      <div className="flex justify-center gap-6 bg-[#7C7C7C] p-4 rounded-lg mb-5">
        <AddButton label="Adicionar membro" onClick={() => navigate("/add-member")} />
        <AddButton label="Adicionar transporte" onClick={() => navigate("/add-transport")} />
        <AddButton label="Adicionar local" onClick={() => navigate("/add-place")} />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-3">Transportes</h2>
          <div className="bg-gray-100 p-4 rounded-lg" style={{ maxHeight: "400px", overflowY: "auto" }}>
            {transports.length > 0 ? (
              transports.map((transport, index) => (
                <div key={index} className="bg-white p-3 rounded mb-2 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="font-medium">{transport.enterprise}</p>
                    <p className="text-sm text-gray-600">Capacidade: {transport.capacity} passageiros</p>
                    <p className="text-sm text-gray-600 flex flex-row items-center">
                      Nota:
                      {Array.from({ length: 5 }, (_, i) =>
                        i < transport.rating ? <FaStar key={i} className="text-yellow-500 ml-1" /> : <FaRegStar key={i} className="text-gray-400 ml-1" />
                      )}
                    </p>
                  </div>
                  <div className="flex gap-5">
                    <button
                      onClick={() => handleView(transport, "Detalhes do Transporte", "transport")}
                      className="text-blue-600 hover:text-blue-800"
                      title="Ver detalhes"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setShowTransportModal(true);
                        setSelectedTransport(transport);
                      }}
                      className="text-amber-500 hover:text-amber-600"
                      title="Editar"
                    >
                      <FaPencilAlt size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteTransport(transport.id)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Excluir"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum transporte foi encontrado</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-3">Locais</h2>
          <div className="bg-gray-100 p-4 rounded-lg" style={{ maxHeight: "400px", overflowY: "auto" }}>
            {places.length > 0 ? (
              places.map((place, index) => (
                <div key={index} className="bg-white p-3 rounded mb-2 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="font-medium">{place.name}</p>
                    <p className="text-sm text-gray-600">CEP: {place.cep ? place.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2") : ""}</p>
                    <p className="text-sm text-gray-600 flex flex-row items-center">
                      Nota:
                      {Array.from({ length: 5 }, (_, i) =>
                        i < place.rating ? <FaStar key={i} className="text-yellow-500 ml-1" /> : <FaRegStar key={i} className="text-gray-400 ml-1" />
                      )}
                    </p>
                  </div>
                  <div className="flex gap-5">
                    <button
                      onClick={() => handleView(place, "Detalhes do Local", "place")}
                      className="text-blue-600 hover:text-blue-800"
                      title="Ver detalhes"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setShowPlaceModal(true);
                        setSelectedPlace(place);
                      }}
                      className="text-amber-500 hover:text-amber-600"
                      title="Editar"
                    >
                      <FaPencilAlt size={18} />
                    </button>
                    <button
                      onClick={() => handleDeletePlace(place.id)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Excluir"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum local foi encontrado</p>
            )}
          </div>
        </div>
      </div>

      {showTransportModal && (
        <EditModal
          onClose={() => setShowTransportModal(false)}
          editingItem={selectedTransport}
          onSubmit={handleEditTransport}
          title="Editar Transporte"
          fields={[
            { name: "enterprise", label: "Empresa", placeholder: "Digite o nome da empresa", type: "text", isRequired: true },
            { name: "price", label: "Cotação (R$)", placeholder: "Digite o valor da cotação", type: "text", isRequired: true },
            { name: "travelDistance", label: "Distância Histórica (KM)", placeholder: "Digite a distância histórica", type: "number", isRequired: true },
            { name: "capacity", label: "Capacidade", placeholder: "Digite a capacidade", type: "number", isRequired: true },
            { name: "companyContact", label: "Telefone", placeholder: "Digite o telefone", type: "text", isRequired: true },
            { name: "driverContact", label: "WhatsApp", placeholder: "Digite o WhatsApp", type: "text", isRequired: true },
            { name: "rating", label: "Avaliação", isRequired: true },
          ]}
        />
      )}

      {showPlaceModal && (
        <EditModal
          onClose={() => setShowPlaceModal(false)}
          editingItem={selectedPlace}
          onSubmit={handleEditPlace}
          title="Editar Local"
          fields={[
            { name: "name", label: "Nome do Local", placeholder: "Digite o nome do local", type: "text", isRequired: true },
            { name: "price", label: "Cotação (R$)", placeholder: "Digite a cotação", type: "text", isRequired: true },
            { name: "capacity", label: "Capacidade", placeholder: "Digite a capacidade", type: "number", isRequired: true },
            { name: "contact", label: "Telefone", placeholder: "Digite o telefone", type: "text", isRequired: true },
            { name: "houseNumber", label: "Número", placeholder: "Digite o número", type: "text", isRequired: true },
            { name: "district", label: "Bairro", placeholder: "Digite o bairro", type: "text", isRequired: true },
            { name: "city", label: "Cidade", placeholder: "Digite a cidade", type: "text", isRequired: true },
            { name: "cep", label: "CEP", placeholder: "Digite o CEP", type: "text", isRequired: true },
            { name: "street", label: "Rua", placeholder: "Digite a rua", type: "text", isRequired: true },
            { name: "state", label: "Estado", placeholder: "Digite o estado", type: "text", isRequired: true },
            { name: "referenceHouse", label: "Ponto de Referência", placeholder: "Digite o ponto de referência", type: "text", isRequired: true },
            { name: "rating", label: "Avaliação", isRequired: true },
          ]}
        />
      )}

      {showViewModal && (
        <ViewModal onClose={() => setShowViewModal(false)} item={viewItem} title={viewTitle} labels={viewLabels} />
      )}
    </div>
  );
};

export default Admin;
