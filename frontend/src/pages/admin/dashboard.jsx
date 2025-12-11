import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import useAuth from '../../hooks/useAuth';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate(); 

    const stats = [
        { name: "Total Camions", value: "25", link: "/admin/vehicles" },
    ];

    const handleLogout = () => {
        logout();

        navigate('/login', { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">

            <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between">
                <div>
                    <div className="text-xl font-bold mb-8">🚛 Fleet Admin</div>
                    <nav className="space-y-2">
                        <Link to="/admin/dashboard" className="block py-2 px-3 rounded-lg bg-indigo-700 hover:bg-indigo-600">
                            Tableau de Bord
                        </Link>
                        <Link to="/admin/vehicle" className="block py-2 px-3 rounded-lg hover:bg-gray-700">
                            Véhicules (Camions/Remorques)
                        </Link>
                    </nav>
                </div>
                
                <button 
                    onClick={handleLogout} 
                    className="mt-8 w-full py-2 bg-red-600 rounded-lg hover:bg-red-700 transition duration-150 font-semibold"
                >
                    Déconnexion
                </button>
            </aside>


            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center pb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Bienvenue, {user?.firstName} {user?.lastName}
                    </h1>
                </header>
            </main>
        </div>
    );
};

export default AdminDashboard;