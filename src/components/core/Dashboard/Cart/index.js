import React from 'react'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';
import { useSelector } from 'react-redux';
const Cart = () => {
    const{total ,totalItems,cart} = useSelector((state)=>state.cart);
    console.log("check the  value of total",total);
    console.log("check the value of totalItem",totalItems);
    console.log("check the value of cart",cart);
  return (
    <div className='text-white'>  
        <h1>Your Cart</h1>
        <p>{totalItems} Courses in Cart</p>
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