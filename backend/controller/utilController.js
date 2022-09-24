let {vehicleTypes,carBrands, successResponse} = require("../util");
function getConfig(req,res,next){
    let data={vehicleTypes:vehicleTypes(),vehicleBrands:carBrands()};
    res.json(successResponse(data));
}
module.exports={getConfig};