const crypto = require("crypto");

const {instance} = require("../config/razorpay");
const course = require("../models/course");
const User = require("../models/User");
 
const {courseEnrollmentEmail} = require("../mail_templates/CourseEnrollmentEmail");
const mailsender = require("../utils/mailsender");
const {  mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail_templates/paymentSuccessEmail");
const courseProgress = require("../models/courseProgress");
  
  require("dotenv").config();



// capoture the payment and intiate the razorpay oreder
// exports.capturePayment = async(req,res) =>{
//     // get course id and user id
//     const{course_id} = req.body;
//     const userId = req.user.id;
//     // validation
//     if(!course_id || !userId){
//         return res.status(400).json({
//             success:false,
//             message:"please  provide valid  data",
//         });
//     }
     
//     // valid course details
//     let course;
//     try{
//    course = await course.findById(course_id);
//    if(!course){
//     return res.status(401).json({
//         success:false,
//         message:"could not find the course",
//     });
         
     
//    }
//    // check user already pay for the same course
//    const uid = new mongoose.Types.ObjectId(userId);// convert string type userid into object type id because inside the course user id is present in form of object
//    if(course.studentEnrolled.includes(uid)){
//     return res.json({
//         success:false,
//         message:"student is already enrolled",
//     });
//    }
//     }catch(error){
//         console.log("error:",error);
//             return  res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//     }
 
//     // order create 
//     const amount= course.price;
//     const currency = "INR";

//     const options = {
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userId,
//         }

//     };
//     try{
// // initate the payment using razorpay
//     const PaymentResponse = await instance.orders.create(options);
//   console.log(PaymentResponse);
//    return res.status(200).json({
//     success:true,
//     courseName:course.courseName,
//     courseDescription:course.coursedesc,
//     thumbnail:course.thumbnail,
//     orderId:PaymentResponse.id,
//     currency:PaymentResponse.currency,
//     Amount:PaymentResponse.amount,
//     message:"Payment is initiate",
//    });


//     }catch(error){
//        console.log(error);
//        res.json({
//         success:false,
    
//         message:"could not initate order",
//        });
       
//     }

  
// }

// // verify the signature of razorpay and server
// exports.verifySignature = async(req,res) =>{
//     try{
//         const webhooksecret = "12345678";

//         const signature = req.headers["x-razorpay-signature"];
//         // createHmac ->it is convert secretkey into hashing
//      const shasum  =    crypto.createHmac("sha256",webhooksecret);
//      // convert into string 
//      shasum.update(JSON.stringify(req.body));
//      const digest = shasum.digest("hex");
//      if(signature===digest){
//         console.log("Payment is Authorised");
//         const {courseId,userId} = req.body.payload.payment.entity.notes;
//         try{
//              // fulfill the actions

//              // find the course and enroll the student in it
//              const enrolledCourse = await course.findOneAndUpdate(
//                 {_id:courseId},
//                 {$push:{studentEnrolled:userId}},
//                 {new:true},
//              );
//              if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found",
//                 });
//              }
//              console.log(enrolledCourse);
//              // find the student and add the course to their list enrolled course me
//              const enrolledStudent = await user.findOneAndUpdate({_id:userId},
//                 {$push:{courses:courseId}},
//                 {new:true},


//              );
//              console.log(enrolledStudent);
//              // mail send to the student are you enrolled successfully for that course
//              const emailresponse = await mailsender(
//                 enrolledStudent.email,
//                 "Congratulations from AccioJob",
//                 "Congratulation ,you are onboarded into fast track placement programm"
//             );
//             console.log(emailresponse);
//             return res.status(200).json({
//                 success:true,
//                 message:"Signature Verified and Course Added",
//             });

//         }catch(error){
//                console.log(error);
//                return res.status(500).json({
//                 success:false,
//                 message:error.message,
//                });
//         }
//      }
//      else{
//         return res.status(400).json({
//             success:false,
//             message:"invalid request",
//         });
//      }



               



//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }
// }

 

exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.User.id;

    console.log("value of courses inside capturePayment:", courses);

    if (!courses || courses.length === 0) {
      return res.status(400).json({ success: false, message: "Please Provide Course Id" });
    }

    let totalAmount = 0;
    for (const course_id of courses) {
      let Course;
      try {
        Course = await course.findById(course_id);
        if (!Course) {
          return res.status(404).json({ success: false, message: "Course not found" });
        }
        const uid = new mongoose.Types.ObjectId(userId);
        if (Course.studentsEnrolled.includes(uid)) {
          return res.status(400).json({ success: false, message: "Student is already enrolled" });
        }
        totalAmount += Course.Price;
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt:Math.random(Date.now()).toString(),
    };

    try {
      const PaymentResponse = await instance.orders.create(options);
      return res.json({
        success: true,
        message: "Payment initiated successfully",
        order: PaymentResponse,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Could not initiate order" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



//Verify the payment

exports.verifyPayment = async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const Courses = req.body?.courses;
    const userId = req.User.id;

    // console.log("value of razorpay_order_id",razorpay_order_id);
    // console.log("value of payment",razorpay_payment_id);
    // console.log("value of signature",razorpay_signature);
    // console.log("value of courses",Courses);

    if(!razorpay_order_id || !razorpay_payment_id ||!razorpay_signature||!Courses||!userId){
     return res.status(200).json({
      success:false,message:"Payment Failed"
     });

    }
    // here we create signature 
    let body = razorpay_order_id+"|"+razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

    if(expectedSignature === razorpay_signature){
        // enroll krwao student ko

         enrollStudents(Courses,userId,res);
        // return res
        return res.status(200).json({success:true,message:"Payment Verified"});

    }
    return res.status(200).json({success:"false",message:"Payment Failed"});
}

const enrollStudents = async(Courses,userId,res)=>{
    if(!Courses||!userId){
        return res.status(400).json({
            success:false,
            message:"Please Provide data for COurses or userId"

        });
    }
    for(const courseId of Courses){
        try{
                // find the course and enroll the student in it
        const enrolledCourse  = await course.findOneAndUpdate({_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        
            
        )
    

    if(!enrolledCourse){
        return res.status(500).json({success:false,message:"Course not Found"});

    }

    const CourseProgress = await courseProgress.create({
      courseID:courseId,
      userId:userId,
      completedVideos:[],

    })
    // find the student and add the course to their list of enrolledCourses
    const enrolledStudent = await User.findByIdAndUpdate(userId,{
        $push:{
            courses:courseId,
            courseProgress:CourseProgress._id,
        }
    },{new:true})

    // bacchhe ko mail send kardo
    const emailResponse  =await mailsender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName}`)

    )
    console.log("you are successfully enrolled in this course");
    // console.log("Email Sent Successfully",emailResponse.response);
        }catch(error){
             console.log(error);
             return res.status(500).json({success:false,message:error.message});
        }
}



}


exports.sendPaymentSuccessEmail=async(req,res)=>{
    const{orderId,paymentId,amount}  = req.body;
    // console.log("orderId",orderId);
    // console.log("paymentId",paymentId);
    // console.log("amount",amount);
    const userId  = req.User.id;
    if(!orderId || !paymentId ||!amount || !userId){
        return res.status(400).json({success:false,message:"Please provide all the fields"})
    }
    try{
          // first of all find the userdetails
          const enrolledStudent = await User.findById(userId);
           if(enrolledStudent){
            await mailsender(
                enrolledStudent.email,
                `Payment Recieved`,
                paymentSuccessEmail(`${enrolledStudent.firstName}`,
                    amount/100,orderId,paymentId
                )

            )
           }
    }catch(error){
    console.log("error in sending mail",error)
    return res.status(500).json({success:false,message:"could not send email"})
    }
}

 
