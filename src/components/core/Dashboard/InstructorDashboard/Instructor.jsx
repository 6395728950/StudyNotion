import React, { useEffect, useState } from 'react'
 
import { getInstructorData } from '../../../../services/operation/profileapi';
import { fetchInstructorCourses } from '../../../../services/operation/Courseapi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';
 import hiiHand from '../hii_hand.png';
 

const Instructor = () => {

     const {token} = useSelector((state)=>state.auth);
     const {user} = useSelector((state) =>state.profile);
     const[loading,setLoading]  = useState(false);
     const [instructordata,setInstructorData] = useState(null);
     const [courses,setCourses] = useState([]);

    useEffect(()=>{
        const getCourseDataWithStats = async()=>{
            setLoading(true);
            const InstructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            

            console.log("instructorApi Data",InstructorApiData);
            console.log("value of reesult",result);

            if(InstructorApiData?.length){
                setInstructorData(InstructorApiData);
            }
            if(result){
                setCourses(result?.data);
            }
            setLoading(false);
        }
        getCourseDataWithStats();
    },[])
     
    // we use reduce function when we calculate totalamount and totalstudent
    const totalAmount = instructordata?.reduce((acc,curr)=> acc+curr.totalAmountGenerated,0);
    const totalStudent = instructordata?.reduce((acc,curr)=>acc+curr.totalStudentEnrolled,0);
    console.log("length inside the courses",courses?.length);
  return (
    <div  className='text-white'>
    <div>
       <div className='flex '>
       <h1>Hi {user?.firstName}</h1>
        <img src={hiiHand} alt='welcome' className='h-6 w-6 ml-3'/>
        
       </div>
      <p>Let's start something new</p>
    </div>
    {
      loading ?(<div  className='spinner'></div>)
      :(courses?.length > 0
      ?(
         

         <div>
          <div className='flex justify-between'>
            <InstructorChart courses={instructordata}/>
            
            <div className='bg-richblack-700 p-3 rounded-md w-52 flex flex-col gap-5 h-1/4 '>
            <p className='text-xl font-semibold'>Statistics</p>
            <div className='text-lg text-richblack-400'>
              <p>Total Courses</p>
              <p className='text-2xl text-richblack-300 font-semibold'>{courses?.length}</p>
            </div>
            <div className='text-lg text-richblack-400'>
              <p>Total Students</p>
              <p className='text-2xl text-richblack-300 font-semibold'>{totalStudent}</p>
            </div>
            <div className='text-lg text-richblack-400'>
              <p>Total Income</p>
              <p className='text-2xl text-richblack-300 font-semibold'>{totalAmount}</p>
            </div>
 
                 </div>
                 </div>
           
            
            <div className='bg-richblack-700 rounded-md mt-4  '>
              <div className='flex justify-between mr-2'>
                <p className='p-2'>Your Course</p>
                <Link to="/dashboard/my-courses">
                  <p className='text-yellow-50 pt-2'>View All</p>
                </Link>
              </div>

              {/* // your task is show only 3 cards  */}
              <div className='grid grid-cols-3 gap-4 m-2' >
                {
                  courses.slice(0,3).map((course) =>(
                    <div >
                      <img src={course.thumbnail} className='rounded-md' />
                     
                    <div>
                      <p className='text-richblack-50'>{course.courseName}</p>
                      <div className='flex text-sm text-richblack-400 gap-2'>
                        <p>{course.studentsEnrolled.length} Students</p>
                        <p> | </p>
                       <p>Rs. {course.Price}</p>
                      </div>
                    </div>
                    </div>
                  ))
                }
              </div>
            </div>
         </div>
      ):(<div>
        <p>You have not create any courses yet</p>
        <Link to={"/dashboard/add-course"}>
           Create a Course
        </Link>
        </div>))
    }
    </div>
  )
}

export default Instructor