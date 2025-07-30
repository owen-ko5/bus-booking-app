import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    schoolId: "",
    from: "",
    to: "",
    vehicleType: "shuttle",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.from || !formData.to) {
      setError("Please fill in name, from and to fields.");
      return;
    }

    setError(null);
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5500/bookings", formData);
      console.log("Booking submitted:", response.data);
      setSuccessMessage("✅ Booking info submitted!");

      // Simulate bus info (replace this with real data later)
      const bookingDetails = {
        ...formData,
        busName: formData.vehicleType === "shuttle" ? "Transline Shuttle" : "Modern Bus",
        route: `${formData.from} → ${formData.to}`,
        seatNo: "A12", // Optional: generate or get from backend
        price: formData.vehicleType === "shuttle" ? "KES 500" : "KES 700",
      };

      setTimeout(() => {
        navigate("/payment", { state: { booking: bookingDetails } });
      }, 1500);
    } catch (err) {
      console.error("Booking error:", err);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded shadow-md mt-10"
    >
      <h2 className="text-2xl font-semibold mb-4">Booking Form</h2>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}
      {successMessage && (
        <div className="mb-4 text-green-600 bg-green-100 p-2 rounded">
          {successMessage}
        </div>
      )}

      <label className="block mb-2 font-semibold">Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 mb-4 w-full rounded"
        required
      />

      <label className="block mb-2 font-semibold">ID Number / Passport:</label>
      <input
        type="text"
        name="idNumber"
        value={formData.idNumber}
        onChange={handleChange}
        className="border p-2 mb-4 w-full rounded"
      />

      <label className="block mb-2 font-semibold">School ID (if student):</label>
      <input
        type="text"
        name="schoolId"
        value={formData.schoolId}
        onChange={handleChange}
        className="border p-2 mb-4 w-full rounded"
      />

      <label className="block mb-2 font-semibold">From:</label>
      <input
        type="text"
        name="from"
        value={formData.from}
        onChange={handleChange}
        className="border p-2 mb-4 w-full rounded"
        required
      />

      <label className="block mb-2 font-semibold">To:</label>
      <input
        type="text"
        name="to"
        value={formData.to}
        onChange={handleChange}
        className="border p-2 mb-4 w-full rounded"
        required
      />

      <label className="block mb-2 font-semibold">Vehicle Type:</label>
      <select
        name="vehicleType"
        value={formData.vehicleType}
        onChange={handleChange}
        className="border p-2 mb-6 w-full rounded"
      >
        <option value="shuttle">Shuttle</option>
        <option value="normal">Normal Bus</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
      >
        Submit Booking
      </button>
    </form>
  );
}
