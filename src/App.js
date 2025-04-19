import "./App.css";
import {Route,Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/core/Homepage/common/navbar";
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Instructordetails from "./components/Instructordetails";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import OpenRoute from "./components/core/Auth/OpenRoute";
import About from "./Pages/about";
import Contactus from "./Pages/Contactus";
import Dashboard from "./Pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
 import PrivateRoute from "./components/core/Dashboard/PrivateRoute";
import Error from "./Pages/Error";
 import Settings from "./components/core/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import {  useSelector } from "react-redux";
import Mycourse from "./components/core/Dashboard/Mycourse";
import AddCourse from "./components/core/Dashboard/AddCourse";
import CourseUpload from "./components/core/Dashboard/AddCourse/courseUpload";
 
import InstructorCourse from "./components/core/Dashboard/InstructorCourse";
import Editcourse from "./components/core/Dashboard/EditCourse/Editcourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
 
import PurchaseHistory from "./components/core/Dashboard/PurchaseHistory";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import ResetComplete from "./Pages/ResetComplete";
 
function App() {
  const{user} = useSelector((state)=>state.profile)
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  return (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
         <Navbar></Navbar>
          <Routes>
            <Route path="/" element = {       <Home></Home>    }> </Route>
            <Route path="catalog/:catalogName" element={<Catalog></Catalog>}/>
            <Route path="login" element =  {  <OpenRoute><Login></Login>   </OpenRoute> }></Route>
            <Route path="signup" element = {  <OpenRoute><Signup></Signup></OpenRoute>  }></Route>
  <Route path="forgot-password" element = {   <OpenRoute><ForgotPassword></ForgotPassword>   </OpenRoute> }></Route>

         <Route path="instructor" element={   <OpenRoute><Instructordetails></Instructordetails></OpenRoute> }></Route>
         <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route path="resetComplete" element={<OpenRoute>
        <ResetComplete></ResetComplete>
        </OpenRoute>}></Route>
         <Route path="verify-email" element={ <OpenRoute><VerifyEmail></VerifyEmail></OpenRoute>  }></Route>
         <Route path="about" element={ <About></About>    }></Route>
         <Route path="contact" element={ <Contactus></Contactus>  }></Route>
        
         <Route path="mycourses" element={<Mycourse></Mycourse>}></Route>
         <Route path="courses/:courseId" element={<CourseDetails/>}/>
         <Route path="catalog" element={<Catalog></Catalog>}></Route>
         
         <Route path="dashboard"
      element={
           
       
           <Dashboard></Dashboard> 
         
       
         
      }   >
        
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="Settings" element={<Settings />} />
    
      {
        user?.accountType===ACCOUNT_TYPE.STUDENT && (
          <>
              <Route path="cart" element={ <Cart></Cart> }></Route>
              <Route path="enrolled-courses" element={ <EnrolledCourses></EnrolledCourses>}></Route>
              <Route path="purchase-history" element={<PurchaseHistory></PurchaseHistory>}></Route>
             
          </>
        )
       }

{
        user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
          <>
              
              <Route path="add-course" element={<AddCourse></AddCourse>} ></Route>
              <Route path="mycourse/course-upload" element={<CourseUpload></CourseUpload>} ></Route>
              <Route path="my-courses" element={<InstructorCourse></InstructorCourse>}/>
              <Route path="edit-course/:courseId" element={<Editcourse></Editcourse>}/>
              <Route path="instructor-dashboard" element={<Instructor></Instructor>}></Route>
               
           

          </>
        )
       }
          <Route path="settings" element={<Settings />} />
         </Route> 
        

     {/* here we create nested route for viewcourse */}
     <Route element={
      
        
             <PrivateRoute>
              <ViewCourse></ViewCourse>
             </PrivateRoute>
         
     
     }>


     {
      user?.accountType === ACCOUNT_TYPE.STUDENT && (
        <>
        <Route
        path="view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
        element={<VideoDetails></VideoDetails>}>
          
        </Route>
        </>
      )
     }

     </Route>

     {/* <Route    path="view-course/:courseId/section/:sectionId/sub-section/:subsectionId" element={<ViewCourse></ViewCourse>}>

     </Route> */}

        
            <Route path="*" element={<Error></Error>}></Route>
          </Routes>
        </div>
  );
}
 
export default App
