import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
const ProjectDetail = ({ showModal, setShowModal, projectSelected }) => {
  return (
    <section
      className={`w-full min-h-[100vh] bg-[#00000099] fixed top-0 left-0 flex items-center justify-center z-50 transition-all duration-300 normal-color ${
        showModal ? "flex" : "hidden"
      } duration-300`}
    >
      <div
        className={`w-[90%] md:w-[50%] border border-white bg-[#121B30] p-8 rounded-lg shadow-lg relative`}
      >
        <button
          onClick={() => setShowModal(false)}
          className="normal-color cursor-pointer text-3xl absolute top-4 right-8"
        >
          <IoMdClose />
        </button>
        <h3 className="text-3xl font-bold mb-4">{projectSelected?.name || "Project Name"}</h3>
        <p className="text-lg mb-4">{projectSelected?.description || "Project Description"}</p>
        <p className="font-semibold mb-2">Technologies Used:</p>
        <ul className="list-disc list-inside text-lg mb-4">
          {projectSelected?.technologies?.map((technology, index) => (
            <li key={index}>{technology}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4 mt-6">
          <Link
            to={projectSelected?.liveLink || "#"}
            onClick={() => console.log(projectSelected?.liveLink)}
            target="_blank"
            className="inline-block bg-[#9c85bd] hover:bg-[#8a73a6] normal-color font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105 shadow-md"
          >
            Live Demo
          </Link>
          <Link
            to={projectSelected?.githubLink || "#"}
            target="_blank"
            className="inline-block bg-gray-700 hover:bg-gray-800 normal-color font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105 shadow-md"
          >
            GitHub Repo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
