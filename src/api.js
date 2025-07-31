// api.js

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5500/api";
console.log("Using API URL:", API_URL);

// Handle API responses
async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || "API Error");
  }
  return data;
}

// Auth
export const register = (data) =>
  fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);

export const login = (data) =>
  fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);

// Buses
export const fetchBuses = () =>
  fetch(`${API_URL}/buses`).then(handleResponse);

// Bookings
export const fetchBookings = (token) =>
  fetch(`${API_URL}/bookings`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);

export const addBooking = (bookingData, token) =>
  fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  }).then(handleResponse);

export const updateBooking = (id, updateData, token) =>
  fetch(`${API_URL}/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  }).then(handleResponse);

export const deleteBooking = (id, token) =>
  fetch(`${API_URL}/bookings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);

// Health check (optional)
export const ping = () =>
  fetch(`${API_URL}/ping`).then(handleResponse);
