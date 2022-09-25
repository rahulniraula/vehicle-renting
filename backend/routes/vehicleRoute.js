const express=require("express");
const { createVehicle ,listVehicle} = require("../controller/vehicleController");
const router=express.Router();

router.post('/',createVehicle);
router.get('/',listVehicle);
module.exports=router;