import React, { useState } from "react";
import axios from "axios";
import { useProfileContext } from "../../context/profileContext";
import toast from "react-hot-toast";
import Feedback from "../feedback/Feedback";
const Connect = () => {
  const { baseApi } = useProfileContext();
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setSending(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseApi}/api/messages/send`,
        formData
      );
      if (response.data.success) {
        console.log("MSG SENT SUCCESSFULLT : ", response.data);
        toast.success("Message sent successfully!");
        setSending(false);
      }
      // Clear form fields
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log("ERROR WHILE SENDING MSG : ", error);
      toast.error(error.response.data.message);
      setSending(false);
    }
  };
  // The component structure remains highly similar to the HTML, utilizing standard dark-theme classes.
  return (
    <section id="connect" className="w-full min-h-[100vh] border-t border-t-blue-100">
      <h2 className="text-3xl font-bold text-center primary-color mt-3">
        Let's Connect
      </h2>
      <div className="flex justify-center items-center py-8 px-4 md:px-10">
        {/* Left side (form div)  */}
        <div className="md:w-1/2 w-full mb-12 md:mb-0">
          <div className="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl border border-gray-700 h-full">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Send Me a Message
            </h2>

            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-teal-400 focus:border-teal-400 transition duration-150"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-teal-400 focus:border-teal-400 transition duration-150"
                  placeholder="hello@example.com"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-teal-400 focus:border-teal-400 transition duration-150"
                  placeholder="Tell me about your project or idea..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={!formData.name || !formData.email || !formData.message}
                className={`w-full py-3 px-6 text-gray-900 font-bold text-lg rounded-lg shadow-lg  transition duration-300 transform  ${formData.name || formData.email || formData.message ? "bg-[#9c85bd] hover:bg-teal-400 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50" : "bg-gray-600 cursor-not-allowed"}`}
              >
                {sending ? (
                  <>
                  <span className="loading loading-spinner loading-md"></span>
                  Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
              {/* clear form button  */}
              <div className="w-full flex justify-end">
                <button
                  type="button"
                  disabled={!formData.name && !formData.email && !formData.message}
                  onClick={() => setFormData({ name: "", email: "", message: "" })}
                  className={`mt-4 px-4 py-2 bg-gray-600 normal-color rounded-lg shadow-md  transition duration-300 ${!formData.name && !formData.email && !formData.message ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-700"}`}
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
