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
    <div className='text-white'>
      <div>
        <p>
          {`Home / Catalog /`}
          <span>{catalogPageData?.data?.selectedCategory?.name}</span>
        </p>
        <p> {catalogPageData?.data?.selectedCategory?.name} </p>
        <p>{catalogPageData?.data?.selectedCategory?.desc}</p>
      </div>
      <div>
        {/* section 1 */}
        <div>
          <div>Courses to get you started</div>
            <div className='flex gap-x-3'>
                <p>Most Popular</p>
                <p>New</p>
            </div>
           <div>
           <CourseSlider course={catalogPageData?.data?.differentCategory?.course}/>
           </div>
        </div>
        {/* section 2 */}
        <div>
           <div>Top Courses in {catalogPageData?.data?.selectedCategory?.name}  </div>
            <div className='py-8'> 
               {
                  catalogPageData?.data?.selectedCategory?.course?.slice(0,4).map((course,index)=>(
                    <div key={index}>
                      {
                        course && <Course_card courses={course} height={"h-[400px]"}/>
                      }
                      </div>
                  ))
               } 
            </div>
            </div>
            {/* section 3 */}
            <div>
                <p>Frequently Bought </p>
                <div className='py-8'> 
                 
                  <div className='grid grid-cols-1 lg:grid-cols-2'>
                  {
  catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
    <div key={index}>
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