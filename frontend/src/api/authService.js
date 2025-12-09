const API_URL = 'http://localhost:5000/api/auth';

export const login = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials), 
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.message || 'La connexion a échoué.';
            throw new Error(errorMessage);
        }

        return data; 

    } catch (error) {
        console.error('Erreur dans authService.login:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};