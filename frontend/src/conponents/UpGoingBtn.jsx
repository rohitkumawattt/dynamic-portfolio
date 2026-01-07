import React from 'react'
import { MoveUp } from 'lucide-react';
const UpGoingBtn = () => {
    // function to appear up going button on scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            document.querySelector(".up-going-btn").style.display = "block";
        } else {
            document.querySelector(".up-going-btn").style.display = "none";
        }
    });
  return (
    <div>
      <a href="#top" className="hidden up-going-btn fixed bottom-10 right-10 bg-[#9c85bd] normal-color p-4 rounded-full">
        <MoveUp />
      </a>
    </div>
  )
}

export default UpGoingBtn
