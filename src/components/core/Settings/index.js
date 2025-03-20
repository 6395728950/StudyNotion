  import UpdatePassword from "./UpdatePassword"
import DeleteAccount from "./DeleteAccount"
import { Editprofile } from "./Editprofile"
 
import UpdateProfilePicture from "./UpdateProfilePicture"
 



export default function Settings(){
     
    return(
        <>
        <div className="w-[70%] flex mx-auto flex-col">
        <h1 className="mb-10 text-3xl font-medium text-richblack-5 -translate-x-6 mt-4 ">
    Edit Profile
    </h1>

       {/* Change Profile Picture */}
       < UpdateProfilePicture/>
      {/* Profile */}
      <Editprofile />
      {/* Password */}
      <UpdatePassword/>
      {/* Delete Account */}
      <DeleteAccount />

      </div>
      </>

        

     
    )
    
}