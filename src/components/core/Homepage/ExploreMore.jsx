import React from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import { useState } from 'react';
import Highlight from './Highlight';
import CourseCard from './CourseCard';

const tabsName =["Free","New to coding","Most popular","Skills paths","Career paths",];
const ExploreMore = () => { 
    const[currentTab,setcurrentTab] = useState(tabsName[0]);
    const [courses,setcourses] = useState(HomePageExplore[0].courses);
    const[CurrentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
  

    const setMycards = (value) =>{
        setcurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag===value);
        setcourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>
    <div className='text-4xl font-semibold text-center'>
        Unlock the
        <Highlight text={"Power of Code"}></Highlight>

    </div>
    <p className='text-center text-richblack-300 text-lg font-medium mt-2'>Learn to build anything you can imagine</p>

    <div className='flex flex-row items-center rounded-full bg-richblack-800 mt-5 mb-5'>
        {
            tabsName.map((element ,index)=>{
                return(
                    <div className={`text-[16px] flex flex-row items-center gap-2 ${currentTab===element ? "bg-richblack-900 text-richblack-5 font-medium ":
                        "text-richblack-200"
                    } rounded-full transition-all duration-100 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} key={index}
                    onClick={()=>setMycards(element)}>
                        {element}
                        </div>
                )
            })
        }
    </div>
    <div className='lg:h-[150px] display-block'></div>
    {/* course card ka group */}
    <div className='absolute flex flex-row gap-10 w-full '>
        {courses.map((element,index)=>{
          return (
             <CourseCard key={index} cardData = {element}
             CurrentCard={CurrentCard}
             setCurrentCard ={setCurrentCard} 
           
              >
                  
                
             </CourseCard>
          )
        })
    }
    </div>
          
    </div>
  )
}

export default ExploreMore