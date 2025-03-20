import React from 'react'
import { useDispatch } from 'react-redux'
 import { useSelector } from 'react-redux';
 import { useState } from 'react';
 import { useParams } from 'react-router-dom';
import RenderStep from '../AddCourse/RenderStep';
import { setCourse, setEditCourse } from '../../../../Slices/courseSlice';
import { useEffect } from 'react';
import { getFullDetailsofCourse } from '../../../../services/operation/Courseapi';

const Editcourse = () => {
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state)=>state.course);
    const[loading,setLoading] = useState(false);
    const{token} =useSelector((state)=>state.auth);
  
    console.log("value of course",course);

    useEffect(()=>{
        const populatedCourseDetails=async()=>{
            setLoading(true);
            const result = await getFullDetailsofCourse(courseId,token);
            console.log("check the result ki value",result);
            if(result?.data){
                // console.log("me yaha pr aa gaya hu");
               dispatch(setEditCourse(true));
                dispatch(setCourse(result?.data));

            }
            setLoading(false);
        }
        populatedCourseDetails();
    },[]);

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }
    // console.log("value of course at line no.42",course);
  return (
    <div className='text-white'>
        <h1>Edit course</h1>
       <div>
        {
            course ?(<RenderStep/>):(<p>Course Not Found</p>)
        }
       </div>

    </div>
  )

}
export default Editcourse