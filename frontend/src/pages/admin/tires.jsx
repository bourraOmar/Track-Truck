import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCircle, FaTruck, FaExchangeAlt } from 'react-icons/fa';
import AdminSidebar from '../../components/AdminSidebar';
import { getAllTires, createTire, updateTire, deleteTire, mountTire, dismountTire } from '../../api/tireService';
import { getVehicles } from '../../api/vehicleService';
import Toast from '../../components/Toast';

const TireManagement = () => {
  const [tires, setTires] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMountModalOpen, setIsMountModalOpen] = useState(false);
  const [currentTire, setCurrentTire] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Form states
  const [formData, setFormData] = useState({
    serialNumber: '',
    brand: '',
    size: '',
    condition: 'New',
    price: ''
  });

  const [mountData, setMountData] = useState({
    vehicleId: '',
    position: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tiresData, vehiclesData] = await Promise.all([getAllTires(), getVehicles()]);
      setTires(tiresData);
      setVehicles(vehiclesData);
    } catch (error) {
      showToast('Erreur lors du chargement des données', 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMountChange = (e) => {
    setMountData({ ...mountData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTire) {
        await updateTire(currentTire._id, formData);
        showToast('Pneu mis à jour', 'success');
      } else {
        await createTire(formData);
        showToast('Pneu ajouté', 'success');
      }
      setIsModalOpen(false);
      fetchData();
      resetForm();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleMountSubmit = async (e) => {
    e.preventDefault();
    try {
      await mountTire(currentTire._id, mountData.vehicleId, mountData.position);
      showToast('Pneu monté avec succès', 'success');
      setIsMountModalOpen(false);
      fetchData();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDismount = async (tire) => {
    if (window.confirm('Voulez-vous vraiment démonter ce pneu ?')) {
      try {
        await dismountTire(tire._id);
        showToast('Pneu démonté', 'success');
        fetchData();
      } catch (error) {
        showToast(error.message, 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce pneu ?')) {
      try {
        await deleteTire(id);
        showToast('Pneu supprimé', 'success');
        fetchData();
      } catch (error) {
        showToast('Erreur lors de la suppression', 'error');
      }
    }
  };

  const openModal = (tire = null) => {
    if (tire) {
      setCurrentTire(tire);
      setFormData({
        serialNumber: tire.serialNumber,
        brand: tire.brand,
        size: tire.size,
        condition: tire.condition,
        price: tire.price || ''
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const openMountModal = (tire) => {
    setCurrentTire(tire);
    setMountData({ vehicleId: '', position: '' });
    setIsMountModalOpen(true);
  };

  const resetForm = () => {
    setCurrentTire(null);
    setFormData({
      serialNumber: '',
      brand: '',
      size: '',
      condition: 'New',
      price: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Mounted': return 'text-green-500';
      case 'InStock': return 'text-blue-500';
      case 'Discarded': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <AdminSidebar />
      
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Pneus</h1>
            <p className="text-gray-500 mt-1">Suivi du stock et de l'état des pneus</p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <FaPlus /> Nouveau Pneu
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Série / Marque</th>
                <th className="p-4 font-semibold text-gray-600">Dimension</th>
                <th className="p-4 font-semibold text-gray-600">État</th>
                <th className="p-4 font-semibold text-gray-600">Statut</th>
                <th className="p-4 font-semibold text-gray-600">Position / Véhicule</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tires.map((tire) => (
                <tr key={tire._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{tire.serialNumber}</div>
                    <div className="text-sm text-gray-500">{tire.brand}</div>
                  </td>
                  <td className="p-4 text-gray-600">{tire.size}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${tire.condition === 'New' ? 'bg-green-100 text-green-800' : 
                        tire.condition === 'Good' ? 'bg-blue-100 text-blue-800' : 
                        tire.condition === 'Worn' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {tire.condition}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FaCircle className={`text-xs ${getStatusColor(tire.status)}`} />
                      <span className="text-gray-700">{tire.status === 'InStock' ? 'En Stock' : tire.status === 'Mounted' ? 'Monté' : 'Jeté'}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    {tire.status === 'Mounted' && tire.currentVehicle ? (
                      <div className="flex flex-col">
                        <span className="font-medium text-indigo-600">{tire.currentVehicle.plateNumber}</span>
                        <span className="text-xs text-gray-500">{tire.position}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {tire.status === 'InStock' && (
                      <button 
                        onClick={() => openMountModal(tire)}
                        className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
                        title="Monter"
                      >
                        <FaExchangeAlt />
                      </button>
                    )}
                    {tire.status === 'Mounted' && (
                      <button 
                        onClick={() => handleDismount(tire)}
                        className="text-orange-600 hover:bg-orange-50 p-2 rounded-lg transition-colors"
                        title="Démonter"
                      >
                        <FaExchangeAlt />
                      </button>
                    )}
                    <button 
                      onClick={() => openModal(tire)}
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(tire._id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {currentTire ? 'Modifier le pneu' : 'Nouveau pneu'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de Série</label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dimension</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    required
                    placeholder="ex: 315/80 R22.5"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">État</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="New">Neuf</option>
                  <option value="Good">Bon</option>
                  <option value="Worn">Usé</option>
                  <option value="Damaged">Endommagé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix d'achat (MAD)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mount Modal */}
      {isMountModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Monter le pneu</h2>
            <p className="text-gray-500 mb-4">Série: {currentTire?.serialNumber}</p>
            <form onSubmit={handleMountSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Véhicule</label>
                <select
                  name="vehicleId"
                  value={mountData.vehicleId}
                  onChange={handleMountChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Sélectionner un véhicule</option>
                  {vehicles.map(v => (
                    <option key={v._id} value={v._id}>{v.plateNumber} - {v.brand}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <select
                  name="position"
                  value={mountData.position}
                  onChange={handleMountChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Sélectionner une position</option>
                  <option value="Avant Gauche">Avant Gauche</option>
                  <option value="Avant Droit">Avant Droit</option>
                  <option value="Arrière Gauche Ext">Arrière Gauche Ext</option>
                  <option value="Arrière Gauche Int">Arrière Gauche Int</option>
                  <option value="Arrière Droit Ext">Arrière Droit Ext</option>
                  <option value="Arrière Droit Int">Arrière Droit Int</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsMountModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                >
                  Monter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default TireManagement;
