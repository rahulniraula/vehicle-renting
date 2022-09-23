const { create } = require("../service/vehicleService");

function createVehicle(req, res, next) {
    const { vehicletype, brand, engine, availability,
        longitude, latitude, images, description,
        //user, booking
    } = req.body;
    create(req.body);
    res.json();

}
module.exports = { createVehicle }