import React, { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import { useProfileContext } from "../../context/profileContext";
import toast from "react-hot-toast";
const Feedback = () => {
  const { baseApi } = useProfileContext();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 0,
  });

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.post(`${baseApi}/api/feedback/send`,formData);
    if(response.data.success){
      console.log("Feedback Sent Successfully : ", response.data);
      toast.success("Feedback Sent Successfully");
      setSending(false);
    }else{
      toast.error(response.data.message);
    }
    setFormData({
      name: "",
      message: "",
      rating: 0,
    });
    setRating(0);
    } catch (error) {
      console.log("Error Sending Feedback : ", error);
      toast.error(error.response.data.message);
    }
    
  };
  return (
    <section id="feedback" className="w-full border-t border-t-blue-100">
      <h2 className="text-3xl font-bold text-center primary-color mt-3">
        Rate Us
      </h2>
      <div className="flex justify-center items-center py-8 px-4 md:px-10">
        {/* feedback form container */}
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <div className="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl border border-gray-700 h-full">
            <h2 className="text-3xl font-bold mb-6 text-white">Feedback :-</h2>
            {/* feedback Form */}
            <form onSubmit={handleSubmit}>
              {/* star rating  */}
              <div className="w-full flex justify-center items-center mb-5 p-2">
                <div className="flex items-center gap-6">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = hoverRating
                      ? star <= hoverRating
                      : star <= rating;
                    return (
                      <Star
                        key={star}
                        size={34}
                        onClick={() => {
                          setRating(star);
                          setFormData((prev) => ({
                            ...prev,
                            rating: star,
                          }));
                        }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`
                          cursor-pointer transition-all duration-300
                          ${
                            active
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-500"
                          }
                          hover:scale-125
                        `}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-teal-400 focus:border-teal-400 transition duration-150"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-teal-400 focus:border-teal-400 transition duration-150"
                  placeholder="Help me to improve myself..."
                ></textarea>
              </div>
              <button
                disabled={!rating || sending}
                type="submit"
                className={`w-full py-3 px-6 text-gray-900 font-bold text-lg rounded-lg shadow-lg  transition duration-300 ${
                  rating
                    ? "bg-[#9c85bd] hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 hover:bg-teal-400"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                {sending ? (
                  <>
                    <span className="loading loading-spinner loading-md"></span>
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </button>
              {/* clear form button  */}
              <div className="w-full flex justify-end">
                <button
                  type="button"
                  disabled={!rating || sending}
                  onClick={() => {
                    setRating(0);
                    setHoverRating(0);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className={`mt-4 px-4 py-2 bg-gray-600 normal-color rounded-lg shadow-md  transition duration-300 ${
                    !rating
                      ? "cursor-not-allowed"
                      : "cursor-pointer hover:bg-gray-700"
                  }`}
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

export default Feedback;
