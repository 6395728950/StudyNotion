import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
 
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../Homepage/common/RatingStars';



const Course_card = ({courses,height}) => {
  console.log("value of course",courses);
    const [avgRating,setavgRating] = useState(0);

    useEffect(()=>{
     const count = GetAvgRating(courses.ratingAndReview);
     setavgRating(count)
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
                <span className='text-yellow-50'>{avgRating || 0}</span>
                <RatingStars Review_count={avgRating}></RatingStars>
                <span>{courses.ratingAndReview?.length} Ratings</span>
            </div>
            <p  className=''> Rs.{courses?.Price}</p>
        </div>
    </div>
    
    </Link></div>
  )
}

export default Course_card;