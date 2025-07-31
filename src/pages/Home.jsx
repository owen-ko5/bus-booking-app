import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.pexels.com/photos/30661414/pexels-photo-30661414.jpeg",
  "https://images.pexels.com/photos/31102079/pexels-photo-31102079.jpeg",
  "https://images.pexels.com/photos/30661393/pexels-photo-30661393.jpeg",
];

const SLIDE_DURATION = 4500;
const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 360;

function MatatuBus({ className, style }) {
  return (
    <div
      className={`relative rounded-xl bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 shadow-lg border-4 border-yellow-300 ${className}`}
      style={{ width: 85, height: 42, ...style }}
      aria-hidden="true"
    >
      <div className="absolute top-5 left-4 flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-6 h-5 rounded-sm bg-white bg-opacity-80 shadow-md"
          />
        ))}
      </div>

      <div className="absolute bottom-1 left-4 flex space-x-7">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-full bg-gray-800 border-2 border-gray-900 shadow-inner"
          />
        ))}
      </div>

      <div className="absolute top-14 right-1 w-5 h-5 rounded-full bg-yellow-300 shadow-lg animate-frontlight-blink" />

      <div className="absolute top-2 right-3 w-9 h-10 bg-white rounded-tr-xl rounded-br-xl shadow-md opacity-80" />
    </div>
  );
}

