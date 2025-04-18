import React, { useEffect, useState } from 'react';
import AddButton from '../../../components/admin-internal/AddButton';
import ListPanel from '../../../components/admin-internal/ListPanel'
import { useNavigate } from 'react-router-dom';
import { api } from '../../../provider/api'

const Admin = () => {
  const navigate = useNavigate();
  
  const [transports, setTransports] = useState([]);
  const [locations, setLocations] = useState([]);

  const getTransports = async () => {
    try {
      const response = await api.get('/transports');
      setTransports(response.data);
    } catch (error) {
      console.error('Error fetching transports:', error);
    }
  };

  const getLocations = async () => {
    try {
      const response = await api.get('/loacations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    getTransports();
    getLocations();
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

  const handleAddLocal = () => {
    navigate('/add-locate')
  };

  return (
    <div className="p-5 max-w-7xl mx-auto">
    <div className="flex justify-center gap-6 bg-[#7C7C7C] p-4 rounded-lg mb-5">
      <AddButton label="Adicionar membro" onClick={handleAddMembro} />
      <AddButton label="Adicionar evento" onClick={handleAddEvento} />
      <AddButton label="Adicionar transporte" onClick={handleAddTransporte} />
      <AddButton label="Adicionar local" onClick={handleAddLocal} />
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
            {locations.length > 0 ? (
              locations.map((location, index) => (
                <div key={index} className="bg-white p-3 rounded mb-2 shadow-sm">
                  <p className="font-medium">{location.name}</p>
                  <p className="text-sm text-gray-600">{location.address}</p>
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