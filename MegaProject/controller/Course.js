const Course =  require("../models/course");
const Category= require("../models/category");
const User = require("../models/User");
const {uploadImageToCloudinary }= require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const Subsection = require("../models/subsection");
const CourseProgress = require("../models/courseProgress");

const  Section = require("../models/section");
const mongoose = require("mongoose");
 


// createcourse handler function
exports.createcourse = async(req,res) =>{
    try{
      // get userid from requeset object
      
      //  fetch data
      let{courseName ,
        coursedesc,
        whatYouwillLearn,
        Price,
        category,
        status,
        tag,
        instructions:_instructions,

      } = req.body;
      // get thumbnail
      const thumbnail = req?.files?.thumbnail;
      console.log("what is the value of_tag",tag);
      // convert the tag and instructions from stringified Array to Array
      // let tag;
// try {
//     if (_tag && typeof _tag === "string") {
         
//         tag = JSON.parse(_tag);
//     } else {
//         tag = []; // Set a default empty array if _tag is undefined or not a string
//     }
// } catch (error) {
//     console.error("Invalid JSON string for tags:", _tag, error);
//     tag = []; // Fallback to empty array in case of JSON parsing failure
// }
      const instructions  = JSON.parse(_instructions);
      console.log("coursedesc ki value",coursedesc);

      // validation
      if(!courseName || 
        !Price ||
        !category  ||
        !coursedesc || 
        !whatYouwillLearn || 
        !thumbnail || 
        !tag.length||
        !instructions.length){
        return res.status(400).json({
            success:false,
            message:"All fields are required",
        });
      }
      if(!status || status === undefined){
        status = "Draft";
      } 
      //check for instructor
      const userId = req.User.id;
      const instructorDetails = await User.findById(userId,{
        accountType:"Instructor",
      });
      //TODO:verify the userid and instructorid are different or same
      console.log("Instructor Details:",instructorDetails);
      if(!instructorDetails){
        return res.status(401).json({
            success:false,
            message:"instructor is not found",
        });
      }
      // check given tag is valid or not
      const categorydetails = await Category.findById(category);

      if(!categorydetails){
        return res.status(404).json({
            success:false,
            message:" category details is not found",
        });
      }
      console.log("category details:",categorydetails);

      // upload image to cloudinary
      const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
      // create an entry for newcourse
      const newCourse = await Course.create({
        courseName,
        coursedesc,
        instructor:instructorDetails._id,
        whatYouwillLearn:whatYouwillLearn,
        Price,
       tag,
        category: categorydetails._id,
       thumbnail:thumbnailImage.secure_url,
        status:status,
        instructions,
      })
      // add the new course to the user schema of instructor
      await User.findByIdAndUpdate({_id:instructorDetails._id,},{
        $push:{
            courses:newCourse._id,
        }
      },{new:true});

      // update the tag schema
      //TODO:home work
      // Add the newcourse to the categories
     const categoryDetails2 = await Category.findByIdAndUpdate({_id:category},{
        $push:{
             course:newCourse._id,
        },
      },{new:true})

      // return res
      return res.status(200).json({
        success:true,
        message:"NewCourse created successfully",
        data:newCourse,
      });


    }catch(error){
         console.log(error);
         return res.status(501).json({
            success:false,
            message:"error occured creation of new  course",
            error:error.message,
         });
    }
}






// getallcourse handler function

exports.showAllcourse = async(req,res) =>{
    try{
         const allcourses = await Course.find({status:"Published"},{courseName:true,
                                                coursedesc:true,
                                                Price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                RatingAndReview:true,
                                                studentEnrolled:true,
                                                
         }).populate("instructor").exec();
         return res.status(200).json({
            success:true,
            message:'Data fetch successfully for all courses',
            data:allcourses,
         })
    }catch(error){
           console.log(error);
           return res.status(500).json({
            success:false,
            message:"cannot fetch course data",
            error:error.message,
           });
    }
}

