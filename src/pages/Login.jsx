import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { login } from "../api";
import bgImage from "../assets/Matatu.jpg"; 

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(formData);
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/");
      } else {
        setError(res.error || res.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        aria-label="Login form"
      >
        <h2 className="text-3xl font-bold mb-2 text-center flex items-center justify-center gap-3">
          Login
          <img
            src="/logo2.jpg"
            alt="Logo"
            className="inline-block w-12 h-12 object-contain"
            aria-hidden="true"
          />
        </h2>

        {error && (
          <div role="alert" className="mb-4 text-red-300 bg-red-800/40 p-2 rounded">
            {error}
          </div>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border border-white/30 bg-white/10 text-white placeholder-white/70 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          aria-label="Email"
        />

        <div className="relative mb-6">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="border border-white/30 bg-white/10 text-white placeholder-white/70 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400 pr-12"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            aria-label="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-black/70 hover:text-white focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
