import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operation/Courseapi';

import CourseTable from './instructorCourse/CourseTable';
import { useSelector } from 'react-redux';
import { CiCirclePlus } from 'react-icons/ci';

const InstructorCourse = () => {
    const {token}=useSelector((state)=>state.auth);
    const[Courses,setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
    const fetchCourses = async()=>{
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }
        console.log("ye raha apka result",result);
    }
    fetchCourses();
    },[])
   
    console.log("ye apka course raha",Courses);

  return (
    <div className='text-white'>

        <div className='flex justify-between'>
            <h1 className='text-2xl'> My Courses</h1>
            <button  className='bg-yellow-100 text-richblack-25 rounded-md flex  p-2'
               onClick={()=>navigate("/dashboard/add-course")} >
              Add course
               <span className='text-xl mt-1 ml-4 cursor-pointer'>
                                     <CiCirclePlus /></span>
            </button>

        </div>
        {
            Courses && <CourseTable Courses={Courses} setCourses={setCourses}/>
        }
    </div>
  )
}

export default InstructorCourse