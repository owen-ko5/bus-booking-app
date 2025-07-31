import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  
  const booking = location.state?.booking;

  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [paymentCode, setPaymentCode] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(15 * 60); 


  useEffect(() => {
    if (!success) return;
    if (timer === 0) {
      alert("Ticket expired!");
      navigate("/"); 
      return;
    }
    const intervalId = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(intervalId);
  }, [success, timer, navigate]);

  if (!booking) {
    return <p>No booking info found. Please start from booking page.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    
    if (!paymentCode.trim()) {
      setError("Please enter your payment code.");
      return;
    }

    
    setSuccess(true);
  };

  
  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <section className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Payment</h2>

      <div className="mb-6">
        <h3 className="font-semibold text-lg">Booking Summary</h3>
        <p>
          Bus: <strong>{booking.busName}</strong>
        </p>
        <p>
          Route: <strong>{booking.route}</strong>
        </p>
        <p>
          Seat: <strong>{booking.seatNo}</strong>
        </p>
        <p>
          Price: <strong>{booking.price}</strong>
        </p>
      </div>

      {success ? (
        <div className="text-green-600 font-bold">
          <p>Payment successful!</p>
          <p>Your ticket is valid for the next 15 minutes.</p>
          <p>Time remaining: {formatTimer(timer)}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">
            Payment Method
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="block w-full p-2 border rounded mt-1"
            >
              <option value="mpesa">M-Pesa</option>
              <option value="hillpayroll">Hill Payroll</option>
              
            </select>
          </label>

          <label className="block mb-2 font-semibold">
            Payment Code / Transaction Reference
            <input
              type="text"
              value={paymentCode}
              onChange={(e) => setPaymentCode(e.target.value)}
              className="block w-full p-2 border rounded mt-1"
              placeholder="Enter payment code"
              required
            />
          </label>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        </form>
      )}
    </section>
  );
}
