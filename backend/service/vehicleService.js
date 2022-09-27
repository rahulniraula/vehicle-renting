const moment = require("moment/moment");
const { Vehicle } = require("../model/systemModels");

function create(vehicleInfo) {
    Vehicle.create(vehicleInfo);

}
async function list() {
    return await Vehicle.find({ "prices.date": { $gte: moment(moment().format("YYYY-MM-DD")) } }, { "prices._id": 0 });
}
async function get(id) {
    return await Vehicle.find({ _id: id });
}
async function deleteItem(id) {
    return await Vehicle.deleteOne({ _id: id });
}
async function patchItem(id, data) {
    return await Vehicle.updateOne({ _id: id }, data);
}
async function bookItem(req) {
    let res= await Vehicle.updateOne(
        { _id: req.body._id, $or:[
            {"bookings.dateTo":{$exists:false}},
            {"bookings.dateTo":{$ne:null}}
        ] },
        { $push: { bookings: { dateFrom: new Date(), dateTo: null,userId:req.user._id } } }
    );
    if(res.acknowledged==true){
        if(res.modifiedCount){
            return {message:'Vehicle Successfully Booked'};
        }
    }
    throw new Error("This vehicle is already Booked");
}
module.exports = { create, list, get, deleteItem, patchItem, bookItem };