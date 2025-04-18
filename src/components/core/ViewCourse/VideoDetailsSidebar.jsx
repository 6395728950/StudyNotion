import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../Homepage/common/IconBtn';
import { IoChevronBack } from "react-icons/io5";

const VideoDetailsSidebar = ({setReviewModal}) => {
    const[activeStatus,setActiveStatus]= useState("");
    const[videobarActive,setVideoBarActive] = useState("");
    const navigate = useNavigate(); 
    const location  = useLocation();
    const{sectionId,subSectionId} = useParams();
    const{
        courseSectionData,
        courseEntireData,
        CompletedLectures,
        totalNoOfLectures
         
    } = useSelector((state) => state.viewCourse);
    


      console.log("value of courseSectionData",courseSectionData);
    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData.length){
                return ;
            }
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id===sectionId)
            
            const currentSubsectionIndex = courseSectionData?.[currentSectionIndex]?.subsection.findIndex((data)=>data._id===subSectionId)

            const activeSubsectionId = courseSectionData[currentSectionIndex]?.subsection?.[currentSubsectionIndex]?._id;

            // set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // set current subsection here
            setVideoBarActive(activeSubsectionId);

        })()
    },[courseSectionData,courseEntireData,location.pathname])
  return (
     <>
     <div className='bg-richblack-700 w-56 h-full'>
        {/* for buttons and heading */}
        <div className='ml-6 border-b-2 border-richblack-500 mr-2 flex flex-col gap-y-3'>
            {/* for buttons */}
           <div onClick={()=>{
            navigate("/dashboard/enrolled-courses")
           }} className='underline cursor-pointer flex mt-1'>
            <IoChevronBack className='mt-1' />

            Back
            </div>
            

           <div>
            <IconBtn
            text="Add Review"
            onClick={()=>setReviewModal(true)}/>
           </div>

            

           {/* for heading or title */}
           <div>
         <p className='text-richblack-25 font-semibold'>{courseEntireData?.courseName}</p>
         <p className='text-richblue-700'>{CompletedLectures?.length} / {totalNoOfLectures}</p>
           </div>


        </div>

        {/* for section and subsection */}
        <div>
            {
                courseSectionData?.map((section,index)=>(
                    <div 
                    
                    onClick={()=>setActiveStatus(section?._id)}
                    key={index}

                    >
                           
                           {/* section */}
                           <div  className='bg-richblack-500 h-10 mt-2'>
                            <div className=' text-richblack-25 m-4 pt-2  font-semibold '>
                                {section?.sectionName}
                            </div>
                            {/* add arrow icon  and handle rotate logic */}

                           </div>

                           {/* add subsection here */}
                           <div   >
                            {
                                activeStatus===section?._id && (
                                    <div className='bg-richblack-700 h-full ' >
                                        {
                                               section.subsection.map((topic,index)=>(
                                                <div
                                                className={`flex gap-5 p-5 ${videobarActive===topic._id ?"bg-yellow-200 text-richblack-900":"bg-richblack-900 text-white"}`} key={index} onClick={()=>{
                                                    navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                    setVideoBarActive(topic?._id);
                                                }}>
                                                    <input
                                                    type='checkbox'
                                                    checked={CompletedLectures.includes(topic?._id)}
                                                    onChange={()=>{}}
                                                    ></input>
                                                    <span>{topic.title}</span>
                                                </div>
                                               ))
                                        }
                                    </div>
                                )
                            }
                           </div>
                        </div>
                )) 
            }
        </div>
     </div>
     </>
  )
 }

export default VideoDetailsSidebar