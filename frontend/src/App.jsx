import React, { useEffect } from "react"
import UpGoingBtn from "./conponents/UpGoingBtn.jsx"
import Navbar from "./conponents/Navbar/Navbar"
import Header from "./conponents/Header/Header"
import Skills from "./conponents/Skills/Skills"
import Project from "./conponents/Projects/Project"
import Connect from "./conponents/Connet/Connect"
import Footer from "./conponents/Footer/Footer"
import { masterTL } from "./gsap/masterTimeline.js";
import { useProfileContext } from "./context/profileContext.jsx";
import Feedback from "./conponents/feedback/Feedback.jsx"

function App() {
  const { isReady } = useProfileContext();
  useEffect(() => {
  if (isReady) {
    masterTL.play();
  }
}, [isReady]);

  return (
    <>
    <Navbar />
    <Header />
    <Skills />
    <Project />
    <Connect />
    <Feedback />
    <Footer />
    <UpGoingBtn />
    </>
  )
}

export default App
