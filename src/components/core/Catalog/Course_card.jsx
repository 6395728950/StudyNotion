import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
 
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../Homepage/common/RatingStars';



const Course_card = ({courses,height}) => {
  // console.log("value of course",courses);
    const [avgRating,setavgRating] = useState(0);

    useEffect(()=>{
      // console.log("value of ratingAndReview in the course",courses.ratingAndReview);
     const count = GetAvgRating(courses.ratingAndReview);
    // console.log("value of count ",count);
     if(count!==NaN && count>0){
     // console.log("me yaha pr aa ya hu");
     setavgRating(count)
      
     }
    },[courses])
  return (
    <div>
    <Link to={`/courses/${courses._id}`}>
    <div>
        <div>
            <img
            src={courses?.thumbnail}
            alt='course ka thumbnail'
            className={`${height} w-400px rounded-md object-cover `}>
            
            </img>
        </div>
        <div className='ml-2 flex flex-col gap-y-1'>
             <p className='mt-2 '> {courses?.courseName}</p> 
             <div className='flex gap-x-1'>
              <span>By</span>
             <p className='text-yellow-50'>{courses?.instructor?.firstName}{courses?.instructor.lastName}</p>
             </div>
             
            <div className='flex gap-x-1'>
                <span className='text-yellow-50'>{avgRating.toFixed(1) || 0}</span>
                <RatingStars Review_Count={avgRating}></RatingStars>
                <span>{courses.ratingAndReview?.length} Reviews</span>
            </div>
            <p  className=''> Rs.{courses?.Price}</p>
        </div>
    </div>
    
    </Link></div>
  )
}

export default Course_card;