const mongoose = require("mongoose");
const subsectionschema  = new mongoose.Schema({
   title:{
    type:String,
    required:true,
   },
   timeDuration:{
    type:String,

   },
   description:{
    type:String,
   },
   videoUrl:{
      type:String,
    
   },
});
module.exports = mongoose.model("subsection",subsectionschema);