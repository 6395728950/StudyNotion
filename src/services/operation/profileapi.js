
import toast from "react-hot-toast"
import { setLoading } from "../../Slices/authSlices"
import { setUser } from "../../Slices/profileSlice";
import { apiconnector } from "../apiconnector";
import { profileEndpoints } from "../apis"
import { logout } from "./authApi";
 
 

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API ,GET_INSTRUCTOR_DATA_API} = profileEndpoints

 

export function getUserDetails(token,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
                 const response = await apiconnector("GET",GET_USER_DETAILS_API,null,{
                    Authorization:`Bearer ${token}`
                 })
                 console.log("get user details ",response)
                 if(!response.data.success){
                    throw new Error(response.data.message)
                 }
                 const userImage = response.data.data.image ?response.data.data.image :`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
                 dispatch(setUser({...response.data.data,image:userImage}))

        }catch(error){
                dispatch(logout(navigate))
                console.log("GET_USER_DETAILS_API_ERROR",error)
                toast.error("Could Not get user details")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))


    }
}

// export  function getUserEnrolledCourses(token){
//    return async(dispatch)=> {

    
//     // const toastId = toast.loading("Loading...")
//     // dispatch(setLoading(true));
//     let result =[];
//     try{
//         const response  = await apiconnector("GET",GET_USER_ENROLLED_COURSES_API,null,{
//             Authorization: `Bearer ${token}`

//         })
//         console.log("GET_USER_ENROLLED_COURSES",response)
//         if (!response.data.success) {
//             throw new Error(response.data.message)
//           }
//          result=response;
//     }catch(error){
//            console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
//            toast.error("Could Not get Enrolled courses")
//     }
//     // toast.dismiss(toastId)
//     // dispatch(setLoading(false))
//     return result
// }
// }

// const getUserEnrolledCourses = async (token) => {
//     try {
//       const response = await apiconnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
//         Authorization: `Bearer ${token}`,
//       });
//       return response; // Ensure it returns the actual data, not just a Promise
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       return null;
//     }
//   };
  export async function getUserEnrolledCourses(token) {  // ✅ Remove `dispatch`
    try {
      const response = await apiconnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
        Authorization: `Bearer ${token}`
      });
  
      console.log("GET_USER_ENROLLED_COURSES", response);
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      return response.data; // ✅ Return only `data`
    } catch (error) {
      console.error("GET_USER_ENROLLED_COURSES_API ERROR:", error);
      return { success: false, message: "Could Not get Enrolled courses" };
    }
  

  }
  export async function getInstructorData(token){
    const toastId = toast.loading("Loading...");
    let result =[];
    try{
        const response = await apiconnector("GET",GET_INSTRUCTOR_DATA_API,null,{
           Authorization: `Bearer ${token}`
        });
        console.log("GET_INSTRUCTOR_API_RESPONSE",response);
        result = response?.data?.courses
    
    }catch(error){
      console.log("GET_INSTRUCTOR_API_ERROR",error);
      toast.error("Could not get Instructor Data")
    }
    toast.dismiss(toastId);
    return result;
  }
 

  