// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { createsubsection, updateSubsection } from '../../../../../services/operation/Courseapi';
// import { setCourse } from '../../../../../Slices/courseSlice';
// import { RxCross2 } from "react-icons/rx";
// import IconBtn from '../../../Homepage/common/IconBtn';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify'
// import Upload from '../CourseInformation/Upload';


// const SubsectionModal = ({
//   modalData,
//   setModalData,
//   add = false,
//   view  =false,
//   edit = false,
// }) => {


//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState:{errors},
//     getValues
//   } = useForm();

//   const dispatch = useDispatch();
//     const[loading,setLoading] = useState(false);
//    const{course,token} = useSelector((state)=>({
//         course:state.course.course,
//         token :state.auth.token,
         
//    }))
    

//    useEffect(()=>{
//      if(view || edit){
//       setValue("lectureTitle",modalData.title);
//       setValue("lectureDesc",modalData.description);
//       setValue("lectureVideo",modalData.videoUrl);

//      }
//    },[])
//     console.log("setValue ki value",setValue);

//    const isFormupdated = ()=>{
//     const currentvalues = getValues();
//     if(currentvalues.lectureTitle!==modalData.title
//       || currentvalues.lectureDesc!==modalData.description ||
//          currentvalues.lectureVideo!==modalData.videoUrl
//     ){
//       return true;
//     }
//     else{
//       return false;
//     }
//    }
     

//    const handleEditSubSection= async()=>{
//     const formdata = new FormData();
//      const CurrentValues  = getValues();

//      formdata.append("sectionId",modalData.sectionId);
//      formdata.append("subSectionId",modalData._id);
//      if(CurrentValues.lectureTitle!==modalData.title){
//       formdata.append("title",CurrentValues.lectureTitle)
//      }
//      if(CurrentValues.lectureDesc!==modalData.description){
//       formdata.append("description",CurrentValues.lectureDesc)
//      }
//      if(CurrentValues.lectureVideo!==modalData.videoUrl){
//       formdata.append("video",CurrentValues.lectureVideo)
//      }

//      setLoading(true);
//      // API Call

//      const result = await updateSubsection(formdata,token);
//      if(result){
//         const updatedCourseContent = course.courseContent.map((section)=>{
//           section?.Id===modalData.sectionId ?result:section;
//         })
//         const updatedcourse = {...course,courseContent:updatedCourseContent}
//         dispatch(setCourse(updatedcourse))
//      }    
     
      
//      setModalData(null);
//      setLoading(false);

//    }
//     const onSubmit =async (data)=>{

//       if(view)return;

//       if(edit){
//         if(!isFormupdated){
//           toast.error("No changes made to the form")
//         }else{
//           // edit krdo store me
//           handleEditSubSection();
//         }
//         return;
//       }

//       const formdata = new FormData();
//       formdata.append("sectionId", modalData);
//       formdata.append("title", data.lectureTitle);  
//       formdata.append("description", data.lectureDesc);
//       formdata.append("video", data.lectureVideo);
//       setLoading(true);

//       // now we call the api
//       const result = await createsubsection(formdata,token);

//       if(result){
//         // TODO: check for updation
//         const updatedCourseContent = course.courseContent.map((section)=>{
//           section?.Id===modalData ?result:section;
//         })
//         const updatedcourse = {...course,courseContent:updatedCourseContent}
//         dispatch(setCourse(updatedcourse));

       
//       }
//       setModalData(null);
//       setLoading(false);

       
//     }
//   return (
//     <div>

//         <div>
//           <div>
//           <p>{view && "Viewing"} {add && "Adding"} {edit &&"Editing"} Lecture</p>
//           <button onClick={()=>(!loading ? setModalData(null) :{})}>
//           <RxCross2 />

//           </button>
//           </div>
          
//           <form onSubmit ={handleSubmit(onSubmit)}>
            
//           <Upload
//                     name="lectureVideo"
//                     label="Lecture Video"
//                     register={register}
//                     setValue={setValue}   
//                     errors={errors}
//                     video={true}
//                     viewData={view ? modalData.videoUrl : null}
//                     editData={edit ? modalData.videoUrl : null}
//                   />
                  
//              <div>
//               <label htmlFor='lecturetitle'>Lecture Title</label>
//               <input
//               id="lecturetitle"
//               placeholder='Enter lecture Title'
//               {...register("lectureTitle",{required:true})}
//               className='w-full'
//               ></input>
//               {errors.lectureTitle && (<span>
//                 Lecture Title is required
//               </span>)}
//              </div>

//              <div>
//               <label htmlFor="lecturedesc">
//                 lecture Description
//               </label>
//               <textarea
//                  id="lecturedesc"
//                  placeholder='Enter lecture description'
//                  {...register("lectureDesc",{required:true})}
//                  className='w-full min-h-[130px]'

//               />
//               {errors.lectureDesc && (<span>
//                  Lecture Description is required
//                 </span>)}
//              </div>
//             {
//               !view && (
//                 <div>
//                   <IconBtn
//                    text={loading ?"Loading..." : edit ?"Save Changes":"Save"}
//                   />
//                 </div>
//               )
//             }
//           </form>
          


//         </div>
//     </div>
//   )
// }

// export default SubsectionModal


// code is given by chatgpt

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createsubsection, updateSubsection } from '../../../../../services/operation/Courseapi';
import { setCourse ,setEditCourse} from '../../../../../Slices/courseSlice';
import { RxCross2 } from 'react-icons/rx';
import IconBtn from '../../../Homepage/common/IconBtn';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Upload from '../CourseInformation/Upload';


