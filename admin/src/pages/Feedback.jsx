import React from "react";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useEffect } from "react";

const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const { baseApi } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  // fetch feedback
  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseApi}/api/feedback`);
      if (response.data.success) {
        setFeedbacks(response.data.feedbacks);
        setLoading(false);
        console.log("FEEDBACK FETCHED : ", response.data.feedbacks);
      }
    } catch (error) {
      console.log("ERROR FETCHING FEEDBACK : ", error);
      setLoading(false);
    }
  };
  // fetch feedback by slug
  const fetchFeedbackById = async (slug) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseApi}/api/feedback/search/${slug}`
      );
      if (response.data.success) {
        setFeedbacks(response.data.feedbacks);
        setLoading(false);
        console.log("FETCHED FEEDBACK BY ID : ", response.data);
      }
    } catch (error) {
      console.log("FETCHED FEEDBACK BY ID ERROR : ", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFeedback();
  }, []);
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-none">
        <h1 className="text-3xl font-bold text-center text-white">Feedback</h1>
        <div className="flex justify-end items-center gap-2 mt-3">
          <span>
            <RefreshCw
              onClick={() => {
                setIsAnimating(true);
                fetchFeedback();
                setTimeout(() => {
                  setIsAnimating(false);
                }, 500);
              }}
              className={`w-5 h-5 ml-2 cursor-pointer ${
                isAnimating ? "animate-spin" : ""
              }`}
            />
          </span>
          {/* <div className="flex gap-2">
          <button
            className={`md:p-2 p-1 rounded-md text-sm font-medium bg-gray-700  transition duration-200 ease-in-out cursor-pointer ${
              mode === "all" ? "primary-color" : "text-white"
            }`}
            onClick={() => handleMsgToggle("all")}
          >
            All
          </button>
          <button
            className={`md:p-2 p-1 rounded-md text-sm font-medium bg-gray-700 transition duration-200 ease-in-out cursor-pointer ${
              mode === "unseen" ? "primary-color" : "text-white"
            }`}
            onClick={() => handleMsgToggle("unseen")}
          >
            Unseen
          </button>
          <button
            className={`md:p-2 p-1 rounded-md text-sm font-medium bg-gray-700 transition duration-200 ease-in-out cursor-pointer ${
              mode === "seen" ? "primary-color" : "text-white"
            }`}
            onClick={() => handleMsgToggle("seen")}
          >
            Seen
          </button>
        </div> */}
          <input
            id="SearchMessage"
            onChange={(e) => fetchFeedbackById(e.target.value)}
            className="w-40 h-10 p-1 shadow-2xs shadow-blue-700 rounded-sm border border-blue-900 overflow-x-auto bg-slate-900 normal-color focus:outline-none"
            type="text"
            placeholder="Search of Feedback"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mt-3 border-t border-t-blue-200">
        {loading ? (
          <div className="h-[200px] flex justify-center items-center mt-3">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <div className="flex-1 mt-3">
            {feedbacks.map((feedback) => {
              return (
                <div
                  key={feedback._id}
                  className="h-full shadow-2xs shadow-blue-700 rounded-xl p-5 border border-blue-900 overflow-x-auto mb-4"
                >
                  <div>
                    <h2 className="primary-color">
                      Name : <span className="text-white">{feedback.name}</span>
                    </h2>
                    <h2 className="primary-color">
                      Message :{" "}
                      <span className="text-white">{feedback.message}</span>
                    </h2>
                    <h2 className="primary-color">
                      Rating :{" "}
                      <span className="text-white">{feedback.rating}</span>
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
