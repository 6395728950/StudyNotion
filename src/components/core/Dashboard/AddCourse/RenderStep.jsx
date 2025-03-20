import React from 'react'
import { FaCheck } from 'react-icons/fa6';
import { useSelector } from 'react-redux'
import CourseInformationform from './CourseInformation/CourseInformationform';
import CourseBuilder from './courseBuilder/CourseBuilder';
import CoursePublish from './Publishcourse/CoursePublish';

const RenderStep = () => {
     const {step} = useSelector((state)=>state.course);
    const steps =[
        {
            id:1,
            title:"Course Information",
         
        },
        {
            id:2,
            title:"Course Builder",
         
        },
        {
            id:3,
            title:"Publish",
         
        }

    ]
  return (
    <>

    <div>
        {
            steps.map((item)=>(
                <>
                <div>
                <div className={`${step===item.id ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                    : "bg-richblack-800 border-richblack-700 text-richblack-300"}`}>

                        {
                            step>item.id ?(<FaCheck/>) :(item.id)
                        }

                </div>

                </div>
                {/* Add code for dashes between the levels */}
                </>
            ))
        }
    </div>
     {/* Add the title below number */}
    <div>
      {
        steps.map((item)=>(
            <>
            <div>
                <p>{item.title}</p>
            </div>
            </>
            
        ))
      }

    </div>
    {step===1 &&<CourseInformationform/>}
    {step===2 && <CourseBuilder></CourseBuilder>}
    {step===3 && <CoursePublish></CoursePublish>}
    </>
    
  )
}

export default RenderStep