// import { setCourse } from "../../Slices/courseSlice";
import { apiconnector } from "../apiconnector";
import { courseEndpoints } from "../apis";
import { toast } from "react-toastify";
//  import { setLoading } from "../../Slices/authSlices";
//  import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';





const{GET_ALL_COURSE_API,CREATE_COURSE_API,
        COURSE_CATEGORIES_API,EDIT_COURSE_API,UPDATE_SECTION_API,
  CREATE_SECTION_API,DELETE_SECTION_API,DELETE_SUBSECTION_API,
        CREATE_SUBSECTION_API,UPDATE_SUBSECTION_API,GET_ALL_INSTRUCTOR_COURSES_API
        ,GET_FULL_COURSE_DETAILS_AUTHENTICATED
        ,COURSE_DETAILS_API
        ,LECTURE_COMPLETION_API
        ,CREATE_RATING_API
        ,DELETE_COURSE_API

} =courseEndpoints;
 



export const addCourseDetails = async(formdata, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  const formDataObj = Object.fromEntries(formdata.entries());
console.log(formDataObj);
 
  try {
    const response = await apiconnector("POST", CREATE_COURSE_API, formdata, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
   toast.success("Course Details Added Successfully")
    result = response?.data;
    console.log("value of result in add course details",result);
  } catch (error) { 
      console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
 toast.dismiss(toastId)
  return result
}


export const getAllCourse = async(token)=>{
   


       const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true));
    let result =[];
        try{
              const response = await apiconnector("GET",GET_ALL_COURSE_API,null,{
                Authorization:`Bearer${token}`
              })
              // console.log(" get all courses",response);
              if(!response.data.success){
                throw new Error(response.data.message)
              }
              result = response?.data
              
        }catch(error){
              //  console.log("we not get courses",error)
               toast.error("failure in fetch the courses")
        }
     toast.dismiss(toastId)
      // dispatch(setLoading(false))
      // console.log("result ki value",result)
      return result
    }


export const fetchCourseCategories= async()=>{
  let result =[];
  try{
       const response = await apiconnector("GET",COURSE_CATEGORIES_API)
      //  console.log("COURSE_CATEGORIES_API RESPONSE",response)
       if(!response?.data?.success){
        throw new Error("Could Not fetch Course Categories")
       }
       result = response?.data
  }catch(error){
      // console.log("COURSE_CATEGORY_API_ERROR",error)
      toast.error(error.message)
  }
  // console.log("result ki vallue",result)

    
      return result;

}
export const editCourseDetails=async(formData,token)=>{
  let result = null;
     console.log("here we check the formData")
  for (const [key, value] of formData.entries()) {
    console.log("here we show all formData");
    // console.log(`${key}: ${value}`);
  }
  
   try{
              const response = await apiconnector("POST", EDIT_COURSE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              })

        //  console.log("EDIT_COURSE_API",response)
         if(!response.data.success){
          throw new Error(response.data.message)
         }
         result = response?.data;
        //  console.log("check the value of result inside the courseapi at line no.117",result);
  }
  catch(error){
        console.log("EDIT_COURSE_API_ERROR",error)
        toast.error(error.message)
  }
  return result;
}
export const createSection =async(formdata,token)=>{
  let result =null;
   try{
         const response = await apiconnector("POST",CREATE_SECTION_API,formdata,{
          Authorization: `Bearer ${token}`,
         })
        //  console.log("CREATE_SECTION_RESPONSE",response)
         if(!response?.data?.success){
          throw new Error(response.data.message);
         }
         result = response?.data;
        //  console.log("result ki value of section",result)
   }catch(error){
       // console.log("CREATE_SECTION_API_ERROR",error);
        toast.error(error.message);
   }
   return result;


}

