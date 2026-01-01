import React, { useRef } from "react";
import "./header.css";
import Rohit from "../../assets/rohit_image.jpg";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub, FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useProfileContext } from "../../context/profileContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, profile } = useProfileContext();
  const introRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".profile-img", {
      scale: 0,
      delay: 0.1,
      duration: 0.7,
      opacity: 0,
      ease: "back.out(1.4)",
    });
    tl.from(".intro-title", {
      y: 50,
      duration: 0.3,
      opacity: 0,
      ease: "back.out(1.4)",
    });
    // Split the text into lines
    const split = new SplitType(introRef.current, {
      types: "lines",
      lineClass: "line-of-text",
    });
    tl.from(split.lines, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.2,
      ease: "power2.in",
    });
    tl.from(".socal-icons span", {
      y: -50,
      duration: 0.3,
      delay: 0.1,
      stagger: 0.1,
      opacity: 0,
      ease: "back.out(1.4)",
    });
  });
  return (
    <div
      id="home"
      className="w-full h-[100vh] flex justify-center items-start  text-[#ffffffa8]"
    >
      <div className="w-full flex flex-col justify-start items-center gap-7 py-5 md:h-[550px] md:flex-row-reverse md:justify-evenly md:items-center">
        <div className="profile-img w-36 h-36 flex justify-center items-center bg-cover bg-center md:w-72 md:h-72 primary-shadow">
          <img
            className="w-full h-full rounded-full object-cover primary-border md:h-72"
            src={profile?.avatar?.url}
            alt="Rohit Kumawat"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-2 px-4 md:w-[50%]">
          <h1 className="intro-title normal-color text-2xl md:text-3xl">
            Hello, I'm
            <span className="font-bold primary-color">
              {" "}
              {profile?.name || user?.name}
            </span>
          </h1>
          <p
            ref={introRef}
            className="normal-color text-sm text-justify md:w-2xl md:text-lg"
          >
            {profile?.about}
          </p>
          <div className="socal-icons flex gap-4 text-3xl text-white">
            <span>
              <Link to={profile?.socialLinks?.linkedin} target="true">
                <CiLinkedin className="hover:scale-110 duration-300 cursor-pointer text-blue-600" />
              </Link>
            </span>
            <span>
              <Link to={profile?.socialLinks?.github} target="true">
                <FaGithub className="hover:scale-110 duration-300 cursor-pointer text-white" />
              </Link>
            </span>
            <span>
              <Link to={profile?.socialLinks?.instagram} target="true">
                <FaInstagram className="hover:scale-110 duration-300 cursor-pointer text-pink-600" />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
