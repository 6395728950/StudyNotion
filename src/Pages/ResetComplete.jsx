import React from 'react'
import { useNavigate } from 'react-router-dom';

const ResetComplete = ({email}) => {
    const navigate = useNavigate();
    console.log("value of email",email);
    const val = email[0];
  return (
    <div>
        <h1>Reset Complete!</h1>
        <p>All done we have sent an email to </p>
        <span>{val}********@gmail.com to confirm</span>

        <button className='text-black bg-yellow-50 p-4 w-full rounded-md' onClick={navigate("/login")}>Return to login</button>
    </div>
  )
}

export default ResetComplete