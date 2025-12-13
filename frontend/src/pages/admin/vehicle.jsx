import React, { useState, useEffect } from "react";
import AdminSidebar from '../../components/AdminSidebar';
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../../api/vehicleService";
import Toast from "../../components/Toast";

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    plateNumber: "", 
    brand: "",
    model: "",
    vehicleType: "",
    fuelType: "",
    maxLoad: "",
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVehicle(formData);
      setIsModalOpen(false);
      fetchVehicles();
      setFormData({
        plateNumber: "",
        brand: "",
        model: "",
        vehicleType: "",
        fuelType: "",
        maxLoad: "",
      });
      setToast({ show: true, message: "Véhicule ajouté avec succès !", type: "success" });
    } catch (error) {
      setToast({ show: true, message: error.message, type: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce véhicule ?")) {
      try {
        await deleteVehicle(id);
        fetchVehicles();
        setToast({ show: true, message: "Véhicule supprimé avec succès", type: "success" });
      } catch (error) {
        setToast({ show: true, message: error.message, type: "error" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Gestion de la Flotte
            </h1>
            <p className="text-gray-500 text-lg">Gérez vos camions, remorques et leur maintenance.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg font-bold flex items-center space-x-2"
          >
            <span>+</span>
            <span>Ajouter un Véhicule</span>
          </button>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-6 font-semibold text-gray-600">Plaque</th>
                <th className="p-6 font-semibold text-gray-600">Type</th>
                <th className="p-6 font-semibold text-gray-600">Marque/Modèle</th>
                <th className="p-6 font-semibold text-gray-600">Carburant</th>
                <th className="p-6 font-semibold text-gray-600">Charge</th>
                <th className="p-6 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-mono font-bold text-gray-800">{v.plateNumber}</td>
                  <td className="p-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        v.vehicleType === "Truck"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {v.vehicleType === "Truck" ? "Camion" : "Remorque"}
                    </span>
                  </td>
                  <td className="p-6 text-gray-700">
                    {v.brand} <span className="text-gray-400">/</span> {v.model}
                  </td>
                  <td className="p-6 text-sm text-gray-500">{v.fuelType}</td>
                  <td className="p-6 text-gray-700 font-medium">{v.maxLoad} Tonnes</td>
                  <td className="p-6">
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors font-medium"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in-down">
              <h2 className="text-2xl font-extrabold mb-6 text-gray-900">Nouveau Véhicule</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Numéro de Plaque */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Plaque d'immatriculation
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 1234-A-15"
                    className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                    value={formData.plateNumber || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, plateNumber: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Marque et Modèle */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Marque
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Volvo"
                      className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                      value={formData.brand}
                      onChange={(e) =>
                        setFormData({ ...formData, brand: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Modèle
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: FH16"
                      className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                      value={formData.model}
                      onChange={(e) =>
                        setFormData({ ...formData, model: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Type de Véhicule et Carburant */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                      value={formData.vehicleType}
                      onChange={(e) =>
                        setFormData({ ...formData, vehicleType: e.target.value })
                      }
                    >
                      <option value="">Sélectionner...</option>
                      <option value="Truck">🚛 Camion</option>
                      <option value="Trailer">📦 Remorque</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Carburant
                    </label>
                    <select
                      className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                      value={formData.fuelType}
                      onChange={(e) =>
                        setFormData({ ...formData, fuelType: e.target.value })
                      }
                    >
                      <option value="">Sélectionner...</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Gasoline">Essence</option>
                    </select>
                  </div>
                </div>

                {/* Charge Maximale */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Charge Max (Tonnes)
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 25"
                    className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                    value={formData.maxLoad}
                    onChange={(e) =>
                      setFormData({ ...formData, maxLoad: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Boutons d'action */}
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
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold shadow-lg transition-all transform hover:scale-105"
                  >
                    Enregistrer
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

export default VehicleManagement;
