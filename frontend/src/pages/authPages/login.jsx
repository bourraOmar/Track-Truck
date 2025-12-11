import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Background from "../../assets/background.png";

function LoginPage() {
  // État local du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  // Utilisation du hook d'authentification
  const {
    login, isAuthenticated, isLoading, user, error: contextError,
  } = useAuth();
  const navigate = useNavigate();

  // Redirection immédiate si déjà connecté
  if (isAuthenticated) {
    const targetPath = user.role === "Admin" ? "/admin/dashboard" : "/driver/trips";
    navigate(targetPath, { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    try {
      const userData = await login({ email, password });

      // Redirection après succès
      const targetPath = userData.role === "Admin" ? "/admin/dashboard" : "/driver/trips";
      navigate(targetPath, { replace: true });
    } catch (caughtError) {
      // Afficher l'erreur du backend
      setLocalError(caughtError.message || "Erreur de connexion inattendue.");
    }
  };

  const displayError = localError || contextError;

  return (
    <div className="min-h-screen flex">
      {/* ---------------------------------------------------- */}
      {/* PARTIE GAUCHE (VISUELLE) - Style Realnest */}
      {/* ---------------------------------------------------- */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-10 text-white bg-cover bg-center relative"
        // Remplacez cet 'style' par une image de camion/logistique dans un fichier CSS ou Tailwind
        style={{
          backgroundImage: `url(${Background})`,
          // Utiliser un dégradé ou un overlay pour le texte
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backgroundBlendMode: "multiply",
        }}
      >
        {/* Logo dans le coin supérieur gauche */}
        <div className="flex items-center text-xl font-bold bg-white bg-opacity-10 p-2 rounded-lg w-fit">
          <span className="mr-2 text-2xl">🚛</span>
          TrackTruck
        </div>

        {/* Contenu textuel centré en bas */}
        <div className="self-end pb-16">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Optimisez vos Trajets, Garantissez vos Livraisons
          </h1>
          <p className="text-lg font-light max-w-md">
            Visibilité en temps réel, suivi de maintenance et gestion des
            ressources centralisée.
          </p>
        </div>

        {/* Bouton de déconnexion (simulé ici, mais mieux géré dans un Layout) */}
        <div className="absolute top-8 right-8">
          <Link to="/register" className="bg-black text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-gray-800">
            S'inscrire
          </Link>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* PARTIE DROITE (FORMULAIRE) - Style Realnest */}
      {/* ---------------------------------------------------- */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 md:p-16 bg-white">
        <div className="w-full max-w-md">
          {/* Tête du formulaire */}
          <header className="mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-1">
              Bienvenue sur TrackTruck!
            </h2>
            <p className="text-gray-500">Connectez-vous à votre compte.</p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Affichage des erreurs */}
            {displayError && (
              <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                {displayError}
              </p>
            )}

            {/* Champ Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Votre Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="example@entreprise.com" />
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••" />
                {/* Icône d'affichage du mot de passe (simulée) */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Rappel et Mot de passe oublié */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-gray-900"
                >
                  Se souvenir de moi
                </label>
              </div>
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Mot de passe oublié?
              </a>
            </div>

            {/* Bouton de Connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150"
            >
              {isLoading ? "Connexion en cours..." : "Login"}
            </button>
          </form>

          {/* Section "Instan Login" (Connexion rapide, social login non implémenté) */}
          <div className="mt-8">
            <p className="text-center text-sm text-gray-500 mb-4">
              Ou continuer avec
            </p>
            <div className="flex space-x-4">
              {/* Boutons de connexion sociale simulés */}
              <button className="w-1/2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7 11v2h3v8H7v-8H4V7h3V4h3v3h3v4h-3z" />
                </svg>{" "}
                Google
              </button>
              <button className="w-1/2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.2 6.5 13.5 6.5c1.55 0 2.29.12 2.61.16v2.44H14.15c-1.2 0-1.54.58-1.54 1.58V12h3.29l-.53 3h-2.76v6.8A10.018 10.018 0 0022 12z" />
                </svg>{" "}
                Facebook
              </button>
            </div>
          </div>

          {/* Lien d'inscription (Register) */}
          <p className="text-center text-sm mt-8">
            Vous n'avez pas de compte ?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
