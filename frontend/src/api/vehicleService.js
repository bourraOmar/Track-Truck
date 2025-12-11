const API_URL = "http://localhost:5000/api/vehicles";

const getTekon = () => {
  const authData = JSON.parse(localStorage.getItem("auth_data"));
  return authData?.token;
};

const getConfig = (methed = "GET") => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found. User is not authenticated.");
  }
  return {
    method,
    header: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getVehicles = async () => {
  const config = getConfig("GET");

  try {
    const response = await fetch(API_URL, config);

    if (!response.ok) {
      const errorDATA = await response.json();
      throw new Error(
        errorDATA.message || "Échec de la récupération des véhicules."
      );
    }

    return response.json();
  } catch (error) {
    console.log("Erreur dans getVehicles: ", error);
    throw error;
  }
};

export const creatVehicle = async (vehicleData) => {
  const config = getConfig("POST");
  config.body = JSON.stringify(vehicleData);

  try {
    const response = await fetch(API_URL, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Échec de la création du véhicule.");
    }

    return response.json();
  } catch (error) {
    console.log("Erreur dans createVehicle: ", error);
    throw error;
  }
};

export const updateVehicle = async (vehicleId, vehicleData) => {
  const config = getConfig("PUT");
  config.body = JSON.stringify(vehicleData);

  try {
    const response = await fetch(`${API_URL}/${vehicleId}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.massage || "Échec de la modification du véhicule."
      );
    }
    return response.json();
  } catch (error) {
    console.log("Erreur dans updateVehicle: ", error);
    throw error;
  }
};

export const deletVehicle = async (vehicleId) => {
  const config = getConfig("DELETE");
  config.body = JSON.stringify(vehicleId);

  try {
    const response = await fetch(`${API_URL}/${vehicleId}, config`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Échec de la suppression du véhicule."
      );
    }
    return response.json();
  } catch (error) {
    console.log("Erreur dans deleteVehicle: ", error);
    throw error;
  }
};
