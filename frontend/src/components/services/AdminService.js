import axios from "axios"
const API_URL = "http://localhost:8080"

const getInstitutionById=(institutionId)=>{
return axios.get(`${API_URL}/institution/${institutionId}`)
}
const getTeacherByInstitution=(institutionId)=>{
    return axios.get(`${API_URL}/institution/${institutionId}/teachers`)
}
 const getStudentByInstitution=(institutionId)=>{
    return axios.get(`${API_URL}/institution/${institutionId}/students`)
}
const getTeacherById=(institutionId,teacherId)=>{
    return axios.get(`${API_URL}/institution/${institutionId}/teacher/${teacherId}`)
}
const getStudentById=(institutionId,studentId)=>{
    return axios.get(`${API_URL}/institution/${institutionId}/student/${studentId}`)
}
const createTeacher=(institutionId,{fullName,profilePic,bio,email,phoneNumber,subject,experience})=>{
    return axios.post(`${API_URL}/institution/${institutionId}/teacher`,{fullName,profilePic,bio,email,phoneNumber,subject,experience})
}
const updateTeacher=(institutionId,teacherId,{fullName,profilePic,bio,email,phoneNumber,subject,experience})=>{
    return axios.put(`${API_URL}/institution/${institutionId}/teacher/${teacherId}`,{fullName,profilePic,bio,email,phoneNumber,subject,experience})
}
const deleteTeacher=(institutionId,teacherId)=>{
    return axios.delete(`${API_URL}/institution/${institutionId}/teacher/${teacherId}`)
}
const createStudent=(institutionId,{fullName,email})=>{
    return axios.post(`${API_URL}/institution/${institutionId}/student`,{fullName,email})
}
const updateStudent=(institutionId,studentId,{fullName,email})=>{
    return axios.put(`${API_URL}/institution/${institutionId}/student/${studentId}`,{fullName,email})
}
const deleteStudent=(institutionId,studentId)=>{
    return axios.delete(`${API_URL}/institution/${institutionId}/student/${studentId}`)
}



const adminService={ 
    getInstitutionById,
    getTeacherByInstitution,
    getStudentByInstitution,
    getTeacherById,
    getStudentById,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    createStudent,
    updateStudent,
    deleteStudent
 

}
export default adminService