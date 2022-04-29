import React ,{useState,useEffect}from "react";
import { useParams, useNavigate } from "react-router-dom";
import userService from "../../services/user.service";

function EditComment() {
  const navigate = useNavigate();
  //set editted comment
  const [comment, setComment] = useState({});
  //will get params from url
  const { institutionId, teacherId, commentId } = useParams();
  
//after submitting the editted comment will be added to the comments section
  useEffect(() => {
    userService.getCommentById( commentId).then((res) => {
        setComment(res.data.comment);
        
    });
    }, []);
//when text is changed
  const handleChange = (e) => {
    //name and value is set to e.target
    const { name, value } = e.target;
    setComment((prevState) => ({ ...prevState, [name]: value })); //add the new text in to previousstate
  };
//when submit is clicked
  const handleSubmit = (e) => {
    e.preventDefault();
    userService.editComment(teacherId,commentId, comment).then((res) => {
      console.log(res.data);
    
    });
  };

  return (
    
    <div className=" flex-col w-full justify-center">
      <form
      //navigate back to the teacherinfo page
        onSubmit={(e) => {
          handleSubmit(e);
          navigate(`/home/${institutionId}/teacher/${teacherId}`);
        }}
        className=" flex-col bg-gradient-to-r from-fuchsia-700 to-sky-500 rounded-md  m-20 p-6"
      >
        <div className="flex p-5 m-5">
          <textarea
            required
            onChange={(e)=>{handleChange(e)}}
            className="w-full h-full text-black outline-none  rounded-md p-4 shadow-md"
            //value is comment.text and name is text
            value={comment?.text || ""}
            name="text"
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
         {/*  cancel button navigates to teacherinfo page */}
          <button
            onClick={() =>
              navigate(`/home/${institutionId}/teacher/${teacherId}`)
            }
            className="bg-gradient-to-r from-slate-700 to-sky-700 hover:from-zinc-800 hover:to-gray-500 p-3 m-3 rounded-lg shadow-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditComment;
