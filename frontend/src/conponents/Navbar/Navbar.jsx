/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./navbar.css";
import menu from "../../assets/menu.svg";
import cross from "../../assets/cross.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useProfileContext } from "../../context/profileContext";


const Navbar = () => {
  const [sideBar, setSideBar] = useState(false);
  const {user} = useProfileContext();
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".logo", {
      y: -50,
      delay: 0.3,
      duration: 0.5,
      opacity: 0,
      ease: "back.out(1.4)",
    });
    tl.from(".nav-items a", {
      y: -50,
      duration: 0.3,
      opacity: 0,
      ease: "back.out(2)",
      stagger: 0.1,
    });
    tl.from(".resume-btn",{
      opacity:0,
    })
  });
  const tl2 = gsap.timeline();
  useGSAP(() => {
    tl2.to(".side-items", {
      right: 0,
      duration: 0.2,
      ease: "slow(0.7,0.7,false)",
    });
    tl2.from(".side-items a", {
      x: 20,
      duration: 0.1,
      ease: "slow(0.7,0.7,false)",
      stagger: 0.1,
      opacity: 0,
    });
    tl2.from(".side-resume-btn", {
      x: 20,
      ease: "slow(0.7,0.7,false)",
      opacity: 0,
    });
    tl2.pause();
  });

  const handleSidebar = () => {
    tl2.play();
  };
  return (
    <>
      <div className="z-50">
        <nav className="flex justify-between items-center py-3 px-10">
          <div className="">
            <h1 className="logo primary-color font-bold text-3xl cursor-pointer">
              {user.name}
            </h1>
          </div>
          <div className="hidden nav-items normal-color md:flex items-center gap-7 text-[18px]">
            <a className="nav-item" href="#home">
              Home
            </a>
            <a className="nav-item" href="#skills">
              Skills
            </a>
            <a className="nav-item" href="#projects">
              Projects
            </a>
            <a className="nav-item" href="#connect">
              Let's Connect
            </a>
            <div className="resume-btn">
              <button
                className="bg-[#9c85bd] text-white px-4 py-2 rounded-lg cursor-pointer"
                type="button"
              >
                <a
                  href="frontend\src\assets\Rohit-Kumawat-Resume.docx"
                  download="Rohit-Kumawat-Resume.docx"
                >
                  Resume
                </a>
              </button>
            </div>
          </div>
          <div className="w-10 h-7 flex justify-center items-center bg-[#9c85bd] rounded-sm md:hidden">
            <img
              src={menu}
              alt="Menu button"
              className="text-3xl cursor-pointer"
              onClick={handleSidebar}
            />
          </div>
        </nav>
        <div className="w-[230px] h-[100%] flex flex-col side-items md:hidden fixed top-0 right-[-230px] gap-3 text-[20px] pl-4 bg-transparent backdrop-style shadow-2xl z-50 pt-20">
          <div className="w-9 h-9 flex justify-center items-center bg-[#9c85bd] absolute right-10 top-4 rounded-full md:hidden cross">
            <img
              src={cross}
              alt="Menu button"
              className="text-3xl cursor-pointer"
              onClick={() => tl2.reverse()}
            />
          </div>
          <a className="primary-color" href="#home">
            Home
          </a>
          <a className="primary-color" href="#skills">
            Skills
          </a>
          <a className="primary-color" href="#projects">
            Projects
          </a>
          <a className="primary-color" href="#connect">
            Let's Connect
          </a>
          <div className="resume-btn sidebar-item">
            <button
              className="bg-[#344582] side-resume-btn text-white px-4 py-2 rounded-lg cursor-pointer"
              type="button"
            >
              <a
                href="frontend\src\assets\Rohit-Kumawat-Resume.docx"
                download="Rohit-Kumawat-Resume.docx"
              >
                Resume
              </a>
            </button>
          </div>
        </div>
      </div>
      {/* Extra syling bubbles 
      <div className="white-bubble w-96 h-96 absolute -left-48 -top-40 border-2 border-white rounded-full -z-10 bg-[#ffffff3e] backdrop-style"></div>
      <div className="red-bubble w-32 h-32 absolute right-20 top-40 border-1 border-[#8c404021] rounded-full -z-10 bg-[#e9474717] backdrop-style"></div> */}

    </>
  );
};

export default Navbar;
