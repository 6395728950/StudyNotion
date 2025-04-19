 import React, {  useState } from 'react'
import { useDispatch } from 'react-redux'
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../Slices/cartSlice';
import ReactStars from "react-rating-stars-component"
import { getAvgRating } from '../../../../services/operation/RatingAndReviewapi';
 
 const RenderCartCourses = ({totalItems,cart}) => {
    // const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    const[rating,setRating] = useState(null);
    
     const Rating = async(courseId)=>{
      try{
          const result = await getAvgRating(courseId);
          console.log("value of result",result);
            // setRating(result?.data?.averageRating);
           
      }
      catch(error){
          console.log("error in getRating",error);
      }
     }
     

    //  useEffect(()=>{
    //      Rating();
    //  }
    //  ,[]);
   return (
    <div>
        {
            cart.map((course,index)=>{
             console.log("value of course",course);
                return <div key={index} className='flex justify-between w-2/3'>
                          <div className='flex gap-x-3 '>

                            <img src={course?.thumbnail} className='w-52 h-20 rounded-md mt-3 '/>
                              
                             <div className='mt-2'>
                              
                              <p className='text-xl  font-semibold text-richblack-5'>{course?.courseName}</p>
                              <p className='text-richblack-400 text-sm'>{course?.category?.name}</p>
                              <div className='flex gap-x-2'>

                                   {/* hw: find out rating from get rating  function   */}
                                    
                                  <span>{Rating(course?._id)?rating:"Loading..."
                                  }</span>
                                  <ReactStars 
                                   count={5}
                                   size={20}
                                   edit={false}
                                   activeColor="#ffd700"
                                   emptyIcon={<GiNinjaStar />}
                                   fullIcon={<GiNinjaStar />}

                                  />
                                  <span className='text-richblack-400 text-sm pt-1'>{course?.ratingAndReviews?.length} (Ratings)</span>
                              </div>

                          </div>
                          </div>
                          <div className='mt-2 '>

                          <button onClick={()=>dispatch(removeFromCart(course._id))} className='flex gap-1 mb-2 bg-richblack-700 text-pink-500 w-28 h-10 rounded-md justify-center items-center'>
                          <RiDeleteBin6Line className='' />
                          <span>Remove</span>
                          </button>
                          <p className='text-yellow-100 font-semibold'> Rs. {course?.Price}</p>
                            
                         
                              
 
                          </div>

                          
                </div>
            })
        }
        </div>
    
   )
 }
 
 export default RenderCartCourses