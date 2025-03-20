import React from 'react'
import Button from '../../Homepage/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {buyCourse} from "../../../../services/operation/studentFeaturesApi";

const RenderTotalAmount = ({total,cart}) => {
    // const{total ,cart}=useSelector((state)=>state.cart);
    const{token} = useSelector((state)=>state.auth);
    const{user} = useSelector((state)=>state.profile);

    const navigate  = useNavigate();
    const dispatch  = useDispatch();

    

    const handleBuycourse =()=>{
        const courses = cart.map((course)=>course._id)
        console.log("Bought these courses:",courses);
         
       buyCourse(token,courses,user,navigate,dispatch);
    }
 
  return (
    <div> 
        <div>
            <h1>Toatal:</h1>
            <p>Rs.{total}</p>
            </div>
            <div>
                {/* <Button active={true}  onClick={handleBuycourse}>Buy Now</Button> */}
                <button onClick={handleBuycourse} className='bg-yellow-25 text-richblack-25 rounded-md w-40 h-10'>Buy Now</button>
            </div>
    </div>
  )
}

export default RenderTotalAmount