// get course details
exports.getCourseDetails = async(req,res) =>{
  try{
     // get id  
     const{courseId}  =req.body;
     // find course details

     const courseDetails = await Course.findOne({_id:courseId}).populate({
            path:"instructor",
            populate:{
              path:"additionaldetails",
            },
     })
     .populate("category")
     .populate("ratingAndReview")
     .populate({
        path:"courseContent",
        populate:{
          path:"subsection",
          select:"-videoUrl",
        },
     }).exec();

     // validation
     if(!courseDetails){
      return res.status(400).json({
        success:false,
        message:`Could not find the course with ${courseId}`,
      });
     }


     let totalDurationInSeconds =0;
     courseDetails.courseContent.forEach((content)=>{
      content.subsection.forEach((subsection)=>{
        const timeDurationInSeconds = parseInt(subsection.timeDuration)
        totalDurationInSeconds+=timeDurationInSeconds
      })
     })
     const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
     // return response
     return res.status(200).json({
      success:true,
      message:"Course Details Fetched Successfully",
      data:
      {courseDetails,
        totalDuration,
      },
     })

  }catch(error){
       console.log(error);
       return res.status(500).json({
        success:false,
        message:error.message,
       });
  }
}

// get full course details

exports.getFullCourseDetails = async(req,res)=>{

  try{
    const{courseId} = req.body
    const userId = req.User.id
     
    const data = await Course.findOne({
      _id:courseId,
    })
    .populate({
      path:"instructor",
      populate:{
        path:"additionaldetails",
      },
    })
    .populate("category")
    .populate("ratingAndReview")
    .populate({
      path:"courseContent",
      populate:{
        path:"subsection"
      },
    }).exec();
    // console.log("check courseDetails value:",courseDetails);

    let courseProgressCount = await CourseProgress.findOne({
      courseId:courseId,
      userId:userId,

    })
    console.log("courseProgressCount : ", courseProgressCount)
    if(!data){
      return res.status(400).json({
        success:false,
        message:`could not find course with id: ${courseId}`,
      })
    }


    let totalDurationInSeconds =0;
    data.courseContent.forEach((content)=>{
     content.subsection.forEach((subSection)=>{
       const timeDurationInSeconds = parseInt(subSection.timeDuration)
       totalDurationInSeconds+=timeDurationInSeconds
     })
    })
    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    // return response
    return res.status(200).json({
     success:true,
     message:"Course Details Fetched Successfully",
     data:
     {data,
       totalDuration,
       completedVideos:courseProgressCount?.completedVideos
       ?courseProgressCount?.completedVideos:[],
     },
    })

    
  }catch(error){
        return res.status(500).json({
          success:false,
          message:error.message,
        })
  }
}


// get a list of course for a given instructor

exports.getInstructorCourses = async(req,res)=>{
  try{
       // Get the instructor ID from the authenticated user or request body
        
       const instructorId = req.User.id

       // find all courses belonging to the instructor
       const instructorCourses = await Course.find({
        instructor:instructorId,

       }).sort({createdAt:-1}).populate("instructor").populate({
        path: "courseContent",
        populate: {
            path: "subsection",
        },
    }).exec();
     
    // console.log("check instructor course inside the course",instructorCourses);

       // Return the instructor's courses
       res.status(200).json({
        success:true,
        data:instructorCourses,
       })

  }catch(error){
 console.log(error)
 res.status(500).json({
  success:false,
  message:"Failed to retrieve instructor courses",
  error:error.message,
 })
  }
}

// Delete the courses


