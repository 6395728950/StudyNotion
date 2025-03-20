const User = require("../models/User");
const Profile = require("../models/Profile"); 
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
exports.updateProfile = async(req,res) =>{
    try{
       
        // get data
        const{dateofbirth="",about="",phonenumber,gender} = req.body;

        // get userid
        const id = req.User.id;
        // validation
        if(!id || !phonenumber ||!gender){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        // find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionaldetails;
          const profileDetails = await Profile.findById(profileId);
        //update profile
       profileDetails.dateofbirth = dateofbirth;
       profileDetails.phonenumber = phonenumber;
       profileDetails.gender= gender;
       profileDetails.about = about;
       await profileDetails.save();
        // return res
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            profileDetails,
        })
    }catch(error){
       return res.status(500).json({
        success:false,
        message:"something went wrong profile is not is updated ,please try again",
       });
    }
};
// deleteaccount
exports.deleteAccount = async(req,res) =>{
    try{
    // get id
     const id =req.User.id;
     // validation
     const userDetail  =await User.findById({_id:id});
     if(!userDetail){
        return res.status(404).json({
            success:false,
            message:"User Not found",
        });
     }
     // delete profile
     await Profile.findByIdAndDelete({_id:userDetail.additionaldetails});
     // delete user
     await User.findByIdAndDelete({_id:id});
     // TODO :HW unenroll user from all enroll course


     // return  response
      return res.status(200).json({
        success:true,
         message:"User Deleted successfully",
      })                                                                               

    }catch(error){
     return res.status(501).json({
        success:false,
        message:"something went wrong in deletion",
     });
    }
};


exports.getAllUserDetails = async(req,res) =>{
    try{
          // get id
          const id = req.User.id;

          //validation and get user details
          const userDetails = await User.findById(id).populate("additionaldetails").exec();
          if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Not found",
            });
          }


          // return res
          return res.status(200).json({
            success:true,
            message:"user data fetched successfully",
            data:userDetails

          });
    }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message,
            });
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.User.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.User.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec();
         console.log("check the userDetails",userDetails);
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   