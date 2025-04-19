import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import Button from '../Homepage/Button';
// import { apiconnector } from '../../../services/apiconnector';
// import { contactusEndpoint } from '../../../services/apis';
import CountryCode from "../../../data/countrycode.json"


const ContactFormSection = () => {
    const [loading,setloading] = useState(false);
    const submitContactForm = async(data)=>{
         console.log("Logging Data",data);
         try{
              setloading(true);
            //   const response =  await apiconnector("POST",contactusEndpoint.CONTACT_US_API);
              const response = {status:"ok"};
              console.log("Logging response",response);
              setloading(false);
         }catch(error){
                  console.log("Error",error.message);
                  setloading(false);

         }
    }
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm();
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",


            })
        }
    },[isSubmitSuccessful,reset]);
  return (
    <div className='text-white'>

     

        <form onSubmit={handleSubmit(submitContactForm)}>
              <div className='flex flex-col gap-8 w-[33%] mx-auto'>
              <div className='flex gap-5'>
                {/* firstName */}
                <div className='flex flex-col'>
                    <label htmlFor='firstname'>First Name</label>
                    <input type='text'
                      name='firstname'
                      id='firstname'
                      placeholder='Enter first name'
                      {...register("firstname",{required:true})} className='bg-richblack-700 text-richblack-5 rounded-md p-2 '></input>
                      {
                        errors.firstname &&(
                            <span>
                                Please enter Your name
                            </span>
                        )
                      }
                      </div>

                      {/* lastname */}
                      <div className='flex flex-col'>
                    <label htmlFor='lasttname'>Last Name</label>
                    <input type='text'
                      name='lastname'
                      id='lastname'
                      placeholder='Enter last name'
                      {...register("firstname")}  className='bg-richblack-700 text-richblack-5 rounded-md p-2 '></input>

                </div>
</div>
                {/* email */}
                <div className='flex flex-col'> 
                    <label htmlfor='name'>Email Address</label>
                    <input type='email'
                      name='name'
                      placeholder='Enter email Address'
                      {...register("email",{required:true})}
                      className='bg-richblack-700 text-richblack-5 rounded-md p-2 w-[450px] ' ></input>
                      {
                        errors.email &&(
                            <span>
                                Please Enter your email address
                            </span>
                        )
                      }
                </div>

                {/* phone no. */}

                <div className='flex flex-col gap-2 '>
                 <label htmlfor='phoneNumber'>Phone Number</label>
                 <div className='flex flex-row gap-4 '>
                    {/* dropdown */}
                    <div>
                        <select name='dropdown' id='dropdown' className='bg-richblack-700  w-14 rounded-md h-10'
                        {...register("countrycode",{required:true})}>
                            {
                             CountryCode.map((element,index)=>{
                                    return (
                                        <option key={index} value={element.code} className='bg-richblack-600 '>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                            </select>   
                        </div>

                        <div>
                            <input type='phonenumber'
                            name='phoneNumber'
                             id='phoneNumber'
                             placeholder='e.g:12345678'
                              className='bg-richblack-700 p-2  rounded-md w-[380px] '
                             
                              {...register("phoneNo",{
                                required:{value:true,message:"Please enter phone number"},
                                maxLength:{value:10,message:"invalid phoneNumber"},
                                minLength:{value:8,message:'invalid Phone Number'}

                              })}></input>
                        </div>
                        {
                            errors.phoneNo &&(
                                <span>
                                    {
                                        errors.phoneNo.message
                                    }
                                </span>
                            )
                        }
                 </div>
                    </div>
                {/* message */}
                <div className='flex flex-col'>
                    <label htmlfor='message'>Message</label>
                    <textarea name='message' id='message'
                      cols='30'
                      rows='7'
                      placeholder='Enter Your message Here'
                      {...register("message",{required:true})}  className='bg-richblack-700 text-richblack-5 rounded-md p-2 w-[450px] '>
           
                    </textarea>
                    {
                        errors.message &&(
                            <span>
                                please enter your message
                            </span>
                        )
                    }
                
               </div>
                 <button type='submit' className='bg-yellow-200 text-center  text-black p-2 rounded-md w-[450px]  '> Send Message</button>
              </div>
            </form> 
    </div>
  )
}

export default ContactFormSection