import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../Homepage/common/IconBtn';

const VideoDetailsSidebar = ({setReviewModal}) => {
    const[activeStatus,setActiveStatus]= useState("");
    const[videobarActive,setVideoBarActive] = useState("");
    const navigate = useNavigate(); 
    const location  = useLocation();
    const{sectionId,subSectionId} = useParams();
    const{
        courseSectionData,
        courseEntireData,
        completedLectures,
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
     <div>
        {/* for buttons and heading */}
        <div>
            {/* for buttons */}
           <div onClick={()=>{
            navigate("/dashboard/enrolled-courses")
           }}>
            Back
            

           <div>
            <IconBtn
            text="Add Review"
            onClick={()=>setReviewModal(true)}/>
           </div>

           </div>

           {/* for heading or title */}
           <div>
         <p>{courseEntireData?.courseName}</p>
         <p>{completedLectures?.length} / {totalNoOfLectures}</p>
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
                           <div>
                            <div>
                                {section?.sectionName}
                            </div>
                            {/* add arrow icon  and handle rotate logic */}

                           </div>

                           {/* add subsection here */}
                           <div>
                            {
                                activeStatus===section?._id && (
                                    <div>
                                        {
                                               section.subsection.map((topic,index)=>{
                                                <div
                                                className={`flex gap-5 p-5 ${videobarActive===topic._id ?"bg-yellow-200 text-richblack-900":"bg-richblack-900 text-white"}`} key={index} onClick={()=>{
                                                    navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                    setVideoBarActive(topic?._id);
                                                }}>
                                                    <input
                                                    type='checkbox'
                                                    checked={completedLectures.includes(topic?._id)}
                                                    onChange={()=>{

                                                    }}
                                                    ></input>
                                                    <span>{topic.title}</span>
                                                </div>
                                               })
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