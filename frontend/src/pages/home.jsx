import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth  from '../hooks/useAuth'; // Ajustez le chemin si nécessaire

// Importez l'image que vous utilisez pour le visuel de gauche (optionnel, si vous avez une image générique)
// import GenericBackground from '../assets/generic-background.jpg'; 

const Home = () => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Cette logique gère la redirection immédiate après le montage

        if (isLoading) {
            // Attendre que l'état d'authentification soit résolu
            return;
        }

        if (!isAuthenticated) {
            // Si, pour une raison quelconque, l'utilisateur n'est pas authentifié
            // (devrait être géré par ProtectedRoute, mais c'est une sécurité)
            navigate('/login', { replace: true });
            return;
        }

        // Redirection basée sur le rôle
        if (user?.role === 'Admin') {
            // Redirige vers le tableau de bord Administrateur
            navigate('/admin/dashboard', { replace: true });
        } else if (user?.role === 'Driver') {
            // Redirige vers le portail Chauffeur
            navigate('/driver/trips', { replace: true });
        } else {
            // Rôle inconnu ou non défini, rediriger vers la connexion
            console.error("Rôle utilisateur non reconnu. Déconnexion forcée.");
            navigate('/login', { replace: true });
        }

    }, [isAuthenticated, user, isLoading, navigate]);

    // -----------------------------------------------------------------
    // Rendu Visuel
    // Affiche un écran de chargement stylisé en attendant la redirection
    // -----------------------------------------------------------------
    
    return (
        <div className="min-h-screen flex">
            
            {/* PARTIE GAUCHE (VISUELLE) - Base du design Realnest */}
            <div 
                className="hidden lg:flex flex-col justify-between w-1/2 p-10 text-white bg-cover bg-center relative"
                style={{ 
                    // Utilisez un fond général ou le même que le login pour la cohérence
                    backgroundImage: "url('https://via.placeholder.com/1200x800?text=Bienvenue+TrackTruck')",
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    backgroundBlendMode: 'multiply'
                }}
            >
                {/* Contenu textuel */}
                <div className="self-end pb-16">
                    <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                        Plateforme de Gestion de Flotte
                    </h1>
                </div>
            </div>

            {/* PARTIE DROITE (STATUT) - Centrée */}
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 md:p-16 bg-white">
                <div className="text-center w-full max-w-md">
                    <h2 className="text-3xl font-extrabold text-indigo-600 mb-6">
                        Authentification réussie !
                    </h2>
                    
                    {/* Affichage du statut d'attente */}
                    {isLoading ? (
                        <p className="text-gray-600 text-lg">
                            Vérification de votre rôle et chargement du tableau de bord...
                        </p>
                    ) : (
                        <p className="text-gray-600 text-lg">
                            Redirection en cours vers l'espace {user?.role}...
                        </p>
                    )}
                    
                    {/* Animation de chargement simple (Tailwind Spinner) */}
                    <div className="mt-8 flex justify-center">
                        <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;