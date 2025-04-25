const {Mongoose} = require("mongoose");
const Category = require ("../models/category");
 
function getRandomInt(max){
    return Math.floor(Math.random()*max)
}
//create tag ka handler function
 exports.createCategory = async(req,res) =>{
    try{
        const {name,desc} = req.body;
        // validation
        if(!name || !desc){
            return res.status(401).json({
                success:false,
                message:"all field are required",
            });
        } 
        // create entry in db
        const Categorydetails = await Category.create({
            name:name,
            desc:desc,
        });
        console.log(Categorydetails);
        // return response
        return res.status(200).json({
            success:true,
            message:"Tag created successfully",
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
 };
 // getalltag handler function
 exports.showallCategory = async(req,res) =>{

    console.log("me yaha pr aaya hu ");
    try{
        
       const allCategory = await Category.find({});
    //    console.log("value of all category",allCategory);
     console.log("find all category successfully");
       res.status(200).json({
        success:true,
        message:"All tags returned successfully",
        data:allCategory,
       });
      
    }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message,
            });
    }
 };

 // categoryPageDetails

 exports.categoryPageDetails = async(req,res) =>{
    try{
           // get categoryId
           const{categoryId} = req.body;
           // get courses for specified categoryid
           console.log("check the value of categoryId",categoryId);

           const selectedCategory = await Category.findById(categoryId)
            .populate({
            path:"course",
              // here we change Published to Draft because still our all courses is not Published when it become Published then you need to change this 
            match:{status:"Draft"},
            populate:{
                path:"ratingAndReview",
                select: "Rating",
            },
         }).exec();

        //  selectedCategory.course.forEach(course => {
        //     console.log("Course:", course.title);
        //     course.ratingAndReview.forEach(rating => {
        //       console.log("Rating:", rating.Rating); // ✅ lowercase `rating`
        //       console.log("Review:", rating.Review);
        //     });
        //   });
          
           
        //    console.log("value of selectedCategory",selectedCategory);
           
           // validation
           if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Category not found",
                
            });
           }

           // Handle the case when there are no courses
           if(selectedCategory.course.length===0){
            console.log("No courses found for the selected category.")
            return res.status(404).json({
                success:false,
                message:"No courses found for the selected category."
            })
           }
           // get course for different categories
           
           const categoriesExceptSelected = await Category.find({
            _id:{$ne:categoryId},
            // here ne means not equal
           })
           let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
           )
           .populate({
            path:"course",
              // here we change Published to Draft because still our all courses is not Published when it become Published then you need to change this 
            match:{status:"Draft"},
            populate:{
                path:"ratingAndReview",
                select: "Rating",
            },
         }).exec();

           // get top 10 selling course
           const allCategories = await Category.find()
           .populate({
             path: "course",
               // here we change Published to Draft because still our all courses is not Published when it become Published then you need to change this 
             match: { status: "Draft" },
             populate: {
               path: "instructor",
           },
           populate:{
            path:"ratingAndReview",
            select:"Rating",
           },
           })
           .exec()
       const allCourses = allCategories.flatMap((category)=>category.course);
        
       const mostSellingCourses = allCourses
       .sort((a,b)=>b.sold-a.sold)
       .slice(0,10)

           // return response
           res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
           })

    }
    catch(error){
         console.log(error);
         return res.status(500).json({
            success:false,
            message:"Internal server error",
             error:error.message,
         });
    }
 }

