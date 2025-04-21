import React, { useEffect, useState } from 'react';
import AddButton from '../../../components/admin-internal/AddButton';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../provider/api'

const Admin = () => {
  const navigate = useNavigate();
  
  const [transports, setTransports] = useState([]);
  const [places, setPlaces] = useState([]);

  const getTransports = async () => {
    try {
      const response = await api.get('/transports');
      setTransports(response.data);
    } catch (error) {
      console.error('Error fetching transports:', error);
    }
  };

  const getPlaces = async () => {
    try {
      const response = await api.get('/places');
      setPlaces(response.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  useEffect(() => {
    getTransports();
    getPlaces();
  }, []);

  const handleAddMembro = () => {
    navigate('/add-member');
  };

  const handleAddEvento = () => {
    navigate('/add-event')
  };

  const handleAddTransporte = () => {
    navigate('/add-transport')
  };

  const handleAddPlace = () => {
    navigate('/add-place')
  };

  return (
    <div className="p-15 w-full mx-auto">
    <div className="flex justify-center gap-6 bg-[#7C7C7C] p-4 rounded-lg mb-5">
      <AddButton label="Adicionar membro" onClick={handleAddMembro} />
      <AddButton label="Adicionar evento" onClick={handleAddEvento} />
      <AddButton label="Adicionar transporte" onClick={handleAddTransporte} />
      <AddButton label="Adicionar local" onClick={handleAddPlace} />
    </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-3">Transportes</h2>
          <div 
            className="bg-gray-100 p-4 rounded-lg"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#FFCC00 #E5E7EB"
            }}
          >
            {transports.length > 0 ? (
              transports.map((transport, index) => (
                <div key={index} className="bg-white p-3 rounded mb-2 shadow-sm">
                  <p className="font-medium">{transport.enterprise}</p>
                  <p className="text-sm text-gray-600">Capacidade: {transport.capacity} passageiros</p>
                  <p className="text-sm text-gray-600">Nota: {transport.rating}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum transporte foi encontrado</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-3">Locais</h2>
          <div 
            className="bg-gray-100 p-4 rounded-lg"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#FFCC00 #E5E7EB"
            }}
          >
            {places.length > 0 ? (
              places.map((place, index) => (
                <div key={index} className="bg-white p-3 rounded mb-2 shadow-sm">
                  <p className="font-medium">{place.name}</p>
                  <p className="text-sm text-gray-600">{place.address}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum local foi encontrado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;