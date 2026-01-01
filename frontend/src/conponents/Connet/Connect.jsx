import React, { useState } from "react";
import rohitDesign from "../../assets/rohit-design.png";
import axios from "axios";
import { useProfileContext } from "../../context/profileContext";
import toast from "react-hot-toast";
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
      <div className="md:flex md:space-x-12 py-8 px-4 md:px-10">
        {/* Left side (form div)  */}
        <div className="md:w-1/2 mb-12 md:mb-0">
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
                className="w-full py-3 px-6 bg-[#9c85bd] text-gray-900 font-bold text-lg rounded-lg shadow-lg hover:bg-teal-400 transition duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50"
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
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: PORTFOLIO HIGHLIGHTS / CALLOUT */}
        <div className="md:w-1/2">
          {/* Card background: bg-gray-800 simulates secondary-dark */}
          <div className="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl border border-gray-700 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Why Work With Me?
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                I specialize in crafting high-performance, modern web
                applications. My focus is on clean code, responsive design, and
                delivering seamless user experiences. Let's build something
                exceptional together.
              </p>

              {/* Key Services List */}
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  {/* Icon for Full-Stack Development */}
                  <svg
                    className="w-6 h-6 mr-3 text-teal-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    ></path>
                  </svg>
                  <span>
                    **Full-Stack Development:** Expertise in React, Angular, and
                    robust back-end systems.
                  </span>
                </li>
                <li className="flex items-start">
                  {/* Icon for UI/UX Design */}
                  <svg
                    className="w-6 h-6 mr-3 text-teal-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9.25 10A1 1 0 0110.25 9H13.75A1 1 0 0114.75 10L14.25 17M12 20V22M8 20V22M16 20V22M5 19L19 19"
                    ></path>
                  </svg>
                  <span>
                    **Responsive UI/UX:** Mobile-first approach guaranteeing
                    usability on all devices.
                  </span>
                </li>
                <li className="flex items-start">
                  {/* Icon for Performance */}
                  <svg
                    className="w-6 h-6 mr-3 text-teal-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14H11V21L20 10H13"
                    ></path>
                  </svg>
                  <span>
                    **Optimization & Performance:** Focusing on speed and
                    efficiency for better SEO and experience.
                  </span>
                </li>
              </ul>
            </div>

            {/* Placeholder/Image Callout */}
            <div className="mt-8 pt-6 border-t border-gray-700 text-center">
              {/* Placeholder image using a dark background and teal ring */}
              <img
                src={rohitDesign}
                alt="Developer Profile Icon Placeholder"
                className="mx-auto h-32 w-32 rounded-full ring-4 ring-[#9c85bd] object-cover mb-4 shadow-xl"
              />
              <p className="text-xl font-semibold text-white">
                "Code that works, design that inspires."
              </p>
              <p className="text-sm text-gray-500 mt-1">— Rohit Kumawat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
