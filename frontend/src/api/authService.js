const API_URL = "http://localhost:5000/api/auth";

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "La connexion a échoué.";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Erreur dans authService.login:", error);
    throw error;
  }
};



const getToken = () => {
  const authData = JSON.parse(localStorage.getItem('auth_data'));
  return authData?.token;
};

export const getAllDrivers = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/drivers`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch drivers');
  return response.json();
};

export const createDriver = async (driverData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/drivers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(driverData)
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to create driver');
  return data;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
