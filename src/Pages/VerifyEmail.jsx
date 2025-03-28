import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import {SendOtp, sendOtp, SignUp } from '../services/operation/authApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
 


const VerifyEmail = () => {
    const [otp,setotp]  = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const{loading,signupData} = useSelector((state)=>state.auth);

useEffect(()=>{
     if(!signupData){
     navigate("/signup");
     }

      },[]);

    const handleonSubmit = (e) =>{
      e.preventDefault();
        const {accountType,
          firstName, 
          lastName,
          password,
          confirmPassword, 
          email                                                                                                                         
        } = signupData;

        console.log("email inside the verifyemail",email);
        console.log("value of confirmPassword",confirmPassword);
 
      dispatch(SignUp(accountType,firstName,lastName,password,confirmPassword,email,otp,navigate));
    }

  return (
    <div className='text-white'>{
            loading ?(<div>Loading...</div>):(<div>


                <h1>Verify Email</h1>
                <p>A verification code has been sent to you. Enter the code below</p>
                <form onSubmit={handleonSubmit}>
                    <OTPInput value={otp}
                      onChange={setotp}
                      numInputs={6}
                      renderSeparator ={<span>-</span>}
                      renderInput={(props)=>( <input{...props} className='bg-richblack-800 text-white'/>)}></OTPInput>
                      <button type='submit'>
                        verify email
                      </button>
                </form>
                <div>
                    <Link to="/login">
                    <p>Back to Login</p></Link>
                </div>

                <button onClick ={() =>dispatch(SendOtp(signupData.email,navigate))}>
                  Resend it
                </button>
            </div>)

    }
    </div>
  )
}

export default VerifyEmail
