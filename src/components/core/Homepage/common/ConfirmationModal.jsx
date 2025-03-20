import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({ modaldata = {} }) => {
  // console.log("what is come in modal data",modaldata?.btn1Text);
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modaldata?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modaldata?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          
          <button className='bg-yellow-50 text-richblack-900 gap-x-2 py-2 px-5 cursor-pointer rounded-md font-semibold' onClick={modaldata?.btn1Handler}>
            {modaldata?.btn1Text}
          </button>
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
            onClick={modaldata?.btn2Handler}
          >
            {modaldata?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal;
