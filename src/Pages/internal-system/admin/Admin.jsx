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
    // Seus hooks e lógica permanecem os mesmos
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

    // Suas constantes de labels e funções de manipulação (getTransports, handleDelete, etc.) permanecem aqui
    // ...

    return (
        // Container principal com padding responsivo
        <div className="p-4 sm:p-6 lg:p-8 w-full mx-auto">
            {/* Barra de botões com layout responsivo */}
            <div className="flex flex-col md:flex-row md:justify-center items-stretch gap-3 md:gap-6 bg-[#7C7C7C] p-4 rounded-lg mb-8">
                <AddButton label="Adicionar membro" onClick={() => navigate("/add-member")} />
                <AddButton label="Adicionar transporte" onClick={() => navigate("/add-transport")} />
                <AddButton label="Adicionar local" onClick={() => navigate("/add-place")} />
            </div>

            {/* Grid principal com 1 coluna no mobile e 2 em telas grandes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6">
                
                {/* --- Seção de Transportes --- */}
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">Transportes</h2>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {transports.length > 0 ? (
                            transports.map((transport) => (
                                <div key={transport.id} className="bg-white p-4 rounded-lg mb-3 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-2">
                                    <div>
                                        <p className="font-semibold text-gray-800 text-base md:text-lg">{transport.enterprise}</p>
                                        <p className="text-sm text-gray-600">Capacidade: {transport.capacity} passageiros</p>
                                        <p className="text-sm text-gray-600 flex flex-row items-center mt-1">
                                            <span className='mr-1'>Nota:</span>
                                            {Array.from({ length: 5 }, (_, i) =>
                                                i < transport.rating ? <FaStar key={i} className="text-yellow-500" /> : <FaRegStar key={i} className="text-gray-400" />
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex gap-5 self-end sm:self-center">
                                        <button onClick={() => handleView(transport, "Detalhes do Transporte", "transport")} className="text-blue-600 hover:text-blue-800 transition-colors" title="Ver detalhes">
                                            <FaEye size={18} />
                                        </button>
                                        <button onClick={() => { setShowTransportModal(true); setSelectedTransport(transport); }} className="text-amber-500 hover:text-amber-600 transition-colors" title="Editar">
                                            <FaPencilAlt size={18} />
                                        </button>
                                        <button onClick={() => handleDeleteTransport(transport.id)} className="text-gray-400 hover:text-gray-600 transition-colors" title="Excluir">
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic text-center py-4">Nenhum transporte foi encontrado</p>
                        )}
                    </div>
                </div>

                {/* --- Seção de Locais --- */}
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">Locais</h2>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {places.length > 0 ? (
                            places.map((place) => (
                                <div key={place.id} className="bg-white p-4 rounded-lg mb-3 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-2">
                                    <div>
                                        <p className="font-semibold text-gray-800 text-base md:text-lg">{place.name}</p>
                                        <p className="text-sm text-gray-600">CEP: {place.cep ? place.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2") : "N/A"}</p>
                                        <p className="text-sm text-gray-600 flex flex-row items-center mt-1">
                                            <span className='mr-1'>Nota:</span>
                                            {Array.from({ length: 5 }, (_, i) =>
                                                i < place.rating ? <FaStar key={i} className="text-yellow-500" /> : <FaRegStar key={i} className="text-gray-400" />
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex gap-5 self-end sm:self-center">
                                        <button onClick={() => handleView(place, "Detalhes do Local", "place")} className="text-blue-600 hover:text-blue-800 transition-colors" title="Ver detalhes">
                                            <FaEye size={18} />
                                        </button>
                                        <button onClick={() => { setShowPlaceModal(true); setSelectedPlace(place); }} className="text-amber-500 hover:text-amber-600 transition-colors" title="Editar">
                                            <FaPencilAlt size={18} />
                                        </button>
                                        <button onClick={() => handleDeletePlace(place.id)} className="text-gray-400 hover:text-gray-600 transition-colors" title="Excluir">
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic text-center py-4">Nenhum local foi encontrado</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Os modais já são responsivos por natureza, mas garanta que os componentes 
                EditModal e ViewModal também usem classes responsivas se necessário. */}
            {showTransportModal && (
                <EditModal
                    onClose={() => setShowTransportModal(false)}
                    // ...outras props
                />
            )}
            {showPlaceModal && (
                <EditModal
                    onClose={() => setShowPlaceModal(false)}
                    // ...outras props
                />
            )}
            {showViewModal && (
                <ViewModal 
                    onClose={() => setShowViewModal(false)} 
                    item={viewItem} 
                    title={viewTitle} 
                    labels={viewLabels} 
                />
            )}
        </div>
    );
};

export default Admin;