const SubsectionModal = ({ modalData, setModalData, add = false, view = false, edit = false }) => {
  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
    const{course} = useSelector((state)=>state.course);
    const{token}  = useSelector((state)=>state.auth);
    const[editstate,setEditCourse] = useState(null);
  console.log("data of modal",modalData);

  

  useEffect(() => {
    if (view || edit) {
      setValue('lectureTitle', modalData.title);
      setValue('lectureDesc', modalData.description);
      setValue('lectureVideo', modalData.videoUrl);
    }
  }, []);

  // useEffect(()=>{
  //   console.log("value of course",course);

  // },[course]);

      console.log("value of course",course);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    );
  };

  const handleEditSubSection = async () => {
    const formData = new FormData();
    const currentValues = getValues();

    formData.append('sectionId', modalData.sectionId);  // i think  theses line create a problem
    formData.append('subsectionId', modalData._id);
    // console.log("check sectionId",modalData.sectionId);
    // console.log("check subsectionId",modalData._id);
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append('title', currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append('description', currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append('video', currentValues.lectureVideo);
    }

    setLoading(true);

    const result = await updateSubsection(formData, token);
     console.log("result in subsectionModal line no.-273",result);
    console.log("course in subsectionModal",course);
    if (result && result._id) {
      const updatedCourseContent = [...course?.data?.courseContent];  // Create a shallow copy of the course content

      const sectionIndex = updatedCourseContent.findIndex((section) => section._id === result._id); // Find the matching section
      
      if (sectionIndex !== -1) {
        updatedCourseContent[sectionIndex] = {
          ...updatedCourseContent[sectionIndex],
          subsection: result.subsection, // Update only the subsection in that section
        };
      }
      // const updatedCourseContent = course?.data?.courseContent?.map((Section) => (
       
      //   Section?._id === result._id ? { ...Section, subsection: result.subsection }: Section
      // ));
      console.log("updated courseContent line no.279",updatedCourseContent);
      const updatedCourse = {
        ...course,
        data: {
          ...course.data,
          courseContent: updatedCourseContent,  
        },
      };
      console.log("updated courses inside the subsectionModal",updatedCourse);
       dispatch(setCourse(updatedCourse));
       console.log("check data in edit state",editstate);
    }
    
    
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error('No changes made to the form');
      } else {
        await handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append('sectionId', modalData);
    formData.append('title', data.lectureTitle);
    formData.append('description', data.lectureDesc);
    formData.append('video', data.lectureVideo);
    console.log("check the video is prsenet or not",data.lectureVideo);
    console.log("check the title is prsenet or not",data.lectureTitle);
    console.log("check the description is prsenet or not",data.lectureDesc);
    console.log("check the type of video",typeof data.lectureVideo);
    
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
  }
    setLoading(true);

    const result = await createsubsection(formData, token);
    console.log("What is value of result in subsectionModal", result);
    
    if (result) {
      console.log("aap yaha pr ho kya");
    
      const updatedCourseContent = course?.data?.courseContent.map((section) =>
        section?._id === modalData
      ?  result
      : section
  );
    
    
      console.log("updatedcoursecontent", updatedCourseContent);
    
      const updatedCourse = {
        ...course,
        data: {
          ...course.data,
          courseContent: updatedCourseContent,  
        },
      };
      console.log("updated course ki value",updatedCourse);
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  }
   

  return (
    <div>
      <div  className=' z-1000 rounded-md bg-richblack-500 w-full p-20px shadow-lg shadow-richblack-300'>
        <div>
          <p>
            {view && 'Viewing'} {add && 'Adding'} {edit && 'Editing'} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 />
          </button>
        </div>

              <form onSubmit={handleSubmit(onSubmit)}>
          
            <Upload
                name="lectureVideo"
                label="Lecture Video"
                register={register}
                setValue={setValue}
                errors={errors}
                video={true}
                viewData={view ? modalData.videoUrl : null}
                editData={edit ? modalData.videoUrl : null}
              />
              
              
    
              <div className='flex flex-col text-left mt-4'>
                <label htmlFor="lecturetitle">Lecture Title <sup className='text-red-700'>*</sup></label>
                <input
                  id="lecturetitle"
                  placeholder="Enter lecture Title"
                  {...register('lectureTitle', { required: true })}
                  className="w-full bg-richblack-600 h-8 border-b border-richblack-100 p-2 rounded-md"
                />
                {errors.lectureTitle && <span>Lecture Title is required</span>}
              </div>
    
              <div className='flex flex-col text-left mt-4'>
                <label htmlFor="lecturedesc">Lecture Description<sup className='text-red-700'>*</sup></label>
                <textarea
                  id="lecturedesc"
                  placeholder="Enter lecture description"
                  {...register('lectureDesc', { required: true })}
                 className="w-full bg-richblack-600 min-h-[130px] border-b border-richblack-100 p-2 rounded-md"
                />
                {errors.lectureDesc && <span>Lecture Description is required</span>}
              </div>
    
              {!view && (
                <div className='mt-2'>
                  <IconBtn text={loading ? 'Loading...' : edit ? 'Save Changes' : 'Save'} />
                </div>
              )}
            </form>
          
      </div>
    </div>
  );
};

export default SubsectionModal;
