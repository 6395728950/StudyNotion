const mongoose = require('mongoose')
const Section = require("../models/section");
const Course = require("../models/course");
const subsection = require("../models/subsection");

exports.createSection = async(req,res) =>{
 
    // console.log("cousrse ki id in section",courseId);
     
    
    try{
         // fetch the data
         const {sectionName,courseId} = req.body;

         // data validation
         if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing properties",
            });
         }
          
         // create section
         const newSection = await Section.create({
            sectionName
         });
         console.log("new section :",newSection);
         // update courese with section objectid
          
         const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true }
        ).populate({
                     path: "courseContent",
                      populate: {
                     path: "subsection",
            },
        })
         .exec();
         //Hw: use populate to replace section/subsection both in the updatedcoursdetails 

         // return response
         return res.status(200).json({
            success:true,
            message:"section added successfully",
            data:updatedCourseDetails,
            

         });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create section , please try again",
            error:error.message,
        });

    }
};
exports.updateSection = async(req,res) =>{
    try{
        // data input
        
        const {sectionName,sectionId,courseId} = req.body;
        //  console.log("sectionName",sectionName);
        //  console.log("sectionId",sectionId);
        //  console.log("courseId", courseId);
       
        
        // update data
          
        const updatesection = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true},);
        // console.log("me yaha tk aa gaya hu");
        // console.log("updatesection data",updatesection);
        // console.log("course id",courseId);
        // console.log("data of  course",course);
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            throw new Error("Invalid Course ID");
        }
       
      
       
       
               const updatedCourseDetails = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subsection",
                },
            })
            .exec();
        // console.log("tum yaha pr nhi pa rahe ho");
        // rerturn res
        return res.status(200).json({
            success:true,
             data:updatedCourseDetails,
            message:"update section successfully"
           
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create section , please try again",
            error:error.message,
        });
    }
};

exports.deleteSection = async(req,res) =>{
    try {
         
		const { sectionId, courseId }  = req.body;
        // console.log("what is value of courseId",courseId);
        // console.log("what is value of sectionId",sectionId);
           
		const deletedata = await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			},
            
		},{new:true})
        console.log("data of delete",deletedata);
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await subsection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subsection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});





		//HW -> req.params -> test
	 
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};