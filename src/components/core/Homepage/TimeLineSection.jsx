import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineimage from"../../../assets/Images/TimelineImage.png"




const timeline =[
    {
        Logo: Logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution",
 


                       
    },
    

]

const TimeLineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-20 items-center'>

         
           <div className='w-[45%] flex flex-col gap-20 divide-x divide-dashed  '>
            
          
           
           {
            timeline.map((element,index) =>{
                return(
                    
                    <div className='flex flex-row gap-6 ' key={index}>
                         
                       
                        <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full'>

                          <img src={element.Logo} alt='loading' ></img>  
                      
                           
                           
                        </div>
                        
                        <div>
                            <h2 className='font-semibold text-[18px] '>{element.heading}</h2>
                            <p className='text-base'>{element.Description}</p>
                            
                            </div>
                             

                    </div>
                )
            })
           }
       </div>
     
           

           <div className='relative shadow-blue-200'>
            <img src={timelineimage}
            alt="timelingimage"
            className='shadow-white shadow-[12px_12px_0_0] '></img>

            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 rounded-md translate-y-[-50%] left-[20%] w-[60%]'>
                <div className='flex flex-row gap-3 items-center border-r border-caribbeangreen-300'>
                    <p className='font-bold text-3xl px-2'>10</p>
                    <p className='text-caribbeangreen-300 text-sm pr-2'>Years of Experience </p>
                </div>
                <div className='flex gap-3 items-center px-6'>
                <p className='font-bold text-3xl'>250</p>
                <p className='text-caribbeangreen-300 text-sm'>Type of courses</p>
                </div>
            </div>
           </div>

        </div>
    </div>
  )
}

export default TimeLineSection