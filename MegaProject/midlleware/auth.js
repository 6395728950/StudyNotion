// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const User = require("../models/User");



// // auth

// exports.auth = async(req,res,next) =>{
//     try{
//       const token = req.cookies.token 
//                     || req.body.token 
//                     || req.header("Authorization").replace("Bearer","");

//     // if token is missing
//     if(!token){
//         return res.status(401).json({
//             success:false,
//             message:"token is missing",
//         });
//     }
//     console.log("inside the auth check the token is ",token);
     
//     //  verify the token'
//     try{ 
//         console.log("hm aa gaye hai");
//       //  const decode =  jwt.verify(token,process.env.JWT_SECRET);
//       const decode =  jwt.verify(token, process.env.JWT_SECRET, (err, authorizedData) => {
        
//         if(err){
//             //If error send Forbidden (403)
//             console.log('ERROR: Could not connect to the protected route');
//             res.sendStatus(403);
//         } else {
//             //If token is successfully verified, we can send the autorized data 
//             console.log("value of decode" ,decode);

//             res.json({
//                 message: 'Successful log in',
//                 authorizedData
//             });
//           }})
        
       
//        req.User = decode;
//        console.log("value of req user",req.User);
//     }
//     catch(error){
//          return res.status(401).json({
//             success:false,
//             message:"token is invalid",
//          });
//     }
//     next();

//     }
//     catch(error){
//            return res.status(401).json({
//             success:false,
//             message:"something went wrong while validating the token",
//            });
//     }
// }
// // isstudent
// exports.isstudent = async(req,res,next)=>{
//   try{
//       if(req.User.accountType !=="Student"){
//         return res.status(401).json({
//             success:false,
//             message:'this is a protected route for student only',
//         });
//       }
//       next();

//   }
//   catch(error){
//     return res.status(401).json({
//         success:false,
//         message:"user role cannot be verified ,please try again",

//     });
//   }
// }

// // isinstructor
// exports.isInstructor = async(req,res,next)=>{
  
//       try{
//         if(req.User.accountType !=="Instructor"){
//           return res.status(401).json({
//               success:false,
//               message:'this is a protected route for instructor only',
//           });
//         }
//         next();
  
//     }
//     catch(error){
//       return res.status(401).json({
//           success:false,
//           message:"user role cannot be verified ,please try again",
  
//       });
//     }
//   }

// //isAdmin
// exports.isAdmin = async(req,res,next)=>{
//     try{
//         if(req.User.accountType !=="Admin"){
//           return res.status(401).json({
//               success:false,
//               message:'this is a protected route for Admin only',
//           });
//         }
//         next();
  
//     }
//     catch(error){
//       return res.status(401).json({
//           success:false,
//           message:"user role cannot be verified ,please try again",
  
//       });
//     }
//   }


//  code given by chatgpt

const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// Auth Middleware
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");
      console.log("token aaya hai ya nahi in auth",token);

    // If token is missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    console.log("Inside auth, token:", token);

    // Verify the token
    try {
      console.log("JWT_SECRET:", process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded:", decoded);

      req.User = decoded; // Attach decoded user to the request object
      console.log("req user ki value",req.User);
       // Proceed to the next middleware or route handler
    } catch (error) {
      console.log("Token verification failed:", error.message);
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    // console.log("before the next");
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

// isStudent Middleware
exports.isStudent = async (req, res, next) => {
  try {
    if (req.User.accountType !== "Student") {
      return res.status(403).json({
        success: false,
        message: "This route is protected for students only",
      });
    }
    next();
  } catch (error) {
    console.error("Error in isStudent middleware:", error.message);
    return res.status(500).json({
      success: false,
      message: "User role verification failed, please try again",
    });
  }
};

// isInstructor Middleware
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.User.accountType!=='Instructor') {
      return res.status(403).json({
        success: false,
        message: "This route is protected for instructors only",
      });
    }
    // console.log("me yaha pr hu");
    next();
  } catch (error) {
    console.error("Error in isInstructor middleware:", error.message);
    return res.status(500).json({
      success: false,
      message: "User role verification failed, please try again",
    });
  }
};

// isAdmin Middleware
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.User.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "This route is protected for admins only",
      });
    }
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error.message);
    return res.status(500).json({
      success: false,
      message: "User role verification failed, please try again",
    });
  }
};

 
