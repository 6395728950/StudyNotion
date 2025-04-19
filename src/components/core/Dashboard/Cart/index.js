import React from 'react'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';
import { useSelector } from 'react-redux';
 
const Cart = () => {
    const{total ,totalItems,cart} = useSelector((state)=>state.cart);
    // const navigate = useNavigate();
    console.log("check the  value of total",total);
    console.log("check the value of totalItem",totalItems);
    console.log("check the value of cart",cart);
  return (
    <div className='text-white '>  
    {/* <div className='flex  gap-x-2 text-richblack-300'>
      <p onClick={navigate("/")}>Home /</p>
      <p onClick={navigate("dashboard/myprofile")}>Dashboard /</p>
      <p className='text-yellow-400'>Cart </p>
    </div> */}
        <h1 className='text-2xl text-richblack-5  font-semibold mt-3'>Your Cart</h1>
        <p className='text-richblack-400 pt-8 border-b border-richblack-400'>{totalItems} Courses in Cart</p>
        {
              total>0 ?(<div>
                <RenderCartCourses totalItems={totalItems} cart={cart} />
                <RenderTotalAmount total={total} cart={cart}/>
             </div>):(<p>Your Cart is empty</p>)

        }
    </div>
  )
}

export default Cart