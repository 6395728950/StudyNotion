import { apiconnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { toast } from "react-toastify";
import { setUser } from "../../Slices/profileSlice";
 
import { logout } from "./authApi";



const{
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,

} =settingsEndpoints

export function updateDisplayPicture (token,formData){
    return async(dispatch)=>{
        const toastId = toast.loading("loading...")
        try{
             const response = await apiconnector("PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "content-Type":"multipart/form-data",
                    Authorization:`Bearer ${token}`,
                }
             )
             console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
              response
             )
             if (!response.data.success) {
                throw new Error(response.data.message)
              }
              toast.success("Display Picture Updated Successfully")
              dispatch(setUser(response.data.data))
        }
        catch(error){
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId)
    }

}


export function updateProfile(token,formData){
    return async(dispatch) =>{
        const toastid = toast.loading("loading...");
        try{
              const response = await apiconnector("PUT",UPDATE_PROFILE_API,formData,{
                  Authorization:`Bearer ${token}`
              })
              console.log("UPDATE_PROFILE_API API RESPONSE............", response)

              if (!response.data.success) {
                throw new Error(response.data.message)
              }
              
               
              const userImage= response.data?.image ?
                                   response.data?.image:
                                   `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.firstName} ${response.data.lastName}`
                                   dispatch(setUser({...response.data}))
                                   toast.success("Profile Updated Successfully")
        }catch(error){
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastid)
    }
}

export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("POST", CHANGE_PASSWORD_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  
  }


  export function deleteProfile(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiconnector("DELETE", DELETE_PROFILE_API, null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
        dispatch(logout(navigate))
      } catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      toast.dismiss(toastId)
    }
  }