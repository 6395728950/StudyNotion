 
import { apiconnector } from "../apiconnector";
import { ratingsEndpoints } from "../apis";

const{GET_AVG_RATING_API} = ratingsEndpoints;

export const getAvgRating = async(courseId)=>{

    let result ="";
    try{
        const response = await apiconnector("GET",GET_AVG_RATING_API,{
            courseId
        })
        //console.log("GET_AVG_RATING_API_RESPONSE",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response;
        
    }catch(error){
        console.log("GET_AVG_RATING_API_ERROR......",error)
        result = error.response.data
    }
    return result;
     
}