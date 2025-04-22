const User = require("../models/User");
 
const mailsender = require("../utils/mailsender");
const bcrypt = require('bcryptjs');
const crypto = require("crypto");

// reset password token
 exports.resetpasswordtoken = async(req,res) =>{
    try{
    //get email from req ki body

    const {email} = req.body;

    // check user for this email
    const user = await User.findOne({ email: email });
    // validation
    if(!user){
        return res.status(403).json({
            success:false,
            message:"your email is not registered with us",
        });
    }
    //generate token
    const token = crypto.randomBytes(20).toString("hex");

    // update user by adding token and expiration time
    const updateDetails = await User.findOneAndUpdate({email:email},{
          token:token,
          resetpasswordExpires :Date.now()+5*60*1000,
    },{new:true});
    // create url
     const url = `http://local:4000/update-password/${token}`
    // send mail containing the url 
    await mailsender(email,"Password Reset Link",`password reset link: ${url}`);


    // return response
    return res.status(200).json({
        success:true,
        message:"Email sent successfully,please check email and change pwd",
    });
}
catch(error){
    console.log(error);
    return res.status(501).json({
        success:false,
        message:"something went wrong please try again",
    });
}
  


    
 }

// reset password
exports.resetpassword = async(req,res) =>{
    try{
    // data fetch
    const {password,confirmpassword,token} = req.body;
    //validation
     if(password!==confirmpassword){
        return res.status(401).json({
            success:false,
            message:"password and confirm password are not matching so please try again",
        });
     }
    // get user details from db using token 
    const userDetails = await User.findOne({token:token});
    // if no entry-invalid token
    if(!userDetails){
        return res.json({
            success:false,
            message:"token invalid",
        });
    }
    // token time check
    if(userDetails.resetpasswordExpires < Date.now()){
        return res.status(403).json({
            success:false,
            message:"token is expired please create a new token"
        });

    }
    // hash pwd
    const hashpassword  = await bcrypt.hash(password,10);
    // password update
    const user  = await User.findOneAndUpdate({token:token},{password:hashpassword},{new:true},);
    // return response
      return res.status(200).json({
        success:true,
        message:"password reset successfully ",
        user
      });

    }
    catch(error){
        return res.status(501).json({
            success:false,
            message:"something went wrong while sending reset pwd link",
        });
    }

}