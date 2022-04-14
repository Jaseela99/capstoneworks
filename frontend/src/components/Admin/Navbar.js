import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "./Sidebar";

const Navbar = () => {
  
  return (
    <div className="flex justify-between fixed h-1/6 w-full rounded shadow-lg m-0 px-2 py-8 bg-lime-400 ">
      <MenuIcon />
       <div className=" text-center text-lime-800 font-serif font-bold ">
        Insight Guru
      </div>
      <button className="text-gray-200 font-serif font-bold bg-lime-700 rounded-lg shadow-md px-2 ">
        LogOut
      </button>
    </div>
  );
};

export default Navbar;
