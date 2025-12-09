import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api/authService';


export const AuthContext = createContext({
    user: null, 
    token: null, 
    isAuthenticated: false, 
    login: async () => {}, 
    logout: () => {}, 
});

const AUTH_STORAGE_KEY = 'auth_data';

export const AuthProvider = ({ children }) => {
    const initialData = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)) || {};
    
    const [user, setUser] = useState(initialData.user || null);
    const [token, setToken] = useState(initialData.token || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!initialData.token);
    const [isLoading, setIsLoading] = useState(true); 

    const login = async (credentials) => {
        try {
            const { token: newToken, user: userData } = await apiLogin(credentials);

            setToken(newToken);
            setUser(userData);
            setIsAuthenticated(true);

            const authData = { token: newToken, user: userData };
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

            return userData;

        } catch (error) {
            console.error("Erreur de connexion dans AuthProvider:", error);
            throw error; 
        }
    };

    const logout = () => {
        apiLogout(); 
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };


    useEffect(() => {
       
        if (initialData.token) {

        }
        setIsLoading(false);
    }, []);

    const contextValue = {
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
        isAdmin: user?.role === 'Admin',
        isDriver: user?.role === 'Driver',
    };

    if (isLoading) {
        return <div>Chargement de l'application...</div>;
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};