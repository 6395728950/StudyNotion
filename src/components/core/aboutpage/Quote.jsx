import React from 'react'
import Highlight from '../Homepage/Highlight'

const Quote = () => {
  return (
    <div className='text-richblack-200 font-semibold text-3xl text-center w-[77%] mx-auto'>

 "We are passionate about revolutionizing the way we learn. Our innovative platform 
<Highlight text={'combines technology'}></Highlight>, 
<span className='text-brown-800'>
    {" "}
    expertise
    </span> , and community to create an 
    <span className='text-brown-300'>
        {" "}
    unparalleled educational experience."
        </span> 
         
    </div>
  )
}

export default Quote