import React, { useEffect, useState } from "react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔍 Debug: Check if token exists
    console.log("🔐 Token in localStorage:", token ? token.substring(0, 15) + "..." : "None");

    if (!token) {
      console.warn("🚫 No authentication token found. User is not logged in.");
      setLoading(false);
      return;
    }

    // 🌐 Fetch bookings from backend
    fetch("http://localhost:5500/api/bookings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // 🔍 Log HTTP status
        console.log("📦 HTTP Response Status:", res.status);
        console.log("📦 Response OK:", res.ok);

        if (!res.ok) {
          if (res.status === 401) {
            console.error("❌ 401 Unauthorized – Invalid or expired token");
          } else if (res.status === 403) {
            console.error("❌ 403 Forbidden – Access denied");
          } else if (res.status === 404) {
            console.error("❌ 404 Not Found – Check if /api/bookings route exists");
          } else {
            console.error(`❌ HTTP ${res.status} Error`);
          }
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        // 🔥 CRITICAL: Inspect what the backend actually returns
        console.log("✅ Raw API Response (data):", data);
        console.log("✅ typeof data:", typeof data);
        console.log("✅ Array.isArray(data):", Array.isArray(data));

        let bookingsToSet = [];

        // ✅ Case 1: API returns an array directly
        if (Array.isArray(data)) {
          console.log("📥 Using data directly as array of bookings.");
          bookingsToSet = data;
        }
        // ✅ Case 2: API returns { bookings: [...] }
        else if (data && typeof data === "object" && data.bookings && Array.isArray(data.bookings)) {
          console.log("📥 Extracting 'bookings' array from response object.");
          bookingsToSet = data.bookings;
        }
        // ✅ Case 3: API returns a single booking object (unlikely here, but safe)
        else if (data && typeof data === "object" && data.booking_id) {
          console.log("📥 Got single booking, wrapping in array.");
          bookingsToSet = [data];
        }
        // ❌ Unexpected format
        else {
          console.warn("⚠️ Unexpected response format. Setting empty list.", data);
        }

        // ✅ Set the valid array (or empty)
        setBookings(bookingsToSet);
        setLoading(false);
      })
      .catch((err) => {
        console.error("🚨 Failed to fetch bookings:", err);

        // 💡 Helpful hints
        console.error("💡 Possible causes:");
        console.error("   1. Backend server not running on port 5500");
        console.error("   2. Token is invalid or expired");
        console.error("   3. CORS not enabled on backend");
        console.error("   4. Route /api/bookings does not exist or requires auth");
        console.error("   5. Backend throws server error (check your Node.js console)");

        setLoading(false);
      });
  }, []); // Empty dependency array = runs once on mount

  const handleCancel = (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (confirm) {
      setBookings(bookings.filter((b) => b.booking_id !== id));
    }
  };

  return (
    <section className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">My Bookings</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          You have no bookings yet. <a href="/buses" className="text-blue-600 underline">Book a seat</a>
        </p>
      ) : (
        <ul className="space-y-6 max-w-3xl mx-auto">
          {bookings.map((booking) => (
            <li
              key={booking.booking_id}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-md transition hover:shadow-lg"
            >
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong>Bus:</strong> {booking.bus_name}</p>
                <p><strong>Route:</strong> {booking.route}</p>
                <p><strong>Seats Booked:</strong> {booking.seats_booked}</p>
                <p><strong>Total Price:</strong> KES {booking.total_price}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600 font-semibold">Confirmed</span>
                </p>
              </div>

              <button
                onClick={() => handleCancel(booking.booking_id)}
                className="mt-4 text-red-500 hover:text-red-700 font-semibold text-sm"
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}