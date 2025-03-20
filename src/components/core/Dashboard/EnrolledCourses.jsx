import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operation/profileapi';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {  // ❌ Remove async here (Not needed)
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

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
//   console.log("check the value of enrolled course",enrolledCourses);

  return (
    <div className='text-white flex flex-col mx-48 mt-10'>
      <h1 className='text-2xl font-semibold '>Enrolled Courses</h1>
      {
        enrolledCourses === null ? (
          <div>Loading...</div> // ✅ Show loading state
        ) : enrolledCourses.length === 0 ? (
          <p>You have not enrolled in any courses yet.</p>
        ) : (
          <div>
            <div>
              <p>Course Name</p>
              <p>Duration</p>
              <p>Progress</p>
            </div>
            <div>
              {enrolledCourses.map((course, index) => (
                <div key={course._id}> {/* ✅ Add unique key */}
                  {/* Left part */}
                  <div>
                    <img src={course.thumbnail} alt="Course Thumbnail" />
                    <div>
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

