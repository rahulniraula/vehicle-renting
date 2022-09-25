const { Vehicle } = require("../model/systemModels");

function create(vehicleInfo){
    Vehicle.create(vehicleInfo);

}
async function list(){
    return await Vehicle.find({});
}
module.exports={create,list};