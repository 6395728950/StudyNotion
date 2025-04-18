import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../Homepage/common/IconBtn";
import { useState } from "react";
import { changePassword } from "../../../services/operation/SettingsApi";
import { AiOutlineEyeInvisible,AiOutlineEye } from "react-icons/ai";




export default function UpdatePassword(){

    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();


    const [showNewPassword,setShowNewPassword] = useState(false);
    const [showoldPassword,setShowoldPassword] = useState(false);
    const[showconfirmPassword,setShowconfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{errors},


    } = useForm();

    const submitPasswordForm=async(data)=>{

        try{
            const response = await changePassword(token,data);
         
        }catch(error){
            console.log("ERROR MESSAGE - ", error.message)
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit(submitPasswordForm)}> 
                <div className=" flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 mt-6 text-richblack-5 ">
                    <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
                    <div   className="flex flex-col gap-5 ">
                        {/* old password */}
                         <div className="relative flex flex-col gap-2 " >
                              <label htmlFor="oldpassword" >
                                       Current Password
                              </label>
                            
                            <input
                            type={showoldPassword ? "text":"password"}
                             name="oldpassword"
                             id="oldpassword"
                             placeholder="Enter  your current password"
                             className="form-style text-white bg-richblack-700 rounded-md w-full h-10 border-b border-b-richblack-500 px-3"
                             {...register("oldpassword",{required:true})}
                              />
                                <span 
                                className="absolute right-3 top-[25px] z-[10] cursor-pointer mt-3 "
                                onClick={()=>setShowoldPassword((prev)=>!prev)}>
                                    {
                                        showoldPassword ?(<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />):(
                                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                        )
                                    }
                                </span>
                                {
                                    errors.oldpassword &&(
                                        <span  className="-mt-1 text-[12px] text-yellow-100" >
                                            Please enter your current password
                                        </span>
                                    )
                                }
                            
                         </div>


                         {/* new password */}

                         <div className="relative flex flex-col gap-2 "> 

                         <label htmlFor="newpassword" className="label-style" >
                                       New Password
                              </label>
                            
                            <input
                            type={showNewPassword ? "text":"password"}
                             name="newpassword"
                             id="newpassword"
                             placeholder="Enter  your New password"
                             className="form-style  text-white bg-richblack-700 rounded-md w-full h-10 border-b border-b-richblack-500 px-3"
                             {...register("newpassword",{required:true})}
                              />
                                <span 
                                className="absolute right-3 top-[25px] z-[10] cursor-pointer mt-3"
                                onClick={()=>setShowNewPassword((prev)=>!prev)}>
                                    {
                                        showNewPassword ?(<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />):(
                                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                        )
                                    }
                                </span>
                                {
                                    errors.newpassword &&(
                                        <span  className="-mt-1 text-[12px] text-yellow-100" >
                                            Please enter your New password
                                        </span>
                                    )
                                }
                            

                         </div>

                         {/* confirm new password */}

                         <div className="relative flex flex-col gap-2 " >
                              <label htmlFor="confirmpassword" >
                                       Confirm New Password
                              </label>
                            
                            <input
                            type={showconfirmPassword ? "text":"password"}
                             name="confirmpassword"
                             id="confirmpassword"
                             placeholder="Enter  your current password"
                             className="form-style  text-white bg-richblack-700 rounded-md w-full h-10 border-b border-b-richblack-500 px-3"
                             {...register("confirmpassword",{required:true})}
                              />
                                <span 
                                className="absolute  right-3 top-[25px] mt-3 z-[10] cursor-pointer "
                                onClick={()=>setShowconfirmPassword((prev)=>!prev)}>
                                    {
                                        showconfirmPassword ?(<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />):(
                                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                        )
                                    }
                                </span>
                                {
                                    errors.confirmpassword &&(
                                        <span  className="-mt-1 text-[12px] text-yellow-100" >
                                            Please enter your confirm new password password
                                        </span>
                                    )
                                }
                            
                         </div>
                    </div>
                </div>

            
                <div className=" flex gap-2 translate-x-3/4 mt-2" >
                    <button
                    onClick={()=>{
                        navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >Cancel

                    </button>
                    <div className=" w-20 h-10 rounded-md text-center font-semibold  ">
                    <IconBtn type="submit" text="save">

                   </IconBtn>
                    </div>
                </div>


            </form>
        </>
    )
}