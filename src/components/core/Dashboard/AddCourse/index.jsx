import RenderStep from "./RenderStep"

import { ImPower } from "react-icons/im";
import { IoChevronBack } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function AddCourse(){
   return(
    <>
       {
         <Link to="/dashboard/myprofile" className='text-richblack-500 -mt-6 flex flex-row underline hover:text-richblack-200 '>
         <IoChevronBack className='mt-1'/>
     Back to Dashboard</Link>
       }
       <div className="text-white text-center flex flex-row justify-between">
           
        <div className="w-2/3 mr-4">
            <h1>Add Course</h1>
            <div className="ml-4">
            <RenderStep/>
        </div>
        </div>
         <div className=" bg-richblack-700 hidden lg:flex flex-col gap-2 h-1/3 w-96 pl-5 border border-richblack-600 rounded-md  ">
             {/* add power icon */}
             <div className="flex flex-row gap-3 pt-4">
             <ImPower className="mt-2 text-brown-100" />
             <p className="text-lg text-left">Course Upload Tips</p>
             </div>
     
              <ul className="list-disc text-xs py-5 w-10/12 opacity-90 ml-5 text-left flex flex-col gap-4">
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
              </ul>
         </div>
       </div>
    </>
   )
}