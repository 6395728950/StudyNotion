import React from 'react'
import Highlight from './Highlight'
import knowyourprogress from"../../../assets/Images/Know_your_progress.png"
import compare_with_others from"../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from"../../../assets/Images/Plan_your_lessons.png"
import CTAButton from"../Homepage/Button"

const LearningLanguageSection = () => {
  return (
    <div> 
        <div className='flex flex-col gap-5 w-11/12  '>
           <div className='flex flex-col mt-[130px] items-center'>
            <h1 className='font-semibold text-3xl '>Your Swiss Knife for <Highlight text={"Learning any language"}></Highlight></h1>
            
            <p className='text-richblack-600 mx-auto text-base text-center w-[65%] font-medium'>using spin making learning multiple language easy. with 20+ languages realistic voice-over, progress tracking ,custom schedule and more.</p>
           </div>
           <div className='flex flex-row items-center justify-center mt-5'>
            <img src={knowyourprogress} alt="KnowYourProgressImage" className='object-contain  -mr-32'/>
            <img src={compare_with_others} alt="comparewithother" className='object-contain '/>
            <img src={plan_your_lesson} alt="planyourlesson" className='object-contain -ml-36'/>


           </div>
           <div className='flex flex-row items-center mx-auto w-[150px] mb-20'>
              <CTAButton active={true} linkto={"/signup"}>
                <div>
                   Learn more 
                </div>
              </CTAButton>
           </div>
            </div> 
    </div>
  )
}

export default LearningLanguageSection