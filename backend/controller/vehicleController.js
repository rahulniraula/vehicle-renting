const { Vehicle } = require("../model/systemModels");
const { create, list, get, deleteItem, patchItem, bookItem } = require("../service/vehicleService");
const { successResponse } = require("../util");

async function createVehicle(req, res, next) {
    try {
        await create({ ...req.body, userId: req.user._id,location:[req.body.longitude,req.body.latitude] });
        res.json(successResponse());
    } catch (e) {
        next(e);
    }
}
async function listVehicle(req, res, next) {
    try {
        const data = await list(req.query);
        res.json(successResponse(data));
    } catch (e) {
        next(e);
    }
}
async function getVehicle(req, res, next) {
    try {
        const data = await get(req.params.id);
        res.json(successResponse(data));
    } catch (e) {
        next(e);
    }
}
async function deleteVehicle(req, res, next) {
    try {
        const data = await deleteItem(req.params.id);
        res.json(successResponse(data));
    } catch (e) {
        next(e);
    }
}
async function patchVehicle(req, res, next) {
    try {
        const data = await patchItem(req.params.id, req.body);
        res.json(successResponse(data));
    } catch (e) {
        next(e);
    }
}
async function bookVehicle(req, res, next) {
    try {
        const data = await bookItem(req);
        res.json(successResponse(data));
    } catch (e) {
        next(e)
    }
}
module.exports = { createVehicle, listVehicle, getVehicle, deleteVehicle, patchVehicle, bookVehicle }