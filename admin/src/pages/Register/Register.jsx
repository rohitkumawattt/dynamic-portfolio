/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./register.css";
import { Mail, Lock, User, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom"
import toast from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token, baseApi } = useAuth();
  const [message, SetMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseApi}/api/users/register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success === true) {
        toast.success("Registration successful");
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
      SetMessage(response.data.message);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
      console.log(response.data.success);
    } catch (error) {
      console.log(error.response?.data || error.message);
      SetMessage(
        error.response?.data?.message || "Something went wrong. Try again!"
      );
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans text-gray-100">
      {/* Form Card */}
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-6 text-center">
          Create Account
        </h1>
        {/* Success Message Area */}
        {isSubmitted && (
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              isSubmitted
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-3 scale-95 pointer-events-none"
            }`}
          >
            <div
              className={`border-l-4 p-4 mb-6 rounded-lg shadow-md ${
                isSuccess
                  ? "bg-green-900 border-green-500"
                  : "bg-red-900 border-red-500"
              }`}
            >
              <div className="flex items-center">
                <CheckCircle
                  className={`h-5 w-5 mr-3 ${
                    isSuccess ? "text-green-400" : "text-red-400 "
                  }`}
                />
                <p
                  className={`font-semibold ${
                    isSuccess ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {message}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Form Structure */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Input Field  */}
          <div className="mb-4">
            <div className="relative rounded-lg shadow-md">
              {/* Left Icon */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-12 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-800 transition duration-150 ease-in-out`}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email Field  */}
          <div className="mb-4">
            <div className="relative rounded-lg shadow-md">
              {/* Left Icon */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-12 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-800 transition duration-150 ease-in-out`}
                placeholder="Enter your email"
              />
            </div>
          </div>
          {/* Password Field  */}
          <div className="mb-4">
            <div className="relative rounded-lg shadow-md">
              {/* Left Icon */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-12 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-800 transition duration-150 ease-in-out`}
                placeholder="Enter your password"
                required
              />
              {/* Password Show/Hide Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-indigo-400 transition duration-150"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field  */}
          <div className="mb-4">
            <div className="relative rounded-lg shadow-md">
              {/* Left Icon */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-12 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-800 transition duration-150 ease-in-out`}
                placeholder="Enter your Confirm password"
              />
              {/* Password Show/Hide Toggle Button */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-indigo-400 transition duration-150"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-800 transition duration-150 ease-in-out transform hover:scale-[1.01]"
          >
            {isLoading ? (
              <>
                <div className="loader mr-2"></div>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Mode Switcher */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            Already have an account?
            <Link
              to={"/login"}
              className="ml-2 font-semibold text-indigo-400 hover:text-indigo-300 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-md focus:ring-offset-gray-800"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
