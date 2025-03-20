const mongoose = require("mongoose");
 
const courseprogress = new mongoose.Schema({
   courseId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"course",
   },
   completedVideos:[
      {
    type:mongoose.Schema.Types.ObjectId,
    ref:"subsection",
   },
],
   
    


});
module.exports = mongoose.model("courseProgress",courseprogress);