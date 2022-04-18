import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Student = () => {
  const [isAddStudentOpen, setAddStudentOpen] = React.useState(false);
  const clickAddStudent = () => {
    setAddStudentOpen(!isAddStudentOpen);
  };

  const cancelSubmit = () => {
    setAddStudentOpen(!isAddStudentOpen);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col mx-10">
      {isAddStudentOpen ? (
        <div className="flex mt-8 ">
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col w-full font-serif font-bold text-blue-800 text-sm h-1/3 shadow-md rounded-lg  bg-gradient-to-r from-zinc-500 to-purple-300"
          >
            <div className="flex justify-between mt-5">
              
            <input
              className="p-3 ml-10 mr-1 mb-1 mt-1 w-1/2 rounded-lg shadow-md outline-none"
              type="text"
              name="name"
              placeholder="fullname"
              />

            <input
              className="p-3 ml-1 mr-10 mb-1 mt-1 w-1/2 rounded-lg shadow-md outline-none"
              type="text"
              name="email"
              placeholder="email"
              />
              </div>

            <div className="flex justify-end mx-7 mb-3 mt-3 text-white">
              <button
                type="submit"
                className="bg-gradient-to-r from-slate-700 to-sky-700 hover:from-zinc-800 hover:to-gray-500  p-3 m-3 rounded-lg shadow-md"
              >
                Submit
              </button>
              <button
                onClick={cancelSubmit}
                className="bg-gradient-to-r from-slate-700 to-sky-700 hover:from-zinc-800 hover:to-gray-500 p-3 m-3 rounded-lg shadow-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flow-root">
          <button
            onClick={clickAddStudent}
            className="float-right bg-gradient-to-r from-slate-700 to-sky-700 hover:from-zinc-800 hover:to-gray-500 p-3 m-2 text-sm text-white font-serif font-bold justify-between rounded-xl"
          >
            <AddIcon />
            Add Student
          </button>
        </div>
      )}
      <table className="items-center w-full rounded-lg shadow-md mt-10 px-3 my-3  ">
        <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100">
          <tr>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-bold text-left pl-10">
              Name
            </th>

            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-bold text-left">
              E-mail
            </th>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-bold text-left">
              Edit
            </th>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-bold text-left">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-stone-100 text-zinc-800">
          <tr>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-light text-left pl-10">
              Jaseela
            </th>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-light text-left">
              jaseela@gmail.com
            </th>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-light text-left">
              <EditIcon />
            </th>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-light text-left">
              <DeleteIcon />
            </th>
          </tr>
          <tr>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-light text-left pl-10">
              Jaseela
            </th>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-light text-left">
              jaseela@gmail.com
            </th>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-light text-left">
              <EditIcon />
            </th>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-light text-left">
              <DeleteIcon />
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Student;
