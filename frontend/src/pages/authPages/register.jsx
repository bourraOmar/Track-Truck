import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; 
import Background from '../../assets/background.png';
function Register() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Driver',
  });
  const [localError, setLocalError] = useState(null);

  const { register, isAuthenticated, isLoading, error: contextError } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/', { replace: true });
    return null;
  }

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (userData.password.length < 6) {
      return setLocalError("Le mot de passe doit contenir au moins 6 caractères.");
    }

    try {
      await register(userData);

      navigate('/driver/trips', { replace: true });

    } catch (caughtError) {
      setLocalError(caughtError.message || "Erreur d'inscription inattendue.");
    }
  };

  const displayError = localError || contextError;

  return (
    <div className="min-h-screen flex">

      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-10 text-white bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backgroundBlendMode: 'multiply'
        }}
      >
        <div className="flex items-center text-xl font-bold bg-white bg-opacity-10 p-2 rounded-lg w-fit">
          <span className="mr-2 text-2xl">🚛</span>
          TrackTruck
        </div>

        <div className="self-end pb-16">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Accédez à vos Ordres de Mission
          </h1>
          <p className="text-lg font-light max-w-md">
            Enregistrez-vous pour voir vos trajets et mettre à jour leur statut en temps réel.
          </p>
        </div>

        <div className="absolute top-8 right-8">
          <Link to="/login" className="bg-black text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-gray-800 transition duration-150">
            Se connecter
          </Link>
        </div>
      </div>


      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 md:p-16 bg-white">
        <div className="w-full max-w-md">

          {/* Tête du formulaire */}
          <header className="mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-1">
              Inscription du Chauffeur
            </h2>
            <p className="text-gray-500">
              Créez votre compte de connexion.
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Affichage des erreurs */}
            {displayError && (
              <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm mb-4">
                {displayError}
              </p>
            )}

            {/* Nom et Prénom (sur la même ligne) */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                placeholder="Prénom"
                required
                disabled={isLoading}
                className="col-span-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                placeholder="Nom de famille"
                required
                disabled={isLoading}
                className="col-span-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Votre Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="example@entreprise.com" />
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••" />
                {/* Icône d'affichage du mot de passe (simulée pour le design) */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
              </div>
            </div>

            {/* Bouton d'Inscription (style noir, comme le login) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 mt-8"
            >
              {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </form>

          {/* Section "Instan Login" (Maintenue pour la cohérence visuelle) */}
          <div className="mt-8">
            <p className="text-center text-sm text-gray-500 mb-4">Utilisez la connexion rapide</p>
            <div className="flex space-x-4">
              <button className="w-1/2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11v2h3v8H7v-8H4V7h3V4h3v3h3v4h-3z" /></svg> Google
              </button>
              <button className="w-1/2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.2 6.5 13.5 6.5c1.55 0 2.29.12 2.61.16v2.44H14.15c-1.2 0-1.54.58-1.54 1.58V12h3.29l-.53 3h-2.76v6.8A10.018 10.018 0 0022 12z" /></svg> Facebook
              </button>
            </div>
          </div>

          {/* Lien vers la connexion */}
          <p className="text-center text-sm mt-8">
            Vous avez déjà un compte ? {' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;