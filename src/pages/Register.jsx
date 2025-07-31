import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { register as registerUser } from "../api";
import bgImage from "../assets/Matatu.jpg"; 

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", 
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      
      const { confirmPassword, ...dataToSend } = formData;

      const res = await registerUser(dataToSend);
      if (res.success) {
        navigate("/login");
      } else {
        setError(res.message || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form
        onSubmit={handleSubmit}
        className={`max-w-md w-full p-6 bg-white/20 backdrop-blur-md text-white rounded-lg shadow-lg transform transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        aria-label="Register form"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center flex items-center justify-center gap-3">
          Register
          <img
            src="/logo2.jpg"
            alt="Logo"
            className="inline-block w-12 h-12 object-contain"
            aria-hidden="true"
          />
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your full name"
          required
          className="border p-3 w-full mb-4 rounded bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          required
          className="border p-3 w-full mb-4 rounded bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <div className="relative mb-4">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            required
            className="border p-3 w-full rounded bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-12"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-black/70 hover:text-black"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <label htmlFor="confirmPassword" className="block mb-1 font-medium">
          Confirm Password
        </label>
        <div className="relative mb-6">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            required
            className="border p-3 w-full rounded bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-12"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-black/70 hover:text-black"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
