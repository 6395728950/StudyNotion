import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import  { useNavigate, useParams } from 'react-router-dom';
import { Player } from 'video-react';
import {AiFillPlayCircle} from "react-icons/ai"

import 'video-react/dist/video-react.css';

 
import { markLectureAsComplete } from '../../../services/operation/Courseapi';
import { updateCompletedLectures } from '../../../Slices/viewCourseSlice';
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
import { BiRevision } from "react-icons/bi";
import IconBtn from '../Homepage/common/IconBtn';
const VideoDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef();
    const{courseId,sectionId,subsectionId} = useParams();
    const{courseSectionData,courseEntireData,CompletedLectures} = useSelector((state)=>state.viewCourse);
    
    const {token} = useSelector((state)=>state.auth);
    const[videoData,setVideoData]  = useState("");
    const[videoEnd,setVideoEnd]  = useState("");
    const[loading,setLoading] = useState(false)

    useEffect(() => {
      const setVideoSpecificDetail = async () => {
          if (!courseSectionData || courseSectionData.length === 0) {
              return;
          }
  
          if (!courseId || !sectionId || !subsectionId) {
              navigate("/dashboard/enrolled-course");
              return;
          }
  
          // Filter section based on sectionId
          const filteredData = courseSectionData.filter((section) => section._id === sectionId);
  
          // Check if filteredData is empty or undefined
          if (filteredData.length === 0) {
              console.error("Section not found!");
              return;
          }
  
          // Filter subsection safely
          const filteredVideoData = filteredData[0]?.subsection?.filter((data) => data._id === subsectionId);
  
          if (!filteredVideoData || filteredVideoData.length === 0) {
              console.error("Subsection not found!");
              return;
          }
  
          setVideoData(filteredVideoData[0]);
          setVideoEnd(false);
      };
  
      setVideoSpecificDetail();
  }, [courseSectionData, courseEntireData, CompletedLectures]);
  

   const isfirstVideo = ()=>{
  
     // find the current index
     const CurrentSectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId)

     const CurrentSubSectionIndex = courseSectionData[CurrentSectionIndex].subsection.findIndex((data)=>data._id===subsectionId)
     if(CurrentSectionIndex ===0 && CurrentSubSectionIndex===0){
        return true;
     }else{
        return false;
     }
   }
   const islastVideo = ()=>{
       const CurrentSectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId)
       
       const noOfSubSection = courseSectionData[CurrentSectionIndex].subsection.length;
       const currentSubSectionIndex = courseSectionData[CurrentSectionIndex].subsection.findIndex((data)=>data._id===subsectionId)
       if(CurrentSectionIndex===courseSectionData.length-1 && currentSubSectionIndex===noOfSubSection-1){
        return true;
       }else{
        return false;
       }
   }
   const goToNextVideo = ()=>{
    const CurrentSectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId)
       
    const noOfSubSection = courseSectionData[CurrentSectionIndex].subsection.length;
    const currentSubSectionIndex = courseSectionData[CurrentSectionIndex].subsection.findIndex((data)=>data._id===subsectionId)


    if(currentSubSectionIndex!==noOfSubSection-1){
    // in this case we navigate same section ki next video

    const nextSubSectionId = courseSectionData[CurrentSectionIndex].subsection[currentSubSectionIndex+1]._id; // when you find error than come here and match with babbar's code
    // next video pr jao

    navigate(`/view-course/${courseId}/section${sectionId}/$sub-section/${nextSubSectionId}`)

    }else{
      //in this case we go next video of next section
      const nextSectionId = courseSectionData[CurrentSectionIndex+1]._id;
      const nextSubSectionId = courseSectionData[CurrentSectionIndex+1].subsection[0]._id;
    // next video pr jao
      navigate(`/view-course/${courseId}/section${nextSectionId}/$sub-section/${nextSubSectionId}`)
    }
   }
   const goToprevVideo = ()=>{
    const CurrentSectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId)
       
    // const noOfSubSection = courseSectionData[CurrentSectionIndex].subsection.length;
    const currentSubSectionIndex = courseSectionData[CurrentSectionIndex].subsection.findIndex((data)=>data._id===subsectionId)


    if(currentSubSectionIndex!==0){
    // in this case we navigate same section ki prev video

    const prevSubSectionId = courseSectionData[CurrentSectionIndex].subsection[currentSubSectionIndex-1]._id; // when you find error than come here and match with babbar's code
    // next video pr jao

    navigate(`/view-course/${courseId}/section${sectionId}/$sub-section/${prevSubSectionId}`)

    }else{
      //in this case we go prev video of prev section
      const prevSectionId = courseSectionData[CurrentSectionIndex-1]._id;
      const prevSubsectionLength = courseSectionData[CurrentSectionIndex-1].subsection.length;
      const prevSubSectionId = courseSectionData[CurrentSectionIndex-1].subsection[prevSubsectionLength-1]._id;
    // next video pr jao
      navigate(`/view-course/${courseId}/section${prevSectionId}/$sub-section/${prevSubSectionId}`)
    }
   }


   const handleLectureCompletion = async()=>{
    // here we use dummy code baad me we will repalce this actual call
    setLoading(true);
    // PENDING->courseProgress pending in controller
    const res = await markLectureAsComplete({courseId:courseId,subsectionId:subsectionId},token);
     console.log("value of res",res);
    //status update
    if(res){
        dispatch(updateCompletedLectures(subsectionId));
    }
    setLoading(false);
   }
    
     return (
    <div  className='ml-60 mr-10 -mt-64 z-900 '>
                {
                  !videoData ?(<div  className='text-red-700 text-xl font-semibold text-center'>
                    No Data Found
                  </div>
                ):(
                      <Player
                      ref = {playerRef}
                      aspectRatio='16:9'
                      playsInline
                      onEnded={()=> setVideoEnd(true)}
                      src={videoData?.videoUrl}
                      className="border-none relative"
                       
                      >
                        <AiFillPlayCircle/>
                        {
                          videoEnd &&(
                            <div>
                           {
                                  Array.isArray(CompletedLectures) && !CompletedLectures.includes(subsectionId) && (
                                    <IconBtn
                                      disabled={loading}
                                      onClick={() => handleLectureCompletion()}
                                      text="Mark as completed"
                                      className="mt-4"
                                    />
                                  )
                                }

                              <button
                              disabled={loading}
                              onClick={()=>{
                                if(playerRef?.current){
                                  playerRef.current?.seek(0);
                                  setVideoEnd(false);
                                }
                              }}
                               
                              className='absolute top-52 left-80'>
                                  <BiRevision  className='text-richblack-400 text-2xl bg-richblack-25 border border-richblack-5 rounded-full '/>
                                </button>
                              <div>
                                {
                                  !isfirstVideo() && (
                                    <button
                                    disabled={loading}
                                    onClick={goToprevVideo}
                                    className='absolute top-52 left-8'>
                                        <GiPreviousButton className='text-richblack-400 text-2xl  bg-richblack-25 border border-richblack-5 rounded-full' />
                                    </button>
                                  )
                                }
                                {
                                  !islastVideo() &&(
                                    <button 
                                    disabled={loading}
                                    onClick={goToNextVideo}
                                    className='absolute top-52 right-8'>
                                      <GiNextButton  className='text-richblack-400 text-2xl  bg-richblack-25 border border-richblack-5 rounded-full'/>
                                    </button>
                                  )
                                }
                              </div>
                            </div>
             
                          )
                        }
                      </Player>
                )
                }
               <h1 className='text-white text-xl mt-4'>{videoData?.title}</h1>
               <p className='text-richblack-25'>{videoData?.desc}</p>

    </div>
  )
}

export default VideoDetails