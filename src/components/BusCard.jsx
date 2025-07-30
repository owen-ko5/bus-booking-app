import React, { useEffect, useState } from "react";

export default function BusCard({ bus, onBook }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const imageUrl = bus.image_url
    ? `http://localhost:5500${bus.image_url}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  const availableSeats = Number(bus.seats ?? 0);
  const price = Number(bus.price ?? 0);

  const handleBookClick = () => {
    if (availableSeats === 0) {
      alert("Sorry, no seats available.");
      return;
    }

    const seatsInput = prompt(
      `How many seats do you want to book? (Available: ${availableSeats})`,
      "1"
    );

    const seats = parseInt(seatsInput, 10);

    if (isNaN(seats) || seats <= 0) {
      alert("❌ Invalid number of seats.");
      return;
    }

    if (seats > availableSeats) {
      alert("❌ Not enough seats available.");
      return;
    }

    onBook(bus.id, seats);
  };

  return (
    <div
      className={`
        bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden
        transform transition-all duration-700 ease-in-out
        ${animate
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-95"}
        hover:shadow-lg hover:scale-105 hover:-rotate-1
      `}
    >
      {/* Bus Image */}
      <img
        src={imageUrl}
        alt={bus.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold text-orange-700">{bus.name}</h2>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Route:</span> {bus.route}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Departure:</span> {bus.time || "TBA"}
        </p>

        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Price:</span>{" "}
            <span className="text-orange-800 font-semibold">
              KES {price.toLocaleString()}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-medium">Seats Available:</span>{" "}
            <span
              className={`font-bold ${
                availableSeats === 0 ? "text-red-600" : "text-green-700"
              }`}
            >
              {availableSeats}
            </span>
          </p>
        </div>

        <button
          onClick={handleBookClick}
          disabled={availableSeats === 0}
          className={`w-full mt-3 px-4 py-2 rounded-lg font-semibold text-sm transition duration-300 ${
            availableSeats === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700 text-white shadow-sm hover:shadow-md"
          }`}
        >
          {availableSeats === 0 ? "Fully Booked" : "Book Seat"}
        </button>
      </div>
    </div>
  );
}
