import React from 'react'
import Highlight from '../components/core/Homepage/Highlight'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import LearningGrid from '../components/core/aboutpage/LearningGrid'

import Quote from '../components/core/aboutpage/Quote'
import ContactFormSection from '../components/core/aboutpage/ContactFormSection'
import Footer from '../components/core/Homepage/common/footer';
import ReviewSlider from '../components/core/Homepage/common/ReviewSlider'


 
const About = () => {
  return (
    <div>
 
     {/* section 1 */}
     <section>
       <div className='mt-[100px] '>
        <header className='text-white text-center'>
        <p className='text-3xl font-semibold'> Driving Innovation in Online Education for a </p> 
        <Highlight text={'Brighter Future'}></Highlight> 
        <p className='text-richblack-400 text-sm font-semibold w-[700px] mx-auto'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
        
        </header>
        <div className='flex flex-row  justify-evenly mt-10'> 
            <img src={BannerImage1} alt="bannerimage" loading="lazy" ></img>
            <img src={BannerImage2} alt="bannerimage" loading="lazy" ></img>
            <img src={BannerImage3} alt="bannerimage" loading="lazy" ></img>
             
        </div>
        
        </div> 
     </section>
     {/* section 2 */}
     <section>
        <div className='mt-20'>
            <Quote/>
        </div>
     </section>

     {/* section 3 */}

     <section className='mt-32 mx-auto mb-10'>
        <div className='flex flex-row   gap-14 mb-8 w-[78%] mx-auto '>
            {/* left part */}
            <div className='w-[50%] mx-auto'>
                <h1 className='text-brown-400 mb-3 text-3xl font-bold'>
                Our Founding Story 
                </h1>
                < p className='text-richblack-200 text-xs font-semibold w-[70%]'>
                  Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                  <p className='h-4'></p>
                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                </p>
            </div>
             {/* add image */}
             <div className='w-[534px] h-[342px] '>
                <img src={FoundingStory} ></img>
             </div>

        </div>

        <div className=' flex justify-around' >
            {/* left part */}
            <div className='w-[27%] '> 
                   <h1 className='text-brown-200 mb-4 text-3xl font-bold'>
                      Our Vision
                  </h1>
                  <p className='text-richblack-200 text-xs font-semibold'> 
                  With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                  </p>
                                  </div> 
            {/* right part */}
            <div className='w-[30%] flex flex-col gap-4'>
              <div className='text-3xl font-bold'>
              <Highlight text={'Our Mission'} ></Highlight>
              </div>
                
                <p className=' text-richblack-200 text-xs font-semibold'>
                our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                </p>
            </div>
        </div>
     </section>

     {/* section 4 */}
     <section>
        <div className='flex flex-row gap-10 bg-richblack-700 p-10 text-center justify-evenly'>

          {/* active student */}
          <div>
            <h1 className='text-white font-semibold text-2xl'>5K</h1>
            <p className='text-sm text-richblack-400'>Active Student</p>
          </div>
          {/* Mentors */}
          <div>
            <h1 className='text-white font-semibold text-2xl'>10+</h1>
             
            <p className='text-sm text-richblack-400'>Mentors</p>
          </div>
             {/* courses */}
          <div>
            <h1 className='text-white font-semibold text-2xl'>200+</h1>
            <p className='text-sm text-richblack-400'>Courses</p>
          </div>
          {/* Awards */}
          <div>
            <h1 className='text-white font-semibold text-2xl'>50+</h1>
            <p className='text-sm text-richblack-400'> Awards</p>
          </div>
        </div>
     </section>

     {/* section 5 */}
     <section className='mt-10'>
      <LearningGrid></LearningGrid>
     </section>
     
      {/* section 6 */}
     <section className='mb-14'>
       <div className='text-center mb-10'>
       <h1 className='text-white text-2xl font-semibold'>Get in Touch</h1>
       <p className='text-richblack-400 text-sm'>We’d love to here for you, Please fill out this form.</p>
       </div>
        <ContactFormSection></ContactFormSection>
     </section>

     {/* section 7 */}
     <section className='mb-10'>
      <div className='text-richblack-5 text-center text-2xl font-semibold'>
        Reviews from other learners
         <ReviewSlider></ReviewSlider>
      </div>
     </section>

     {/* footer */}

     <div className='translate-x-8'>
      <Footer></Footer>
     </div>
    </div>
  )
}

export default About