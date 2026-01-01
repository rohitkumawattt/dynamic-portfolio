import React ,{ useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
const Messages = () => {
  const [loading, setLoading] = useState(false);
  const { baseApi } = useAuth();
  const [messages, setMessages] = useState([]);
  // const [mode, setMode] = useState("all");
  const [isAnimating, setIsAnimating] = useState(false);

  // const handleMsgToggle = (selectedMode) => {
  //   setMode(selectedMode);
  // };
  // fetch messages
  const fetchMessage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseApi}/api/messages`);
      if (response.data.success) {
        setMessages(response.data.messages);
        setLoading(false);
      }
      console.log("MESSAGES FETCHED : ", response.data.messages);
    } catch (error) {
      console.log("ERROR FETCHING MESSAGES : ", error);
      setLoading(false);
    }
  };
  const fetchMsgById = async (slug) => {
    setLoading(true)
    try {
      const response = await axios.get(`${baseApi}/api/messages/${slug}`);
      if(response.data.success){
        setMessages(response.data.messages)
        console.log("FETCHED MSG BY ID : ", response.data.messages);
        setLoading(false);
      }
    } catch (error) {
      console.log("FETCHED MSG BY ID ERROR : ", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchMessage();
  }, []);
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-none">
        <h1 className="text-3xl font-bold text-center text-white">Messages</h1>
        <div className="flex justify-end items-center gap-2 mt-3">
          <span>
            <RefreshCw onClick={() => {
              setIsAnimating(true);
              fetchMessage();
              setTimeout(() => {
                setIsAnimating(false);
              }, 500);
            }}
             className={`w-5 h-5 ml-2 cursor-pointer ${isAnimating ? "animate-spin" : ""}`} />
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
            onChange={(e) => fetchMsgById(e.target.value)}
            className="w-40 h-10 p-1 shadow-2xs shadow-blue-700 rounded-sm border border-blue-900 overflow-x-auto bg-slate-900 normal-color focus:outline-none"
            type="text"
            placeholder="Search Message"
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
            {messages.map((message) => {
              return (
                <div
                  key={message._id}
                  className="h-full shadow-2xs shadow-blue-700 rounded-xl p-5 border border-blue-900 overflow-x-auto mb-4"
                >
                  <div>
                    <h2 className="primary-color">
                      Name : <span className="text-white">{message.name}</span>
                    </h2>
                    <h2 className="primary-color">
                      Email :{" "}
                      <span className="text-white">{message.email}</span>
                    </h2>
                    <h2 className="primary-color">
                      Message :{" "}
                      <span className="text-white">{message.message}</span>
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

export default Messages;
