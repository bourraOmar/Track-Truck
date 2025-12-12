import React from 'react';
import { Link } from 'react-router-dom'; 
import useAuth from '../../hooks/useAuth';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard = () => {
    const { user } = useAuth();

    const stats = [
        { name: "Total Camions", value: "25", link: "/admin/vehicles", icon: "🚛" },
        { name: "Trajets en cours", value: "12", link: "/admin/trips", icon: "📍" },
        { name: "Maintenance requise", value: "3", link: "/admin/maintenance", icon: "🔧" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">

            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                <header className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                            Tableau de Bord
                        </h1>
                        <p className="text-gray-500 text-lg">Aperçu de l'activité de votre flotte en temps réel.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-400">Date du jour</p>
                        <p className="text-xl font-bold text-gray-800">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {stats.map((stat, index) => (
                        <Link 
                            key={index} 
                            to={stat.link}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-50 rounded-xl text-2xl group-hover:bg-indigo-50 group-hover:scale-110 transition-all duration-300">
                                    {stat.icon}
                                </div>
                                <span className="text-4xl font-extrabold text-gray-900">{stat.value}</span>
                            </div>
                            <h3 className="text-gray-500 font-medium">{stat.name}</h3>
                        </Link>
                    ))}
                </div>

                {/* Recent Activity Section (Placeholder) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Activité Récente</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-50 last:border-0">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                        #{item}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">Trajet Paris - Lyon terminé</p>
                                        <p className="text-sm text-gray-500">Chauffeur: Jean Dupont • Camion: VOL-123</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-400">Il y a 2h</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;