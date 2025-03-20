import React from 'react'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { PiGlobeHemisphereWestFill } from "react-icons/pi";
import { IoMdCall } from "react-icons/io";


const data  = [{
                  icon:<HiChatBubbleLeftRight />,
                  title:"Chat on us",
                  description:"Our friendly team is here to help.",
                  contact:"@mail address",
          },
          {
            icon: <PiGlobeHemisphereWestFill />,
            title:"Visit us",
            description:"Come and say hello at our office HQ..",
            contact:"Here is the location/ address",
    },
    {
        icon: <IoMdCall />,
        title:"Call us",
        description:"Mon - Fri From 8am to 5pm",
        contact:"+123 456 7890",
},
        ]

const ContactDetails = () => {
  return (
    <div className='bg-richblack-700 rounded-md  flex flex-col gap-4 p-4'>

    {
        data.map((element,index)=>{
            return (
                <div key={index} >
                    <div className='flex gap-1'>

                    <h1 className='pt-1 text-richblack-400'>{element.icon}</h1> 
                    <h1 className='text-white font-semibold'>{element.title}</h1>
                    </div>
                      
                       <p className='text-richblack-300 text-sm'>{element.description}</p>
                       <p className='text-richblack-300 text-sm'>{element.contact}</p>

                    </div>
            )
        })
    }
    </div>
  )
}

export default ContactDetails