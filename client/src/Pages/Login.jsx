import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Login as LoginUser } from "../api/user.api";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async (data) => {
    // Check if username contains spaces
    if (/\s/.test(data.username)) {
      setError("username", { type: "manual", message: "Invalid username" });
      return;
    }

    try {
      const res = await LoginUser(data);
      // console.log(data);
      if (res.status === 200) {
        alert("Successfully logged in");
        navigate("/");
      } else {
        alert(`${res.response.data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-blue-300 to-purple-200">
      <form 
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h1 className="text-3xl font-bold mb-8 text-black text-center">Login</h1>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("username", {
              required: true,
            })}
          />
          <FaUser className="absolute right-3 top-3 text-gray-400" />
          {errors.username && (
            <p className="text-red-500 text-sm mt-2">{errors.username.message}</p>
          )}
        </div>

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-3 pr-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: true,
            })}
          />
          <div
            className="absolute right-3 top-4 flex items-center cursor-pointer"
            style={{ width: '20px' }} // Ensures consistent width for the icon container
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-500" />
            ) : (
              <FaEye className="text-gray-500" />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center text-black">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <Link to="#" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Login
        </button>

        <div className="text-center mt-6 text-black">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
