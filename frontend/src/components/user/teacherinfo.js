import React, { useState, useEffect } from "react";
//icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import userService from "../../services/user.service";
import { useNavigate, useParams } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import EditComment from "./EditComment";
import authService from "../../services/auth.service";

const TeacherInfo = () => {
  const navigate = useNavigate();

  //from db
  //usestate is to preserve or track data inbetween the re renders,
  //it returns an array of state with current state value and a function to update the state
  const [teacher, setTeacher] = useState({});
  //input in the comment
  const [text, setText] = useState("");
  //for rating
  const [rating, setRating] = useState(0);
  //setting the comments
  const [comments, setComments] = useState([]);
  //it returns an object of key value pairs of url parameters with which can match the route
  const { institutionId, teacherId, commentId } = useParams();
  //to open commentbox
  const [isComment, setIsComment] = useState(false);
  //changing state after deleting a comment
  const [viewComment, setViewComment] = useState(false);
   //localStorage stores key value pairs as strings only and when we retrieve it we need to convert it to JSON object
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  //comment box
  //it sets text as event.target.value
  const onChangeText = (e) => {
    setText(e.target.value);
  };
  //open the commentbox
  const clickAddComment = () => {
    setIsComment(!isComment);
  };
  //close the comment box
  const cancelSubmit = () => {
    setIsComment(!isComment);
  };
  //deletes a comment and back to all comments
  const handleDelete = (comment) => {
    userService.deleteComment(teacherId, comment._id).then(() => {
      setViewComment(!viewComment);
    });
  };
//we tell react to run this function passed as component when the component is rendered
  useEffect(() => {
    userService.getTeacherById(teacherId).then((res) => {
      setTeacher(res.data.teacher);
    });
  }, [isComment]);

  useEffect(() => {
    userService.getCommentByTeacher(teacherId).then((res) => {
      setComments(res.data.comment);
    });
  }, [isComment, viewComment, commentId]);

  const handleSubmit = (e) => {
    //to prevent the page from refreshing
    e.preventDefault();
//when submit is clicked state is changed and text area is emptied
    userService.createComment(teacherId, text).then((res) => {
      console.log(res.data.comment);
      setIsComment(!isComment);
      setText("");
    });
  
  
    userService.createRating(teacherId, rating).then((res) => {
      console.log(res.data);
    });
  };
  //logging out
  const logout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="flex  flex-col w-full h-screen font-serif text-white shadow-md rounded-lg ">
      {/* header */}
      <div className="flow-root bg-gradient-to-r from-sky-800 to-purple-900 w-full h-1/6 shadow-lg">
        <div className="float-left flex justify-between">
          <div className="flex">
            {/* back button */}
            <button className="bg-pink-400 rounded-md text-black m-2 p-2"
              onClick={() => navigate(`/home/${institutionId}/teacher`)}
            >
              Go Back
            </button>
          </div>
          <div className="flex mt-1">
            {/* if no profilePic default will be shown */}
            <img
              className="rounded-full shadow-md mx-4 h-16 w-16 "
              src={
                teacher.profilePic ||
                "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png"
              }
              alt=""
            />
            <div className="flex flex-col ">
              <h1 className="ml-1 mr-5 mt-1 font-bold text-base ">
                {teacher.fullName}
              </h1>
              <div>
                <div className="self-center text-2xl">
                  {/* package for starrating */}
                  <Rater
                    total={5}
                     //tofixed is used to round off the number to one decimal places
                    rating={(teacher.rating / teacher.countRating).toFixed(1)}
                    interactive={false}
                  />{" "}
                  <span className="text-xl">
                    {/*  if rating it willbe shown, else it will be 0 */}
                    {" "}
                    ({" "}
                    {teacher.rating
                      ? (teacher.rating / teacher.countRating).toFixed(1)
                      : 0}{" "}
                    )
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="float-right  text-sm mb-2 text-blue-200  ">
          <div className="mx-5 mt-2 gap-8 flex justify-between">
            <div className="flex-col text-right">
              <h6 className="  mt-1 "> {teacher.phoneNumber}</h6>
              <h6 className="   mt-1 ">{teacher.email}</h6>
            </div>
            <button
              onClick={logout}
              className="bg-pink-400 rounded-md text-black p-2"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-full bg-gradient-to-r from-indigo-300 to-zinc-300 ">
     {/*    other details of teacher */}
        
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
          {/* if isComment is true and if there is institutionId for user */}
          {/* !commentId is used to not show add review button when editing */}
          {!commentId && !isComment && user.institution === institutionId && (
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
        {/* if there is comment id ,edit comment will be shown */}
        {commentId && <EditComment />}
         {/* if no comment id and the isComment is true ,then add comment form will be open */}
        {!commentId && (
          <div className="flex flex-col justify-center w-full">
            {isComment ? (
            /*   submitting form */

              <form
                onSubmit={handleSubmit}
                className=" flex-col bg-gradient-to-r from-fuchsia-700 to-sky-500 rounded-md  m-20 p-10"
              >
                <div className="flex justify-center text-3xl m-4">
                  <Rater
                    total={5}
                    //rating is set as state rating
                    rating={rating}
                    //rating is set as event.rating when hovered and clicked
                    onRate={(e) => {
                      setRating(e.rating);
                    }}
                  />
                </div>
                <div className="flex m-3">
                  <textarea
                    required
                    //if the text changes onChangeText will be called
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
              //if isComment is false ,then view comment will be shown
              <div className=" flex flex-col w-3/4 h-full rounded-md text-white font-serif  text-sm ml-28 mr-18 scroll-smooth overflow-y-scroll bg-gradient-to-r from-slate-600 to-sky-600 my-3 p-5">
                <div className=" flex flex-col ">
                  {/* if there are comments it will be mapped */} 
                  {comments &&
                    comments.map((comment) => (
                      <>
                        <div className="flex justify-between m-2">
                          {/* <h2>{comment.student}</h2> */}
                         {/*  <p>{comment.createdAt}</p> */}
                        </div>
                        <div className="flex justify-between m-2 p-3 text-black bg-white rounded-md">
                          {comment.text}
                          {/* one can edit and delte personal messages only */}
                          {user.id === comment.student && (
                            <div className="flex justify-end gap-3">
                               {/*  navigate to edit comment */}
                              <EditIcon
                                onClick={() =>
                                  navigate(
                                    `/home/${institutionId}/teacher/${teacherId}/comment/${comment._id}`
                                  )
                                }
                              />
                              {/*  delete comment */}
                              <DeleteIcon
                                onClick={() => handleDelete(comment)}
                              />
                            </div>
                          )}
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