function SpinningWheel({ className, style }) {
  return (
    <div
      className={`w-14 h-14 rounded-full bg-gray-800 border-4 border-gray-900 shadow-md animate-wheel-spin ${className}`}
      style={{ ...style }}
      aria-hidden="true"
    />
  );
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((i) => (i + 1) % images.length),
      SLIDE_DURATION
    );
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  const handleGuestStart = () => {
    localStorage.setItem("isGuest", "true");
    navigate("/bookingform");
  };

  return (
    <section
      className="relative flex flex-col items-center justify-start min-h-screen text-center px-4 bg-gradient-to-b from-[#1a1a3f] to-[#2b0d42] overflow-x-hidden"
      style={{ perspective: "1200px" }}
    >
      <div aria-hidden="true" className="pointer-events-none">
        <div
          className="absolute top-10 left-8 opacity-90 animate-float-bounce-spin delay-0"
          style={{ width: 85, height: 42 }}
        >
          <MatatuBus />
        </div>
        <div
          className="absolute top-44 right-12 opacity-75 animate-float-wave-slow delay-2500"
          style={{ width: 85, height: 42, transform: "scale(0.85)" }}
        >
          <MatatuBus />
        </div>
        <div
          className="absolute bottom-40 left-10 opacity-80 animate-float-zoom-spin delay-1500"
          style={{ width: 90, height: 45 }}
        >
          <MatatuBus />
        </div>

        <SpinningWheel
          className="absolute top-6 right-48 opacity-85 animate-float-updown delay-1000"
          style={{ width: 56, height: 56 }}
        />
        <SpinningWheel
          className="absolute bottom-20 left-44 opacity-75 animate-float-leftright delay-3000"
          style={{ width: 50, height: 50 }}
        />
      </div>

      <div
        role="region"
        aria-label="Image slider"
        className="relative w-full flex justify-center mb-10 mt-20"
        style={{ height: IMAGE_HEIGHT, minHeight: IMAGE_HEIGHT }}
      >
        {images.map((src, i) => {
          const isCurrent = i === currentIndex;
          const transformStyle = isCurrent
            ? "translateX(-50%) rotateY(0deg)"
            : "translateX(-50%) rotateY(180deg)";

          return (
            <img
              key={i}
              src={src}
              alt={`Matatu ${i + 1}`}
              className={`
                absolute top-0 left-1/2 transform -translate-x-1/2
                transition-transform duration-[1600ms] ease-in-out rounded-2xl
                ${isCurrent ? "opacity-100 z-20" : "opacity-0 z-10"}
              `}
              style={{
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
                objectFit: "cover",
                backfaceVisibility: "hidden",
                willChange: "transform, opacity",
                imageRendering: "auto",
                transformStyle: "preserve-3d",
                transform: transformStyle,
                opacity: isCurrent ? 1 : 0,
                boxShadow: isCurrent
                  ? "0 0 20px 8px rgba(251, 86, 7, 0.7)"
                  : "none",
              }}
              loading="lazy"
              decoding="async"
            />
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-orange-400 scale-125" : "bg-purple-200"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <h1 className="text-4xl md:text-5xl font-heading text-white font-bold drop-shadow-sm mb-4 animate-fade-in">
        Welcome to <span className="text-orange-400">Matatu Galore</span>
      </h1>
      <p className="text-gray-200 text-lg max-w-xl mb-6 animate-fade-in delay-100">
        Book bus or shuttle rides, select your seat, and pay online. Fast, secure, and reliable.
      </p>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-6 relative">
        <button
          onClick={handleGuestStart}
          className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-orange-600 transition duration-300 hover:scale-105"
          aria-label="Start booking as guest"
        >
          Book Now!
        </button>
      </div>

      <div className="mt-8 max-w-lg text-sm text-gray-300 text-center px-4">
        Note: Guest sessions last for 15 minutes. After that, you may need to log in again.
      </div>

      <style jsx>{`
        @keyframes float-bounce-spin {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            filter: drop-shadow(0 0 6px rgba(251, 86, 7, 0.7));
          }
          50% {
            transform: translateY(-25%) rotate(15deg) scale(1.1);
            filter: drop-shadow(0 0 14px rgba(251, 86, 7, 1));
          }
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
            filter: drop-shadow(0 0 6px rgba(251, 86, 7, 0.7));
          }
        }
        @keyframes float-wave-slow {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg) scale(1);
            filter: drop-shadow(0 0 6px rgba(255, 140, 0, 0.6));
          }
          25% {
            transform: translateX(15%) translateY(-8%) rotate(5deg) scale(1.05);
            filter: drop-shadow(0 0 14px rgba(255, 140, 0, 1));
          }
          50% {
            transform: translateX(0) translateY(-12%) rotate(0deg) scale(1);
            filter: drop-shadow(0 0 6px rgba(255, 140, 0, 0.6));
          }
          75% {
            transform: translateX(-15%) translateY(-8%) rotate(-5deg) scale(1.05);
            filter: drop-shadow(0 0 14px rgba(255, 140, 0, 1));
          }
          100% {
            transform: translateX(0) translateY(0) rotate(0deg) scale(1);
            filter: drop-shadow(0 0 6px rgba(255, 140, 0, 0.6));
          }
        }
        @keyframes float-zoom-spin {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.7));
          }
          50% {
            transform: translateY(-20%) rotate(360deg) scale(1.2);
            filter: drop-shadow(0 0 22px rgba(255, 165, 0, 1));
          }
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
            filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.7));
          }
        }

        @keyframes float-updown {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15%);
          }
        }
        @keyframes float-leftright {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(15%);
          }
        }

        @keyframes frontlight-blink {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 14px 6px rgba(255, 255, 140, 0.8);
          }
          50% {
            opacity: 0.3;
            box-shadow: none;
          }
        }

        @keyframes wheel-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-float-bounce-spin {
          animation: float-bounce-spin 6s ease-in-out infinite;
          transform-origin: center bottom;
        }
        .animate-float-wave-slow {
          animation: float-wave-slow 8s ease-in-out infinite;
          transform-origin: center center;
        }
        .animate-float-zoom-spin {
          animation: float-zoom-spin 10s linear infinite;
          transform-origin: center center;
        }
        .animate-float-updown {
          animation: float-updown 5s ease-in-out infinite;
        }
        .animate-float-leftright {
          animation: float-leftright 6s ease-in-out infinite;
        }

        .animate-frontlight-blink {
          animation: frontlight-blink 3s ease-in-out infinite;
          transform-origin: center center;
        }

        .animate-wheel-spin {
          animation: wheel-spin 3s linear infinite;
          transform-origin: center center;
        }

        /* animation delays */
        .delay-0 {
          animation-delay: 0s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-1500 {
          animation-delay: 1.5s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-2500 {
          animation-delay: 2.5s;
        }
        .delay-3000 {
          animation-delay: 3s;
        }
        .delay-3500 {
          animation-delay: 3.5s;
        }
        .delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
