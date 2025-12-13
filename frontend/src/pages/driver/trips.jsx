import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaClock, FaTruck, FaCheckCircle, FaPlay, FaSignOutAlt, FaFilePdf } from 'react-icons/fa';
import { getDriverTrips, updateTrip, downloadMissionOrder } from "../../api/tripService";
import useAuth from "../../hooks/useAuth";
import Toast from "../../components/Toast";
import { useNavigate } from "react-router-dom";
import DriverSidebar from "../../components/DriverSidebar";

const DriverTrips = () => {
  const [trips, setTrips] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const data = await getDriverTrips();
      setTrips(data);
    } catch (error) {
      setToast({ show: true, message: "Erreur lors du chargement des trajets", type: "error" });
    }
  };

  const handleStatusChange = async (tripId, newStatus) => {
    try {
      await updateTrip(tripId, { status: newStatus });
      fetchTrips();
      setToast({ show: true, message: "Statut mis à jour avec succès", type: "success" });
    } catch (error) {
      setToast({ show: true, message: "Erreur lors de la mise à jour du statut", type: "error" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusBadge = (status) => {
    const styles = {
      Planned: "bg-blue-100 text-blue-800",
      InProgress: "bg-yellow-100 text-yellow-800",
      Completed: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800"
    };

    const labels = {
      Planned: "Planifié",
      InProgress: "En cours",
      Completed: "Terminé",
      Cancelled: "Annulé"
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <DriverSidebar />

      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Espace Chauffeur
            </h1>
            <p className="text-gray-500 text-lg">Consultez et gérez vos missions assignées.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Date du jour</p>
            <p className="text-xl font-bold text-gray-800">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <div key={trip._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  {getStatusBadge(trip.status)}
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500 flex items-center">
                      <FaClock className="mr-1" />
                      {new Date(trip.startDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-50"></div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Départ</p>
                      <p className="font-medium text-gray-900">{trip.departure}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-pink-500 ring-4 ring-pink-50"></div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Arrivée</p>
                      <p className="font-medium text-gray-900">{trip.arrival}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Véhicule</span>
                    <span className="font-mono font-bold text-gray-700">{trip.vehicle?.plateNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-500">Modèle</span>
                    <span className="font-medium text-gray-700">{trip.vehicle?.brand} {trip.vehicle?.model}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  {trip.status === 'Planned' && (
                    <button
                      onClick={() => handleStatusChange(trip._id, 'InProgress')}
                      className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FaPlay className="text-sm" />
                      <span>Démarrer</span>
                    </button>
                  )}
                  
                  {trip.status === 'InProgress' && (
                    <button
                      onClick={() => handleStatusChange(trip._id, 'Completed')}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FaCheckCircle className="text-sm" />
                      <span>Terminer</span>
                    </button>
                  )}

                  {trip.status === 'Completed' && (
                    <div className="flex-1 bg-gray-100 text-gray-500 py-2 px-4 rounded-xl font-bold text-center cursor-default">
                      Mission terminée
                    </div>
                  )}

                  <button
                    onClick={() => downloadMissionOrder(trip._id)}
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-100 transition-colors flex items-center justify-center"
                    title="Télécharger l'ordre de mission"
                  >
                    <FaFilePdf className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {trips.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
              <FaTruck className="mx-auto text-4xl text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Aucune mission assignée pour le moment.</p>
            </div>
          )}
        </div>
      </main>

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

export default DriverTrips;