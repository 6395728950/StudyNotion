import React from 'react'
import ContactDetails from '../components/core/contactus/ContactDetails'
import ContactFormSection from '../components/core/aboutpage/ContactFormSection'
import Footer from '../components/core/Homepage/common/footer';
import ReviewSlider from '../components/core/Homepage/common/ReviewSlider';
const Contactus = () => {
  return (
    <div>

      {/* section 1 */}

      <section className='w-11/12 mt-10 ml-20 mb-20'>

        <div className='flex gap-6'>
            {/* left part */}
            <div className='w-[25%]'>
            <ContactDetails></ContactDetails>
            </div>
             
            {/* right part */}
            <div className='flex flex-col w-[70%] '>
                     <h1 className='text-richblack-5 font-semibold text-2xl ml-72 w-[45%]'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                     <p className='text-richblack-400 text-sm ml-72  mb-6 '>Tall us more about yourself and what you’re got in mind.</p>

                     <ContactFormSection></ContactFormSection>
                </div>
        </div>
      </section>
{/* 
      section 2 */}

      <section className='mb-10'>
        <h1 className='text-richblack-5 text-center text-2xl font-semibold'>Reviews from Other learners</h1>
        <ReviewSlider></ReviewSlider>
      </section>
         <div className='translate-x-8'>
         <Footer></Footer>
         </div>
       
    </div>
  )
}

export default Contactus