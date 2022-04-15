import React,{useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
//import Sidebar from "./Sidebar";

const Navbar = () => {
    const [hidden, sethidden] = useState(false);
    
    return (
      
      <div className="flex justify-between fixed h-1/8 w-full rounded shadow-lg m-0 px-3 py-3 bg-gradient-to-r from-lime-400 to-teal-500 ">
      <div className="flex">
        <MenuIcon  onClick={() => {
          sethidden(!hidden);
        }}/>
        <div className="mx-5 text-center text-teal-800 font-serif font-bold text-md ">
          Insight Guru
        </div>
      </div>

      <h1 className="mx-5 text-center text-teal-800 font-serif font-bold text-lg ">
        SOAL
      </h1>
      <button  className="text-gray-200 text-md font-serif font-bold bg-gradient-to-r from-green-800 to-emerald-700 hover:from-sky-700 hover:to-blue-800 rounded-lg shadow-md px-3 py-1  ">
        LogOut
      </button>
    </div>
   
    
  );
};

export default Navbar;
