import React from 'react'
import Highlight from '../Homepage/Highlight'
import Button from "../Homepage/Button"


const cards = [

    {
      order:-1,
      title:"World-Class Learning for ",
      HighlightText:"Anyone, Anywhere",
      content:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
       BtnText:"Learn more",
       BtnLink:"/",
    },
    {order:1,
     title:"Curriculum Based on Industry Needs",
     content:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    { order:2,
     title:"Our Learning Methods",
     content:"The learning process uses the namely online and offline."
    },
    {
        order:3,
     title:" Certification",
     content:"You will get a certificate that can be used as a certification during job hunting."
    },
    { order:4,
     title:"Rating Auto-grading",
     content:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
    },
    {  order:5,
     title:"Ready to Work",
     content:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
    },
]
const LearningGrid = () => {
  return (
    <div className='grid  grid-cols-1 lg:grid-cols-4 mb-20 h-[500px] ml-12 mr-6 w-[1200px] mt-24'>
        {
        cards.map((element,index) => {
          return (
            <div key={index} className={`${index===0 && "lg:col-span-2  bg-richblack-900  w-[550px] h-[200px]"}
                 ${element.order%2===1 ?"bg-richblack-700" :"bg-richblack-800"}
                 ${element.order===3 && "lg:col-start-2"} `}>

                    {

                        element.order <0 
                        ?(
                            <div className='p-4 '>
                                <div className='mb-4' >
                                   <h1 className="text-white font-semibold text-xl">{element.title}</h1> 
                                   <Highlight text={element.HighlightText}  ></Highlight> 
                                </div>
                                <p className='text-richblack-200'>{element.content}</p>
                                <div className='w-32 rounded-md mt-10'>
                                    <Button active={true} linkto={element.BtnLink}  >{element.BtnText}</Button>
                                </div>

                            </div>

                        )
                        :(
                            <div >
                               <h1 className='text-white font-semibold text-xl p-6'>{element.title}</h1> 
                               <p className=' text-richblack-200  p-4'>{element.content}</p>
                                </div>
                        )
                        
                    }
                           
            </div>

          )

                   
          
        })
    }
          
    </div>
  )
}

export default LearningGrid