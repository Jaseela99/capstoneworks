import React from 'react'
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

const AddComment = ({rating,setRating,handleSubmit,onChangeText,cancelSubmit}) => {
  return (
    <form
                onSubmit={handleSubmit}
                className=" flex-col bg-gradient-to-r from-fuchsia-700 to-sky-500 rounded-md  m-20 p-10"
              >
                <div className="flex justify-center text-3xl m-4">
                  <Rater
                    total={5}
                    rating={rating}
                    onRate={(e) => {
                      setRating(e.rating);
                    }}
                  />
                </div>
                <div className="flex m-3">
                  <textarea
                    required
                    onChange={onChangeText}
                    className="w-full h-full text-black outline-none  rounded-md p-4 shadow-md"
                    name="comment"
                    placeholder="Review your teacher"
                  ></textarea>
                </div>
                <div className="flex justify-end mx-7 mt-2 text-white">
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
  )
}

export default AddComment