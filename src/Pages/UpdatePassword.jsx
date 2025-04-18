import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useState } from 'react';
 import { resetPassword } from '../services/operation/authApi';
 import { IoIosArrowRoundBack } from "react-icons/io";
 import { IoCheckmarkCircle } from "react-icons/io5";
import ResetComplete from './ResetComplete';

const UpdatePassword = ({email}) => {
  console.log("value of email inside the updatePassword",email);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const[formdata ,setformdata] = useState({
        password:"",
        confirmPassword:"",
    })
    // create flag
    const[ShowPassword,setShowPassword] = useState(false);
    const[showConfirmPassword,setConfirmpassword] = useState(false);
    const[reset,setReset]  = useState(false);

    const {loading} = useSelector((state)=>state.auth);

    // take the value of password and confirmpassword
    const{password,confirmPassword} =     formdata;

    const handleonchange = (e)=>{
        setformdata((prevData) =>(
            {    
                // spread operator is use for using prevData
                ...prevData,
                [e.target.name]:e.target.value,
            }
        ))
    }
     
    const handleOnSubmit = (e) =>{
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token));
        setReset(true);

    }
  return (
    <div className='text-white flex flex-col mx-auto my-auto'>{

      loading ?(<div>Loading...</div>):(
        <div className='flex flex-col gap-y-2 justify-center items-center mx-auto my-auto'>
            <h1 className='text-xl font-semibold'>Choose new Password</h1>
            <p className='text-richblack-500'>Almost done.Enter your new password and you are all set.</p>
            <form onSubmit={handleOnSubmit}>
                <label>
                    <p>New Password<sup className="text-pink-200">*</sup></p>
                    <input required type={ShowPassword ? "text" :"password"}
                    name='password' value={password} onChange={handleonchange} 
                    placeholder='password' className=' bg-richblack-600 rounded-md text-richblack-5 border-b border-b-richblack-400  h-12 p-4 w-full' >
                    </input>
                    <span onClick={()=>setShowPassword((prev) =>!prev)} className='relative left-80 -top-9'>
                       {
                         ShowPassword? <AiFillEyeInvisible fontSize={24}/>: <AiFillEye fontSize={24}/>
                       } 
                    </span>
                </label>

                <label >
                    <p>ConfirmNew Password<sup className="text-pink-200">*</sup></p>
                    <input required type={showConfirmPassword ? "text" :"password"}
                    name='confirmPassword' value={confirmPassword} onChange={handleonchange}
                      placeholder='ConfirmPassword'
                      className='p-4 bg-richblack-600 rounded-md  text-richblack-5 border-b border-b-richblack-400 h-12 mb-4 w-full'>
                    </input>
                    <span onClick={()=>setConfirmpassword((prev) =>!prev)} className='relative -top-12 left-80'>
                       {
                         showConfirmPassword? <AiFillEyeInvisible fontSize={24}/>: <AiFillEye fontSize={24}/>
                       } 
                    </span>
                </label>
                <div className='flex flex-col gap-y-2 text-caribbeangreen-600 mt-5'>
                  <p className='flex gap-x-3'>
                    <span className='flex gap-x-1'>
                    <IoCheckmarkCircle />
                      one lowercase letter
                      </span>
                    <span className='flex gap-x-1'>
                    <IoCheckmarkCircle />
                      one special letter
                      </span>
                    
                  </p>
                  <p className='flex gap-x-3'>
                    <span className='flex gap-x-1'><IoCheckmarkCircle />
                      one uppercase letter</span>
                    <span className='flex gap-x-1'> <IoCheckmarkCircle />8 character minimum</span>
                    
                  </p>
                  <p className='flex gap-x-1'>
                  <IoCheckmarkCircle /> one number
                  </p>

                </div>
                <button type='submit' className='bg-yellow-50 p-4 rounded-md my-4 text-black w-full'>Reset Password</button>
            </form>
            <div>
                    <Link to="/login">
                    <p className='flex'>
                           <IoIosArrowRoundBack className='text-xl' />
                      Back to Login
                      </p></Link>
                </div>

        </div>
      )
    }
    {reset && <ResetComplete email={email}/>}
    </div>
  )
}

export default UpdatePassword