import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import SubsectionModal from "./SubsectionModal";
 import  ConfirmationModal from "../../../Homepage/common/ConfirmationModal";
import { deletesection, deletesubsection } from "../../../../../services/operation/Courseapi";
import { setCourse } from "../../../../../Slices/courseSlice";

const NestedView = ({handleChangeEditSectionName}) => {
  const dispatch = useDispatch();
  const {course} = useSelector((state)=>state.course);
 const{token}  = useSelector((state)=>state.auth);  
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationmodal, setconfirmationmodal] = useState(null);
  const{editCourse}  = useSelector((state)=>state.course.editCourse);
  if(editCourse){
     course=editCourse;
  }
  useEffect(() => {
    console.log("Updated Redux Course:", editCourse);
  }, [editCourse]);

  const handleDeleteSubSection = async (subsectionId, sectionId) => {
    

      // TODO: extra kya kr sakte hai yaha pr
      const result = await deletesubsection({ subsectionId, sectionId, token });
      console.log("What comes in result when we delete subsection:", result);
      
      if (result) {
        const updatedCourseContent = course?.data?.courseContent.map((section) =>
          section._id === sectionId
            ?  result?.data
            : section
        );
      
        const updatedCourse = {
          ...course,
          data: {
            ...course.data,
            courseContent: updatedCourseContent  // ✅ Fixed typo
          }
        };
      
        dispatch(setCourse(updatedCourse));
      }
      
      
     
    
    setconfirmationmodal(null);
  };
  console.log("value of course",course);
  const handleDeleteSection = async (sectionId) => {
    // console.log("what is value of courseID",course?.data?._id)
    const result = await deletesection({
      sectionId,
      courseId: course?.data?._id,
      token,
    });
     
    if (result) {
      dispatch(setCourse(result));
    }
    setconfirmationmodal(null);
  };

  
  
  return (
    <div>
      <div  className="bg-richblack-700 p-6  px-8 rounded-lg">
     
         
        {course?.data?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex items-center justify-between gap-x-3 border-b-2 text-richblack-500">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu />
                
                  
                   
                     
                       <p className="text-richblack-300">{section?.sectionName}</p>
                  
                   
                
                {/* {
                  section?.data?.subsection?<video src={section?.data?.subsection[0]?.videoUrl} controls className="h-24 w-24" ></video> :<h1>Loading...</h1>
                } */}
              </div>
              <div className="flex items-center gap-x-3">
                <button onClick={()=> handleChangeEditSectionName(section._id, section.sectionName)}>
                  <MdEdit />
                </button> 
                <button
                  onClick={() =>
                    setconfirmationmodal({
                      text1: "Delete this Section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setconfirmationmodal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line />
                </button>
                <span>|</span>
                <button>
                  <IoMdArrowDropdown className="text-xl text-richblack-300" />
                </button>
              </div>
            </summary>
        

            <div>
              {section?.subsection?.map((val) => (
               
                  
                              <div
                         key={val._id}
                  onClick={() => setViewSubSection(val)}
                  className="flex items-center justify-between gap-x-3 border-b-2"
                >
                    
                  <div className="flex items-center gap-x-3" open>
                    <RxDropdownMenu />
                     
                    <p>{val?.title}</p>
                  </div>
                  <div className="flex items-center gap-x-3" 
                    onClick ={(e)=>e.stopPropagation()}
                     >
                    <button onClick={() => setEditSubSection({ ...val, sectionId: section?._id })}>
                      <MdEdit />
                    </button>
                    <button
                      onClick={() =>
                        setconfirmationmodal({
                          text1: "Delete this subSection",
                          text2: "Current lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteSubSection(val?._id, section?._id),
                          btn2Handler: () => setconfirmationmodal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
                 
              ))}
                {console.log("check section id is come or not for adding new lecture", section._id)}
                
              <button
               
                onClick={()=> setAddSubSection(section._id)}
                 
                className="mt-4 flex items-center gap-x-2 text-yellow-50"
              >
                <AiOutlinePlus />
                <p>Add Lecture</p>
              </button>
             
            </div>
          </details>
       ))}
      </div>
      {addSubSection && (
        <SubsectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />
      )}
      {viewSubSection && (
        <SubsectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />
      )}
      {editSubSection && (
        <SubsectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />
      )}
      {/* {
        console.log("value of confirmationModal",confirmationmodal)
      } */}
      {confirmationmodal && <ConfirmationModal modaldata={confirmationmodal} />}
    </div>
  );
};

export default NestedView;
