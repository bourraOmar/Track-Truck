import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importez useNavigate
import useAuth from '../../hooks/useAuth';

const AdminDashboard = () => {
    // 1. Récupération des fonctions et de l'état du contexte
    const { user, logout } = useAuth();
    const navigate = useNavigate(); // Hook pour la navigation post-déconnexion

    // ... (Définition des stats)
    const stats = [
        { name: "Total Camions", value: "25", link: "/admin/vehicles" },
        // ...
    ];

    // 2. Fonction de gestion de la déconnexion
    const handleLogout = () => {
        logout(); // Appel de la fonction logout du contexte (nettoie le token)
        // La redirection vers /login est souvent gérée automatiquement
        // par la mise à jour de l'état isAuthenticated dans AuthProvider, 
        // mais une navigation explicite peut être ajoutée pour plus de sécurité:
        navigate('/login', { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* -------------------- 
            A. Barre Latérale (Navigation Admin) 
            -------------------- */}
            <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between">
                <div> {/* Conteneur pour le logo et la navigation */}
                    <div className="text-xl font-bold mb-8">🚛 Fleet Admin</div>
                    <nav className="space-y-2">
                        {/* ... (Liens de navigation existants) ... */}
                        <Link to="/admin/dashboard" className="block py-2 px-3 rounded-lg bg-indigo-700 hover:bg-indigo-600">
                            Tableau de Bord
                        </Link>
                        {/* ... (autres liens) ... */}
                        <Link to="/admin/vehicles" className="block py-2 px-3 rounded-lg hover:bg-gray-700">
                            Véhicules (Camions/Remorques)
                        </Link>
                    </nav>
                </div>
                
                {/* 3. Bouton de Déconnexion au bas de la barre latérale */}
                <button 
                    onClick={handleLogout} // Utilisation de la fonction de gestion
                    className="mt-8 w-full py-2 bg-red-600 rounded-lg hover:bg-red-700 transition duration-150 font-semibold"
                >
                    Déconnexion
                </button>
            </aside>

            {/* -------------------- 
            B. Contenu Principal 
            -------------------- */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center pb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Bienvenue, {user?.firstName} {user?.lastName}
                    </h1>
                </header>
                {/* ... (Reste du contenu du dashboard) ... */}
            </main>
        </div>
    );
};

export default AdminDashboard;