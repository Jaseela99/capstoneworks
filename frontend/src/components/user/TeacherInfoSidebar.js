import React from 'react'

const TeacherInfoSidebar = ({teacher,isComment,clickAddComment}) => {
  return (
    <div className="flex-col justify-center w-1/4 bg-gradient-to-t from-sky-500 to-purple-400 rounded-md font-serif font-bold text-purple-800 text-md m-2 p-3">
          <h1 className="  ml-1 mr-2 mt-3 p-2">Subject:</h1>
          <h6 className=" p-2 ml-1 mr-2 mt-1 bg-gradient-to-tr from-slate-600 to-slate-400 hover:from-slate-400 hover:to-zinc-500 text-sm font-light text-white rounded-md">
            {teacher.subject}
          </h6>
          <h1 className="  ml-1 mr-2 mt-1 p-2 ">Experience:</h1>
          <h6 className=" p-2 ml-1 mr-2 mt-1 bg-gradient-to-tr from-slate-600 to-slate-400 hover:from-slate-400 hover:to-zinc-500 text-sm font-light  text-white rounded-md">
            {teacher.experience} years
          </h6>
          <h1 className="  ml-1 mr-2 mt-1 p-2 ">bio:</h1>
          <h6 className=" p-2 ml-1 mr-2 mt-1 bg-gradient-to-tr from-slate-600 to-slate-400 hover:from-slate-400 hover:to-zinc-500 text-sm font-light text-white rounded-md">
            {teacher.bio}
          </h6>
          {!isComment && (
            <div className="flex justify-center mt-6 p-5">
              <button
                onClick={() => clickAddComment()}
                className="items-center bg-gradient-to-r from-slate-700 to-sky-700 hover:from-zinc-800 hover:to-gray-500 p-4  mx-2 rounded-lg shadow-md text-white"
              >
                Add Review
              </button>
            </div>
          )}
        </div>
  )
}

export default TeacherInfoSidebar