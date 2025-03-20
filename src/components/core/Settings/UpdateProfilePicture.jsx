import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Button from '../Homepage/Button';
import IconBtn from '../Homepage/common/IconBtn';
import { FiUpload } from 'react-icons/fi';
import { updateDisplayPicture } from '../../../services/operation/SettingsApi';
import { useState } from 'react';

const UpdateProfilePicture = () => {
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const dispatch = useDispatch;
    const[loading,setLoading] = useState(false);
    const[image,setimage]  = useState(null);
    const[preview,setpreview] = useState(false);

    const fileInputRef = useRef(null);
    const handleclick  =()=>{
        fileInputRef.current.click();
        
    }
    const handleFileChange =(e)=>{
     const file = e.target.files[0];

      if(file){
        setimage(file);
        previewFile(file);
      }
    }

    const previewFile =(file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend= ()=>{
            setpreview(reader.result)
        }
    
    }

    const handleFileupload = ()=>{
        try{
            console.log("uploading...")
            setLoading(true);
            const formData = new FormData();
            formData.append("displaypicture",image);

            dispatch(updateDisplayPicture(token,formData)).then(()=>{
                setLoading(false);
            })
        }
        catch(error){
             console.log("Error Message -",error.message);
        }
    }
    useEffect(()=>{
        if(image){
            previewFile(image);
        }
    },[image])
  return (
    <>

       <div>
        <div className='flex items-center gap-x-4 bg-richblack-800 h-36 rounded-md text-white '>
            <img src={preview || user?.image}
            alt={`profile-${user?.firstName}`}
            className='aspect-square w-[78px] rounded-full object-cover mx-8'></img>
            <div className='space-y-2'>
                <p>Change Profile Picture</p>
                <div className='flex gap-3'>
                    <input  ref={fileInputRef} type='file'
                             accept="image/png, image/gif, image/jpeg"
                            onClick={handleFileChange} className='hidden' >
                                
                            </input>
                            <div className='flex gap-x-2'>

                            <button onClick={handleclick}
                        disabled={loading}
                        className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
                               >
                            Select
                            </button>
                       <div className='bg-yellow-200 w-32 rounded-md text-black font-semibold px-5  flex gap-2 '>
                       <IconBtn 
                    text={loading ? "Uploading...":"Upload"}
                    
                    onclick={handleFileupload}   >

                       
                        
                    </IconBtn>
                    <p className='mt-2'>  {
                            !loading && (
                                <FiUpload className="text-lg text-richblack-900 cursor-pointer" />
                            )
                        }</p>
                       </div>
                    

                            </div>
                 
                </div>
            </div>
        </div>

         </div>
    </>
     
  )
}

export default UpdateProfilePicture