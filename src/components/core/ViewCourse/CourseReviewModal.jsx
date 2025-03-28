import React, { useEffect } from 'react'
import { set, useForm } from 'react-hook-form';
import { PiSubtractSquare } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { createRating } from '../../../services/operation/Courseapi';
import IconBtn from '../Homepage/common/IconBtn';
import ReactStars from "react-rating-stars-component"

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
            rating:data.courseRating,
    
            review:data.courseExperience,
          },
        token
    );
    setReviewModal(false);
    }
    const ratingChanged = ()=>{

    }
  return (
    <div>
        <div>
            {/* modal header */}
            <div>
                <p>Add Review</p>  
                <button onClick={()=>setReviewModal(false)}>
                    close
                </button>
            </div>

            {/* modal body */}
            <div>
                   <div>
                    <img
                     src={user?.image}
                     alt='user Image'
                     className='aspect-square w-[50px] rounded-full object-cover'
                    />
                    <div>
                        <p>{user?.firstName} {user?.lastName}</p>
                        <p>Posting publicly</p>
                    </div>
                   </div>

                   <form  onSubmit={handleSubmit(onSubmit)}
                    className='mt-6 flex flex-col items-center'>
                        <ReactStars
                         count={5}
                         onChage={ratingChanged}
                         size={24}
                         activeColor="#ffd700"/>
                         <div>
                            <label htmlFor='courseExperience'>
                               Add Your Experience *
                            </label>
                            <textarea 
                            id='courseExperience'
                            placeholder='Add your Experience here'
                            {...register("courseExperience",{required:true})}
                            className='form-style min-h-[130px] w-full'/>
                            {
                                errors.courseExperience && (
                                    <span>
                                        Please add your experience
                                    </span>
                                )
                            }
                         </div>

                         {/* create cancel and save button */}
                         <div>
                            <button
                            onClick={()=>setReviewModal(false)}>
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