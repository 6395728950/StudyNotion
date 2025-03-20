 
import {studentEndpoints} from "../apis"
import { apiconnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzpLogo.jpg"
 
 import { toast } from "react-toastify";
import { setPaymentLoading } from "../../Slices/courseSlice";
import { resetCart } from "../../Slices/cartSlice";
 


const{COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

// first of all need to loadscript

function loadScript(src){
    return new Promise((resolve)=>{
        const  script= document.createElement("script");
        script.src = src;
        script.onload = ()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);

        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    try{
        // load the script
        const res  = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }

     // initiate the order
     console.log("what is come in courses batao",courses);
     const orderResponse = await apiconnector(
        "POST",
        COURSE_PAYMENT_API,
        { courses: courses },  // Ensure it's wrapped in an object
        {
            Authorization: `Bearer ${token}`
        }
    );
    // console.log("tum yaha tk aa gaye");
       console.log("value of orderResponse",orderResponse);
     if(!orderResponse.data.success){
        throw new Error(orderResponse.data.message);
     }
   // options 
  console.log("value of key", process.env.REACT_APP_RAZORPAY_KEY)
  console.log("All ENV Variables:", process.env);

    const options={
        key: process.env.REACT_APP_RAZORPAY_KEY,  
        currency:orderResponse.data.order.currency,     
        amount:`${orderResponse.data.order.amount}`,

        order_id:orderResponse.data.order.id,
        name:"StudyNotion",

        description:"Thak You for Purchasing the Course",

        image:rzpLogo,
        prefill:{
            name:`${userDetails.firstName}`,
            email:userDetails.email
        },
        handler: function(response){
            // send successful wala mail
            console.log("value of response",response);
            sendPaymentSuccessEmail(response,orderResponse.data.order.amount,token);
            // verifyPayment
            VerifyPayment({...response,courses},token,navigate,dispatch);
        }

    }
  const paymentObject  = new window.Razorpay(options);
  paymentObject.open();
  paymentObject.on("payment.failed",function(response){
    // toast.error("oops,payment failed");
    console.log("payment failed");
  })

  
    }catch(error){
console.log("PAYMENT API ERROR...",error);
// toast.error("Could not make paymenyt");
    }
}

async function sendPaymentSuccessEmail(response,amount ,token){
  try{
       await apiconnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
        orderId:response.razorpay_order_id,
        paymentId:response.razorpay_payment_id,
        amount,
       },{
        Authorization:`Bearer ${token}`
       })
  }catch(error){
           console.log("PAYMENT SUCCESS EMAIL ERROR...",error);
  }
}


// verify payment
async function VerifyPayment(bodyData,token,navigate,dispatch){
    // const toastId = toast.loading("Verifying Payment...")
    dispatch(setPaymentLoading(true));
    try{
        const response=await apiconnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`,
        })
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        // toast.success("Payment successfull,you are added to the course");
        dispatch(resetCart());
        navigate("/dashboard/enrolled-courses");
      
    }catch(error){
        console.log("PAYMENT VERIFY ERROR...",error);
        // toast.error("Could not verify payment");
    }
    // toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}