export const updateSection =async(formdata,token)=>{
  let result =null;
   try{
    const response = await apiconnector("POST",UPDATE_SECTION_API, formdata, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
        // console.log("UPDATE_SECTION_API_RESPONSE",response)
         if(!response?.data?.success){
          throw new Error(response.data.message);
         }
         result = response?.data;
         //console.log("vlaue of result",result);
   }catch(error){
        //console.log("UPDATE_SECTION_API_ERROR",error);
        toast.error(error.message);
   }
   return result;


}

export const deletesection =async(formdata,token)=>{
let result = null;
   
 try{
  const response = await apiconnector("POST",DELETE_SECTION_API, formdata, {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  })
 
// console.log("DELETE_SECTION_API",response)
   if(!response?.data?.success){
    throw new Error(response.data.message);
   }
   toast.success("section deleted successfully");
   result = response?.data;
   
   //console.log("result ki value",result);
 }catch(error){
  // console.log("DELETE_SECTION_API_ERROR",error);
   toast.error(error.message)
 }

return result;
   
} 


export const deletesubsection =async(formdata,token)=>{
  let result = null;
     
   try{
    const response = await apiconnector("POST",DELETE_SUBSECTION_API, formdata, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
   
 // console.log("DELETE_SUBSECTION_API",response)
     if(!response?.data?.success){
      throw new Error(response.data.message);
     }
     toast.success("subsection deleted successfully");
     result = response?.data;
     //console.log("result ki value",result);
   }catch(error){
     //console.log("DELETE_SUBSECTION_API_ERROR",error);
     toast.error(error.message)
   }
  
  return result;
     
  } 


  export const createsubsection = async(formdata,token)=>{

  
    let result = [];
    //console.log("token before call the api",token);
    // consle.log("check the form data inside courseapi",)
    try{

      const response = await apiconnector("POST", CREATE_SUBSECTION_API, formdata, {
       Authorization: `Bearer ${token}` } // Headers should be inside "headers"
    );
 
        //console.log("CREATE SUBSECTION API RESPONSE",response);
        if(!response?.data?.success){
          throw new Error(response.data.message);
        }
      toast.success("create subsection successfully");
        result = response?.data?.data;
         
       // console.log("result ki value in createsub section",result);

    }catch(error){
             console.log("CREATE_SUBSECTION_API_ERROR",error);
             toast.error(error.message);
    }
    return result;
  }


  export const  updateSubsection = async (formdata,token)=>{
         let result =[];
         try{
          const response = await apiconnector("POST",UPDATE_SUBSECTION_API, formdata, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          })

              if(!response?.data?.success){
                throw new Error(response.data.message);
              }

              //console.log("UPDATE_SUBSECTION_API",response);
              toast.success("subsection updated successfully");
              result = response?.data?.data;
              //console.log("updatesubsection ke result ki value",result);
              
         }catch(error){
          console.log("UPDATE_SUBSECTION_API_ERROR",error);
          toast.error(error.message);
         }
         return result;
  }
  export const fetchInstructorCourses = async (token) => {
   // console.log("Token received:", token); // Debugging token

    if (!token) {
        console.error("No token provided!");
        toast.error("Authentication token is missing.");
        return [];
    }

    

    let result = [];
    try {
        const response = await apiconnector(
            "GET",
            GET_ALL_INSTRUCTOR_COURSES_API,
            null,
           {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          },
            
        );

        if (!response?.data?.success) {
            throw new Error(response.data.message || "Failed to fetch courses.");
        }

        //console.log("FETCH_INSTRUCTOR_COURSES_RESPONSE", response);
        result = response?.data;
        //console.log("value of result inside courseapi of here we fetch all instructorcourse",result);
    } catch (error) {
        console.log("FETCH_INSTRUCTOR_COURSES_ERROR", error.response || error);
        toast.error(error.response?.data?.message || error.message || "Something went wrong!");
    }
    return result;
};

export const getFullDetailsofCourse =async(courseId,token)=>{
  
  let result = null
 // console.log("value of courseId",courseId);
  //console.log("token inside getfullDetailsofCourse",token);
  try {
    const response = await apiconnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId
      },
     {
      Authorization: `Bearer ${token}`,
     }
    );
   // console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data;
    //console.log("result in getFull details",result);

  } catch (error) {
    //console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  return result;
}

export const fetchCourseDetails = async (courseId) => {
  // const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));

   //console.log("value of courseId inside the fetchCourseDetails",courseId);
  let result = null
  try {
    const response = await apiconnector("POST", COURSE_DETAILS_API, {
      courseId
    });
    //console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data;
  } catch (error) {
    //console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  // toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}
export const markLectureAsComplete = async (data, token) => {
  let result = null
 // console.log("mark complete data", data)
  //console.log("value of token",token);
  const toastId = toast.loading("Loading...")
  try {
    // const response = await apiconnector("POST", LECTURE_COMPLETION_API, data, {
    //   Authorization: `Bearer ${token}`,
    // });
    
    const response = await apiconnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    
  //   //console.log(
  //     "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
  //     response
  //  // )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}

// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiconnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
   // console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}

export const deleteCourse = async (data, token) => {
 
  try {
    const response = await apiconnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    //console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
     
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
 
}