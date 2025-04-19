import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
 
import { useSelector } from 'react-redux'
import { createRating } from '../../../services/operation/Courseapi';
import IconBtn from '../Homepage/common/IconBtn';
import ReactStars from "react-rating-stars-component"
import { RxCross2 } from "react-icons/rx";

const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector((state) =>state.profile);
    const {token} = useSelector((state) =>state.auth);
   const {courseEntireData} = useSelector((state)=>state.viewCourse);
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors}
    } = useForm();


    // first you need to store default value of rating and exprience on first render
    useEffect(()=>{
        setValue("courseExperience","");
        setValue("courseRating",0);
    },[])
    const onSubmit = async(data) =>{
          await createRating({
            courseId:courseEntireData._id,
            Rating:data.courseRating,
    
            Review:data.courseExperience,
          },
        token
    );
    setReviewModal(false);
    }
    const ratingChanged = (newRating)=>{
      setValue("courseRating",newRating);
    }
  return (
    <div className='bg-richblack-900 border border-richblack-400 w-1/2 mb-4 rounded-md absolute top-40 left-64 z-1000'>
        <div className='text-center'>
            {/* modal header */}
            <div className='flex justify-between  bg-richblack-600 pt-4 pb-4 rounded-t-md '>
                <p className='text-richblack-25 font-semibold text-xl ml-3'>Add Review</p>  
                <button onClick={()=>setReviewModal(false)}>
                <RxCross2 className='text-xl text-richblack-25 mr-3'/>

                </button>
            </div>

            {/* modal body */}
            <div className=''>
                   <div className='flex justify-center mt-5'>
                    <img
                     src={user?.image}
                     alt='user Image'
                     className='aspect-square w-[50px] rounded-full object-cover'
                    />
                    <div>
                        <p className='text-richblack-25 font-semibold'>{user?.firstName} {user?.lastName}</p>
                        <p className='text-richblack-25'>Posting publicly</p>
                    </div>
                   </div>

                   <form  onSubmit={handleSubmit(onSubmit)}
                    className='mt-6 flex flex-col items-center'>
                        <ReactStars
                         count={5}
                         onChange={ratingChanged}
                         size={24}
                         activeColor="#ffd700"/>
                         <div className='flex flex-col w-full  text-start pl-4 pr-4'>
                            <label htmlFor='courseExperience' className='text-white'>
                               Add Your Experience <sup className='text-red-700'>*</sup>
                            </label>
                            <textarea 
                            id='courseExperience'
                            placeholder='write your Experience here'
                            {...register("courseExperience",{required:true})}
                            className='form-style min-h-[130px]  bg-richblack-500 border-b border-richblack-400 rounded-md p-2'/>
                            {
                                errors.courseExperience && (
                                    <span>
                                        Please write your experience
                                    </span>
                                )
                            }
                         </div>

                         {/* create cancel and save button */}
                         <div className='flex  gap-3 mt-4'>
                            <button
                            onClick={()=>setReviewModal(false)} className='bg-richblack-500 text-center w-20 rounded-md'>
                                cancel
                            </button>
                            <IconBtn text="save"/>
                         </div>
                   </form>
            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal