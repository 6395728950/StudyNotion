const mongoose = require("mongoose");
const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    Rating:{
        type:Number,
        required:true,
    },
    Review:{
          type:String,
          required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"course",
        index:true,
    },
});
module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema);