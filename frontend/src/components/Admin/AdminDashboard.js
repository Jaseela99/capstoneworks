import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Teacher from "./Teacher";
import Student from "./Student";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [isteacher,setIsTeacher] = React.useState(true);
  const [isstudent,setIsStudent] = React.useState(false);
  const openTeacher = () => {
    setIsTeacher(true);
    setIsStudent(false);

  };  
  const openStudent = () => {
    setIsTeacher(false);
    setIsStudent(true);
  };
  
  return (
    <div className="flex-col h-screen flex-nowrap relative ">
      <Navbar toggle={toggleSidebar}/>
      <div className="flex mt-18 bg-gradient-to-r from-lime-100 to-gray-300">
        <Sidebar hidden={sidebarOpen} 
        openTeacher={openTeacher}
        openStudent={openStudent}/>
        <div className="mt-14 border-2 w-full h-screen bg-gradient-to-r from-lime-100 to-gray-300">
          
          {isteacher?
            isteacher && <Teacher/>:
            isstudent && <Student/>
          }
          
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
