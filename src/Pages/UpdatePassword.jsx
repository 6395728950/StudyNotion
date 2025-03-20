import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useState } from 'react';
 import { resetPassword } from '../services/operation/authApi';

const UpdatePassword = () => {
    const dispatch = useDispatch();

    const location = useLocation();
    const[formdata ,setformdata] = useState({
        password:"",
        confirmPassword:"",
    })
    // create flag
    const[ShowPassword,setShowPassword] = useState(false);
    const[showConfirmPassword,setConfirmpassword] = useState(false);

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
    }
  return (
    <div className='text-white flex flex-col mx-auto my-auto'>{

      loading ?(<div>Loading...</div>):(
        <div>
            <h1>Choose new Password</h1>
            <p>Almost done.Enter your new password and you are all set.</p>
            <form onSubmit={handleOnSubmit}>
                <label>
                    <p>New Password<sup className="text-pink-200">*</sup></p>
                    <input required type={ShowPassword ? "text" :"password"}
                    name='password' value={password} onChange={handleonchange} 
                    placeholder='password' className=' p-2 bg-richblack-600 rounded-md text-richblack-5      '>
                    </input>
                    <span onClick={()=>setShowPassword((prev) =>!prev)}>
                       {
                         ShowPassword? <AiFillEyeInvisible fontSize={24}/>: <AiFillEye fontSize={24}/>
                       } 
                    </span>
                </label>

                <label>
                    <p>ConfirmNew Password<sup className="text-pink-200">*</sup></p>
                    <input required type={showConfirmPassword ? "text" :"password"}
                    name='confirmPassword' value={confirmPassword} onChange={handleonchange}
                      placeholder='ConfirmPassword'
                      className=' p-2 bg-richblack-600 rounded-md  text-richblack-5'>
                    </input>
                    <span onClick={()=>setConfirmpassword((prev) =>!prev)}>
                       {
                         showConfirmPassword? <AiFillEyeInvisible fontSize={24}/>: <AiFillEye fontSize={24}/>
                       } 
                    </span>
                </label>
                <button type='submit'>Reset Password</button>
            </form>
            <div>
                    <Link to="/login">
                    <p>Back to Login</p></Link>
                </div>

        </div>
      )
    }</div>
  )
}

export default UpdatePassword