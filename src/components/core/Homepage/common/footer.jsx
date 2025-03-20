import React from 'react'
import { FaCopyright, FaFacebook, FaGoogle, FaHeart, FaTwitter, FaYoutube } from 'react-icons/fa6'
import logo from"../../../../assets/Logo/Logo-Full-Light.png"

const Footer = () => {
  return (
    <div  className='w-11/12 bg-richblack-700'>
      <div className='h-[70px]'></div>
      <div className='flex flex-row'>
        <div className='flex flex-row border-r-2 border-spacing-x-8 border-spacing-y-4 border-richblack-200 border-dotted'>
            <div className='ml-10 '>
                <img src={logo} alt="logo"></img>
               
                <div className='flex flex-col gap-2 text-richblack-300 '>
                    <h2>Company</h2>
                    <a href="#about">About</a>
                    <a href="#careers">Careers</a>
                    <a href="#affiliates">Affiliates</a>
                </div>
                <div className='flex flex-row gap-3'>
                    {/* <img src={facebook} alt="facebook" />
                    <img src={google} alt="google" />
                    <img src={twit} alt="" /><img src="" alt="" /> */}
                    <FaFacebook className=' text-richblack-400'></FaFacebook>
                    <FaGoogle className=' text-richblack-400'>
        
                    </FaGoogle>
                    <FaTwitter className=' text-richblack-400'></FaTwitter>
                    <FaYoutube className=' text-richblack-400'></FaYoutube>
                </div>
            </div>
            <div className='flex flex-col gap-5 ml-10'>
                <div className='flex flex-col gap-2 text-richblack-300'>
                <h3 className='text-richblack-5 '>Resources</h3>
                <a href="#Article">Articles</a>
                <a href="#Blog">Blog</a>
                <a href="#ChartSheet">Chart Sheet</a>
                <a href="#codechallenges">Code challenges</a>
                <a href="#docs">Docs</a>
                <a href="#projects">Projects</a>
                <a href="#videos">Videos</a>
                <a href="#workspaces">Workspaces</a>
                </div>
                <div className='text-richblack-300'>
                    <h3 className='text-richblack-5 mb-2'>Support</h3>
                    <a href="#helpcenter">Help center</a>
                </div>
 
            </div>
            <div className='flex flex-col gap-2 text-richblack-300 mx-10'>
                <h3 className='text-richblack-5'>Plans</h3>
                  <a href="#paidmemberships">Paid memberships</a>
                  <a href="#forstudents">For students</a>
                  <a href="#businesssolutions">Business solutions</a>
            </div>
        </div>
         {/* second part */}
          <div className='flex flex-row  text-richblack-300'>
              <div className='flex flex-col gap-3 mx-10'>
                <h1 className='text-richblack-5 font-medium'>Subjects</h1>
                   <a href="#ai">AI</a>
                   <a href="#cloudcomputing"> cloud Computing</a>
                   <a href="#codefoundations">Code foundations</a>
                   <a href="#computerscience">Computer Science</a>
                   <a href="#cybersecurity">Cyber security</a>
                   <a href="#DataAnalytics">Data Analytics</a>
                   <a href="#Datascience">Data Science</a>
                   <a href="#DataVisualization">Data Visualization</a>
                   <a href="#developertools">Developer Tools</a>
                   <a href="#devops">Dev ops</a>
                   <a href="#gamedevelopemnt">Game Developement</a>
                   <a href="#it">IT</a>
                   <a href="#machinelearning">Machine Learning</a>
                   <a href="#maths">Maths</a>
                   <a href="#mobiledevelopment">Mobile Development</a>
                   <a href="#webdesign">Web Design</a>
                   <a href="#webdevelopment">Web Development</a>
              </div>
              <div className='flex flex-col gap-3 mr-10'>
                <h1 className='text-richblack-5  font-medium'>Languages</h1>
                  <a href="#bash">Bash</a>
                  <a href="#c">C</a>
                  <a href="#c++">C++</a>
                  <a href="#c#">C#</a>
                  <a href="#go">Go</a>
                  <a href="#html&css">HTML & CSS</a>
                  <a href="#Java">Java</a>
                  <a href="#javascript">JavaScript</a>
                  <a href="#Kotlin">Kotlin</a>
                  <a href="#php">PHP</a>
                  <a href="#python">Python</a>
                  <a href="#r">R</a>
                    <a href="#ruby">Ruby</a>
                    <a href="#sql">SQL</a>
                    <a href="#swift">Swift</a>
              </div>
              <div className='flex flex-col gap-3'>
                <h1 className='text-richblack-5  font-medium'>Career building</h1>
                  <a href="#careerpaths">Career Paths</a>
                  <a href="#careerservices">Career Services</a>
                  <a href="#interviewprep">Interview prep</a>
                  <a href="#professional">Professional certification</a>
                  <a href="#fullcatalog">Full Catalog</a>
                  <a href="#Betacontent">Beta Content</a>
              </div>
          </div>
           

        
        </div> 
        <div className='h-[50px]'></div>
        <div className='flex justify-between m-10 border-t-2 border-dotted  border-richblack-200'>
        <div className='flex flex-row gap-2 text-richblack-300'>
       <p className='border-l-0 border-richblack-800 border-spacing-x-2'>Privacy Policy</p>
       <p>Cookie Policy</p>
       <p>Terms</p>

          </div>
          <div className='flex flex-row text-richblack-300 gap-1 mb-10 '>
          <p>Made with </p>
            <FaHeart ></FaHeart>
            <p> Kuldeep parmar</p>
            
            <FaCopyright></FaCopyright>
            <p> 2024 Studynotion</p>
            
          
           
          </div>
        </div>
        <div>
             
        </div>
    </div>
  )
}

export default Footer;