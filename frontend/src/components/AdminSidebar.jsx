import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Background from '../assets/background.png';

const AdminSidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    const isActive = (path) => {
        return location.pathname === path 
            ? "bg-white bg-opacity-20 border border-white border-opacity-10 backdrop-blur-md transition-all hover:bg-opacity-30" 
            : "hover:bg-white hover:bg-opacity-10 transition-all";
    };

    return (
        <aside 
            className="w-72 text-white p-6 flex flex-col justify-between relative bg-cover bg-center shadow-2xl"
            style={{
                backgroundImage: `url(${Background})`,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                backgroundBlendMode: "multiply",
            }}
        >
            <div className="relative z-10">
                <div className="flex items-center text-2xl font-bold mb-12 bg-white bg-opacity-10 p-3 rounded-lg backdrop-blur-sm">
                    <span className="mr-3 text-3xl">🚛</span>
                    TrackTruck
                </div>
                
                <nav className="space-y-4">
                    <Link to="/admin/dashboard" className={`flex items-center space-x-3 py-3 px-4 rounded-xl ${isActive('/admin/dashboard')}`}>
                        <span>📊</span>
                        <span className="font-medium">Tableau de Bord</span>
                    </Link>
                    <Link to="/admin/vehicle" className={`flex items-center space-x-3 py-3 px-4 rounded-xl ${isActive('/admin/vehicle')}`}>
                        <span>🚚</span>
                        <span className="font-medium">Véhicules</span>
                    </Link>
                    <Link to="/admin/drivers" className={`flex items-center space-x-3 py-3 px-4 rounded-xl ${isActive('/admin/drivers')}`}>
                        <span>👨‍✈️</span>
                        <span className="font-medium">Chauffeurs</span>
                    </Link>
                    <Link to="/admin/trips" className={`flex items-center space-x-3 py-3 px-4 rounded-xl ${isActive('/admin/trips')}`}>
                        <span>🗺️</span>
                        <span className="font-medium">Trajets</span>
                    </Link>
                </nav>
            </div>
            
            <div className="relative z-10">
                <div className="mb-6 px-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Connecté en tant que</p>
                    <div className="font-bold text-lg">{user?.firstName} {user?.lastName}</div>
                    <div className="text-sm text-gray-300">Administrateur</div>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="w-full py-3 bg-red-600 rounded-xl hover:bg-red-700 transition duration-150 font-bold shadow-lg flex items-center justify-center space-x-2"
                >
                    <span>🚪</span>
                    <span>Déconnexion</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
