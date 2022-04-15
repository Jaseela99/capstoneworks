import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import Teacher from "./Teacher";

function AdminDashboard() {
 
  return (
    <div className="flex-col h-screen flex-nowrap relative ">
      <Navbar />
      <div className="flex mt-18">
      <Sidebar  /* className={hidden ? "hidden" : null} */ />
        <div className="mt-14 border-2 w-full h-screen">
          <Teacher/>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
