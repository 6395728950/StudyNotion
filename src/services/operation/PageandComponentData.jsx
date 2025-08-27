// import React from 'react'
import { apiconnector } from '../apiconnector';
import { catalogData } from '../apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const getCatalogPageData= async(categoryId) => {
 let result = [];
 console.log('what is come in id',categoryId);
 try{
      const response = await apiconnector("POST",catalogData.CATALOGPAGEDATA_API,{
        categoryId:categoryId
      });
      if(!response?.data?.success){
      throw new Error("Could not Fetch Category page Data");
        
      }
      result = response?.data;
 }catch(error){
           console.log("CATALOG PAGE DATA API ERROR",error);
           toast.error(error.message);
           result = error.response?.data;
 }
 return result;
}

 