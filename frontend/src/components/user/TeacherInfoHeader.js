import React from 'react'
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

const TeacherInfoHeader = ({teacher}) => {

  return (
    <div className="flex justify-start bg-gradient-to-r from-sky-800 to-purple-900 w-full h-1/6 shadow-lg">
        <div className="flex  justify-start ">
          <img
            className="rounded-full shadow-md m-4 "
            src={
              "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png"
            }
            alt=""
          />
          <div className="flex flex-col mt-4 ">
            <h1 className="ml-1 mr-5 mt-1 font-bold text-xl ">
              {teacher.fullName}
            </h1>
            <div>
              <div className="self-center text-2xl">
                <Rater
                  total={5}
                  rating={(teacher.rating / teacher.countRating).toFixed(1)}
                  interactive={false}
                />
                ( {(teacher.rating / teacher.countRating).toFixed(1)} )
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end ml-24 text-sm mb-2 text-blue-200  ">
          <h6 className="  ml-6 mt-1 "> {teacher.phoneNumber}</h6>
          <h6 className="   mt-1 ">{teacher.email}</h6>
        </div>
      </div>
  )
}

export default TeacherInfoHeader