import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth  from '../hooks/useAuth'; 

const Home = () => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if (isLoading) {
            return;
        }

        if (!isAuthenticated) {
            navigate('/login', { replace: true });
            return;
        }

        if (user?.role === 'Admin') {
            navigate('/admin/dashboard', { replace: true });
        } else if (user?.role === 'Driver') {
            navigate('/driver/trips', { replace: true });
        } else {
            console.error("Rôle utilisateur non reconnu. Déconnexion forcée.");
            navigate('/login', { replace: true });
        }

    }, [isAuthenticated, user, isLoading, navigate]);


    
    return (
        <div className="min-h-screen flex">
            
            <div 
                className="hidden lg:flex flex-col justify-between w-1/2 p-10 text-white bg-cover bg-center relative"
                style={{ 
                    backgroundImage: "url('https://via.placeholder.com/1200x800?text=Bienvenue+TrackTruck')",
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    backgroundBlendMode: 'multiply'
                }}
            >
                <div className="self-end pb-16">
                    <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                        Plateforme de Gestion de Flotte
                    </h1>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 md:p-16 bg-white">
                <div className="text-center w-full max-w-md">
                    <h2 className="text-3xl font-extrabold text-indigo-600 mb-6">
                        Authentification réussie !
                    </h2>
                    
                    {isLoading ? (
                        <p className="text-gray-600 text-lg">
                            Vérification de votre rôle et chargement du tableau de bord...
                        </p>
                    ) : (
                        <p className="text-gray-600 text-lg">
                            Redirection en cours vers l'espace {user?.role}...
                        </p>
                    )}
                    
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