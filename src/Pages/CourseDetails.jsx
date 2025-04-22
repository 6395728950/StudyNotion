import React, { useEffect, useState } from 'react' 
import { useDispatch,useSelector } from 'react-redux';
 import { useParams,useNavigate } from 'react-router-dom';
 import { buyCourse } from '../services/operation/studentFeaturesApi';
  import { fetchCourseDetails } from '../services/operation/Courseapi';
import GetAvgRating from '../utils/avgRating';
import Error from "./Error";
import ConfirmationModal from '../components/core/Homepage/common/ConfirmationModal';
 
import RatingStars from '../components/core/Homepage/common/RatingStars';
import {formatDate} from "../../src/services/FormatDate"
import CourseDetailsCard from '../components/core/course/CourseDetailsCard';
 
import { RxDropdownMenu } from 'react-icons/rx';
import { LiaVideoSolid } from "react-icons/lia";
import { GiWireframeGlobe } from "react-icons/gi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Footer from '../components/core/Homepage/common/footer';

 
const CourseDetails = () => {

  const[confirmationModal,setConfirmationModal] = useState(null);
  const {user} = useSelector((state)=>state.profile);
  const{token} = useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const {courseId} =useParams();
  const dispatch = useDispatch();
  const {loading}= useSelector((state)=>state.profile);
  // const {paymentLoading} = useSelector((state)=>state.course);
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
  console.log("value of courseData",courseData);
  useEffect(()=>{
      const count =  GetAvgRating(courseData?.data?.courseDetails.ratingAndReview);
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
        :isActive.filter((e)=>e!==id)
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
   
      courseName,
      coursedesc,
       
      whatYouwillLearn,
      courseContent,
      ratingAndReview,
      instructor,
     
      createdAt,
    } = courseData.data?.courseDetails;
  return (
    <div className='flex flex-col   text-white'>
     
     <div className='relative flex  justify-between m-8'>
      <div>
     <p className='text-2xl font-semibold'>{courseName}</p>
      <p className='text-richblack-500 py-4'>{coursedesc}</p>
       <div className='flex gap-x-1'>
         <span className='text-yellow-50 text-xl'>{avgReviewCount.toFixed(1)}</span>
         <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
         <span className='text-xl font-semibold'>{`(${ratingAndReview.length} reviews)`}</span>

         {/* here you need to do something */}
         {/* <span>{`(${studentEnrolled.length || 0} students enrolled)`}</span> */}
       </div>
        <p  className='py-6'>Created By {`${instructor.firstName}`}</p>
   
 
        <div className='flex gap-x-2'>
          <p className='flex gap-x-4'>
          <AiOutlineInfoCircle className='text-xl ' />

            Created At {formatDate(createdAt)}
          </p>
          <p className='flex gap-x-2'> 
            <GiWireframeGlobe  className='text-xl'/>
          English
          </p>
        </div>
        <div className='border border-richblack-400 m-6 p-4   mt-32 h-32 flex flex-col gap-y-3 pl-9 w-full'>
          <p className='text-xl font-semibold'>What you will learn</p>
          <div>
            {whatYouwillLearn}
          </div>
        </div>
        </div>
        <div>
          <CourseDetailsCard
            course={courseData?.data?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse = {handleBuyCourse}
          />
        </div>
     </div>
        

        {/* here we create course content part */}

        <div className='w-2/3 m-6'>
          <div>
            <p className='text-xl font-semibold my-6'>
              Course Content:
            </p>

          </div>

           
         <div className='flex gap-x-3 justify-between'>
         <div className='mb-4 '>
            <span className='px-2'>{courseContent.length} section(s)</span>
            <span className='px-2'>{totalNoofLectures} lecture(s)</span>
            <span>{courseData?.data?.totalDuration} total length</span>
            
          </div>
            <div className='text-yellow-100'>
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
         <Footer></Footer>
    </div>
  )
}

export default CourseDetails