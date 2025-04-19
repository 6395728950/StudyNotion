import React, { useEffect, useState } from 'react'
import { apiconnector } from '../../../../services/apiconnector';
import { ratingsEndpoints } from '../../../../services/apis';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay,FreeMode} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaStar } from 'react-icons/fa6';
import ReactStars from 'react-rating-stars-component'
 


const ReviewSlider = () => {

    const[reviews,setReviews] = useState([]);
    // const truncateWords = 15;

    useEffect(()=>{
        const fetchAllReviews = async()=>{
            const response = await apiconnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("Loging response in rating",response);
            if(response?.data?.success){
                setReviews(response?.data?.data);
            }
        }
        fetchAllReviews();
    },[]);
  return (
    <div> 
         
        <div>
            <Swiper
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
                delay:2500,
            }}
            modules={[FreeMode,Pagination,Autoplay]}
            className='w-full'
            >
                {
                    reviews.map((review,index)=>(
                        <SwiperSlide key={index}>
                            <img
                            src={review?.user?.image ? review?.user?.image :`https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}${review?.user?.lastName}`}
                            alt='Profile Pic'
                            className='h-9 w-9 object-cover  rounded-full'/>
                            <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                            <p>{review?.course?.courseName}</p>
                            <p>{review?.Review}</p>
                            <p>{review?.Rating.toFixed(1)}</p>
                             <ReactStars
                             count={5}
                             value={review.Rating}
                             size={20}
                             edit={false}
                               activeColor="#ffd700"
                               emptyIcon={<FaStar/>}
                               fullIcon={<FaStar/>}
                                />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    </div>
  )
}

export default ReviewSlider