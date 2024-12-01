import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Star, Edit } from 'lucide-react';
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("user");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        setFormData(decodedUser); // Initialize formData with user data
      } catch (error) {
        console.error(error);
        Cookies.remove("user");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData); // Simulate saving the updated data
    setIsEditing(false);
    console.log("Updated User:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center">
          <User className="mr-3 text-blue-500" /> Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
            >
              <User className="mr-2 text-blue-500" /> Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md transition-all duration-300 ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
            >
              <Mail className="mr-2 text-blue-500" /> Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md transition-all duration-300 ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={formData.username || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md transition-all duration-300 ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="favTeam"
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
            >
              <Star className="mr-2 text-blue-500" /> Favourite Team
            </label>
            <input
              id="favTeam"
              type="text"
              value={formData.favTeam || "N/A"}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md transition-all duration-300 ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* <button
            type={isEditing ? "submit" : "button"}
            onClick={isEditing ? undefined : () => setIsEditing(true)}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
          >
            <Edit className="mr-2" /> {isEditing ? "Save Changes" : "Edit Profile"}
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default Profile;
