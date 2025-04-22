import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";
import { getPasswordResetToken } from '../services/operation/authApi';
import UpdatePassword from './UpdatePassword';


 
const ForgotPassword = () =>{  
     const {loading} = useSelector((state ) => state.auth);
      
     const [emailSent,setemailSent] = useState(false);
     const [email,setemail] = useState("");
     const[updatedPassword,setUpdatedPassword] = useState(false);
     const dispatch = useDispatch();
    
     const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setemailSent));
        console.log("value of email inside the forgotPassword",email);
         setUpdatedPassword(true);
     }
  return (
    <div className='text-white flex flex-col justify-center items-center my-auto mx-auto'>
        {
            loading ?(<div> Loading...</div>):(<div>
                <h1 className='text-xl font-semibold mb-3'>
                    {
                        !emailSent ? "Reset your Password" :"Check your Email"
                    }
                </h1>
                <p className='text-richblack-500 mb-7'>
                    {
                        !emailSent ? "Have nno fear. We'll email you instruction to reset your password. if you  dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`  
                    }
                </p>
                <form onSubmit={handleOnSubmit} className='flex flex-col'>
                    {
                        !emailSent &&(
                            <label className='mb-4'>
                                <p>Email Address<sup className='text-red-700'>*</sup></p>
                                <input required type='email' name='email' 
                                value={email}
                                onChange={(e)=>setemail(e.target.value)} 
                                placeholder='Enter Your Email Address' className='bg-richblack-600 border-b border-b-richblack-400 rounded-md h-12 p-4' >
                                </input>
                            </label>
                        )
                    }
                      <button type='submit' className='bg-yellow-50 p-4 rounded-md mb-4 text-black w-1/2'>
                    {
                        !emailSent ? "Reset Password" : "Resend Email"
                    }
                </button>
                </form>
                <div>
                    <Link to="/login">
                    

                    <p className='flex'>
                    <IoIosArrowRoundBack className='text-xl' />

                        Back to Login
                        </p></Link>
                </div>
               
            </div>)

        
}
    {/* {updatedPassword && <UpdatePassword email={email}/>} */}
            
            </div>
  )
}

export default ForgotPassword