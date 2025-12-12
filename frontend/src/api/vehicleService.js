const API_URL = 'http://localhost:5000/api/vehicles'; 

const getToken = () => {
    const authData = JSON.parse(localStorage.getItem('auth_data'));
    return authData?.token;
};
const getConfig = (method = 'GET') => {
    const token = getToken();
    if (!token) {
        throw new Error("No token found. User is not authenticated.");
    }

    return {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
    };
};

export const getVehicles = async () => {
    const config = getConfig('GET');
    
    try {
        const response = await fetch(API_URL, config);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Échec de la récupération des véhicules.');
        }
        
        return response.json();
    } catch (error) {
        console.error('Erreur dans getVehicles:', error);
        throw error;
    }
};

export const createVehicle = async (vehicleData) => {
    const config = getConfig('POST');
    config.body = JSON.stringify(vehicleData);
    
    try {
        const response = await fetch(API_URL, config);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Échec de la création du véhicule.');
        }
        
        return response.json();
    } catch (error) {
        console.error('Erreur dans createVehicle:', error);
        throw error;
    }
};

export const updateVehicle = async (vehicleId, vehicleData) => {
    const config = getConfig('PUT');
    config.body = JSON.stringify(vehicleData);
    
    try {
        const response = await fetch(`${API_URL}/${vehicleId}`, config);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Échec de la modification du véhicule.');
        }
        
        return response.json();
    } catch (error) {
        console.error('Erreur dans updateVehicle:', error);
        throw error;
    }
};

export const deleteVehicle = async (vehicleId) => {
    const config = getConfig('DELETE');
    
    try {
        const response = await fetch(`${API_URL}/${vehicleId}`, config);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Échec de la suppression du véhicule.');
        }
        
        return { success: true, vehicleId };
    } catch (error) {
        console.error('Erreur dans deleteVehicle:', error);
        throw error;
    }
};