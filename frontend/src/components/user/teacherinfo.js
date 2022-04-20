import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import userService from "../../services/user.service";
import { useParams } from "react-router-dom";

const TeacherInfo = () => {
  //from db
  const [teacher, setTeacher] = useState({});
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const { teacherId, institutionId } = useParams();
  /* const institutionId="62545b4bb289ead1f36b5d6f"
  const teacherId="625ebeaba2cdbeb1cb738be4"
  const commentId="625ebeaba2cdbeb1cb738be4"
  const studentId="625eb8aea2cdbeb1cb738bc9" */

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    userService.getTeacherById(institutionId, teacherId).then((res) => {
      setTeacher(res.data.teacher);
    });
  }, [teacherId]);

  useEffect(() => {
    userService.getCommentByTeacher(teacherId).then((res) => {
      setComments(res.data.comment);
    });
  }, [teacherId]);

  //rating

  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const handleClick = (value) => {
    setCurrentValue(value);
  };
  const handleMouseOver = (value) => {
    setHoverValue(value);
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  //comment box
  const [isComment, setIsComment] = useState(false);
  const clickAddComment = () => {
    setIsComment(!isComment);
  };
  const cancelSubmit = () => {
    setIsComment(!isComment);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    userService.createComment(teacherId, text).then((res) => {
      setComments([...comments, res.data.comment.text]);
      userService.createRating(teacherId, currentValue).then((res) => {
        setRating(...rating, res.data.teacher.currentValue);
        setIsComment(!isComment);
        setText("");
      });
    });
  };

  return (
    <div className="flex  flex-col w-full h-screen bg-gradient-to-r from-indigo-300 to-zinc-300 font-serif text-white shadow-md rounded-lg ">
      <div className="flex justify-start bg-gradient-to-r from-sky-800 to-purple-900 w-full h-1/6 rounded-t-lg shadow-lg">
        <div className="flex  justify-start ">
          <img
            className="rounded-full shadow-md m-4 "
            src={
              "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png"
            }
          />
          <div className="flex flex-col mt-6 ">
            <h1 className="ml-1 mr-5 mt-1 font-bold">{teacher.fullName}</h1>
            <h6 className="ml-1 mr-5  mt-1 text-sm "> </h6>
            <div>
              <div className="self-center m-1">
                {stars.map((_, index) => (
                  <StarIcon
                    value={teacher.rating}
                    key={index}
                    className={`${
                      (currentValue) 
                        ? "text-yellow-400"
                        : "text-gray-200"
                    } `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end  text-sm mt-20 text-blue-200  ">
          <h6 className="  ml-1 mr-5 mt-1 "> {teacher.phoneNumber}</h6>
          <h6 className=" ml-1 mr-5  mt-1 mb-2">{teacher.email}</h6>
        </div>
      </div>
      <div className="flex border-4 h-full">
        <div className="border-4 w-1/3 flex-col">
          <h1 className="  ml-1 mr-2 mt-3 p-2">Subject:</h1>
          <h6 className=" p-2 ml-1 mr-2 mt-1 bg-gradient-to-tr from-slate-600 to-slate-400 text-sm font-light text-white rounded-md">
            {teacher.subject}
          </h6>
          <h1 className="  ml-1 mr-2 mt-1 p-2 ">Experience:</h1>
          <h6 className=" p-2 ml-1 mr-2 mt-1 bg-gradient-to-tr from-slate-600 to-slate-400 text-sm font-light text-white rounded-md">
            {teacher.experience} years
          </h6>
          <h1 className="  ml-1 mr-2 mt-1 p-2 ">bio:</h1>
          <h6 className=" p-2 ml-1 mr-2 mt-1 bg-gradient-to-tr from-slate-600 to-slate-400 text-sm font-light text-white rounded-md">
            {teacher.bio}
          </h6>
          <button
            onClick={() => clickAddComment()}
            className="bg-gradient-to-r from-slate-700 to-sky-700 hover:from-zinc-800 hover:to-gray-500 p-3 m-3 mt-10 rounded-lg shadow-md text-white"
          >
            Add Review
          </button>
        </div>
        <div className=" flex border-4 w-full">
          {isComment ? (
            <form
              onSubmit={handleSubmit}
              className=" flex-col w-full mx-20 p-5 justify-center  rounded-md bg-gradient-to-r from-fuchsia-700 to-sky-500"
            >
              <div className="self-center m-5">
                {stars.map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`mr-5 cursor-pointer ${
                      (hoverValue || currentValue) > index
                        ? "text-yellow-400"
                        : "text-gray-200"
                    } `}
                    onClick={() => handleClick(index + 1)}
                    onMouseEnter={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </div>
              <div className="flex">
                <textarea
                  required
                  onChange={onChangeText}
                  className="w-full h-full text-black outline-none  rounded-md p-2 shadow-md"
                  name="comment"
                  placeholder="Review your teacher"
                ></textarea>
              </div>
              <div className="flex justify-end mx-7  mt-2 text-white">
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
          ) : (
            <div className="flex-col w-full mx-20 p-5 overflow-y-scroll  rounded-md bg-gradient-to-r from-fuchsia-700 to-sky-500">
              {comments.map(
                (comment, index) =>
                  comment.text && (
                    <table>
                      <tr>
                        <td>{comment.text}</td>
                        <td>
                          <EditIcon />
                        </td>
                        <td>
                          <DeleteIcon />
                        </td>
                      </tr>
                    </table>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherInfo;
