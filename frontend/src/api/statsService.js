const API_URL = 'http://localhost:5000/api/stats';

const getToken = () => {
    const authData = JSON.parse(localStorage.getItem('auth_data'));
    return authData?.token;
};

const getConfig = (method = 'GET') => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return {
        method,
        headers,
    };
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Une erreur est survenue');
    }
    return response.json();
};

export const getDashboardStats = async () => {
    const response = await fetch(`${API_URL}/dashboard`, getConfig('GET'));
    return handleResponse(response);
};
