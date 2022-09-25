const { Vehicle } = require("../model/systemModels");

function create(vehicleInfo){
    Vehicle.create(vehicleInfo);

}
async function list(){
    return await Vehicle.find({});
}
async function get(id){
    return await Vehicle.find({_id:id});
}
async function deleteItem(id){
    return await Vehicle.deleteOne({_id:id});
}
module.exports={create,list,get,deleteItem};