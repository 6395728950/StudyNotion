import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import {SendOtp,  SignUp } from '../services/operation/authApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BiReset } from "react-icons/bi";
import { IoIosArrowRoundBack } from "react-icons/io";


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
    <div className='text-white flex flex-col mx-auto my-auto'>{
            loading ?(<div>Loading...</div>):(<div>


                <h1 className='text-xl font-semibold mb-2'>Verify Email</h1>
                <p className='text-richblack-600  mb-3'>A verification code has been sent to you. Enter the code below</p>
                <form onSubmit={handleonSubmit}>
                    <OTPInput value={otp}
                      onChange={setotp}
                      numInputs={6}
                      renderSeparator ={<span>-</span>}
                      renderInput={(props)=>( <input{...props} className='bg-richblack-800 text-white w-full'/>)} ></OTPInput>
                      <button type='submit'  className='bg-yellow-50 p-4 rounded-md my-4 text-black w-full' >
                        verify email
                      </button>
                </form>
                <div className='flex justify-between'>
                    <Link to="/login">
                    <p className='flex'>
                       <IoIosArrowRoundBack className='text-xl' />
                      Back to Login
                      </p></Link>

                      <button onClick ={() =>dispatch(SendOtp(signupData.email,navigate))}  className='text-blue-700 flex'>
                <BiReset className='text-xl' />

                  Resend it
                </button>
                </div>

           
            </div>)

    }
    </div>
  )
}

export default VerifyEmail
