import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaBusAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden relative pt-12 pb-24 px-6 mt-0 bg-gradient-to-b from-[#1a1a3f] to-[#2b0d42] shadow-inner z-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left">
        
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-500 ease-in-out">
          <h2 className="text-xl font-extrabold text-orange-400 animate-tilt mb-3">About Matatu Go</h2>
          <p className="text-sm text-gray-100 animate-fade-in">
            Matatu Galore is your one-stop platform to book, track, and ride with comfort. Travel anywhere in Kenya like a pro!
          </p>
        </div>

        
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-500 ease-in-out">
          <h2 className="text-xl font-extrabold text-orange-400 animate-tilt mb-3">Stay Connected</h2>
          <div className="flex justify-center md:justify-start gap-4 text-2xl mt-4 text-gray-100">
            <a
              href="https://facebook.com/matatugo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-500 hover:scale-125 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/matatugo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-sky-400 hover:scale-125 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/matatugo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500 hover:scale-125 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-500 ease-in-out">
          <h2 className="text-xl font-extrabold text-orange-400 animate-tilt mb-3">Talk to Us</h2>
          <p className="text-sm text-gray-100 animate-fade-in">
            📍 Nairobi, Kenya <br />
            📞 +254 769 212 744<br />
            📧 support@matatugalore.ke
          </p>
        </div>
      </div>

     
      <div className="mt-10 text-center relative z-20">
        <div className="text-4xl text-orange-400 animate-bounce-slow">
          <FaBusAlt />
        </div>
        <h1 className="text-3xl font-black tracking-wide mt-2 animate-pulse text-orange-400">
          MATATU <span className="text-blue-500">GALORE</span>
        </h1>
        <p className="text-sm mt-4 text-gray-300">&copy; {new Date().getFullYear()} Matatu Galore. Ride smart, ride proud.</p>
      </div>

      
      <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden z-10 pointer-events-none">
        <div className="absolute animate-dynamic-matatu left-full">
          <svg
            width="80"
            height="40"
            viewBox="0 0 64 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
          >
            <rect width="64" height="32" rx="6" fill="#f97316" />
            <circle cx="12" cy="28" r="4" fill="#1e40af" />
            <circle cx="52" cy="28" r="4" fill="#1e40af" />
            <text
              x="12"
              y="20"
              fontSize="10"
              fill="white"
              fontFamily="sans-serif"
              pointerEvents="none"
            >
              MATATU
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}