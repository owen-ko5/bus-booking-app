import React, { useEffect, useState, useRef } from "react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5500";

  useEffect(() => {
    const token = localStorage.getItem("token")?.trim();

    if (!token) {
      console.warn("No token found in localStorage");
      setError("You must log in to view your profile.");
      setLoading(false);
      return;
    }

    console.log("Fetching profile with token...");

    fetch(`${API_BASE_URL}/api/auth/profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          console.error("Token invalid or expired");
          localStorage.removeItem("token");
          setError("Session expired. Redirecting to login...");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
          return;
        }
        if (!res.ok) {
          throw new Error(`Failed to load profile: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Profile loaded:", data);
        setProfile(data);
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Network or fetch error:", err);
        if (!error) {
          setError(`Failed to load profile: ${err.message}`);
        }
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);

    const token = localStorage.getItem("token")?.trim();
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    console.log("📤 Uploading new profile picture...");

    fetch(`${API_BASE_URL}/api/auth/profile/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (res.status === 401) {
          console.error("Unauthorized during upload");
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
        if (!res.ok) throw new Error("Upload failed");
        return res.json();
      })
      .then((data) => {
        console.log("Picture uploaded:", data);
        setProfile((prev) => ({
          ...prev,
          profile_picture: data.user?.profile_picture || prev.profile_picture,
        }));
      })
      .catch((err) => {
        console.error("Failed to upload image:", err);
        alert("Failed to upload image. Check console for details.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  if (loading) return <p className="text-center">Loading profile & bookings…</p>;
  if (error)
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <p className="text-center text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-purple-950 py-10 px-4">
      <div className="max-w-3xl mx-auto p-6 bg-white bg-opacity-10 backdrop-blur-sm shadow rounded text-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-orange-400">Your Profile</h2>
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
                src={profile.profile_picture.startsWith("http")
                  ? profile.profile_picture
                  : `${API_BASE_URL}${profile.profile_picture}`}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border"
                onError={(e) => {
                  console.warn("Failed to load image, showing fallback");
                  e.target.style.display = "none";
                  const parent = e.target.parentElement;
                  const fallback = parent.querySelector(".fallback");
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            ) : null}
            {!profile.profile_picture && (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold fallback">
                {profile.username?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </div>
          <div>
            <p>
              <strong>Username:</strong> {profile.username || "Not set"}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>ID:</strong> {profile.id}
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm"
            >
              Choose File
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-orange-400">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p>You have no bookings yet.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b, index) => (
              <li
                key={index}
                className="border border-white/20 p-4 rounded shadow flex flex-col md:flex-row gap-4 bg-white/5"
              >
                <img
                  src={`${API_BASE_URL}${b.image_url}`}
                  alt={b.bus}
                  className="w-40 h-24 object-cover rounded"
                  onError={(e) => (e.target.style.opacity = 0.5)}
                />
                <div className="flex-1">
                  <p>
                    <strong>Bus:</strong> {b.bus}
                  </p>
                  <p>
                    <strong>Route:</strong> {b.route}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
