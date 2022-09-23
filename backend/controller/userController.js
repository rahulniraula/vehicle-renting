const { User } = require("../model/userModel");
const { validatePassword ,encryptPassword} = require("../util");

function getUsers(req, res, next) {
    createUser(req, res, next);
}
async function createUser(req, res, next) {
    try {
        const { firstName, middlename, lastName, email, password } = req.body;
        if (!validatePassword(password)) {
            throw new Error("Password should be atleast 6 characters long.");
        }
        const user = await User.create({
            firstName,
            middlename,
            lastName,
            email,
            password:await encryptPassword(password)
        });
        res.json(user);
    }catch(e){
        console.log(e);
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