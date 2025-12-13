const API_URL = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('auth_data'));
  return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const getTrips = async () => {
  const response = await fetch(`${API_URL}/trips`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) throw new Error('Failed to fetch trips');
  return response.json();
};

export const createTrip = async (tripData) => {
  const response = await fetch(`${API_URL}/trips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(tripData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create trip');
  }
  return response.json();
};

export const deleteTrip = async (id) => {
  const response = await fetch(`${API_URL}/trips/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!response.ok) throw new Error('Failed to delete trip');
  return response.json();
};

export const getDrivers = async () => {
  const response = await fetch(`${API_URL}/auth/drivers`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) throw new Error('Failed to fetch drivers');
  return response.json();
};

export const getDriverTrips = async () => {
  const response = await fetch(`${API_URL}/trips/my-trips`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) throw new Error('Failed to fetch driver trips');
  return response.json();
};

export const updateTrip = async (id, tripData) => {
  const response = await fetch(`${API_URL}/trips/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(tripData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update trip');
  }
  return response.json();
};

export const downloadMissionOrder = async (tripId) => {
  const response = await fetch(`${API_URL}/trips/${tripId}/pdf`, {
    headers: getAuthHeader(),
  });
  
  if (!response.ok) throw new Error('Failed to download PDF');
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mission-order-${tripId}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
};
