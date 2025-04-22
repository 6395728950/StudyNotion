const Profile = require("../models/Profile");
const User = require("../models/User");
const OTP = require("../models/otp")
const otpgenerator = require("otp-generator");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();
 const mailsender = require("../utils/mailsender")
// send otp
exports.sendOTP=  async(req,res) =>{
    try{
    // fetch email from request ki body
    const {email} = req.body;
    // check if user is already exist
    const checkUserPresent = await User.findOne({email});

    // if user already exist
    if(checkUserPresent){
        return res.status(401).json({
           success:false,
           message:"user already registered",
        }) 
    }
    // generate otp
    var otp = otpgenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    console.log("otp generated:",otp);
    // check unique otp or not
    let result = await OTP.findOne({otp:otp});

    while(result){
        otp = otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        result = await OTP.findone({otp:otp}); 

    }

const otpPayload = {email,otp};
// create an entry for otp
const otpBody =   await OTP.create(otpPayload);
console.log(otpBody);
// return response successfully
res.status(200).json({
    success:true,
    message:"otp sent successfully ",
    otp,
})

}
catch(error){
    console.log(error);
 return res.status(402).json({
    success:false,
    message:"otp not generated",

 })
}
};     


// sign up
exports.signup   = async (req,res) =>{
    try{
    // data fetch from request ki body
    const{accountType,
        firstName,
        lastName,
         password,
        confirmPassword,
        email,
       otp} = req.body;
    // validate krlo

    //  console.log("accountType",accountType);
    //  console.log("firstName",firstName);
    //  console.log("lastname",lastName);
    //  console.log("email",email);
    //  console.log("password",password);
    //  console.log("confirmpassword",confirmPassword);
    //   console.log("otp",otp);

 if(!firstName || !lastName || !email || !password || !confirmPassword || !otp ||!accountType){
        return res.status(403).json({
            success:false,
            message:"All fields are required",
        })
    }
    
    // dono password match krlo
    if(password!== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"password and confirmpassword value does not match",
        });
    }

    // check user already exist or not
     const existinguser  = await User.findOne({email});
     if(existinguser){
        return res.status(402).json({
            success:false,
            message:"user is already exist",
        });
     }
    // find most recent otp stored for the user
    const recentotp = await OTP.find({email}).sort({createdat:-1}).limit(1);
    console.log("value of recentOtp",recentotp);

    // validate otp
    if(recentotp.length==0){
        return res.status(400).json({
            success:false,
            message:"Invalid otp",
        })
    }else if(otp!==recentotp[0].otp){
      return res.status(400).json({
        success:false,
        message:"otp not match",
      });
    } 
    //hash password
    const hashedpassword  =await bcryptjs.hash(password,10);
              // create the user

              let approved="";
              approved==="Instructor" ?(approved=false):(approved=true)
    // entry create in db
    const profileDetails = await Profile.create({
        gender:null,
        dateofbirth:null,
        phonenumber:null,
        about:null,
    });
    
    const user   = await User.create({
        firstName,
        lastName,
        password:hashedpassword,
        accountType,
        email,
        approved:approved,

         
        additionaldetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

    })
    // return res
    return res.status(200).json({
        success:true,
        message:"User is registered  successfully",
        user,
    }); 
}
catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"user is not registered please try again",
    });

}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
}
//login

exports.login = async(req,res)=>{
    try{
        // get data from req body
        const{
            email,
            password
        } = req.body;

        // validation data

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"all field are required,please try again",
            })
        }

        // check user is exist or not 
        const userexist = await User.findOne({email}).populate("additionaldetails");
        console.log("userexist data",userexist)
        if(!userexist){
            return res.status(400).json({
                success:false,
                message:"user is not exist please signup",
            });
        }
        // compare password
        if(await bcryptjs.compare(password,userexist.password)){
            // generate JWT ,after password matching
            const payload  ={
                email:userexist.email,
                id:userexist._id,
                accountType:userexist.accountType,
            }
          const token = jwt.sign(payload,process.env.JWT_SECRET,
            {expiresIn:"24h",

            }
          );
          userexist.token = token;
          userexist.password = undefined;

           // create cookie and send response

           const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000 ),
            httpOnly:true,
           }
           res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            userexist,
            message:"logged in successfully",
           })
          
        }
        else{
            return res.status(401).json({
                success:false,
                message:'password is incorrect',
            });
        }
}
    catch(error){
        
       console.log(error);
       return res.status(502).json({
        success:false,
        message:"user not found please try again",
       })
    }
};
  
// changePassword

// todo: homework
exports.changepassword =  async(req,res) =>{

    console.log("hello dosto me yaha pr hu inside the auth");
    try{
         // get the data from req body
         // get oldpassword,newPassword ,confirmpassword
         const{
            oldpassword,
            newpassword,
            confirmpassword,
              
               } = req.body;
               const email = req.User.email;
            //    console.log("value of oldpassword",oldpassword);
            //    console.log("value of newpassword",newpassword);
            //    console.log("value of confirmpassword",confirmpassword);
            console.log("value of id",email);

   const checkuser = await User.findOne({email});
   if(!checkuser){
    return res.status(401).json({
        success:false,
        message:"user is not found",
    });
   }

         
         // validation
         if(!oldpassword || !newpassword || !confirmpassword){
            return res.status(400).json({
                success:false,
                message:"All field required",
            });
         }
         // newpassword and confirmpassword should be equal
         if(newpassword!==confirmpassword){
            return res.status(401).json({
                success:false,
                message:"password does not match",
            });
         }
          
         // hashpassword
         const hashpassword  = await bcryptjs.hash(newpassword,10);
                                       
         
         // update pwd in db
         checkuser.password = hashpassword;
         
         await checkuser.save();
         
        //  console.log("value of user",checkuser);
        console.log("me yaha tk aaya hu");
   

         // send mail- pwd update
         const mailresponse  = await mailsender(email,"Change Password:",`New password is:${newpassword}`);
        //  console.log("email sent successfully:", mailresponse);
         
         
    


         // return response
         return res.status(200).json({
            success:true,
            message:"password updated successfully",
            checkuser,
           
         });


    }catch(error){
        return res.status(501).json({
            success:false,
            message:"password is not update please try again",

        });
    }
}

    
