import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { login } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(formData);
      console.log(res);

      
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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-md"
      aria-label="Login form"
    >
      <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>

      {error && (
        <div
          role="alert"
          className="mb-4 text-red-600 bg-red-100 p-2 rounded"
        >
          {error}
        </div>
      )}

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
        aria-label="Email"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="border p-3 w-full mb-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={formData.password}
        onChange={handleChange}
        autoComplete="current-password"
        aria-label="Password"
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
