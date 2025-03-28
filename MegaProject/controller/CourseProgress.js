 
 const courseProgress = require("../models/courseProgress")
 const subsection = require("../models/subsection")

 exports.updateCourseProgress = async(req,res)=>{
    const {courseId,subsectionId} = req.body;
    const userId = req.User.id;

    console.log("me yaha pr aa gaya hu");
    try{
        //check if the subsection is valid
    const Subsection = await subsection.findById(subsectionId);
    if(!Subsection){
        return res.status(404).json({error:"invalid Subsection"});
    }
    // check for old entry
    let courseprogress = await courseProgress.findOne({
        courseID:courseId,
        userId:userId,
    });
    if(!courseprogress){
        return res.status(404).json({
            success:false,
            message:"Course Progress does not exist"
        });
    }else{

        // check for re-completing video/subsection
        if(courseprogress.completedVideos.includes(subsectionId)){
            return res.status(400).json({
                error:"Subsection is already completed"
            })
        }
        // push into completed video
        courseprogress.completedVideos.push(subsectionId);
    }
    await courseprogress.save();
    return res.status(200).json({
        success:true,
        message:"Course Progress Updated Successfully",
    })
    }catch(error){
        console.error(error);
        return res.status(400).json({
            error:"Internal server error"
        });
    }
 }