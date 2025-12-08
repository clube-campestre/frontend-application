import React, { useEffect, useState } from "react";
import AddButton from "../../../components/admin-internal/AddButton";
import { useNavigate } from "react-router-dom";
import { getTransports, updateTransport, deleteTransport } from "../../../services/transportsService";
import { getPlaces, updatePlace, deletePlace } from "../../../services/placesService";
import { FaRegStar, FaStar, FaPencilAlt, FaTrash, FaEye, FaInbox } from "react-icons/fa";
import EditModal from "../../../components/edit-modal/EditModal";
import ViewModal from "../../../components/view-modal-admin/ViewModal";
import Toast from "../../../utils/Toast";
import Swal from "sweetalert2";

const Admin = () => {
  const navigate = useNavigate();

  // --- ESTADOS ---
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

  // --- LABELS ---
  const transportLabels = {
    enterprise: "Empresa",
    price: "Cotação (R$)",
    companyName: "Empresa",
    companyNumber: "Telefone",
    driverName: "Nome do Motorista",
    driverNumber: "WhatsApp",
    travelDistance: "Distância Histórica (KM)",
    capacity: "Capacidade",
    rating: "Avaliação",
  };

  const placeLabels = {
    name: "Nome do Local",
    price: "Cotação (R$)",
    capacity: "Capacidade",
    contactName: "Nome do Contato",
    contactCellphoneNumber: "Telefone",
    houseNumber: "Número",
    district: "Bairro",
    city: "Cidade",
    street: "Rua",
    state: "Estado",
    cep: "CEP",
    referenceHouse: "Ponto de Referência",
    rating: "Avaliação",
  };

  // --- API REQUESTS ---
  const fetchTransports = async () => {
    try {
      const data = await getTransports();
      if (data) {
        setTransports(data);
      }
    } catch (error) {
      Toast.fire({ icon: "error", title: "Erro ao buscar transportes!" });
    }
  };

  const fetchPlaces = async () => {
    try {
      const data = await getPlaces();
      if (!data || data.length === 0) {
        setPlaces([]);
        return;
      }
      const adaptedPlaces = data.map((place) => ({
        id: place.id,
        name: place.name,
        price: place.price,
        capacity: place.capacity,
        contactName: place.contactName,
        contactCellphoneNumber: place.contactCellphoneNumber,
        rating: place.rating,
        houseNumber: place.address?.houseNumber,
        district: place.address?.district,
        city: place.address?.city,
        street: place.address?.street,
        state: place.address?.state,
        cep: place.address?.cep,
        referenceHouse: place.address?.referenceHouse,
      }));
      setPlaces(adaptedPlaces);
    } catch (error) {
      Toast.fire({ icon: "error", title: "Erro ao buscar locais!" });
    }
  };

  useEffect(() => {
    fetchTransports();
    fetchPlaces();
  }, []);

  // --- HANDLERS ---
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
      const result = await updateTransport(updatedTransport.id, updatedTransport);
      if (result) {
        setShowTransportModal(false);
        fetchTransports();
      }
    } catch (error) {
      Toast.fire({ icon: "error", title: "Erro ao atualizar transporte!" });
    }
  };

  const handleEditPlace = async (updatedPlace) => {
    try {
      const payload = {
        name: updatedPlace.name,
        price: updatedPlace.price,
        capacity: updatedPlace.capacity,
        contactName: updatedPlace.contactName,
        contactCellphoneNumber: updatedPlace.contactCellphoneNumber,
        rating: updatedPlace.rating,
        address: {
          id: updatedPlace.addressId || 0, // Se tiver ID do endereço
          houseNumber: updatedPlace.houseNumber,
          district: updatedPlace.district,
          city: updatedPlace.city,
          street: updatedPlace.street,
          state: updatedPlace.state,
          cep: updatedPlace.cep,
          referenceHouse: updatedPlace.referenceHouse,
        },
      };

      const result = await updatePlace(updatedPlace.id, payload);
      if (result) {
        setShowPlaceModal(false);
        fetchPlaces();
      }
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
        const success = await deleteTransport(id);
        if (success) {
          fetchTransports();
        }
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
        const success = await deletePlace(id);
        if (success) {
          fetchPlaces();
        }
      } catch (error) {
        Toast.fire({ icon: "error", title: "Erro ao deletar local!" });
      }
    }
  };

  // --- COMPONENTE INTERNO: EMPTY STATE ---
  const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
      <FaInbox size={40} className="mb-3 opacity-50" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* UI FIX: Toolbar Responsiva
            - Mobile: Grid de 1 coluna (botões full width e mesma altura).
            - Desktop: Flex row alinhada.
            
            Importante: Adicionei uma div wrapper 'w-full [&>*]:w-full' que usa um seletor CSS arbitrário 
            para forçar o filho direto (o AddButton) a ter width: 100%.
        */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-center lg:text-left w-full lg:w-auto">
              <h1 className="text-2xl font-bold text-blue-900">Painel Administrativo</h1>
            
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
             {/* Wrapper que força o botão interno a ser full width */}
             <div className="w-full [&>button]:w-full [&>div]:w-full">
                <AddButton label="Novo Membro" onClick={() => navigate("/add-member")} />
             </div>
             <div className="w-full [&>button]:w-full [&>div]:w-full">
                <AddButton label="Novo Transporte" onClick={() => navigate("/add-transport")} />
             </div>
             <div className="w-full [&>button]:w-full [&>div]:w-full">
                <AddButton label="Novo Local" onClick={() => navigate("/add-place")} />
             </div>
          </div>
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* COLUNA: TRANSPORTES */}
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                   Transportes <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{transports.length}</span>
                </h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-grow" style={{ maxHeight: "500px", minHeight: "300px" }}>
              <div className="overflow-y-auto h-full p-2 custom-scrollbar">
                {transports.length > 0 ? (
                  transports.map((transport, index) => (
                    <div key={index} className="group bg-white border border-gray-100 rounded-xl p-4 mb-3 transition-all duration-200 hover:shadow-md flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1 w-full">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 break-words">{transport.companyName}</h3>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <span className="font-medium text-gray-700">Capacidade:</span> {transport.capacity} passageiros
                            </p>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                <span className="font-medium text-gray-700">Avaliação:</span>
                                <div className="flex">
                                    {Array.from({ length: 5 }, (_, i) =>
                                        i < transport.rating ? <FaStar key={i} className="text-yellow-400" size={14} /> : <FaRegStar key={i} className="text-gray-300" size={14} />
                                    )}
                                </div>
                            </div>
                        </div>
                      </div>
                      
                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto justify-end sm:justify-start shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                        <button
                          onClick={() => handleView(transport, "Detalhes do Transporte", "transport")}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver detalhes"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setShowTransportModal(true);
                            setSelectedTransport(transport);
                          }}
                          className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <FaPencilAlt size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteTransport(transport.id)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors group-hover:text-red-600"
                          title="Excluir"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState message="Nenhum transporte cadastrado." />
                )}
              </div>
            </div>
          </div>

          {/* COLUNA: LOCAIS */}
          <div className="flex flex-col h-full mt-8 lg:mt-0">
             <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                   Locais <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{places.length}</span>
                </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-grow" style={{ maxHeight: "500px", minHeight: "300px" }}>
              <div className="overflow-y-auto h-full p-2 custom-scrollbar">
                {places.length > 0 ? (
                  places.map((place, index) => (
                    <div key={index} className="group bg-white border border-gray-100 rounded-xl p-4 mb-3 transition-all duration-200 hover:shadow-md flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1 w-full">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 break-words">{place.name}</h3>
                        <div className="space-y-1">
                             <p className="text-sm text-gray-500 flex items-center gap-1">
                                <span className="font-medium text-gray-700">CEP:</span> {place.cep ? place.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2") : "N/A"}
                            </p>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                <span className="font-medium text-gray-700">Avaliação:</span>
                                <div className="flex">
                                {Array.from({ length: 5 }, (_, i) =>
                                    i < place.rating ? <FaStar key={i} className="text-yellow-400" size={14} /> : <FaRegStar key={i} className="text-gray-300" size={14} />
                                )}
                                </div>
                            </div>
                        </div>
                      </div>
                      
                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto justify-end sm:justify-start shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                        <button
                          onClick={() => handleView(place, "Detalhes do Local", "place")}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver detalhes"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setShowPlaceModal(true);
                            setSelectedPlace(place);
                          }}
                          className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <FaPencilAlt size={18} />
                        </button>
                        <button
                          onClick={() => handleDeletePlace(place.id)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors group-hover:text-red-600"
                          title="Excluir"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState message="Nenhum local cadastrado." />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MODAIS (MANTIDOS IGUAIS) */}
        {showTransportModal && (
            <EditModal
            onClose={() => setShowTransportModal(false)}
            editingItem={selectedTransport}
            onSubmit={handleEditTransport}
            title="Editar Transporte"
            fields={[
                { name: "companyName", label: "Empresa", placeholder: "Digite o nome da empresa", type: "text", isRequired: true },
                { name: "price", label: "Cotação (R$)", placeholder: "Digite o valor da cotação", type: "text", isRequired: true },
                { name: "travelDistance", label: "Distância Histórica (KM)", placeholder: "Digite a distância histórica", type: "number", isRequired: true },
                { name: "capacity", label: "Capacidade", placeholder: "Digite a capacidade", type: "number", isRequired: true },
                { name: "companyNumber", label: "Telefone", placeholder: "Digite o telefone", type: "text", isRequired: true },
                { name: "driverNumber", label: "WhatsApp", placeholder: "Digite o WhatsApp", type: "text", isRequired: true },
                { name: "driverName", label: "Nome do Motorista", placeholder: "Digite o nome do motorista", type: "text", isRequired: true },
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
                { name: "contactName", label: "Nome do Contato", placeholder: "Digite o nome do contato", type: "text", isRequired: true },
                { name: "contactCellphoneNumber", label: "Telefone", placeholder: "Digite o telefone", type: "text", isRequired: true },
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
    </div>
  );
};

export default Admin;