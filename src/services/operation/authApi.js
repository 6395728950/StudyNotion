 
import { toast } from "react-hot-toast";
import {setLoading,setToken} from "../../Slices/authSlices";
import { apiconnector } from '../apiconnector';
 import { setUser } from '../../Slices/profileSlice';
  import { resetCart } from "../../Slices/cartSlice";

 
 
import { endpoints } from "../apis"
import { useNavigate } from "react-router-dom";
 
 
 

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints
 

export function SendOtp(email,navigate) {
   
  return async (dispatch) => {
   const toastId = toast.loading("Loading...")
  
    dispatch(setLoading(true));
    try {
      const response = await apiconnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
         toast.success("otp send successfully");
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
     
    
  }
}

export function SignUp(
 

  accountType,
  firstName,
  lastName,
  password,
  confirmPassword,
  email,
  otp,
  navigate
   
) {
     console.log("value of accountType",accountType);
    //  console.log("value of firstname",firstName);
    //  console.log("value of lastname",lastName);
     console.log("value of email",email);
    //  console.log("value of password",password);
     console.log("confirmpassword",confirmPassword);
    //  console.log("otp",otp);
    
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiconnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        password,
        confirmPassword,
        email,
        otp,
        
      })
 
      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

 export function getPasswordResetToken (email,setEmailSent){
    return async(dispatch) =>{
        dispatch(setLoading(true));
        try{
            const response = await apiconnector("POST", RESETPASSTOKEN_API, {
                email,
              })
            console.log("Reset password token response...",response);
            if(!response.data.success){
                throw new Error (response.data.message);
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);
        }
        catch(error){
         console.log("RESET PASSWORD TOKEN ERROR",error);  
         toast.error("Failed to reset password") ;
        }
        dispatch(setLoading(false));
    }
 }
 export function login(email, password, navigate,accountType) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    console.log("me yaha hu")
    try {
      const response = await apiconnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      if(response?.data?.userexist?.accountType===accountType){

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.userexist?.image
        ? response.data.userexist.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userexist.firstName} ${response.data.userexist.lastName}`
      dispatch(setUser({ ...response.data.userexist, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.userexist))
      navigate("/dashboard/my-profile")
      }else{
        toast.error("Please Login within your domain");
        console.log("Select wrong domain");
      }
    }catch (error) {
       
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    // toast.dismiss(toastId)
  }
}

export function resetPassword(password,confirmpassword,token){
  return async(dispatch) =>{
    dispatch(setLoading(true));
    try{
      const response = await apiconnector("POST",RESETPASSWORD_API,{password,confirmpassword,token});
      console.log("reset password response...",response);
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      toast.success("Password has been reset successfully");

    }catch(error){
       console.log("Reset password token error",error);
       toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));

  }
}

export function logout(navigate){
 
  return (dispatch) =>{
    dispatch(setToken(null));
    dispatch(setUser(null)) ;
    dispatch(resetCart());
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}