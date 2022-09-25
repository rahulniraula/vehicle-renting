const express=require("express");
const app=express();
const cors=require("cors");
const morgan=require("morgan")
const verifyJwt=require("./middleware/verifyJwt");
const {getConfig}=require("./controller/utilController");

require("dotenv").config();

const port=process.env.APP_PORT || 3000;

const authRoutes=require("./routes/authRoute");
const userRoutes=require("./routes/userRoute");
const vehicleRoute=require("./routes/vehicleRoute");
const { errorResponse } = require("./util");

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api',authRoutes);
app.use('/api/users',verifyJwt,userRoutes);
app.use('/api/vehicles',verifyJwt,vehicleRoute);
app.use('/api/config',getConfig);
app.use((error,req,res,next)=>{
    res.status(400).json(errorResponse(error.message));
});
app.listen(port,()=>{
    console.log(`Application Listening on port ${port}`);
})