import React, { useEffect, useState } from "react";
import BusCard from "../components/BusCard";

export default function Buses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5500/api/buses/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load buses");
        }
        return res.json();
      })
      .then((data) => {
        setBuses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load buses");
        setLoading(false);
      });
  }, []);

  const handleBook = (busId, seats) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login first");
      return;
    }

    fetch("http://localhost:5500/api/bookings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bus_id: busId, seats }),
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
          return null;
        }
        if (!res.ok) {
          throw new Error("Booking failed");
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        alert(data.message || "Booking successful");

        setBuses((prev) =>
          prev.map((bus) =>
            bus.id === busId
              ? {
                  ...bus,
                  availableSeats: Math.max(0, bus.availableSeats - seats),
                }
              : bus
          )
        );
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  if (loading) return <p className="text-white text-center mt-10">Loading buses...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-[#3b0764] py-10 px-4">
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map((bus) => (
          <BusCard key={bus.id} bus={bus} onBook={handleBook} />
        ))}
      </section>
    </div>
  );
}
