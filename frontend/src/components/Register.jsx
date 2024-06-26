// components/Register.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/action/userAction";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Navigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const userResponse = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { email } = formData;

    dispatch(userRegister({ ...formData, email: email.toLowerCase() }));
  };

  useEffect(() => {
    if (userResponse.status === "failed") {
      setError(userResponse.data);
    } else if (userResponse.status === "success") {
      if (userResponse?.data) {
        localStorage.setItem(
            "user",
            JSON.stringify(userResponse?.data?.user)
          );
        localStorage.setItem(
          "token",
          JSON.stringify(userResponse?.data?.token)
        );
        window.location.href = "/";
      }
    }
  }, [userResponse]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (userResponse.status === "success") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-purple-200 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-purple-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 pr-8 block w-full rounded-md border border-gray-300 focus:outline-purple-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-2 transform -translate-y-1 focus:outline-none"
            >
              {showPassword ? <IoMdEye size="30" /> : <IoMdEyeOff size="30" />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
          >
            Register
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-center text-sm py-4">{error}</p>
        )}
        <div className={`text-center ${!error ? "mt-4" : ""}`}>
          Already have an account?{" "}
          <a href="/login" className="text-purple-500">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
