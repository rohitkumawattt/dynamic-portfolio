import React, {  useState } from "react";
import ProjectDetail from "./ProjectDetail";
import { useProfileContext } from "../../context/profileContext";
const Project = () => {
  const [showModal, setShowModal] = useState(false);
  const { projects } = useProfileContext();
  const [projectSelected, setProjectSelected] = useState({});
  return (
    <>
      <section id="projects" className="w-full min-h-[100vh]">
        <h2 className="text-3xl font-bold text-center primary-color">
          My projects
        </h2>
        <div
          id="projectGrid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10 px-4 md:px-10"
        >
          {projects.map((project) => {
            return (
              <div
                key={project._id}
                className="bg-[#ffffffa8] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow cursor-pointer"
                data-project-id="project1"
              >
                <div className="w-24 text-6xl text-blue-500 mb-4">
                  <img src={project.image.url} alt={project.name} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-700 text-base mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setProjectSelected(project);
                    }}
                    className="bg-[#9c85bd] hover:bg-[#8a73a6] text-white font-semibold py-2 px-6 rounded-full hover:scale-105 shadow-md"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <ProjectDetail
        showModal={showModal}
        setShowModal={setShowModal}
        projectSelected={projectSelected}
      />
    </>
  );
};

export default Project;
