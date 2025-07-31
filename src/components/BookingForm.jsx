import React, { useState, useEffect } from "react";
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
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
      const response = await axios.post("http://localhost:5500/api/bookings", formData);
      console.log("Booking submitted:", response.data);
      setSuccessMessage("Booking info submitted!");

      const bookingDetails = {
        ...formData,
        busName: formData.vehicleType === "shuttle" ? "Transline Shuttle" : "Modern Bus",
        route: `${formData.from} → ${formData.to}`,
        seatNo: "A12",
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
    <div className="min-h-screen bg-gradient-to-br from-[#2e005e] to-[#3b0a84] flex items-center justify-center px-4 py-16">
      <form
        onSubmit={handleSubmit}
        className={`max-w-lg w-full bg-white/10 backdrop-blur-md text-white border border-white/20 p-8 rounded-3xl shadow-2xl transform transition-all duration-700 ease-out ${
          showForm ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-3">
          <img
            src="/logo2.jpg"
            alt="Matatu Logo"
            className="w-20 h-20"
          />
          Book Your Matatu
        </h2>

        {error && (
          <div className="mb-4 text-red-400 bg-red-100/10 p-2 rounded">{error}</div>
        )}
        {successMessage && (
          <div className="mb-4 text-green-400 bg-green-100/10 p-2 rounded">
            {successMessage}
          </div>
        )}

        <label className="block mb-1 font-semibold">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-white/20 placeholder-gray-300 text-white p-2 mb-4 w-full rounded outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter your name"
          required
        />

        <label className="block mb-1 font-semibold">ID Number / Passport:</label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          className="bg-white/20 placeholder-gray-300 text-white p-2 mb-4 w-full rounded outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Optional"
        />

        <label className="block mb-1 font-semibold">School ID (if student):</label>
        <input
          type="text"
          name="schoolId"
          value={formData.schoolId}
          onChange={handleChange}
          className="bg-white/20 placeholder-gray-300 text-white p-2 mb-4 w-full rounded outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Optional"
        />

        <label className="block mb-1 font-semibold">From:</label>
        <input
          type="text"
          name="from"
          value={formData.from}
          onChange={handleChange}
          className="bg-white/20 placeholder-gray-300 text-white p-2 mb-4 w-full rounded outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="e.g. Nairobi"
          required
        />

        <label className="block mb-1 font-semibold">To:</label>
        <input
          type="text"
          name="to"
          value={formData.to}
          onChange={handleChange}
          className="bg-white/20 placeholder-gray-300 text-white p-2 mb-4 w-full rounded outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="e.g. Kisumu"
          required
        />

        <label className="block mb-1 font-semibold">Vehicle Type:</label>
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="bg-white/20 text-white p-2 mb-6 w-full rounded outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="shuttle">Shuttle</option>
          <option value="normal">Normal Bus</option>
        </select>

        <button
          type="submit"
          className="bg-orange-600 hover:bg-purple-700 transition text-white font-semibold py-2 px-6 rounded w-full"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}
