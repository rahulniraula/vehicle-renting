let {vehicleTypes,carBrands, transmissionTypes,successResponse} = require("../util");
function getConfig(req,res,next){
    let data={vehicleTypes:vehicleTypes(),vehicleBrands:carBrands(),transmissionTypes:transmissionTypes()};
    res.json(successResponse(data));
}
module.exports={getConfig};