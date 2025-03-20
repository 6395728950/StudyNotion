// import React from 'react'
// import Highlight from '../components/core/Homepage/Highlight'
// import { useState } from 'react';
// import Instructordetails from '../components/Instructordetails';
// import { RxEyeOpen } from "react-icons/rx";
// import CTAButton from "../components/core/Homepage/Button"
// import login from "../assets/Images/login.webp"
// import  {useNavigate}  from 'react-router-dom';

//  const user = ["Student","Instructor"];

  

// const Login = () => {
//     const navigate = useNavigate();
//     const[CurrentUser,setCurrentUser] = useState(user[0]);
//   return (
//     <div className='w-screen h-screen'>

//         <div className='w-11/12 flex flex-row  mx-auto justify-evenly'>
//         <div className='flex flex-col -translate-x-4'>
//               <div className='flex flex-col w-[400px] mt-20 gap-3 '>
//                 <h1 className='text-white text-3xl font-medium'>Welcome Back</h1>
//                 <p className='text-richblack-400 font-inter'>Build skills for today, tomorrow, and beyond. <Highlight text={"Education to future-proof your career."}></Highlight></p>
                
//                 </div> 
//                 {/* make selector  */}
//                  {
//                     user.map((element,index)=>{
//                       if(element==="Instructor"){
//                         navigate("/instructor")
//                     }
//                         return(
//                             <div className={`  ${CurrentUser===element ? "bg-richblack-900 text-richblack-5 font-medium ":
//                                 "text-richblack-200"
//                             } text-[16px]  flex flex-row  items-center gap-2 rounded-full transition-all duration-100 cursor-pointer hover:bg-richblack-700 hover:text-richblack-5 px-7 py-2`} key={index}  onClick={()=>setCurrentUser(element)}>{element}

                             
//                             </div>
                           

                         
                           

//                         )
                       
                     
                       
//                     })
                    
//                  }
//           {/* add all details */}
//           <div className='text-richblack-5'>
//             <label htmlFor="email">Email Address</label>
             
//             <br></br>
//             <input type='email'name='email' placeholder='Enter email address' required className='bg-richblack-700  p-2 text-richblack-25 rounded-md w-80'></input>
//             <br>
//             </br>
//             <br></br>
//             <label htmlFor="password">Password</label>
         
//             <br></br>
//             <input type='password'name='password' placeholder='Enter password' required className='bg-richblack-700  p-2 text-richblack-25 rounded-md w-80 absolute'></input>
//             <RxEyeOpen className='relative left-72 top-3' />
          

//           </div>
//            {/* add button */}
//           <div className='mt-20'>
//           <CTAButton active={true} linkto="/login" >Sign in</CTAButton>
//           </div>
           

//             </div>
//             <div className='mt-24 shadow-[30px_30px_0_0] shadow-richblack-600'>
//                 <img src={login} alt="login" loading='lazy' className='h-[531px] w-[585px]'></img>
//             </div>
        
//         </div>
        
//     </div>
//   )
// }

// export default Login



import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login