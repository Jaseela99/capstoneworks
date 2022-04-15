import React from "react";


const Sidebar = () => {
  return (
    <div className="w-1/5 h-screen flex  flex-col bg-gradient-to-r from-emerald-700 to-green-600  rounded-lg mt-12 shadow-xl">
        
      <ul className=" flex-col text-yellow-100 font-serif font-bold text-center text-md mt-6 mx-3 my-3">
        <li className="rounded-md mb-4 ">Teachers</li>
        <hr className="my-4 min-w-full bg-lime-300" />
        <li className="rounded-md mb-4">Students</li>
        <hr className="my-4 min-w-full" />
      </ul>
    </div>
  );
};

export default Sidebar;
