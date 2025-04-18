import React, { useState } from 'react'
import {Chart ,registerables}  from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const[CurrentChart,setCurrChart] = useState("students");


    // function to generate random colors

    const getRandomColors = (numColors) =>{
        const colors = [];
        for(let i =0;i<numColors;i++){
            const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    // create data for chart displaying Student info

const chartDataForStudents  ={
    labels:courses.map((course) => course.courseName),
    datasets: [
        {
            data:courses.map((course) =>course.totalStudentEnrolled),
            backgroundColor:getRandomColors(courses.length),
        }
    ]
}
    // create data for chart displaying income info

    const chartDataForIncome ={
    labels:courses.map((course) => course.courseName),
    datasets: [
        {
            data:courses.map((course) =>course.totalAmountGenerated),
            backgroundColor:getRandomColors(courses.length),
        }
    ]
}

    // create options

    const options ={
           
    };

  return (
    <div className='bg-richblack-700 w-2/3 rounded-md '>
        <p className='m-4'>Visualise</p>
    <div className='flex gap-x-5 justify-end mr-2 -mt-8'>
    <button
     onClick={() => setCurrChart("students")}>
        Student
    </button>

    <button
    onClick={()=> setCurrChart("income")} className='text-yellow-50 bg-richblack-900 rounded-md w-20 h-8'>Income</button>
    </div>
    <div className='' >
        <Pie
        data={CurrentChart==="students"? chartDataForStudents :chartDataForIncome}
        options={options} />
    </div>
    </div>
  )
}

export default InstructorChart