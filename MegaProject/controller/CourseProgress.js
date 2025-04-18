 
 const courseProgress = require("../models/courseProgress")
 const subsection = require("../models/subsection")

 exports.updateCourseProgress = async(req,res)=>{
    const { courseId, subsectionId } = req.body;
const userId = req.User.id;

console.log("Value of courseId:", courseId);
console.log("Value of user:", userId);
console.log("Me yaha pr aa gaya hu");

try {
    // ✅ Check if the subsection exists
    const Subsection = await subsection.findById(subsectionId);
    if (!Subsection) {
        return res.status(404).json({ error: "Invalid Subsection" });
    }

    // ✅ Fix: Correctly search for CourseProgress using `courseId`
    const CourseProgress = await courseProgress.findOne({
        courseId: courseId, // Ensure it matches your schema
        userId: userId, // Ensure correct user
    });

    console.log("Value of CourseProgress:", CourseProgress);

    // ✅ If CourseProgress does not exist, create a new one (Optional)
    if (!CourseProgress) {
        console.log("No existing progress found, creating a new entry...");

        const newCourseProgress = await courseProgress.create({
            courseId,
            userId,
            completedVideos: [subsectionId], // Start with the current subsection
        });

        return res.status(201).json({
            success: true,
            message: "New Course Progress created and video marked as completed",
            data: newCourseProgress,
        });
    }

    // ✅ Ensure `completedVideos` is an array before using `.includes()`
    if (CourseProgress.completedVideos?.includes(subsectionId)) {
        return res.status(400).json({
            error: "Subsection is already completed",
        });
    }

    // ✅ Push into completedVideos array
    CourseProgress.completedVideos.push(subsectionId);
    
    // ✅ Save changes only if necessary
    await CourseProgress.save();

    return res.status(200).json({
        success: true,
        message: "Course Progress Updated Successfully",
    });
} catch (error) {
    console.error("Error updating Course Progress:", error);
    return res.status(500).json({
        error: "Internal server error",
    });
}

 }