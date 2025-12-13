import React, { useState, useEffect } from "react";
import { FaMapMarkedAlt, FaUserTie, FaTruck, FaCalendarAlt, FaTrash, FaFilePdf } from 'react-icons/fa';
import AdminSidebar from '../../components/AdminSidebar';
import Toast from "../../components/Toast";
import { getTrips, createTrip, deleteTrip, getDrivers, downloadMissionOrder } from "../../api/tripService";
import { getVehicles } from "../../api/vehicleService";

const TripManagement = () => {
  const [trips, setTrips] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
  const [formData, setFormData] = useState({
    departure: "",
    arrival: "",
    driver: "",
    vehicle: "",
    startDate: "",
    notes: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tripsData, driversData, vehiclesData] = await Promise.all([
        getTrips(),
        getDrivers(),
        getVehicles()
      ]);
      setTrips(tripsData);
      setDrivers(driversData);
      setVehicles(vehiclesData);
    } catch (error) {
      setToast({ show: true, message: "Erreur lors du chargement des données", type: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTrip(formData);
      setIsModalOpen(false);
      fetchData();
      setFormData({
        departure: "",
        arrival: "",
        driver: "",
        vehicle: "",
        startDate: "",
        notes: ""
      });
      setToast({ show: true, message: "Trajet créé avec succès !", type: "success" });
    } catch (error) {
      setToast({ show: true, message: error.message, type: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce trajet ?")) {
      try {
        await deleteTrip(id);
        fetchData();
        setToast({ show: true, message: "Trajet supprimé avec succès", type: "success" });
      } catch (error) {
        setToast({ show: true, message: error.message, type: "error" });
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planned': return 'bg-yellow-100 text-yellow-800';
      case 'InProgress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Gestion des Trajets
            </h1>
            <p className="text-gray-500 text-lg">Planifiez et suivez les missions de vos chauffeurs.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg font-bold flex items-center space-x-2"
          >
            <span>+</span>
            <span>Nouveau Trajet</span>
          </button>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-6 font-semibold text-gray-600">Itinéraire</th>
                <th className="p-6 font-semibold text-gray-600">Chauffeur</th>
                <th className="p-6 font-semibold text-gray-600">Véhicule</th>
                <th className="p-6 font-semibold text-gray-600">Date</th>
                <th className="p-6 font-semibold text-gray-600">Statut</th>
                <th className="p-6 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-6">
                    <div className="font-bold text-gray-800">{trip.departure} ➝ {trip.arrival}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center space-x-2">
                      <FaUserTie className="text-gray-400" />
                      <span>{trip.driver?.firstName} {trip.driver?.lastName}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center space-x-2">
                      <FaTruck className="text-gray-400" />
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{trip.vehicle?.plateNumber}</span>
                    </div>
                  </td>
                  <td className="p-6 text-gray-600">
                    {new Date(trip.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <button
                      onClick={() => handleDelete(trip._id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {trips.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-gray-500">
                    Aucun trajet planifié pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in-down">
              <h2 className="text-2xl font-extrabold mb-6 text-gray-900">Planifier un Trajet</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Départ</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={formData.departure}
                      onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Arrivée</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={formData.arrival}
                      onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Chauffeur</label>
                  <select
                    className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.driver}
                    onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                    required
                  >
                    <option value="">Sélectionner un chauffeur</option>
                    {drivers.map(d => (
                      <option key={d._id} value={d._id}>{d.firstName} {d.lastName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Véhicule</label>
                  <select
                    className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    required
                  >
                    <option value="">Sélectionner un véhicule</option>
                    {vehicles.map(v => (
                      <option key={v._id} value={v._id}>{v.brand} {v.model} - {v.plateNumber}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Date de départ</label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold shadow-lg transition-all"
                  >
                    Créer
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
      </main>
    </div>
  );
};

export default TripManagement;
