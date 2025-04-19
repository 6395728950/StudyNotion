import React, { useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getAllCourse } from '../../../services/operation/Courseapi'
import { CiCirclePlus } from "react-icons/ci";
import { useState } from 'react';
 import IconBtn from '../Homepage/common/IconBtn';
import {  useNavigate } from 'react-router-dom';
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";



const Mycourse = () => {
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth)
    const{user} = useSelector((state)=>state.profile)
    const[courses,setCourses] = useState([]);
 
    useEffect(()=>{
      UpdatedCourse();
  },[])
    const UpdatedCourse = async()=>{
           try{
               const response = await getAllCourse(token);

              
              console.log("response ki value",response);
              setCourses(response);
              navigate("/dashboard/course-upload");
           }catch(error){
              console.log("error in fetching the courses",error);
           }
    }

    console.log("update courses ka response",courses);
    const handledelete = (index)=>{
      const updatedcourse = [...courses?.data]
      updatedcourse.splice(index,1);
      setCourses(updatedcourse);
    }
    
  return (
    <div>
        {
           user?.accountType==="Instructor" && (
            <div>
                <div className='ml-44 mt-12 flex justify-between'>

                      <h1 className='text-white text-2xl font-semibold '>My course</h1>
                      <div className='flex mr-20 -mt-6 bg-yellow-50 rounded-md w-24 gap-1 h-8' >
                       <span className='text-xl mt-1 ml-4 cursor-pointer'>
                       <CiCirclePlus /></span>
                       <IconBtn
                                  text="New"
                         onClick={() => {
                                  navigate("dashboard/course-upload")
                                 }}
                         >
         
                   </IconBtn>
                      </div>
                      </div>


                        <div className='mt-14 ml-48 mr-24 border-2 border-richblack-500 h-[634px]'>
                        <div className='text-richblack-400   flex justify-between  ml-2 mr-2 pt-4 '>

                            <p>COURSE</p>
                            <div className='flex gap-6'>
                                <p>DURATION</p>
                            <p>PRICE</p>
                            <p>ACTIONS</p>
                            </div>
                             
                       </div>
                       

                       <div className='border-b border-richblack-500 h-5'></div>
                       {
                         !courses ?(<div className='text-white'>Loading...</div>)
                         :(
                          <div>
                                {
                                       
                                        courses?.data?.map((element,index)=>(
                                      <div key={index} className='flex'>
                                      <img src={element.thumbnail} className='bg-white rounded-md mt-3 mx-4 w-[221px]'></img>
                                      <div  className='mt-5'>
                                        <h1 className='text-richblack-5 text-2xl font-semibold'>{element.courseName}</h1>
                                        <p className='text-richblack-400 font-medium'>{element.coursedesc}</p>
                                         <p className='text-richblack-5'>created:{element.instructor.createdAt}</p>
                                      </div>
                                      <div className='mt-5 translate-x-48'>
                                        <p className='text-richblack-400'>-  -</p>
                                      </div>
                                       <div className='mt-5 translate-x-64 flex'>
                                           <HiOutlineCurrencyRupee className=' text-richblack-400 mt-1'/>
                                        <p className='text-richblack-200 '>{element.Price}</p>
                                       </div>
                                       <div className='flex translate-x-72 mt-5 gap-3'>
                                       <FiEdit2 className='text-richblack-400 text-2xl cursor-pointer'   onClick={() => {UpdatedCourse()}
                                   
                                 } />
                                       <RiDeleteBin6Line className='text-richblack-400 text-2xl cursor-pointer'onClick={()=>{handledelete(index)}} />

                                        </div>
                                      
                                    </div>
                              )) 
                          
                                }
                            </div>
                         )
                         
                           
                             
                         
                        
                        
                         
                  
                       }
                        </div>
                </div>

                
            )
        }


    </div>
  )
}

export default Mycourse