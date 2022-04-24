import React from 'react'
import { useNavigate} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewComment = ({comments,institutionId,teacherId,handleDelete}) => {
    const navigate = useNavigate();
  return (
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
  )
}

export default ViewComment