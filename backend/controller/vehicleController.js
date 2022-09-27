const { create,list,get,deleteItem,patchItem,bookItem } = require("../service/vehicleService");
const { successResponse } = require("../util");

function createVehicle(req, res, next) {
    create({...req.body,user:req.user._id});
    res.json(successResponse());

}
async function listVehicle(req,res,next){
    const data=await list(req.query);
    res.json(successResponse(data));
}
async function getVehicle(req,res,next){
    const data=await get(req.params.id);
    res.json(successResponse(data));
}
async function deleteVehicle(req,res,next){
    const data=await deleteItem(req.params.id);
    res.json(successResponse(data));
}
async function patchVehicle(req,res,next){
    const data=await patchItem(req.params.id,req.body);
    res.json(successResponse(data));

}
async function bookVehicle(req,res,next){
    try{
        const data=await bookItem(req);
        
        res.json(successResponse(data));
    }catch(e){
        next(e)
    }
    
}
module.exports = { createVehicle ,listVehicle,getVehicle,deleteVehicle,patchVehicle,bookVehicle}