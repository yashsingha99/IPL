import React, { useState } from "react";
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Register as RegisterUser, Login as LoginUser } from "../api/user.api";

const Registration = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (data) => {
    // Check if username contains spaces
    if (/\s/.test(data.username)) {
      setError("username", { type: "manual", message: "Username cannot contain spaces" });
      return;
    }

    try {
      const res = await RegisterUser(data);
      if (res.status === 200) {
        alert("Successfully registered");

        // Automatically log the user in
        const loginRes = await LoginUser({ username: data.username, password: data.password });
        if (loginRes.status === 200) {
          alert("Successfully logged in");
          navigate("/");
        } else {
          alert(`${loginRes.response.data.message}`);
        }
      } else {
        alert(`${res.response.data.message}`);
      }
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200">
      <form
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        onSubmit={handleSubmit(handleRegister)}
      >
        <h1 className="text-3xl font-bold mb-8 text-black text-center">Sign Up</h1>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("username", { required: true })}
          />
          <FaUser className="absolute right-3 top-3 text-gray-400" />
          {errors.username && (
            <p className="text-red-500 text-sm mt-2">{errors.username.message}</p>
          )}
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("name", { required: true })}
          />
          <FaUser className="absolute right-3 top-3 text-gray-400" />
        </div>

        <div className="relative mb-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", { required: true })}
          />
          <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
        </div>

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: "Password is required",
              validate: {
                minLength: (value) =>
                  value.length >= 8 || "Password must be at least 8 characters long",
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "Password must contain at least one special character",
                hasDigit: (value) =>
                  /\d/.test(value) || "Password must contain at least one digit",
              },
            })}
          />
          <div
            className="absolute right-3 top-4 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
          )}
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Your Favourite Team"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("team", { required: true })}
          />
          <FaUser className="absolute right-3 top-3 text-gray-400" />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Register
        </button>

        <div className="text-center mt-6 text-black">
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
