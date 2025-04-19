import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
 
import { categories } from '../services/apis'
 import { apiconnector } from '../services/apiconnector'
 import CourseSlider from '../components/core/Catalog/courseSlider';
import Course_card from '../components/core/Catalog/Course_card'
import { getCatalogPageData } from '../services/operation/PageandComponentData'
import Footer from '../components/core/Homepage/common/footer'
 


const Catalog = () => {

    const{ catalogName } = useParams();
    const[catalogPageData,setCatalogPageData] = useState(null);
    const[categoryId,setCategoryId] = useState("");
    const decodedCatalogName = decodeURIComponent(catalogName);
    const[Active,setActive] = useState(false);
      // console.log("what is catalogName",catalogName);
      // console.log("what is catalogName",decodedCatalogName);
    // fetch all categories
    useEffect(()=>{
      const getCategories = async()=>{
        const res = await apiconnector("GET",categories.CATEGORIES_API);
        console.log("what is value of res",res);
        const category_id = res?.data?.data?.find((ct)=>(decodeURIComponent(encodeURIComponent(ct.name.toLowerCase().replace(/\s+/g, "-")))) === decodedCatalogName)._id;
          // console.log("what is come from res in catalog",category_id);
        setCategoryId(category_id);

      }
      getCategories();
    },[decodedCatalogName])
    // console.log("what is categoryId",categoryId);

    useEffect(()=>{
      const getCategoryDetails = async()=>{
        try{
         const res  =await getCatalogPageData(categoryId);
         console.log("Printing res:",res);
         setCatalogPageData(res);


        }catch(error){
          console.log(error);
        }
      }
      if(categoryId){
        getCategoryDetails();
      }
     
    },[categoryId]);
 console.log("what is come in catalogpageData",catalogPageData);
  return (
    <div className='text-white '>
      <div className='  bg-richblack-800  pt-7 pl-3 flex flex-col gap-y-2'>
        <p  className='text-richblack-400'>
          {`Home / Catalog /`}
          <span className='text-yellow-50'>{catalogPageData?.data?.selectedCategory?.name}</span>
        </p>
        <p className='text-xl font-semibold'> {catalogPageData?.data?.selectedCategory?.name} </p>
        <p className='text-richblack-400'>{catalogPageData?.data?.selectedCategory?.desc}</p>
      </div>
      <div>
        {/* section 1 */}
        <div className='mt-12 ml-9'>
          <div className='text-xl font-semibold mb-4'>Courses to get you started</div>
            <div className='flex gap-x-6 border-b border-b-richblack-500 mb-7'>
            <p
              onClick={() => setActive(false)}
              className={Active === false ? `text-yellow-50 border-b border-b-yellow-50` : ``}
            >
              Most Popular
            </p>

            <p
              onClick={() => setActive(true)}
              className={Active === true ? `text-yellow-50 border-b border-b-yellow-50` : ``}
            >
              New
            </p>

            </div>
           <div  >
           <CourseSlider course={catalogPageData?.data?.differentCategory?.course}  />
           </div>
        </div>
        {/* section 2 */}
        <div className='mt-4 ml-8'>
           <div className='text-xl font-semibold'>Top Courses in {catalogPageData?.data?.selectedCategory?.name}  </div>
            <div className='py-8'> 
               {
                  // catalogPageData?.data?.selectedCategory?.course?.slice(0,4).map((course,index)=>(
                  //   <div key={index}>
                  //     {
                  //       course && <Course_card courses={course} height={"h-[400px]"}/>
                  //     }
                  //     </div>
                  // ))

                  <CourseSlider course={catalogPageData?.data?.selectedCategory?.course}/>
               } 
            </div>
            </div>
            {/* section 3 */}
            <div className='mt-4 ml-8 mr-8'>
                <p className='text-xl font-semibold'>Frequently Bought </p>
                <div className='py-8'> 
                 
                  <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-3'>
                  {
  catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
    <div key={index} className='transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'>
      {course && <Course_card courses={course} height={"h-[400px]"} />}
    </div>
  ))
}

                  </div>
                </div>
            </div>
      </div>
     <Footer></Footer>
    </div>
  )
}

export default Catalog