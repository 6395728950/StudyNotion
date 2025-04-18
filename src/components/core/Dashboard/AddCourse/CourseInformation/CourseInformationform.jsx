import React, { useEffect } from 'react'
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { editCourseDetails,addCourseDetails,fetchCourseCategories } from '../../../../../services/operation/Courseapi';
import RequirementFields from './RequirementFields';
import { setCourse, setStep } from '../../../../../Slices/courseSlice';
import IconBtn from '../../../Homepage/common/IconBtn';
import { toast } from 'react-toastify';   
import { COURSE_STATUS } from '../../../../../utils/constants';
import ChipInput from './ChipInput';
import Upload from './Upload';
 
 

const CourseInformationform = () => {
  const { 
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseTitle: "",
      courseShortDesc: "",
      coursePrice: 0,          // ✅ Number instead of string
      courseTags: [],          // ✅ Should be an array
      courseBenefits: "",
      courseCategory: "",  
      courseRequirements: [],  // ✅ Should be an array
      courseImage: null,       // ✅ Use null for file input
    }
  });

    const dispatch = useDispatch();
    const[Loading,setLoading] = useState(false);
    const[courseCategories,setCourseCategories] = useState(null);
     const{course,editCourse} = useSelector((state)=>state.course);
     const {token} = useSelector((state)=>state.auth);
      // console.log("value of edit course",editCourse);
      // console.log("course ki value inside the courseInformation at line no.32",course);
      useEffect(() => {
        const getCategories = async () => {
          setLoading(true);
          const categories = await fetchCourseCategories();
          // console.log("Categories:", categories);
      
          if (categories?.data?.length > 0) {
            setCourseCategories(categories);
          }
      
          setLoading(false);
        };
      
        // console.log("Course data:", course);
      
        if (editCourse && course?.data) {
          // console.log("Setting form values from course:", course);
      
          setValue("courseTitle", course?.data?.courseName || "");
          setValue("courseShortDesc", course?.data?.coursedesc || "");
          setValue("coursePrice", course?.data?.Price || "");
          setValue("courseTags", course?.data?.tag|| ""); // Fix: Handle array
          setValue("courseBenefits", course?.data?.whatYouwillLearn || "");
          setValue("courseCategory", course?.data?.category || "");
          setValue("courseRequirements", course?.data?.instructions || "");
          // console.log("check the value of thumbnail",course?.data?.thumbnail);
          setValue("courseImage", course?.data?.thumbnail || "");
        }
      
        getCategories();
      }, [editCourse, course]);

    const isFormUpdated  =()=>{
        const currentValues = getValues();

        // console.log("all vallue of currentValues",currentValues);
        // console.log("value of course inside the isformUpdate",course);
        if(currentValues?.courseTitle!==course.data?.courseName ||
            currentValues?.courseShortDesc!==course.data?.coursedesc ||
            currentValues?.courseTags.toString()!==course.data?.tag.toString()||
            currentValues?.coursePrice!==course.data?.Price ||
            currentValues?.courseBenefits!==course.data?.whatYouwillLearn||
            currentValues?.courseCategory!==course?.data?.category._id ||
            currentValues?.courseRequirements.toString()!==course?.data?.instructions.toString() ||
            currentValues?.courseImage!==course?.data?.thumbnail


        ){
            // console.log("kuch update hua hai");
            return true;
        }else{
          // console.log("kuch channge nhi hua hai");
            return false;
        }
    }
    // console.log("course Category",courseCategories)
    // handle next button click
     const handlewithoutSaving=()=>{
        // console.log("value of course in handle withoutsaving",course);
        
        dispatch(setCourse(course));
       dispatch(setStep(2));
     }
 
    const onSubmit = async(data)=>{
       
        console.log("data which  is  come on submit form",data);
         if(editCourse){
            if(isFormUpdated()){
             const currentValue  = getValues();
            //  console.log("Current Form Values:", currentValue);
            //  console.log("check the value inside the currentvalue",currentValue.courseRequirements)
            //  console.log("check the value of courseName",course.instructions);
            //  console.log("check data of form ",data);
            //  console.log("course ki id",course._id);
             const formData = new FormData();
            
           

             if(formData){
             formData.append("courseId",course.data._id);
             if(currentValue?.courseTitle!==course.data.courseName){
                // console.log("value of courseTitle",currentValue.courseTitle);
                // console.log("value of courseTitle from data",data?.courseTitle);
                  formData.append("courseName",data?.courseTitle);
               }

             if(currentValue?.courseShortDesc!==course.data.coursedesc){
                formData.append("coursedesc",data?.courseShortDesc);
              }

           if(currentValue?.coursePrice!==course.data.Price){
            // console.log("ye hai course ka price",data?.coursePrice);
            formData.append("Price",data?.coursePrice);
           }
       if(currentValue?.courseBenefits!==course.data.whatYouwillLearn){
        formData.append("whatYouwillLearn",data?.courseBenefits);
        }
        if(currentValue?.courseCategory!==course.data.category._id){
         formData.append("category",data?.courseCategory);
       }
       if(currentValue?.courseRequirements.toString()!==course.data.instructions.toString()){
          // console.log("mene change kr diya hai",JSON.stringify(data.courseRequirements));
          
         formData.append("instructions",data?.courseRequirements.toString());
        }
          // here image and tag is also insert  after completion the code
          if(currentValue?.courseImage!==course.data.thumbnail){
            // console.log("check the image is come here or not ",currentValue.courseImage);
            formData.append("thumbnail",data?.courseImage);
          }
         if(currentValue?.courseTags.toString()!==course.data.tag.toString()){
             formData.append("tag",JSON.stringify(data?.courseTags));
         }
       
         console.log("before checking the formData")
         for (const [key, value] of formData.entries()) {
          console.log("here we show all formData");
          console.log(`${key}: ${value}`);
        }
          // here we call course edit api
          console.log("before create new course");
          setLoading(true);
          const result = await editCourseDetails(formData,token);
          setLoading(false);
          // console.log("value of result in courseInformations",result);
          if(result){
            // console.log("data setCourse me set hua hai");
            dispatch(setCourse(result));
             dispatch(setStep(2));
             
          }
         }
        
         else{
            toast.error("No change made to form");
         }
        }
         return;
    }

    // create new course
     
    const formData = new FormData();
    // console.log("what is value of tag",data?.courseTags);
    // console.log("what is value of title",data?.courseTitle);
    formData.append("courseName",data?.courseTitle);
    // console.log("course ka description aaya hai bhi hai ya nhi",data.courseShortDesc);
    formData.append("coursedesc",data?.courseShortDesc);
    formData.append("Price",data?.coursePrice);
    formData.append("whatYouwillLearn",data?.courseBenefits);
    formData.append("category",data?.courseCategory);
    formData.append("instructions",JSON.stringify(data?.courseRequirements));
    formData.append("status",COURSE_STATUS.DRAFT);
    // add the tag and image after code completion
    formData.append("tag",data?.courseTags);
    formData.append("thumbnail",data?.courseImage);

    // call the api of add course

    setLoading(true);
    const result = await addCourseDetails(formData,token);
    console.log("add course ke result ki value",result);
    setLoading(false);

    if(result){
      dispatch(setCourse(result));
        dispatch(setStep(2));
         
      }
     
    }
     console.log("category ki value kya hai",courseCategories);

  return (
     
     
     <form
     onSubmit={handleSubmit(onSubmit)}
     className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
 >
     <div className='flex flex-col' >
         <label htmlFor='courseTitle' className=' text-left opacity-90' >Course Title<sup className='text-red-700'>*</sup></label>
         <input
             id="courseTitle"
             placeholder='Enter Course Name'
             {...register("courseTitle", { required: true })}
             className='w-full bg-richblack-600 text-white pl-2 h-9 rounded-md border-b border-b-richblack-300'
         />
         {errors.courseTitle && <span className="ml-2 text-xs tracking-wide text-red-700">Course title is required</span>}
     </div>
 
     <div className='flex flex-col'>
         <label htmlFor='courseShortDesc' className=' text-left opacity-90' >Course Short Description<sup className='text-red-700'>*</sup></label>
         <textarea
             id="courseShortDesc"
             placeholder='Enter Description'
             {...register("courseShortDesc", { required: true })}
             className='min-h-[140px] w-full  bg-richblack-600 text-white pl-2 h-9 rounded-md border-b  border-b-richblack-300'
         />
         {errors.courseShortDesc && <span className="ml-2 text-xs tracking-wide text-red-700">Course Description is required</span>}
     </div>
 
     <div className='relative flex flex-col'>
         <label htmlFor='coursePrice' className=' text-left opacity-90' >Course Price<sup className="text-red-700">*</sup></label>
         <input
             id="coursePrice"
             placeholder='Enter Course Price'
             {...register("coursePrice", { required: true })}
             className='w-full  bg-richblack-600 text-white pl-2 h-9 rounded-md border-b  border-b-richblack-300'
         />
         <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400 text-2xl' />
         {errors.coursePrice && <span className="ml-2 text-xs tracking-wide text-red-700">Course price is required</span>}
     </div>
 
     <div className='flex flex-col'>
         <label htmlFor="courseCategory" className=' text-left opacity-90' >Course Category<sup className='text-red-700'>*</sup></label>
         <select
             id="courseCategory"
             defaultValue=""
             {...register("courseCategory", { required: true })}
             className="bg-richblack-600 text-white pl-2 h-9 rounded-md border-b border-b-richblack-300"
         >
             <option value="" disabled>Choose a Category</option>
             {(!Loading || editCourse) && courseCategories?.data?.length > 0 ? (
                 courseCategories.data.map((category, index) => (
                     <option key={index} value={category?._id} style={{ backgroundColor: "#333" }}>
                         {category?.name}
                     </option>
                 ))
             ) : (
                 <option disabled>No categories available</option>
             )}
         </select>
         {errors.courseCategory && <span className="ml-2 text-xs tracking-wide text-red-700">Course category is required</span>}
     </div>
 
     <ChipInput
         label="Tags"
         name="courseTags"
         placeholder="Enter tag and press enter"
         register={register}
         errors={errors}
         setvalue={setValue}
         getvalues={getValues}
         loading={Loading}
     />
 
     <Upload
         name="courseImage"
         label="Course Thumbnail"
         register={register}
         setValue={setValue}
         errors={errors}
         editData={editCourse ? course?.data?.thumbnail : null}
     />
 
     <div className='flex flex-col'>
         <label htmlFor='courseBenefits' className=' text-left opacity-90' >Benefit the course<sup className='text-red-700'>*</sup></label>
         <input
             id="courseBenefits"
             placeholder='Enter course Benefits here'
             {...register("courseBenefits", { required: true })}
             className='min-h-[140px] w-full  bg-richblack-600 text-whiteh-9 rounded-md border-b pl-2 border-b-richblack-300'
         />
         {errors.courseBenefits && <span className="ml-2 text-xs tracking-wide text-red-700">Course Benefit is required</span>}
     </div>
 
     <RequirementFields
         name="courseRequirements"
         label="Course Requirements"
         placeholder="Enter this requirement field"
         register={register}
         setValue={setValue}
         getValues={getValues}
         errors={errors}
     />
 
     <div>
         {editCourse && (
             <button
                 type="button"
                 className='flex items-center gap-x-2 bg-richblack-300 text-richblack-5'
                 onClick={() => handlewithoutSaving()}
             >
                 Continue Without Saving
             </button>
         )}
 
         <IconBtn text={!editCourse ? "Next" : "Save Changes"} type="submit"></IconBtn>
     </div>
 </form>
 
  )

}

export default CourseInformationform 