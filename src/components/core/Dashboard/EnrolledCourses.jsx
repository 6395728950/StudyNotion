import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operation/profileapi';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {  // ❌ Remove async here (Not needed)
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate= useNavigate();

  const getEnrolledCourses = async () => {
    try {
      if (!token) return; // ✅ Check if token is available

      const response = await getUserEnrolledCourses(token); // ✅ Call API properly
      console.log("Fetched Enrolled Courses:", response);

      if (response && response?.data) { // ✅ Check if valid data exists
        setEnrolledCourses(response.data);
      } else {
        setEnrolledCourses([]); // ✅ Prevent UI crashes
      }
    } catch (error) {
      console.error("Unable to fetch Enrolled Courses:", error);
      setEnrolledCourses([]); // ✅ Handle errors properly
    }
  };

  useEffect(() => {
    getEnrolledCourses();  // ✅ Call function inside useEffect
  }, [token]); // ✅ Re-fetch if token changes
  console.log("check the value of enrolled course",enrolledCourses);

  return (
    <div className='text-white flex flex-col mx-48 mt-10 items-center'>
      <h1 className='text-2xl font-semibold '>Enrolled Courses</h1>
      {
        enrolledCourses === null ? (
          <div>Loading...</div> // ✅ Show loading state
        ) : enrolledCourses.length === 0 ? (
          <p>You have not enrolled in any courses yet.</p>
        ) : (
          <div className='border border-richblack-600 w-[800px] rounded-md '>
            <div className='border border-richblack-600 flex justify-between bg-richblack-400 rounded-t-md'>
              <p>Course Name</p>
              <p>Duration</p>
              <p>Progress</p>
            </div>
            <div>
              {enrolledCourses.map((course, index,arr) => (
                <div 
                   className={`flex items-center border border-richblack-700 justify-between `}
                   key={index}> {/* ✅ Add unique key */}
                  {/* Left part */}
                  <div className='flex ' onClick={() => {
                    navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subsection?.[0]?._id}`)
                  }}>
                    <img src={course.thumbnail} alt="Course Thumbnail" className='h-10 w-20 rounded-md m-4' />
                    <div className='mt-3'>
                      <p>{course.courseName}</p>
                      <p>{course.coursedesc}</p>
                    </div>
                  </div>
                  {/* Middle part */}
                  <div>
                    {course?.totalDuration}
                  </div>
                  {/* Right part */}
                  <div>
                    <p>Progress: {course.progressPercentage || 0}%</p>
                    <ProgressBar 
                      completed={course.progressPercentage || 0}
                      height='8px'
                      isLabelVisible={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default EnrolledCourses;

