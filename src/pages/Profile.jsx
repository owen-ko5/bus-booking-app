import React, { useEffect, useState, useRef } from "react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      setError("⚠️ You must login to view your profile.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5500/api/auth/profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);

    const token = localStorage.getItem("token");

    fetch("http://localhost:5500/api/auth/profile/", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile((prev) => ({
          ...prev,
          profile_picture: data.user.profile_picture,
        }));
      })
      .catch((err) => {
        console.error("Failed to upload image", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  if (loading) return <p className="text-center">Loading profile & bookings…</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-orange-700">Your Profile</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <div onClick={handleImageClick} className="cursor-pointer">
          {profile.profile_picture ? (
            <img
              src={profile.profile_picture}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
              {profile.username?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <p><strong>Username:</strong> {profile.username || "Not set"}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>ID:</strong> {profile.id}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-orange-700">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b, index) => (
            <li
              key={index}
              className="border p-4 rounded shadow flex flex-col md:flex-row gap-4"
            >
              <img
                src={`http://localhost:5500${b.image_url}`}
                alt={b.bus}
                className="w-40 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <p><strong>Bus:</strong> {b.bus}</p>
                <p><strong>Route:</strong> {b.route}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