exports.deleteCourse = async(req,res)=>{
 try{
     const {courseId} = req.body
      console.log("courseId of course which one is deleted",courseId);
     // Find the course
     const course = await Course.findById(courseId)
     if(!course){
      return res.status(404).json({
        message:"course not found"
      })
     }

     // unenroll students from the courses

     const studentsEnrolled = course.studentsEnrolled

     for(const studentId of studentsEnrolled){
      await User.findByIdAndUpdate(studentId,{
        $pull:{
          courses:courseId
        },
      })
     }

     // Delete sections and sub-sections
     const courseSections = course.courseContent
     for(const sectionId of  courseSections){
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if(section){
        const subsections = section.subsection
        for(const subsectionId of subsections){
          await Subsection.findByIdAndDelete(subsectionId)
        }
      }

      // delete the section
      await Section.findByIdAndDelete(sectionId)

     }
    // now you can delete the course

    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success:true,
      message:"course deleted successfully",
    })



 }catch(error){
    console.error(error)
    return res.status(500).json({
      success:false,
      message:"Server error",
      error:error.message,
    })
 }
}

exports.editCourse = async(req,res)=>{
  try{
   

    const{courseId,status,Price,courseName,coursedesc,whatYouwillLearn,category, tag,
      instructions} = req.body;
    //  console.log("value of price",Price);
    
    //  console.log("check course name",courseName);
    //  console.log("check course id in editcourse",courseId);
    //  console.log("check updates in editcourse",status);
      // console.log("value of courseId",courseId);


       
      //  console.log("vlaue of instructions",_instructions);
      //  console.log("check type of instructions",typeof _instructions);
    
      // const instructions = typeof _instructions === "string" && _instructions.trim() ? JSON.parse(_instructions) : {};
      // const tag = typeof _tag === "string" && _tag.trim() ? JSON.parse(_tag) : {};
      // console.log("check the tag",tag);
      console.log("check the value of tag",tag);
      console.log("here we also check the type of tag",typeof tag);
      const course = await Course.findById(courseId)
      
      if(!course){
        
       return res.status(404).json({
         error:"Course not found"
          
       })
      }
      let categoryId = category?._id ? category._id.toString() : category?.toString().trim();

      // Log category to debug
      // console.log("Received category:", category);
      // console.log("Category ID:", categoryId);
      
      // Validate ObjectId
      if (categoryId  && mongoose.Types.ObjectId.isValid(categoryId)) {
          // console.error("Invalid category ID:", categoryId);
          // return res.status(400).json({ error: "Invalid category ID" });
          const categorydetails = await Category.findById(categoryId);
          console.log("Category details:", categorydetails);
          
          if (categorydetails) {
              course.category = categorydetails._id;
          }
          
      }

      
      // Fetch category details safely
      
      if (Price !== undefined && Price !== "" && !isNaN(Price)) {
        course.Price = Number(Price);
    } else {
        console.error("Invalid price value:", Price);
    }
            if(courseName!==undefined){
              course.courseName = courseName;

            }
            if(coursedesc!=="undefined"){
              course.coursedesc = coursedesc;
            }
            if(whatYouwillLearn!=="undefined"){
              course.whatYouwillLearn = whatYouwillLearn;
            }
            
            
              // if (instructions.length>0) {
              
              //         Course.instructions = instructions
                    
              // }
          
              // if (tag.length>0) {
                  
              //         Course.tag = tag;
                  
              // }
              async function updateCourseInstructions(courseId, instructions) {
                try {
                    let instructionsArray = instructions.split(",").map(item => item.trim());
            
                    // Fix: Use findByIdAndUpdate to avoid version conflicts
                    const updatedCourse = await Course.findByIdAndUpdate(
                        courseId,
                        { $set: { instructions: instructionsArray } },
                        { new: true, runValidators: true }
                    );
            
                    if (!updatedCourse) {
                        console.log("Course not found");
                        return;
                    }
            
                    console.log("Updated Course:", updatedCourse);
                    return updatedCourse;
                } catch (error) {
                    console.error("Error updating course:", error);
                }
            }
            async function updateCourseTags(courseId, tagString) {
              try {
                  let tagsArray;
          
                  // Step 1: Ensure tagString is a valid JSON array or convert it to an array
                  if (typeof tagString === "string") {
                      try {
                          tagsArray = JSON.parse(tagString);
                      } catch (error) {
                          console.error("Invalid JSON string for tags:", tagString);
                          return null; // Return null if parsing fails
                      }
                  } else if (Array.isArray(tagString)) {
                      tagsArray = tagString; // Already an array, use as is
                  } else {
                      console.error("Invalid input type for tags:", tagString);
                      return null;
                  }
          
                  // Step 2: Ensure all elements are strings and clean them
                  tagsArray = tagsArray
                      .filter(tag => typeof tag === "string") // Remove non-string values
                      .map(tag => tag.trim().replace(/^"|"$/g, "")); // Remove surrounding quotes
          
                  // Step 3: Update the course with the cleaned tags
                  const updatedCourse = await Course.findByIdAndUpdate(
                      courseId,
                      { $set: { tag: tagsArray } },
                      { new: true, runValidators: true }
                  );
          
                  if (!updatedCourse) {
                      console.log("Course not found");
                      return null;
                  }
          
                  console.log("Updated Course Tags:", updatedCourse.tag);
                  return updatedCourse.tag;
              } catch (error) {
                  console.error("Error updating course tags:", error);
                  return null;
              }
          }
          

          async function handleCourseinstructions(courseId, instructions) {
            if(instructions?.length>0){
              try{
               const updatedinstructions = await updateCourseInstructions(courseId,instructions).instructions;
                if(updatedinstructions.length>0){
                  course.instructions = updatedinstructions;
                }else{
                  console.error("Error:No valid instructions returned.");
                }
              }catch(error){
                      console.log("Failed to updated course instructions",error);
              }
            

             }
             else{
              console.error("Error:instructions is undefined or empty.");
             }
            }
    await handleCourseinstructions(courseId,instructions)
             async function handleCourseTags(courseId, tag) {
              if (tag?.length > 0) {
                  try {
                      const updatedTags = await updateCourseTags(courseId, tag);
                      if (updatedTags.length > 0) {
                          course.tag = updatedTags;
                      } else {
                          console.error("Error: No valid tags returned.");
                      }
                  } catch (error) {
                      console.error("Failed to update course tags:", error);
                  }
              } else {
                  console.error("Error: Tag is undefined or empty.");
              }
          }
          
          // Call the function
          await handleCourseTags(courseId, tag);
          
     

     // If thumbnail Image is found ,update it

  // console.log("check the image path",req.files?.thumbnail);
     if(req.files){
      console.log("thumbnail update  with this image",req.files.thumbnail);
      const thumbnail  = req.files.thumbnail;
      const thumbnailImage  = await uploadImageToCloudinary(
         thumbnail,
         process.env.FOLDER_NAME
      )
      // console.log("check thumbnailimage",thumbnailImage);
      course.thumbnail = thumbnailImage.secure_url

      // Update only the fields that are presesnt in the request body
      for(const key in status){
        if(status.hasOwnProperty(key)){
          if(key==="tag" || key==="instructions"){
            course[key] = JSON.parse(status[key])
          }else{
            course[key] = status[key]
          }
        }
      }
     }
    //  console.log("course is updated successfully")
     await course.save()

     const updatedCourse = await Course.findById(courseId)
     .populate({
         path: "instructor",
         populate: {
             path: "additionaldetails",
         },
     })
     .populate("category")
     .populate("ratingAndReview")
     .populate({
         path: "courseContent",
         populate: {
             path: "subsection",
         },
     });
  //  console.log("updatedcourse in eedit course",updatedCourse);
     res.json({
      success:true,
      message:"Course updated successfully",
      data:updatedCourse,
     })
  }catch(error){

     console.error(error)
     res.status(500).json({
      success:false,
      message:"Internal server error",
      error:error.message,
     })
  }
}