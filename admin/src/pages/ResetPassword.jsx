import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { assets } from "../assets/assets";
import axios from "axios";
import { useAuth } from "../context/authContext";
const ResetPassword = () => {
  const { baseApi } = useAuth();
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

  const inputRefs = useRef([]);
  const handleInput = (e, index) => {
    if (index < inputRefs.current.length - 1 && e.target.value.length > 0) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseApi}/api/users/send-reset-otp`, {
        email,
      });
      if(response.data.success){
        console.log("ON SUBMIT EMAIL : ",response.data)
        toast.success(response.data.message);
        setIsEmailSent(true);
      }else{
        console.log("ERROR ON SUBMIT EMAIL : ",response.data)
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((ref) => ref.value).join("");
    setOtp(otp);
    setIsOtpSubmited(true);
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseApi}/api/users/reset-password`, {
        email,
        otp,
        newPassword,
      });
      if(response.data.success){
        console.log("ON SUBMIT NEW PASSWORD : ",response.data);
        toast.success(response.data.message);
        navigate("/login");
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans text-gray-100">
      {/* email id form  */}
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm ">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset password
          </h1>
          <p className="text-center text-indigo-300 mb-6">
            Enter your registered email address.
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700">
            <img src={assets.mail_icon} alt="" className="w-3 h-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email id"
              className="bg-transparent outline-none text-white w-full"
              required
            />
          </div>
          <button className="w-full py-2.5 rounded-full bg-indigo-900 text-white cursor-pointer">
            Submit
          </button>
        </form>
      )}
      {/* otp input form  */}
      {!isOtpSubmited && isEmailSent && (
        <form onSubmit={onSubmitOtp} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm ">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset password OTP
          </h1>
          <p className="text-center text-indigo-300 mb-6">
            Enter the 6-digit code sent to your email id.
          </p>
          <div className="flex justify-between mb-8 " onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => {
                return (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    required
                    className="w-12 h-12 text-center text-xl text-white bg-gray-700 rounded-md"
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                );
              })}
          </div>
          <button className="w-full py-3 rounded-full bg-indigo-900 text-white cursor-pointer">
            Submit
          </button>
        </form>
      )}
      {/* enter new password  */}
      {isOtpSubmited && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm ">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New password
          </h1>
          <p className="text-center text-indigo-300 mb-6">
            Enter the new password below.
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700">
            <img src={assets.lock_icon} alt="" className="w-3 h-3" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              placeholder="password"
              className="bg-transparent outline-none text-white w-full"
              required
            />
          </div>
          <button className="w-full py-3 rounded-full bg-indigo-900 text-white cursor-pointer">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
