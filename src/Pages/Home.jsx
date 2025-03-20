import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import Highlight from '../components/core/Homepage/Highlight';
import CTAButton from "../components/core/Homepage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import TimeLineSection from '../components/core/Homepage/TimeLineSection';
import instructor from "../assets/Images/Instructor.png"
import ExploreMore from '../components/core/Homepage/ExploreMore';
import Footer from '../components/core/Homepage/common/footer';

const Home = () => {
  return (
    <div>
        {/* section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between '>
            <Link to ={"/signup"}>
            

             <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
               <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                {/* todo:add shadow on button */}
                <p>Become a instructor</p>
                <FaArrowRight />
                </div>  
             </div>
            </Link>
        

        <div className='text-white text-4xl text-center font-semibold mt-7'>
          Empower your future with
          {/* todo:work on gradient of this text */}
          <Highlight text={"Coding Skills"}></Highlight>
        </div>
                      
       <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
       with our online coding course you can learn at your own pace from anywhere in the world, and get access to a wealth of resources, including hands-on projects ,quizzes,and personalized feedback from instructor
       </div>
         
     <div className='flex flex-row gap-7 mt-8'>
      {/* todo: work on shadow of button */}
      <CTAButton active={true} linkto={"/signup"}>
        Learn More
      </CTAButton>
      <CTAButton active={false} linkto={"/login"}>
        Book a Demo
      </CTAButton>
     </div>

   {/* add the video */}
   <div className='  mx-3 my-12 shadow-[12px_12px_0_0] shadow-white '>
    <div className=' bg-[radial-gradient(ellipse_at_20%_50%,#FF512F,#F09819)'></div>

    <video muted loop autoPlay >
     <source src ={Banner} type ="video/mp4">
     </source>

    </video>
    </div>

  {/* code section 1 */}
  <div>
    <CodeBlocks position={"lg:flex-row"} heading={
      <div className='text-4xl font-semibold'>
        Unlock your 
        <Highlight text={"coding potential "}></Highlight>
        with our online course
      </div>
    }
    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} 
    ctabtn1={
      {btnText:"try it yourself",
        linkto:"/signup",
        active:true,
      }
    }

    ctabtn2={
      {btnText:"learn more",
        linkto:"/login",
        active:false,
      }
    }

    codeblock={`<<!DOCTYPE html>\nhead><title>Example</title><linkrel="stylesh`}
    codeColor={"text-yellow-25"}
    backgroundGradient={""}
    
    ></CodeBlocks>
  </div>

  {/* code section 2 */}
  <div>
    <CodeBlocks position={"lg:flex-row-reverse"} heading={
      <div className='text-4xl font-semibold mx-8 w-[200px] text-balance3333' >
        Start
        <Highlight text={"coding in seconds "}></Highlight>
         
      </div>
    }
    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."} 
    ctabtn1={
      {btnText:"try it yourself",
        linkto:"/signup",
        active:true,
      }
    }

    ctabtn2={
      {btnText:"learn more",
        linkto:"/login",
        active:false,
      }
    }
    codeblock={`<<!DOCTYPE html>\nhead><title>Example</title><linkrel="stylesh`}
    codeColor={"text-yellow-25"}
    
    ></CodeBlocks>
  </div>

  <ExploreMore></ExploreMore>

     </div>
     

     {/* section 2 */}
     <div className='bg-pure-greys-5 text-richblack-700'>
     <div className='h-[200px]'></div>
      <div className='homepage_bg h-[310px]'>
        <div className='mx-auto w-11/12 max-w-maxContent flex flex-row  gap-5 justify-center'>
        <div className='flex flex-row gap-7 text-white mt-20'>
          <CTAButton active={true} linkto={"/signup"}>
          <div className='flex items-center gap-3'>
            Explore full Catalog
            <FaArrowRight></FaArrowRight>
          </div>

          </CTAButton>
          <CTAButton active={false} linkto={"/signup"}>
               <div>
                 Learn more
               </div>
          </CTAButton>
        </div>

        </div>

      </div>

      <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 '>
      <div className='flex flex-row gap-5 mb-10 '>
        <div className='text-4xl  font-semibold w-[45%]'>
          Get the skills you need for a 
          <Highlight text={"Job that is in demand"}></Highlight>
        </div>
        <div className='flex flex-col gap-10 w-[40%] items-start translate-x-32'>
        <div className='text-[16px] '>
    The modern StudyNotion is the Dictates its own terms.Today, to be a competitive
    speacialist requires more than professional skills
        </div>
        <CTAButton active={true} linkto={"/signup"}> 
        <div>
          Learn more
        </div>

        </CTAButton>
      </div>

      </div>
      <TimeLineSection>
        
        </TimeLineSection> 
        <LearningLanguageSection></LearningLanguageSection>

      </div>

      
     </div>
{/* 
     section 3 */}
  <div className='w-11/12 mx-auto max-w-maxContent flex flex-col bg-richblack-900 gap-8 justify-between items-center text-white'>
     <div className='flex flex-row justify-evenly mb-20'>
     <div className='w-[50%] mt-14 '>
       <img src={instructor} alt="instructorimage" className='w-[627px] h-[545px]  shadow-[0_0_12px_12px] shadow-white'></img>
    </div>
    <div className='w-[50%] flex flex-col mx-auto justify-center ml-14 gap-6'>
      <p className='font-semibold text-3xl flex flex-col'> 
          Become an
          <Highlight text={"Instructor"}/>
      </p>
      <p className=' font-medium text-[12px] text-richblack-200 w-[70%]'>
      Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
      </p>
      <div className='flex text-black'>
        <CTAButton active={true} linkto={"/signup"} >
        <div className='flex flex-row gap-2 items-center'>
          Start Teaching Today
          <FaArrowRight></FaArrowRight>
        
        </div>
        
         
        
     
        </CTAButton>
      </div>
    </div>
     </div>
     <h1 className='text-3xl font-medium text-center mb-10'>Reviews from other learners</h1>
      {/* review slider here */}
     
  </div>

    {/* footer */}
    <div className='translate-x-10 '>
    <Footer></Footer>
    </div>
      


    </div>
  )
}

export default Home