import React, { useState, useEffect } from "react";
import Rohit from "../assets/rohit_image.jpg";
import ProjectDetail from "../components/ProjectDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { SquarePen, MoveRight, RefreshCw } from "lucide-react";
// import toast from "react-hot-toast";
const Dashboad = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState("");
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const { baseApi } = useAuth();
  const [skills, setSkills] = useState([]);
  const fetchProject = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseApi}/api/projects`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Project details:", response.data);
        setProjects(response.data.projects);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseApi}/api/skills`);
      if (response.status === 200) {
        console.log("SKILLS FECTHING DATA : ", response.data);
        setSkills(response.data.skills);
        setLoading(false);
      }
    } catch (error) {
      console.log("SKILLS FEATCHING ERROR : ", error.message);
    }
  };
  const getSkillColor = (category) => {
    switch (category?.toLowerCase()) {
      case "frontend":
        return "bg-green-400";
      case "backend":
        return "bg-red-400";
      case "tools":
        return "bg-blue-400";
      case "softskills":
      case "soft skills":
        return "bg-yellow-400";
      default:
        return "bg-gray-400";
    }
  };
  const handleRefresh = (refereshItem) =>{
    setIsAnimating(refereshItem);
    switch(refereshItem){
      case "project":
        fetchProject();
        break;
      case "skills":
        fetchSkills();
        break;
      case "about":
        break;
      default:
        break;
    }
    setTimeout(() => {
      setIsAnimating("");
    }, 300);
  }
  useEffect(() => {
    fetchProject();
    fetchSkills();
  }, []);
  const openDetails = (project) => {
    setSelectedProject(project || {});
    setShowModal(true);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold normal-color">Dashboard</h1>
      <div className="mt-5">
        <h3 className="text-2xl flex items-center font-bold normal-color pb-2 border-b-2 border-white">
          All Projects
          <span>
            <SquarePen
              className="w-5 h-5 ml-2 mt-1 cursor-pointer"
              onClick={() => navigate("/projects")}
            />
          </span>
          <span>
            <RefreshCw onClick={() => handleRefresh("project")}
             className={`w-5 h-5 ml-2 cursor-pointer ${isAnimating === "project" ? "animate-spin" : ""}`} />
          </span>
        </h3>
        {loading ? (
          <div className="h-[200px] flex justify-center items-center mt-3">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <div>
            <div
              id="projectGrid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10 px-4 md:px-10"
            >
              {projects.map((project) => {
                return (
                  <div
                    key={project._id}
                    className="W-[270px] bg-[#ffffff3e] backdrop-blur-2xl rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow relative"
                    data-project-id={project._id}
                  >
                    {/* image  */}
                    <div className="flex justify-center mb-4">
                      <div className="w-28 h-28 rounded-lg overflow-hidden bg-white shadow">
                        <img
                          src={project?.image?.url || Rohit}
                          alt="project Logo"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    {/* description  */}
                    <div className="flex-1 text-center">
                      <h3 className="text-2xl font-semibold mb-2">
                        {project?.ProjectName || "untitled Project"}
                      </h3>
                      <p className=" text-base text-gray-400 mb-4 line-clamp-3">
                        {project?.description || "No description provided."}
                      </p>
                    </div>
                    {/* buttons  */}
                    <div className="flex justify-center gap-4 mt-4">
                      <button
                        onClick={() => openDetails(project)}
                        className="flex items-center justify-center bg-[#9c85bd] hover:bg-[#8a73a6] normal-color font-semibold rounded-md hover:scale-105 shadow-md cursor-pointer px-4 py-2"
                      >
                        View Details{" "}
                        <MoveRight className="md:ml-1 ml-3 mt-0.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <ProjectDetail
          showModal={showModal}
          setShowModal={setShowModal}
          project={selectedProject}
        />
      </div>
      <div className="mt-5">
        <h3 className="text-2xl flex items-center font-bold normal-color pb-2 border-b-2 border-white">
          About Me{" "}
          <span>
            {" "}
            <SquarePen
              className="ml-2 mt-1 cursor-pointer"
              onClick={() => navigate("/about")}
            />
          </span>
          <span>
            <RefreshCw onClick={() => handleRefresh("about")}
             className={`w-5 h-5 ml-2 cursor-pointer ${isAnimating === "about" ? "animate-spin" : ""}`} />
          </span>
        </h3>
        <div className="normal-color">
          <h2 className=" text-l font-bold">
            User Name :{" "}
            <span className="font-thin">
              <i>Rohit Kumawat</i>
            </span>
          </h2>
          <p className=" text-l font-bold">
            About :{" "}
            <span className="font-thin text-justify">
              <i>
                A passionate and highly motivated Web Developer dedicated to
                building dynamic, user-friendly digital experiences. As a recent
                graduate, I'm proficient in the{" "}
                <span className="primary-color font-bold"> MERN stack</span> and
                thrive on turning creative concepts into deployed applications.
                My project,{" "}
                <span className="primary-color font-bold">"SymptoScope"</span>{" "}
                showcases my ability to handle complex
                <span className="font-bold"> full-stack logic</span> and deliver
                seamless user interfaces. I'm eager to join a collaborative team
                where I can leverage my hands-on project experience and
                commitment to clean, scalable code in a challenging junior role.
              </i>
            </span>
          </p>

          <ol>
            <li className="font-bold">
              LinkedIn :{" "}
              <span className="font-thin">
                <i>https://www.linkedin.com/in/rohit-kumawattt/</i>
              </span>
            </li>
            <li className="font-bold">
              GitHub :{" "}
              <span className="font-thin">
                <i>https://github.com/rohitkumawattt</i>
              </span>
            </li>
            <li className="font-bold">Instagram : ----------</li>
          </ol>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-2xl flex items-center font-bold normal-color pb-2 border-b-2 border-white">
          Skills{" "}
          <span>
            {" "}
            <SquarePen
              className="ml-2 mt-1 cursor-pointer"
              onClick={() => navigate("/skills")}
            />
          </span>
          <span>
            <RefreshCw onClick={() => handleRefresh("skills")}
             className={`w-5 h-5 ml-2 cursor-pointer ${isAnimating === "skills" ? "animate-spin" : ""}`} />
          </span>
        </h3>
        <div className="normal-color py-3">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className={`${getSkillColor(
                  skill.category
                )} text-white font-semibold py-1 px-3 rounded-md`}
              >
                <div className={` flex items-center justify-center`}>
                  {skill.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboad;
