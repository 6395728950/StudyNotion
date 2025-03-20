const mongoose = require("mongoose");
const mailsender = require("../utils/mailsender");
const emailTemplate = require("../mail_templates/EmailVerificationTemplate");
const otpschema= new mongoose.Schema({
    otp:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,

    },
    createdat:{
        type:Date,
        default:Date.now(),
        expire:60*5,

    },

});
// a function -> to send mail

async function sendVerificatiomEmail(email,otp){
    try{
     const mailResponse = await mailsender(email,"verification email from studynotion",emailTemplate(otp));
     console.log("email sent successfully:" ,mailResponse);
    }
    catch(error){
      console.log("error occurred during sending mail:",error);
      throw error;
    }
}

// premiddleware
otpschema.pre("save",async function(next) {
    if(this.isNew){
  await sendVerificatiomEmail(this.email,this.otp);
    }
  next();

});

module.exports = mongoose.model("OTP",otpschema);