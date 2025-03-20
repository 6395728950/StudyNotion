import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import IconBtn from "../Homepage/common/IconBtn";
import { updateProfile } from "../../../services/operation/SettingsApi";


const genders = ["male","female","Non-Binary","Perfer Not to say","Other"]
export function Editprofile (){
    const {token} = useSelector((state)=>state.auth);
    const{user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState:{errors},


    } = useForm();

    const submitProfileForm =async(data)=>{
        try{
              dispatch(updateProfile(token,data))
        }catch(error){
            console.log("ERROR MESSAGE - ", error.message)
        }

    }

    return (
    <>
    <form onSubmit={handleSubmit(submitProfileForm)}>

        {/* Profile Information */}
        <div className="bg-richblack-800 mt-8 px-8 pt-5  flex flex-col gap-2 text-richblack-200 mb-6 pb-6">
            <h2 className="text-lg font-semibold text-richblack-5">
                Profile Information
            </h2>

            {/* first name */}

            <div className="flex flex-col gap-5 lg:flex-row">
                <div  className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="firstname">
                        First Name
                    </label>
                    <input
                     type="text"
                     name="firstname"
                     id="firstname"
                     placeholder="Enter your First Name"
                     className="form-style bg-richblack-700 h-10 border-b-2 py-auto px-2 border-b-white rounded-md   text-richblack-5"
                     {...register("firstName",{required:true})}
                     defaultValue={user?.firstName}

                    />
                    {
                        errors.firstName &&(
                            <span  className="-mt-1 text-[12px] text-yellow-100">Please enter your first name</span>
                        )
                    }
                </div>

                {/* last name */}
                <div  className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="lastname">
                        Last Name
                    </label>
                    <input
                     type="text"
                     name="lastname"
                     id="lastname"
                     placeholder="Enter your Last Name"
                     className="form-style  bg-richblack-700 h-10 border-b-2 py-auto px-2 border-b-white rounded-md  text-richblack-5"
                     {...register("lastName",{required:true})}
                     defaultValue={user?.lastName}

                    />
                    {
                        errors.firstName &&(
                            <span  className="-mt-1 text-[12px] text-yellow-100">Please enter your last name</span>
                        )
                    }
                </div>
                </div>
                

                  {/* Date ofBirth */}
                <div className="flex flex-col gap-5 lg:flex-row">
                <div  className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="dob">
                        Date of Birth
                    </label>
                    <input
                     type="date"
                     name="dob"
                     id="dob"
                     placeholder="dd-mm-yyyy"
                     className="form-style  bg-richblack-700 h-10 border-b-2 py-auto px-2 border-b-white rounded-md  text-richblack-5"
                     {...register("dob",{
                        required:{
                            value:true,
                            message:"Please enter your date od birth",
                        },
                        max:{
                            value:new Date().toISOString().split("T")[0],
                            message:"Date of Birth can not be in the future",
                        },
                    })}
                     defaultValue={user?.additionalDetails?.dateOfBirth}

                    />
                    {
                        errors.dateOfBirth&&(
                            <span  className="-mt-1 text-[12px] text-yellow-100">{errors.dateOfBirth.message}</span>
                        )
                    }
                </div>

                {/* gender */}

                <div  className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="gender" className="label-style">
                      Gender
                    </label>
                    <select
                     type="text"
                     name="gender"
                     id="gender"
                      
                     className="form-style  bg-richblack-700 h-10 border-b-2 py-auto px-2 border-b-white rounded-md  text-richblack-5"
                     {...register("gender",{required:true})}
                     defaultValue={user?.additionalDetails?.gender}

                    >
                        {
                             
                        genders.map((element,index)=>{
                            return (
                                <option key={index} value={element}>
                                    {element}

                                </option>
                            )
                        })
                             
                        }
                    </select>
                    {
                        errors.gender&&(
                            <span  className="-mt-1 text-[12px] text-yellow-100">Please select your gender</span>
                        )
                    }
                </div>
                </div>

            


            {/* contact number */}

            <div className="flex flex-col gap-5 lg:flex-row">
                <div  className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="contactNumber" className="label-style">
                        Contact Number
                    </label>
                    <input
                     type="tel"
                     name="contactnumber"
                     id="contactnumber"
                     placeholder="Enter Contact Number"
                     className="form-style  bg-richblack-700 h-10 border-b-2 py-auto px-2 border-b-white rounded-md  text-richblack-5"
                     {...register("contactnumber",{
                        required:{value:true,
                            message:"please enter your contact number",
                        },
                        maxLength:{
                            value:12,
                            message:"Invalid contact Number",
                        },
                        minLength:{value:10,
                            message:"Invalid Contact Number"
                        },
                    })}

                     defaultValue={user?.additionalDetails?.contactNumber}

                    />
                    {
                        errors.contactNumber&&(
                            <span  className="-mt-1 text-[12px] text-yellow-100">{errors.contactNumber.message}</span>
                        )
                    }
                </div>

                  {/* about */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style  bg-richblack-700 h-10 border-b-2 py-auto px-2   rounded-md border-b-white text-richblack-5"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
                </div>
                </div>

                {/* make save and cancel button */}

                <div className=" flex gap-2 translate-x-3/4">
                    <button
                    onClick={()=>{
                        navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >Cancel

                    </button>
                    <div className="bg-yellow-200 w-20 h-10 rounded-md text-center font-semibold pt-2 ">
                    <IconBtn type="submit" text="save">

                   </IconBtn>
                    </div>
                </div>
    </form>
    
    </>
    )


}