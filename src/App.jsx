import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Buses from "./pages/Buses";
import Bookings from "./pages/Bookings";
import BookingForm from "./components/BookingForm";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile"; 

export default function App() {
  const [buses, setBuses] = useState([
    {
      id: 1,
      name: "Kenya Express",
      route: "Nairobi to Mombasa",
      availableSeats: 25,
      time: "08:00 AM",
    },
    {
      id: 2,
      name: "Easy Coach",
      route: "Nairobi to Kisumu",
      availableSeats: 18,
      time: "10:00 AM",
    },
    {
      id: 3,
      name: "Guardian Angel",
      route: "Nairobi to Eldoret",
      availableSeats: 30,
      time: "01:00 PM",
    },
    {
      id: 4,
      name: "Modern Coast",
      route: "Nairobi to Malindi",
      availableSeats: 12,
      time: "04:00 PM",
    },
    {
      id: 5,
      name: "Dreamline",
      route: "Nairobi to Nakuru",
      availableSeats: 8,
      time: "06:00 PM",
    },
  ]);

  const [bookings, setBookings] = useState([]);

  const handleBook = (busId) => {
    setBuses((prevBuses) =>
      prevBuses.map((bus) =>
        bus.id === busId && bus.availableSeats > 0
          ? { ...bus, availableSeats: bus.availableSeats - 1 }
          : bus
      )
    );

    const busToBook = buses.find((bus) => bus.id === busId);
    if (!busToBook) return;

    const seatNo = Math.floor(Math.random() * 40) + 1;

    const newBooking = {
      id: bookings.length + 1,
      busName: busToBook.name,
      route: busToBook.route,
      seatNo,
      time: busToBook.time,
      status: "Confirmed",
    };

    setBookings((prev) => [...prev, newBooking]);
  };

  const handleCancelBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#f0f4ff]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/buses"
              element={<Buses buses={buses} onBook={handleBook} />}
            />
            <Route
              path="/bookings"
              element={
                <Bookings
                  bookings={bookings}
                  onCancel={handleCancelBooking}
                />
              }
            />
            <Route path="/bookingform" element={<BookingForm />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="flex justify-center items-center">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}
