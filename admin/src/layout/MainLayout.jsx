import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Slidebar from "../components/Slidebar";
const MainLayout = () => {
  return (
    <div className="MainLayout flex flex-col h-screen">
      {/* Navbar  */}
      <Navbar />
      {/* Main components  */}
      <main className="w-full flex flex-1 overflow-hidden">
        {/* left side bar  */}
        <aside className="bg-transparent p-2 md:block hidden">
          <Slidebar />
        </aside>
        {/* Rogit side  */}
        <div className="flex-1 p-2 flex flex-col min-h-0">
          <div className="w-full h-full shadow-2xl shadow-blue-700 rounded-xl p-5 border border-blue-900 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
