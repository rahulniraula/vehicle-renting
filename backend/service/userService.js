const { User } = require("../model/systemModels");
const { validatePassword, encryptPassword } = require("../util");

async function create(userData) {
    const { firstName, middlename, lastName, email, password,role } = userData;
    if (!validatePassword(password)) {
        throw new Error("Password should be atleast 6 characters long.");
    }
    const user = await User.create({
        firstName,
        middlename,
        lastName,
        email,
        role,
        password: await encryptPassword(password)
    });
    return user;
}
module.exports={create};