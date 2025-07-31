import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/15 backdrop-blur-lg shadow-md py-2 px-6 flex justify-between items-center border-b border-white/10">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-extrabold text-orange-400 cursor-pointer drop-shadow-sm">
          <Link to="/" className="flex items-center space-x-3">
            <span>Matatu Galore</span>
            <img
              src="/logo2.jpg"
              alt="Matatu Logo"
              className="w-8 h-8 object-contain rounded-full"
            />
          </Link>
        </h1>
      </div>

      <div className="flex gap-6 text-sm">
        <Link
          to="/"
          className="text-orange-300 font-semibold transition duration-300 hover:text-orange-500"
        >
          Home
        </Link>
        <Link
          to="/buses"
          className="text-orange-300 font-semibold transition duration-300 hover:text-orange-500"
        >
          Buses
        </Link>

        {token ? (
          <>
            <Link
              to="/profile"
              className="text-orange-300 font-semibold transition duration-300 hover:text-orange-500"
            >
              Profile
            </Link>
            <Link
              to="/bookings"
              className="text-orange-300 font-semibold transition duration-300 hover:text-orange-500"
            >
              Bookings
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-400 font-semibold transition duration-300 hover:text-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-orange-300 font-semibold transition duration-300 hover:text-orange-500"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-orange-300 font-semibold transition duration-300 hover:text-orange-500"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
