import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { setStep } from '../../../../../Slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operation/Courseapi';
import { resetCourseState } from '../../../../../Slices/courseSlice';
 
import { useNavigate } from 'react-router-dom';
 

const CoursePublish = () => {
 const{register,handleSubmit,getValues,setValue}  = useForm();
 const{course} = useSelector((state)=>state.course);
 const{token} = useSelector((state)=>state.auth);
 const[loading,setLoading] = useState(null);
 const dispatch = useDispatch();
 const navigate  =useNavigate();
 console.log("check course data in coursepublish section",course);

useEffect(()=>{
    if(course?.status===COURSE_STATUS.PUBLISHED){
        setValue("public",true);
    }
},[]);

const goToCourses  = ()=>{
    dispatch(resetCourseState());
    // navigate("/dashboard/instructorcourse");
    navigate("/dashboard/my-courses");
}
 const handleCoursePublish =async()=>{
     if(course?.status===COURSE_STATUS.PUBLISHED && getValues("public")===true||
     course?.status===COURSE_STATUS.DRAFT && getValues("public")===false){
        // no updation in form
        // no need to make api call
   goToCourses();
   return;

     }
 

 // if form is updated
 const formData = new FormData()
//  console.log("check course ki id",course?.updatedCourseDetails._id);
 formData.append("courseId",course?.data?._id);
 const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
//  console.log("check course Status",courseStatus);
 formData.append("status",courseStatus);
 console.log("check form data in coursePublicsection",formData);
 setLoading(true);
 const result = await editCourseDetails(formData,token);
     if(result){
        goToCourses();
        
     }
     setLoading(false);
    }
 const onSubmit =()=>{
    handleCoursePublish();
 }
 const goBack =()=>{
    dispatch(setStep(2));
 }

  return (
    <div> 
         

        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='rounded-md border-[1px] bg-richblack-800 border-richblack-700 p-6 text-white flex flex-col gap-4 text-left mb-6' >
        <p className='text-2xl'>Publish Course</p>
            <div>

                <label htmlFor='public'>  
                <input
                  id="public"
                  type="checkbox"
                  {...register("public")}

                   className='rounded-md h-4 w-4'></input>
                   <span className='ml-3 text-richblack-400'>Make this course as public</span>
                   </label>
                
            </div>
        </div>

            <div className='flex justify-end gap-x-3 '>
                <button 
                type='button'
                disabled= {loading}
                 onClick={goBack}
                 className='flex items-center rounded-md bg-richblack-300 p-5 text-black'>
                    Back
                </button>
                 <button disabled={loading} className='bg-yellow-200 text-white rounded-md p-2'>Save Changes</button>
            </div>

        </form>
    </div>
  )
}

export default CoursePublish