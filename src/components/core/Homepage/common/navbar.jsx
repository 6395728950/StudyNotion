import React from 'react'
import { Link ,matchPath} from 'react-router-dom'
import { BsChevronDown } from "react-icons/bs"
import logo from "../../../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from"../../../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../../Auth/ProfileDropDown'
import { apiconnector } from '../../../../services/apiconnector'
import { categories } from '../../../../services/apis'
import { useEffect } from 'react'
import { useState } from 'react'
import { ACCOUNT_TYPE } from '../../../../utils/constants'
 
 
const Navbar = () => {
    // const token = null;
    const {token} = useSelector((state) => state.auth || {});
    const {user}   = useSelector((state) => state.profile ||{});
    const {totalItems} = useSelector((state) => state.cart || {});
   

    const location  = useLocation();

    const [subLinks, setSubLinks] = useState([])
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      (async () => {
        setLoading(true)
        try {
          const res = await apiconnector("GET", categories.CATEGORIES_API);
          console.log("value of res in navbar this is update in sublink",res);
          setSubLinks(res?.data?.data)
        } catch (error) {
          console.log("Could not fetch Categories.", error)
        }
        setLoading(false)
      })()
    }, [])

    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }
    return (
        <div
          className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
            location.pathname !== "/" ? "bg-richblack-800" : ""
          } transition-all duration-200`}
        >
          <div className="flex w-11/12 max-w-maxContent items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
            </Link>
            {/* Navigation links */}
            <nav className="hidden md:block">
              <ul className="flex gap-x-6 text-richblack-25">
                {NavbarLinks.map((link, index) => (
                  <li key={index}>
                    {link.title === "Catalog" ? (
                      <>
                        <div
                          className={`group relative flex cursor-pointer items-center gap-1 ${
                            matchRoute("/catalog/:catalogName")
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          <p>{link.title}</p>
                          <BsChevronDown />
                          <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                               
                           
                            {loading ? (
                              <p className="text-center">Loading...</p>
                            ) : subLinks.length ? (
                              <>
                            
                                {subLinks
                                  ?.filter(
                                    (subLink) => subLink?.course?.length > 0
                                  )
                                  ?.map((subLink, i) => (
                                    <Link
                                    to={`/catalog/${encodeURIComponent(subLink.name.toLowerCase().replace(/\s+/g, "-"))}`}
                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                    key={i}
                                  >
                                    {subLink.name}
                                  </Link>
                                  ))}
                              </>
                            ) : (
                              <p className="text-center text-richblack-900">No Courses Found</p>
                            )}
                            
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link to={link?.path}>
                        <p
                          className={`${
                            matchRoute(link?.path)
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          {link.title}
                        </p>
                      </Link>
                    )}
                  </li> 
                ))}
              </ul>
            </nav>
         
         {/* login/signup/dashboard */}
         <div className='flex gap-x-4 items-center'>
            {
                user && user?.accountType!==ACCOUNT_TYPE.INSTRUCTOR && (
                    <Link to ="/dashboard/cart" className='relative text-white'>
                        <AiOutlineShoppingCart/>
                        {
                            totalItems>0 && (
                                <span>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token===null && (
                    <Link to="/login">
                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                        Log in
                    </button>
                    </Link>
                )
            }
            {
                token===null &&(
                    <Link to="/signup">
                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                        Sign up
                    </button>
                    </Link>
                )
            }
            {
                token!==null && <ProfileDropDown/>
            }

         </div>


        </div> 
    </div>
  )
}

export default Navbar