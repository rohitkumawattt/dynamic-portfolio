/* eslint-disable no-unused-vars */
import React, { useRef } from "react";

import "./navbar.css";
import menu from "../../assets/menu.svg";
import cross from "../../assets/cross.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { masterTL } from "../../gsap/masterTimeline.js";

import { useProfileContext } from "../../context/profileContext";

const Navbar = () => {
  const { user } = useProfileContext();
  useGSAP(
    () => {
      if (!user?.name) return;
      const mm = gsap.matchMedia();
      gsap.set(".logo", { visibility: "visible" });
      masterTL.from(".logo", {
        y: -50,
        delay: 0.3,
        duration: 0.5,
        opacity: 0,
        ease: "back.out(1.4)",
      });
      // desktop only animation
      mm.add("(min-width:768px)", () => {
        gsap.set([".nav-items", ".resume-btn"], { visibility: "visible" });
        masterTL.from(".nav-items a", {
          y: -50,
          duration: 0.3,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(2)",
        });
        masterTL.from(".resume-btn", {
          opacity: 0,
        });
      });
      return () => mm.revert();
    },
    { dependencies: [user?.name] }
  );
  // side bar timeline

  const sidebarTL = useRef(null);
  useGSAP(() => {
    sidebarTL.current = gsap.timeline({ paused: true });
    sidebarTL.current
      .fromTo(
        ".side-items",
        { x: 230 },
        {
          x: 0,
          duration: 0.3,
          ease: "slow(0.7,0.7,false)",
        }
      )
      .from(
        ".side-items a",
        {
          x: 20,
          opacity: 0,
          duration: 0.1,
          ease: "slow(0.7,0.7,false)",
          stagger: 0.1,
        },
        "-=0.1"
      )
      .from(".side-resume-btn", {
        x: 20,
        opacity: 0,
        duration: 0.2,
        ease: "slow(0.7,0.7,false)",
      });
    sidebarTL.current.pause();
  }, "-=0.2");

  return (
    <>
      <div id="top" className="z-50">
        <nav className="flex justify-between items-center py-3 px-10">
            <h1 className="logo preload-hidden primary-color font-bold md:text-2xl sm-text-xl cursor-pointer">
              {user.name}
            </h1>
          <div className="hidden nav-items preload-hidden normal-color md:flex items-center gap-7 text-[18px]">
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
            <a className="nav-item" href="#feedback">
              Rate Us
            </a>
            <div className="resume-btn preload-hidden">
              <button
                onClick={() => {
                  alert("Resume will update soon!");
                }}
                className="bg-[#9c85bd] text-white px-4 py-2 rounded-lg cursor-pointer"
                type="button"
              >
                <a
                href="#"
                className="line-through"
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
              onClick={() => sidebarTL.current.play()}
            />
          </div>
        </nav>
        <div className="w-[230px] h-full flex flex-col side-items md:hidden fixed top-0 right-0 translate-x-[230px] gap-3 text-[20px] pl-4 bg-transparent backdrop-style shadow-2xl z-50 pt-20">
          <div className="w-9 h-9 flex justify-center items-center bg-[#9c85bd] absolute right-10 top-4 rounded-full md:hidden cross">
            <img
              src={cross}
              alt="Menu button"
              className="text-3xl cursor-pointer"
              onClick={() => sidebarTL.current.reverse()}
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
          <a className="primary-color" href="#feedback">
            Rate Us
          </a>
          <div className="resume-btn sidebar-item">
            <button
              onClick={() => {
                alert("Resume will update soon!");
              }}
              className="bg-[#344582] side-resume-btn text-white px-4 py-2 rounded-lg cursor-pointer"
              type="button"
            >
              <a
                href="#"
                className="line-through"
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
