const mongoose = require("mongoose");

const Categoryschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
    },
    course:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",

      },
    ],
});
module.exports = mongoose.model("Category",Categoryschema);