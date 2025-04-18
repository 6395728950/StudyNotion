const User = require("../models/User");
const Profile = require("../models/Profile"); 
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const  courseProgress = require("../models/courseProgress");
const{ convertSecondsToDuration }  =require("../utils/secToDuration");
const course = require("../models/course");

require("dotenv").config();
exports.updateProfile = async(req,res) =>{
    try{
       
        // get data
        const{dob="",about="",contactNumber,gender,firstName,lastName} = req.body;
        // console.log("value of DOB",dob);
        // console.log("value of phonenumber",contactNumber);
        // console.log("value of gender",gender);
        // console.log("value of about",about);
        // console.log("check this");
        // console.log("firstName",firstName);
        // console.log("lastName",lastName);

        // get userid
        const id = req.User.id;
        // console.log("value of id",id);
        // validation
        if(!id || !contactNumber ||!gender){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        // find profile
        console.log("welcome in userDetails");
        const userDetails = await User.findById(id);
         console.log("userDetails",userDetails);
        const profileId = userDetails.additionaldetails;
        console.log("profileId",profileId);
          const additionaldetails = await Profile.findById(profileId);
        //update profile
        additionaldetails.dateofbirth = dob;
        additionaldetails.phonenumber = contactNumber;
        additionaldetails.gender= gender;
        additionaldetails.about = about;

      
       await additionaldetails.save();
       console.log("hm yaha aa gaye hai");
        
        let email = userDetails?.email;
        let image = userDetails?.image;
        // return res
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            additionaldetails,
             lastName,
             firstName,
             email,
             image,
            
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
  console.log("me yaha aaya hu");
    try {
      console.log("me yaha pr bhi aaya hu");
      const displayPicture = req.files.displaypicture
      const userId = req.User.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log("value of image",image)
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
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path:"courses",
          populate:{
            path:"courseContent",
             populate:{
              path:"subsection",
             }
          }
        })
         .exec();

         console.log("check the userDetails",userDetails);
        userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subsection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subsection.length
		}
		let courseProgressCount = await courseProgress.findOne({
		  courseId: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }
         console.log("sb sahi hai");    
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
     
exports.instructorDashboard = async(req,res) =>{
  try{
         const courseDetails = await course.find({instructor:req.User.id});

        //  console.log("vlaue of course Data",courseDetails);
         const courseData = courseDetails.map((course) =>{
               const totalStudentEnrolled = course.studentsEnrolled.length
               const totalAmountGenerated  = totalStudentEnrolled*(course.Price)

               //create an new object with the additonal fields
               const courseDataWithStats = {
                _id:course._id,
                courseName:course.courseName,
                courseDescription:course.coursedesc,
                totalStudentEnrolled,
                totalAmountGenerated
               }
               return courseDataWithStats
  })
  res.status(200).json({
    courses:courseData
  });
  }catch(error){
     console.error(error);
     res.status(500).json({message:"Internal server Error"});
  }
}