const express=require("express");
const { createVehicle } = require("../controller/vehicleController");
const router=express.Router();

router.post('/',createVehicle);
module.exports=router;