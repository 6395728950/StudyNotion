import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

const RequirementFields = ({name,label,errors,placeholder,setValue,getValues,register} ) => {
    const[requirement,setrequirement] = useState("");
    const[requirementList,setRequirementList] = useState([]);
    const { editCourse, course } = useSelector((state) => state.course);
    
useEffect(()=>{
    if(editCourse){
        setRequirementList(course?.data?.instructions);

    }
    register(name, { required: true, validate: (value) => value.length > 0 })
},[])
 

    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=>value.length>0
        })
    },[])

    useEffect(()=>{
           setValue(name,requirementList)
    },[requirementList])



    const handleAddRequirement = ()=>{
        if(requirement){
           setRequirementList([...requirementList,requirement]);
           setrequirement("");
        }
        
      
    }
    console.log("requirement-List",requirementList)

    const handleRemoveRequirement = (index)=>{
        const updateRequirementList = [...requirementList];
        updateRequirementList.splice(index,1);
        setRequirementList(updateRequirementList);
    }
  return (
    <div>
           <label htmlFor={name}>{label}<sup>*</sup></label>
           <div>
            <input
             type='text'
              id={name}
              value={requirement}
              placeholder={placeholder}
              onChange={(e)=>setrequirement(e.target.value)}
              className='w-full bg-richblack-700 text-richblack-25'/>
              <button type='button'
              onClick={handleAddRequirement}
              className='font-semibold text-yellow-50'>
                Add
              </button>
               
           </div>
          

           {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((requirement, index) => (
                            <li key={index} className='flex items-center text-richblack-5'>
                                <span>{requirement}</span>
                                <button
                                type='button'
                                onClick={() => handleRemoveRequirement(index)}
                                className='text-xs text-pure-greys-300'>
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
           {
            errors[name] &&(
                <span>
                    {label} is required
                </span>
            )
           }

    </div>
  )
}

export default RequirementFields