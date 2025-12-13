const API_URL = 'http://localhost:5000/api/tires';

const getToken = () => {
    const authData = JSON.parse(localStorage.getItem('auth_data'));
    return authData?.token;
};

const getConfig = (method = 'GET', body = null) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }
    return config;
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Une erreur est survenue');
    }
    return response.json();
};

export const getAllTires = async () => {
    const response = await fetch(API_URL, getConfig('GET'));
    return handleResponse(response);
};

export const createTire = async (tireData) => {
    const response = await fetch(API_URL, getConfig('POST', tireData));
    return handleResponse(response);
};

export const updateTire = async (id, tireData) => {
    const response = await fetch(`${API_URL}/${id}`, getConfig('PUT', tireData));
    return handleResponse(response);
};

export const deleteTire = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, getConfig('DELETE'));
    return handleResponse(response);
};

export const mountTire = async (id, vehicleId, position) => {
    const response = await fetch(`${API_URL}/${id}/mount`, getConfig('PUT', { vehicleId, position }));
    return handleResponse(response);
};

export const dismountTire = async (id) => {
    const response = await fetch(`${API_URL}/${id}/dismount`, getConfig('PUT'));
    return handleResponse(response);
};
