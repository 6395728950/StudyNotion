const mongoose = require('mongoose');
const Subsection = require("../models/subsection");
const Section = require("../models/section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();
// create subsection

exports.createSubSection= async(req,res) =>{
    try{
        // fetch data from req body
        console.log("aao tumara swagat hai");
        const{title,description,sectionId} = req.body;
        // extract file/video
        console.log(req.files,req.file);
        const {video} = req?.files;
        console.log("mujhe video nhi mili hai")
        console.log("video:",video);
        //validation
        if(!title || !description || !sectionId || !video){
               return res.status(401).json({
                 success:false,
                 message:"all field are required",
               });
        }
        //upload video to cloudinary
         console.log("before uploadDetails");
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
         console.log("after uploadDetails");
        console.log("uploadDetails:",uploadDetails);
        //  create a sub section
        const SubSectionDetails = await Subsection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        console.log("Subsection:", SubSectionDetails)
        // update section with this subsection object id
        const updatesection = await Section.findByIdAndUpdate({_id:sectionId},{
            $push:{
                subsection:SubSectionDetails._id,
            }
        },{new:true})
        .populate("subsection")
        // HW:log updated section here ,after adding populate query
        console.log("updated section:",updatesection);

        // return res
        return res.status(200).json({
             success:true,
             data:updatesection,
             message:"sub section create successfuly",
          
        });

         }catch(error){
           
        return res.status(500).json({
            
            success:false,
            message:"Internal server Error aayi hai",
            error:error.message,
        });
    }
};
// HW: updateSubsection

exports.updatesubsection = async(req,res) =>{
    try{
        const{sectionId,title,description,subsectionId}  = req.body;
        console.log("check subsection id in subsection",subsectionId);
        console.log("check section id",sectionId);
        console.log("check the title",title);
        console.log("check the description",description);
        const subSection = await Subsection.findById(subsectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"subsection not found",
            })
        }
        if(title!==undefined){
            subSection.title= title
        }
        if(description!==undefined){
            subSection.description = description
        }
        if(req.files && req.files.video!==undefined){
             const video  =req.files.video;
             const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)

             subSection.videoUrl = uploadDetails.secure_url;
             subSection.timeDuration = `${uploadDetails.duration}`



        }
         
         await subSection.save();

         const updatedsection =await Section.findById(sectionId).populate("subsection");
         console.log("updatedsectiondata in backend",updatedsection);

       
      return res.json({
        success: true,
         data:updatedsection,
        message: "subSection updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
}


// HW:deleteSubsection
exports.deleteSubsection = async(req,res) =>{
    try{
    
    // get the id from req.params
    // console.log("me deletesubsection me aaya hu");
           const {subsectionId,sectionId} = req.body;
           // before delete the subsection upadated the section
           await Section.findByIdAndUpdate({_id:sectionId},{
            $pull:{
                subsection:subsectionId
            },
             
           })
           // delete the subsection
          const subsection =  await Subsection.findByIdAndDelete({_id:subsectionId});
             const updatedsection =await Section.findById(sectionId).populate("subsection");
             console.log("what is value of updatedsection",updatedsection);
          if(!subsection){
            return res
            .status(404).
            json({success:false,
              message:"subsection not found"});
              
          }
           return  res.status(200).json({
            success:true,
            data:updatedsection,
            message:"sub section is deleted successfully",
           });
    }catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while deleting the SubSection",
        })
      }
}