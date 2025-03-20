import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPasswordResetToken } from '../services/operation/authApi';


 
const ForgotPassword = () =>{  
     const {loading} = useSelector((state ) => state.auth);
      
     const [emailSent,setemailSent] = useState(false);
     const [email,setemail] = useState("");
     const dispatch = useDispatch();
     const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setemailSent));
     }
  return (
    <div className='text-white justify-center items-center'>
        {
            loading ?(<div> Loading...</div>):(<div>
                <h1>
                    {
                        !emailSent ? "Reset your Password" :"Check your Email"
                    }
                </h1>
                <p>
                    {
                        !emailSent ? "Have nno fear. We'll email you instruction to reset your password. if you  dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`  
                    }
                </p>
                <form onSubmit={handleOnSubmit}>
                    {
                        !emailSent &&(
                            <label>
                                <p>Email Address*</p>
                                <input required type='email' name='email' 
                                value={email}
                                onChange={(e)=>setemail(e.target.value)} 
                                placeholder='Enter Your Email Address' className='bg-richblack-600' >
                                </input>
                            </label>
                        )
                    }
                      <button type='submit'>
                    {
                        !emailSent ? "Reset Password" : "Resend Email"
                    }
                </button>
                </form>
                <div>
                    <Link to="/login">
                    <p>Back to Login</p></Link>
                </div>
               
            </div>)

        
}
            
            </div>
  )
}

export default ForgotPassword