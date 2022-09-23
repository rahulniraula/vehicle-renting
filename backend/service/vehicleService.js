const { Vehicle } = require("../model/systemModels");

function create(vehicleInfo){
    Vehicle.create(vehicleInfo);

}
module.exports={create};