const RatingAndReview = require("../models/RatingAndReview");
const course = require("../models/course");
const{mongo,default:mongoose} = require("mongoose");

//createRating
exports.createRating  = async(req,res)=>{
    try{
        // get user id     
        const userId  = req.User.id;
        // fetch data from req body
        const{Rating,Review,courseId}  = req.body;
        console.log("rating",Rating);
        console.log("review",Review);
        // check if user is enrolled or not  
        const courseDetails = await course.findOne({_id:courseId,
                    studentsEnrolled:{$elemMatch:{$eq:userId}},
        });

        console.log("courseDetails",courseDetails);
         if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"student is not enrolled in this course",
            });
         }  
        // check if user already reviewed tne course 
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });
       console.log("alreadyReview",alreadyReviewed);
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"course is already reviewd  by the user",
            });
        }
        //create rating and review
        const ratingReview = await RatingAndReview.create({

            user:userId,
             Rating,
             Review,
             course:courseId
              
        });
        console.log("rating and review",ratingReview);
        // update course with  this rating /review
  const updatedCourseDetails  = await course.findByIdAndUpdate({_id:courseId},{
               $push:{
                   ratingAndReview:ratingReview._id,
               }
        },{new:true});

        console.log("value of course",updatedCourseDetails);
        // return response
      return res.status(200).json({
        success:true,
        message:"Rating And Review created Successfully",
        ratingReview
      });

    }catch(error){
        console.log(error);
         return res.status(500).json({
               success:false,
               message:error.message,
         });
    }
}
 // getAverageRating
 exports.getAverageRating = async(req,res)=>{
    try{
            //get course id
            const courseId = req.body.courseId;
            // calculate avg rating
            const result = await RatingAndReview.aggregate([
                {
                    $match: {
                        course: new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: "$Rating" }, // Ensure "Rating" is correct
                    },
                },
            ]);
            
            
            
            console.log("value of result",result);
            // return length
            if(result.length >0){
                return res.status(200).json({
                    success:true,
                    averageRating:result[0].averageRating,
                })
            }

            // if no rating/Review exist
            return res.status(200).json({
                success:true,
                averageRating:0,
                message:"Average Rating is 0 ,no rating given till now",
            })
    }
    catch(error){
           console.log(error);
           return res.status(500).json({
              success:false,
              message:error.message,
           })
    }
 }

//  getall rating
 
exports.getAllRatingAndReview= async(req,res) =>{

    try{

        //    const rating = req.body;
            const allReviews  = await RatingAndReview.find({}).sort({Rating:"desc"})
                                       .populate({
                                        path:"user",
                                        select:"firstName lastName email image"
                                       })
                                       .populate({
                                        path:"course",
                                        select:"courseName",
                                       })
                                       .exec();

                                    // console.log("all reviews",allReviews);
                                       return res.status(200).json({
                                        success:true,
                                        message:"All review fetched successfully",
                                        data:allReviews,
                                       });
    }catch(error){
              console.log(error);
           return res.status(500).json({
            success:false,
            message:error.message,
           })   
    }
}


