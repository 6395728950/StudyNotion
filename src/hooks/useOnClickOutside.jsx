import { useEffect } from "react";
  // this hook detect click outside of sepecified component and calls the provider function
export default function useOnClickOutside(ref,handler){
    
    useEffect(() => {
      
     // define the listner function who is called on touch/click events
     const listner =(event)=>{
        // if the click/touch event originated inside the ref element ,do nothing
        if(!ref.current || ref.current.contains(event.target)){
            return;
        }
        // otherwise call the provided handler function
        handler(event);
     };
     // add event listner for mousedown and touchstart event on the document
     document.addEventListener("mousedown",listner);
     document.addEventListener("touchstart",listner);

     // cleanup function to remove the event listner when the components unmount or when the ref/handler dependencies change

      return () => {
        document.removeEventListener("mousedown",listner);
        document.removeEventListener("touchstart",listner);
      };
    }, [ref,handler])// only run this effect when the ref or handler function or change
    
   
}