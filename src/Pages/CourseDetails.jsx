import React, { useEffect, useState } from 'react' 
import { useDispatch,useSelector } from 'react-redux';
 import { useParams,useNavigate } from 'react-router-dom';
 import { buyCourse } from '../services/operation/studentFeaturesApi';
  import { fetchCourseDetails, getAllCourse } from '../services/operation/Courseapi';
import GetAvgRating from '../utils/avgRating';
import Error from "./Error";
import ConfirmationModal from '../components/core/Homepage/common/ConfirmationModal';
 
import RatingStars from '../components/core/Homepage/common/RatingStars';
import {formatDate} from "../../src/services/FormatDate"
import CourseDetailsCard from '../components/core/course/CourseDetailsCard';
import { setCourse } from '../Slices/courseSlice';
import { RxDropdownMenu } from 'react-icons/rx';
import { LiaVideoSolid } from "react-icons/lia";

 
const CourseDetails = () => {

  const[confirmationModal,setConfirmationModal] = useState(null);
  const {user} = useSelector((state)=>state.profile);
  const{token} = useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const {courseId} =useParams();
  const dispatch = useDispatch();
  const {loading}= useSelector((state)=>state.profile);
  const {paymentLoading} = useSelector((state)=>state.course);
  const[courseData,setCourseData] = useState(null);
 
  
 
  // console.log("value of courseId inside the courseDetails",courseId);
  // console.log("value of courseData",courseData);
   
  useEffect(()=>{
    const getCourseFullDetails = async()=>{
      try{
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
     }catch(error){
              console.log("could not fetch course details");
     }
    }
    getCourseFullDetails();
   
  },[courseId])
  
  const[avgReviewCount,setAverageReviewCount]  = useState(0);
  useEffect(()=>{
      const count =  GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
      setAverageReviewCount(count);
  },[courseData])

  const[totalNoofLectures,setTotalNoOfLectures] = useState(0);
  useEffect(()=>{
    let lectures= 0;
    courseData?.data?.courseDetails?.courseContent?.forEach((sec)=>{
      lectures+=sec.subsection.length || 0
    })
    setTotalNoOfLectures(lectures);
  },[courseData])

  const[isActive,setIsActive] = useState(Array(0));

  const handleActive = (id)=>{
    // here we toggle setIsActive if already open hai toclose kro otherwise open kro
    setIsActive(
        !isActive.includes(id)
        ?isActive.concat(id)
        :isActive.filter((e)=>e!=id)
    )

  }
    const handleBuyCourse= ()=>{
        if(token){
            buyCourse(token ,[courseId],user,navigate,dispatch);
            return;
        }
        else{
          setConfirmationModal({
            text1:"you are not Logged in",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
          })
        }
           
        

    }
    if(loading || !courseData){
       return(
        <div>
          Loading...
        </div>
       )
    }

    if(!courseData.success){
      return(
        <div>
          <Error/>
        </div>
      )
          
      
    }
    const{
      _id:course_id,
      courseName,
      coursedesc,
      thumbnail,
      Price,
      whatYouwillLearn,
      courseContent,
      ratingAndReview,
      instructor,
      studentEnrolled,
      createdAt,
    } = courseData.data?.courseDetails;
  return (
    <div className='flex flex-col   text-white'>
     
     <div className='relative flex  flex-col justify-start'>

     <p>{courseName}</p>
      <p>{coursedesc}</p>
       <div>
         <span>{avgReviewCount}</span>
         <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
         <span>{`(${ratingAndReview.length} reviews)`}</span>

         {/* here you need to do something */}
         {/* <span>{`(${studentEnrolled.length || 0} students enrolled)`}</span> */}
       </div>
        <p>Created By{`${instructor.firstName}`}</p>
   
 
        <div>
          <p>
            Created At {formatDate(createdAt)}
          </p>
          <p> {" "}English</p>
        </div>
        <div>
          <CourseDetailsCard
            course={courseData?.data?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse = {handleBuyCourse}
          />
        </div>
     </div>
        <div>
          <p>What you will learn</p>
          <div>
            {whatYouwillLearn}
          </div>
        </div>

        {/* here we create course content part */}

        <div>
          <div>
            <p>
              Course Content:
            </p>

          </div>

           
         <div className='flex gap-x-3 justify-between'>
         <div>
            <span>{courseContent.length} section(s)</span>
            <span>{totalNoofLectures} lecture(s)</span>
            <span>{courseData?.data?.totalDuration} total length</span>
            
          </div>
            <div>
            <button onClick={()=>handleActive([courseContent.map((key,index)=>(
                {index}
            ))])}>
                Collapse all Sections
            </button>
            
            
            </div>
         </div>
         <div className="bg-richblack-700 p-6  px-8 rounded-lg">
         {courseContent?.map((section) => (
          <details key={section._id} close>
               <summary className='flex items-center justify-between  gap-x-3 border-b-2 text-richblack-500'>
               <div className="flex items-center gap-x-3 text-richblack-25 text-3xl">
                            <RxDropdownMenu />
                            
                              
                               
                                 
                            <p>{section?.sectionName}</p>
                              
                               
                            
                            {/* {
                              section?.data?.subsection?<video src={section?.data?.subsection[0]?.videoUrl} controls className="h-24 w-24" ></video> :<h1>Loading...</h1>
                            } */}
                             
                        </div>
                        <div>
                             <span className='text-yellow-100 text-xl'>{totalNoofLectures} lecture(s)</span>
                             </div>
               </summary>
                       <div>
                       {
                          section?.subsection?.map((val) => (
                                         
                                            
                                                        <div
                                                   key={val._id}
                                        
                                            className="flex items-center justify-between gap-x-3 border-b-2 border-richblack-100 py-4"
                                          >
                                              
                                            <div className="flex items-center gap-x-3" open>
                                             
                                            <LiaVideoSolid />
                                              <p>{val?.title}</p>
                                            </div>
                                            </div>
                        ))}
                        </div>
                       

                        </details> ))

         }
         </div>
            
           
        </div>

        {
          confirmationModal && <ConfirmationModal modaldata={confirmationModal}/>
        }
    </div>
  )
}

export default CourseDetails