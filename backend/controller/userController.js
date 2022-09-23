const { create } = require("../service/userService");
const { validatePassword ,encryptPassword, successResponse} = require("../util");

function getUsers(req, res, next) {
    // createUser(req, res, next);
    res.json(req.headers)
}
async function createUser(req, res, next) {
    try {
        await create(req.body);
        return res.json(successResponse("User Created Successfully"));
    }catch(e){
        next(e)
    }
}
function getUserById(req, res, next) {

}
function updateUser(req, res, next) {

}
function deleteUser(req, res, next) {

}
module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser }