import React from 'react'
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
 
import { addToCart } from '../../../Slices/cartSlice';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { FaShareAlt } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

function CourseDetailsCard ({course,setConfiramtionModal,handleBuyCourse}) {
    // console.log("value of course inside the courseDetailscard",course);
   const{
       thumbnail,
       Price,
    } = course;
        
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

     
    const handleAddToCart=()=>{
       if(user && user?.accountType===ACCOUNT_TYPE.INSTRUCTOR){
        toast.error("You are an instructor")
        return ;
       }
       if(token){
        dispatch(addToCart(course));
        return;
       }
       setConfiramtionModal({
        text1:"You are not logged in",
        text2:"Please login to add to cart",
        btn1text:"login",
        btn2text:"cancel",
        btn1Handler:()=>navigate("/login"),
        btn2Handler:()=>setConfiramtionModal(null),
       })
    }

    const handleShare = ()=>{
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    }
return(
    <div className='bg-richblack-700 flex flex-col gap-y-2 ml-8 p-8 '>
       <img
       src={thumbnail}
       alt='thumbnail Image'
       className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'
       />
       <div className='text-xl font-semibold'>
        Rs.{Price}
       </div>

       <div className='flex flex-col gap-y-6 '>
        <button className='bg-yellow-50 w-fit text-richblack-900 rounded-md p-3' onClick={
            user && course?.studentsEnrolled.includes(user?._id)
            ? ()=>navigate("/dashboard/enrolled-courses"):handleBuyCourse
        }>
            {
                user && course?.studentsEnrolled.includes(user?._id)?"Go to course":"Buy Now"
            }
        </button>

               {
                (!course?.studentsEnrolled.includes(user?._id)) &&
                   (
                    <button className='bg-yellow-50 w-fit text-richblack-900 rounded-md p-3' onClick={handleAddToCart}>
                    Add to Cart
                      </button>
                   )
               }
       </div>

       <div className='pt-9'>
        <p>
          30-Day Money-Back Guarantee  
        </p>
        <p className='text-xl font-semibold'>
            This Course Includes:
        </p>
        <div className='flex flex-col  gap-y-3'>
      
            {
                 
              course?.instructions?.map((item,index)=>(
                <p key={index} className='flex gap-2 text-caribbeangreen-400'>
                     <GiCheckMark className='mt-1'/>
                    <span>{item}</span>
                </p>
              ))

            }

        </div>
       </div>
       <div>
        {/* add the icon of share */}
        <button onClick={handleShare} className='flex items-center gap-2 p-6 text-yellow-50'>
        <FaShareAlt />
            Share</button>
       </div>

    </div>
)

}

export default CourseDetailsCard