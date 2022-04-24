import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeacherInfoHeader from "./TeacherInfoHeader";
import TeacherInfoSidebar from "./TeacherInfoSidebar";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import ViewComment from "./ViewComment";
import userService from "../../services/user.service";

const TeacherInfo = () => {
  

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
      <TeacherInfoHeader teacher={teacher} />

      <div className="flex h-full bg-gradient-to-r from-indigo-300 to-zinc-300 ">
        <TeacherInfoSidebar teacher={teacher}  isComment={isComment} clickAddComment={clickAddComment}/>
        {commentId && <EditComment />}
        {!commentId && (
          <div className="flex flex-col justify-center w-full">
            {isComment ? (
              <AddComment
              rating={rating}
              setRating={setRating}
              handleSubmit={handleSubmit}
              cancelSubmit={cancelSubmit}
              onChangeText={onChangeText}/>
            ) : (
              <div className=" flex flex-col w-3/4 h-full rounded-md text-white font-serif  text-sm ml-28 mr-18 scroll-smooth overflow-y-scroll bg-gradient-to-r from-slate-600 to-sky-600 my-3 p-5">
                <ViewComment
                comments={comments}
                institutionId={institutionId}
                teacherId={teacherId}
                handleDelete={handleDelete}/>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherInfo;
