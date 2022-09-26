const moment = require("moment/moment");
const { Vehicle } = require("../model/systemModels");

function create(vehicleInfo){
    Vehicle.create(vehicleInfo);

}
async function list(){
    return await Vehicle.find({"prices.date":{$gte:moment(moment().format("YYYY-MM-DD"))}},{"prices._id":0});
}
async function get(id){
    return await Vehicle.find({_id:id});
}
async function deleteItem(id){
    return await Vehicle.deleteOne({_id:id});
}
async function patchItem(id,data){
    return await Vehicle.updateOne({_id:id},data);
}
module.exports={create,list,get,deleteItem,patchItem};