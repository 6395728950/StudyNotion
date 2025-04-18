import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Thead ,Th,Td,Tr} from 'react-super-responsive-table';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { fetchInstructorCourses } from '../../../../services/operation/Courseapi';
import ConfirmationModal from '../../Homepage/common/ConfirmationModal';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom';
import { deleteCourse } from '../../../../services/operation/Courseapi';
import { COURSE_STATUS } from '../../../../utils/constants';
 
 

// create delete course api
const CourseTable = ({Courses,setCourses}) => {
    const dispatch = useDispatch();
    const {course} = useSelector((state)=>state.course);
    const[loading,setLoading] = useState(false);
    const{token} = useSelector((state)=>state.auth);
    const[confirmationModal,setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    console.log("value of course inside the course table it come from redux store",course);
  const handleCourseDelete = async(courseId)=>{
     setLoading(true);
     await deleteCourse({courseId:courseId},token);
     const result = await  fetchInstructorCourses(token);
     
     if(result){
        setCourses(result);
     }
     setConfirmationModal(null);
     setLoading(false);
  }
   console.log("check value of course inside the courseTable",Courses);

  return (
    <div className='text-white border border-richblack-800 w-3/4'>
      <Table>
        <Thead>
            <Tr className='flex gap-x-10 border border-richblack-800 p-4 ' >
                 <Th className='text-left'>Courses</Th>
                <Th className='flex gap-12 ml-[295px]'>
                <Th >Duration</Th>
                <Th >Price</Th>
                <Th >Actions</Th>
                </Th>
            </Tr>
        </Thead>
        <Tbody>
             {
                Courses.length===0 ?(
                    <Tr>
                        <Td>
                            No Courses Found
                        </Td>
                    </Tr>
                ):(
                    Courses?.data?.map((course)=>(
                        <Tr key={course._id} className="flex gap-x-10 border-richblack-800 p-8 ">
                                <Td className="flex gap-x-4">
                                    <img
                                    src={course?.thumbnail}
                                    className='h-[150px] w-[220px] rounded-lg object-cover'></img>
                                    <div className='flex flex-col'>
                                          <p>{course.courseName}</p>
                                          <p>{course.coursedesc}</p>
                                          <p>Created:{course.createdAt.split("T")[0]}</p>
                                          {
                                                 course.status===COURSE_STATUS.DRAFT ?(
                                                    <p className='text-pink-50'>DRAFTED</p>
                                                 ):(
                                                    <p className='text-yellow-50'>PUBLISHED</p>
                                                 )
                                          }
                                    </div>
                                </Td>
                                <Td>
                                    2hr 30
                                </Td>
                                <Td>
                                    ${course.Price}
                                </Td>
                                <Td className='flex '>
                                    <MdEdit disabled=
                                    {loading} className='mr-[19px]' onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}/>
                                    <MdDelete  disabled={loading}
                                     onClick={()=>{
                                        setConfirmationModal({
                                            text1:"Do you want to delete this course?",
                                            text2:"All the data related to this course will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler:!loading ?()=>handleCourseDelete(course._id):()=>{},

                                            btn2Handler:!loading ?()=>setConfirmationModal(null):()=>{},
                                        })
                                     }} />

                                </Td>
                        </Tr>
                    )

                    )
                )
             }
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modaldata={confirmationModal}/>}

    </div>
  )
}

export default CourseTable