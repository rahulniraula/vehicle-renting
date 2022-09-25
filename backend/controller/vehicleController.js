const { create } = require("../service/vehicleService");
const { successResponse } = require("../util");

function createVehicle(req, res, next) {
    create({...req.body,user:req.user._id});
    res.json(successResponse());

}
module.exports = { createVehicle }