const mongoose = require("mongoose");
 
const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
    },
    coursedesc:{

        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",

    },
   whatYouwillLearn:{
    type:String,
   },
   courseContent:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
    
   },],
   ratingAndReview:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReview",
   }],
   Price:{
    type:Number,
   },
   thumbnail:{
    type:String,
   },
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
   },
   studentsEnrolled:[
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        
        ref:"User",
    },
   ],
   tag:{
    type:[String],
    required:true,
   },
   instructions:{
    type:[String],
    
   },
   status:{
    type:String,
    enum:["Draft","Published"],
   },
   createdAt:{
    type:Date,
    default:Date.now
   },

});
module.exports = mongoose.model("course",courseSchema);