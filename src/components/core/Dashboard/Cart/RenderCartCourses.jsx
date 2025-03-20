 import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
          console.log("value of result",result?.data.averageRating);
            setRating(result?.data?.averageRating);
           
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
                return <div key={index}>
                          <div>

                            <img src={course?.thumbnail}/>
                            <div>
                                <p>{course?.courseName}</p>
                                <p>{course?.category?.name}</p>
                                <div>

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
                                    <span>{course?.ratingAndReviews?.length} Ratings</span>
                                </div>
                            </div>

                          </div>

                          <div>

                            <button onClick={()=>dispatch(removeFromCart(course._id))}>
                            <RiDeleteBin6Line />
                            <span>Remove</span>
                            </button>
                            <p>{course?.Price}</p>
                               
                          </div>
                </div>
            })
        }
        </div>
    
   )
 }
 
 export default RenderCartCourses