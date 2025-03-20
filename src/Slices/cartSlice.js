import { createSlice } from "@reduxjs/toolkit";
 import { toast } from "react-toastify";


const initialState = {
     totalItems :localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")):0,
      cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):[],
     total :localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")):0,
};

const  cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        
        // add to cart
        addToCart:(state,action)=>{
            const course = action.payload;
            const index = state.cart.findIndex((item)=>item._id ===course._id);
            if(index>=0){
                // if the course is already in cart do  not modifiy the quantity
                toast.error("Course already in Cart");
                return;
            }
            // if the course is not added into the cart,add it to the cart

            state.cart.push(course);
            // update the total quantity and price
            state.totalItems++;
          
            state.total+=course.Price;
            // update to localstorage
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("total",JSON.stringify(state.total));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            // show toast
            toast.success("Course added to Cart");
        },
        // remove from cart
        removeFromCart:(state,action) =>{
            const courseId = action.payload;
            const index = state.cart.findIndex((item)=>item._id === courseId);
            if(index>=0){
                // if the course is found in cart remove it
                state.totalItems--;
                state.total-=state.cart[index].Price;
                state.cart.splice(index,1);
                // update to localstorage
                localStorage.setItem("cart",JSON.stringify(state.cart))
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
                localStorage.setItem("total",JSON.stringify(state.total))
            }
            //show toast
            toast.success("course removed from cart");
        },
         
        // resetcart
        resetCart :(state)=>{
             state.total=0
             state.cart=[]
             state.totalItems =0
             // update to localstorage
             localStorage.removeItem("cart")
             localStorage.removeItem("total")
             localStorage.removeItem("totalItems")

        } ,
    },
});
export const {addToCart,removeFromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;