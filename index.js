const express  = require("express");
const app = express();
app.use(express.json({ limit: '100mb' }));  // Adjust as needed
app.use(express.urlencoded({ limit: '100mb', extended: true }));



const userRoute = require("./routes/User");
const  courseRoute = require("./routes/Course");
const profileRoute = require("./routes/Profile");
const paymentRoute = require("./routes/Payment");

const database = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload =  require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

// database connect
database.connect();

// middleware
app.use(express.json());

app.use(cookieparser());
app.use(
    cors({
        origin: ["http://localhost:3000",
                "https://studynotion-frontend-inky-eight.vercel.app"

        ],
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/temp",
    })
)
// cloudinary connection
cloudinaryConnect();
//routes
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/payment",paymentRoute);

// add default route
app.get("/",(req,res) =>{
    return res.json({
        success:true,
        message:"Your server is up and running..."
    })
});  

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})