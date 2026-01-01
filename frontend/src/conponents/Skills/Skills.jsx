import React, { useState } from "react";
import SkillGraph from "./SkillGraph";
import { useProfileContext } from "../../context/profileContext";
const Skills = () => {
  const [isSkillActive, setIsSkillActive] = useState("All Skills");
  const { skills } = useProfileContext();
  const skillBar = [
    "All Skills",
    "Frontend",
    "Backend",
    "Tools",
    "Soft Skills",
  ];
  return (
    <section id="skills" className="w-full min-h-[100vh]">
      <h1 className="skill-title text-[30px] font-bold text-center primary-color">
        Skills
      </h1>
      <div className="w-[90%] text-xl mx-auto mt-6 flex justify-center">
        <p className="md:w-[50%] text-center normal-color">
          This section highlights my core competencies. The radar chart below
          provides a visual overview of my proficiency in key technical areas.
          You can also explore specific skill categories using the buttons.
        </p>
      </div>
      <div className="w-full p-3 mt-6 flex justify-center flex-wrap gap-4 ">
        {skillBar.map((skill,index) => {
          return (
            <button
              key={index}
              onClick={() => setIsSkillActive(`${skill}`)}
              className={
                isSkillActive !== `${skill}`
                  ? "text-[#000000cc] transition duration-300 px-8 py-2 bg-[#ffffffa8] rounded-full font-medium hover:bg-[#9c85bda8] hover:text-[#ffffffa8]"
                  : "text-[#000000cc] transition duration-300 px-8 py-2 bg-[#9c85bd] rounded-full font-medium hover:bg-[#9c85bda8] hover:text-[#ffffffa8]"
              }
            >
              {skill}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5">
        <div className="order-1 md:order-2">
          <h3 className="text-2xl font-semibold normal-color mb-4 text-center md:text-left">
            Categorized Skills
          </h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 text-lg normal-color mt-3">
            {isSkillActive === "All Skills"
              ? skills.map((skill) => (
                  <li key={skill._id}>
                    <span className="text-blue-600">&#10003;</span> {skill.name}
                  </li>
                ))
              : skills
                  .filter((skill) => skill.category === isSkillActive)
                  .map((skill) => (
                    <li key={skill._id}>
                      <span className="text-blue-600">&#10003;</span>{" "}
                      {skill.name}
                    </li>
                  ))}
          </ul>
        </div>
        <div className="order-2 md:order-2">
          <h3 className="text-2xl font-semibold normal-color mb-4 text-center md:text-left md:ml-4">
            Technical Proficiency
          </h3>
          <div className="skill-shadow">
            <SkillGraph skills={skills} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
