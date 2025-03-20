 import React from 'react'
 import { sidebarLinks } from '../../../data/dashboard-links'
 import { logout } from '../../../services/operation/authApi'
 import SidebarLink from './SidebarLink'
 import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../Homepage/common/ConfirmationModal'
import { useState } from 'react'
 
 const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[confirmationModal,setconfirmationModal] = useState(null);
    const{user,loading:profileLoading} = useSelector((state)=>state.profile);
    const{loading:authLoading} = useSelector((state)=>state.auth);
     if(profileLoading || authLoading){
       return(
            <div className='mt-10'>Loading...</div>
        )
     }

   return (
     <div>

          <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 text-white'>

            <div className='flex flex-col text-white'>
                {
                    sidebarLinks.map((element,index)=>{
                        if(element.type && user?.accountType!==element.type) return null

                        return (
                            <SidebarLink Link={element.path} name={element.name} iconName={element.icon} 
                            key={element.id}></SidebarLink>
                        ) 
                     })
                }

            </div>
            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
 
             <div className='flex  flex-col'>
                <SidebarLink  Link="/dashboard/settings" name="Setting"
                iconName="VscSettingsGear"></SidebarLink>

                <button onClick={()=> setconfirmationModal({
                    
                        text1:"Are You Sure ?",
                        text2:"You will be logged out of your Account",
                        btn1Text: "Logout",
                        btn2Text:"Cancel",
                        btn1Handler:() =>dispatch(logout(navigate)),
                       btn2Handler:() =>setconfirmationModal(null),
                })
                      
               } 
               className='text-sm font-medium ml-8 mt-5'>
                <div className='flex items-center gap-x-2 '>

                <VscSignOut />
                <span>Logout</span>
                </div>
               </button>
             </div>

          </div>
          {confirmationModal && <ConfirmationModal modaldata={confirmationModal}/>}

     </div>
   )
 }
 
 export default SideBar