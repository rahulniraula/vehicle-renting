const { create,list } = require("../service/vehicleService");
const { successResponse } = require("../util");

function createVehicle(req, res, next) {
    create({...req.body,user:req.user._id});
    res.json(successResponse());

}
async function listVehicle(req,res,next){
    const data=await list();
    res.json(successResponse(data));
}
module.exports = { createVehicle ,listVehicle}