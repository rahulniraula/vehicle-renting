const express=require("express");
const { createVehicle ,listVehicle,getVehicle,deleteVehicle} = require("../controller/vehicleController");
const router=express.Router();

router.post('/',createVehicle);
router.get('/',listVehicle);
router.get('/:id',getVehicle);
router.delete('/:id',deleteVehicle);
module.exports=router;