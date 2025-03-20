import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

 
 
import Course_Card from "./Course_card"

const CourseSlider = ({course}) => {
    console.log("what is come in course",course);
  return (
    <>
    {
        course?.length?(
            // problem in swiper component
            
            <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={100}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper"
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            navigation={true}
            breakpoints={{
              1024: { slidesPerView: 3 }, // Corrected typo from sliderPreView to slidesPerView
            }}
          >
            {console.log("I am inside the Swiper")}
          
            {course?.map((card, index) => (
              <SwiperSlide key={index}>
                {card && <Course_Card courses={card} height={"h-[400px]"} />}
              </SwiperSlide>
            ))}
          </Swiper>
          
        ):(
              <p>No Course Found</p>
        )
    }
    </>
  )
}

export default CourseSlider;