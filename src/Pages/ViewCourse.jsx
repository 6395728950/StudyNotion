import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsofCourse } from '../services/operation/Courseapi';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../Slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {
    const[reviewModal,setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch  = useDispatch();

    useEffect(()=>{
        const setCourseSpecificDetails = async()=>{
            const courseData = await getFullDetailsofCourse(courseId,token);

            console.log("value of courseData",courseData);
            dispatch(setEntireCourseData(courseData?.data?.data));
            dispatch(setCourseSectionData(courseData?.data?.data?.courseContent));
            dispatch(setCompletedLectures(courseData?.data?.completedVideos));
            let lecture =0;
            courseData?.data?.data?.courseContent?.map((sec)=>(
                lecture+=sec.subsection.length
            ))
            dispatch(setTotalNoOfLectures(lecture));
        }
        setCourseSpecificDetails();
    },[]);
  return (
    
    <>
    <div>
        <VideoDetailsSidebar setReviewModal={setReviewModal}></VideoDetailsSidebar>
      
            <Outlet></Outlet>
        
    </div>
    {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse