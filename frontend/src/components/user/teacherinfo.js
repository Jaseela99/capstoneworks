import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import userService from "../../services/user.service";
import { useNavigate, useParams } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import EditComment from "./Editcomment";

const TeacherInfo = () => {
  const navigate = useNavigate();

  //from db
  const [teacher, setTeacher] = useState({});
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const { institutionId, teacherId, commentId } = useParams();
  const [isComment, setIsComment] = useState(false);
  const [viewComment, setViewComment] = useState(false);

  //comment box
  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const clickAddComment = () => {
    setIsComment(!isComment);
  };
  const cancelSubmit = () => {
    setIsComment(!isComment);
  };
  const handleDelete = (comment) => {
    userService.deleteComment(teacherId, comment._id).then(() => {
      setViewComment(!viewComment);
    });
  };

  useEffect(() => {
    userService.getTeacherById(teacherId).then((res) => {
      setTeacher(res.data.teacher);
      console.log(teacher.rating / teacher.countRating);
    });
  }, [isComment]);

  useEffect(() => {
    userService.getCommentByTeacher(teacherId).then((res) => {
      setComments(res.data.comment);
    });
  }, [isComment, viewComment, commentId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    userService.createComment(teacherId, text).then((res) => {
      console.log(res.data.comment);
      setIsComment(!isComment);
      setText("");
    });

    console.log(rating);
    userService.createRating(teacherId, rating).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="flex  flex-col w-full h-screen font-serif text-white shadow-md rounded-lg ">
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

      <div className="flex h-full bg-gradient-to-r from-indigo-300 to-zinc-300 ">
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
        {commentId && <EditComment />}
        {!commentId && (
          <div className="flex flex-col justify-center w-full">
            {isComment ? (
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
            ) : (
              <div className=" flex flex-col w-3/4 h-full rounded-md text-white font-serif  text-sm ml-28 mr-18 scroll-smooth overflow-y-scroll bg-gradient-to-r from-slate-600 to-sky-600 my-3 p-5">
                <div className=" flex flex-col ">
                  {comments &&
                    comments.map((comment) => (
                      <>
                        <div className="flex justify-between m-2">
                          <h2>{comment.student}</h2>
                          <p>{comment.createdAt}</p>
                        </div>
                        <div className="flex justify-between m-2 p-3 text-black bg-white rounded-md">
                          {comment.text}
                          <div className="flex justify-end gap-3">
                            <EditIcon
                              onClick={() =>
                                navigate(
                                  `/home/${institutionId}/teacher/${teacherId}/comment/${comment._id}`
                                )
                              }
                            />
                            <DeleteIcon onClick={() => handleDelete(comment)} />
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherInfo;
