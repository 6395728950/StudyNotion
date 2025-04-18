const mongoose = require("mongoose");
 
const courseprogress = new mongoose.Schema({
   courseId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"course",
   },
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
   },
   completedVideos:[
      {
    type:mongoose.Schema.Types.ObjectId,
    ref:"subsection",
   },
],
})
module.exports = mongoose.model("courseProgress",courseprogress);