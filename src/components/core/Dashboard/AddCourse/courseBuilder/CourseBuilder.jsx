import React from 'react'
import { setEditCourse, setStep ,setCourse} from '../../../../../Slices/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../Homepage/common/IconBtn';
import { useState } from 'react';
import { GrAddCircle } from "react-icons/gr";
import { toast } from 'react-toastify';
import NestedView from './NestedView';
import { createSection } from '../../../../../services/operation/Courseapi';
import { updateSection } from '../../../../../services/operation/Courseapi';
 
 import { GrFormNext } from "react-icons/gr";
 import { IoChevronBack } from "react-icons/io5";

const CourseBuilder = () => {
  const{register,handleSubmit,setValue,formState:{errors}}= useForm();
  const course = useSelector((state)=>state.course);
  const[editSectionName,setEditSectionName] = useState(null);
    // const {step}  = useSelector((state)=>state.course)
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth)
    const[loading,setLoading] = useState(false);
     

    // useEffect(() => {
    //   console.log("UPDATED");
    // }, [course])
   
console.log("course ke data me kya hai",course);
console.log("value of course id",course?.course?.updatedCourseDetails?._id? course?.course?.updatedCourseDetails?._id:course?.course?.data?._id);
    const onSubmit = async(data)=>{
      console.log("form of data ",data);
       
      setLoading(true);
      let result;

      if(editSectionName){
        // we are editing the section name
          
        result = await updateSection(
          {
            sectionName:data.sectionName,
            sectionId:editSectionName,
            courseId:course?.course?.updatedCourseDetails?._id ? course?.course?.updatedCourseDetails?._id:course?.course?.data?._id
             
          },token
        )
      }
      else{
        result = await createSection({
          sectionName:data.sectionName,
          courseId:course?.course?.updatedCourseDetails?._id ? course?.course?.updatedCourseDetails?._id:course?.course?.data?._id
         

        },token)
      }
     

      // update values
      
       
           console.log("result ki value in course builder ",result);
           console.log("result ke success ki value",result?.success);
        if(result?.success){
          dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName","");
        }
        console.log("course ke data me kya hai after result dispatch",course);
      
      setLoading(false);
   }
    const cancelEdit =()=>{
      setEditSectionName(null);
      setValue("sectionName","");
       }
       const goBack = ()=>{
         dispatch(setStep(1));
          dispatch(setEditCourse(true));

               }
       const goTonext=()=>{
         if(course?.data?.courseContent.length===0){
          toast.error("Please add atleast one section");
          return ;
         }
         if(course?.data?.courseContent.some((section)=>section?.subSection.length===0)){
          toast.error("Please add atleast one lecture in each section");
          return ;
         }
         // if everything is good
         dispatch(setStep(3));
       }
       

       const  handleChangeEditSectionName = (sectionId,sectionName)=>{
             console.log("check sectionid ",sectionId);
              if(editSectionName===sectionId){
                cancelEdit();
                return;
              }
              setEditSectionName(sectionId);
              setValue("sectionName",sectionName);
       }
       console.log("course ke data me kya hai after result dispatch",course);
  return (
    <div className='z-990'>
       <div className='text-richblack-5 bg-richblack-700 rounded-md pl-4 pr-4'>
       <p className='text-2xl'>Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='flex flex-col text-left'>
            <label htmlFor='sectionName'>Section name<sup>*</sup></label>
            <input
             id='sectionName'
             placeholder='Add section name'
             {...register("sectionName",{required:true})
             }
             className='w-full bg-richblack-600 h-9 rounded-md pl-4 border-b border-richblack-200'>
            </input>
            {
              errors.sectionName && (
                <span>Section Name is required</span>
              )
            }
          </div>
          <div className='mt-10 flex'>
            <IconBtn type="Submit"
             text={editSectionName ?"Edit Section Name":"Create Section"}
             outline={true} 
            //  customClasses={"text-white"} 
             >
            <GrAddCircle className='text-yellow-50' size={20} />
             </IconBtn>
             {editSectionName && (
            <button
            type='button'
            onClick={cancelEdit}
            className='text-sm text-richblack-300 underline ml-10'
            >
              Cancel Edit
            </button>
          )}
          </div>
         
        </form>

      {/* here we create nested view  and it is create when you have course in course content so we fetch the course from course slice*/}
      
         
      {
        // check what is problem here 
        
        course&&(
           
            
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}></NestedView>
        )
        
        
      }
       </div>
       
      
     
     <div className='flex justify-end gap-x-3 mt-5'>
     
        {/* add icon */}
        
       <button className="bg-richblack-600 text-white rounded-md w-24 flex gap-2 p-2 "onClick={goBack}>
       <IoChevronBack className='mt-1'/>
          Back
         
      </button>
         
      {/* <IconBtn text="Next" onClick={goTonext}></IconBtn> */}

     
      
     <button  className='bg-yellow-100 text-black p-2 rounded-md w-24 flex gap-2 ' onClick={goTonext}>Next
     <GrFormNext className='mt-1'/>
     </button>
     {/* add icon */}

       
     </div>
   
    </div>
  
  )
}

export default CourseBuilder