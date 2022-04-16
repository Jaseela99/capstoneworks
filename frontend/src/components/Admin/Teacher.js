import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Teacher = () => {
  return (
    <div className="flex flex-col mx-10">
      <div className="flow-root">
      <button className="float-right bg-gradient-to-r from-slate-700 to-sky-700 hover:from-zinc-800 hover:to-gray-500 p-3 m-2 text-sm text-white font-serif font-bold justify-between rounded-xl">
      <AddIcon/>
      Add Teacher</button>
      </div>
      <table className="items-center w-full rounded-lg shadow-md mt-10 px-3 my-3  ">
        <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100">
          <tr >
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-bold text-left pl-10">
              Name
            </th>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-bold text-left">
              Subject
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
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-light text-left pl-10" >
              Jaseela
            </th>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-light text-left">
              Physics
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
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-light text-left pl-10" >
              Jaseela
            </th>
            <th className="px-2 border-b border-solid border-gray-300 py-3 text-sm font-serif font-light text-left">
              Physics
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

export default Teacher;
