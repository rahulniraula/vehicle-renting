const { login: loginService } = require("../service/authService");
const { successResponse } = require("../util");
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const data = await loginService(email, password);
        res.json(successResponse(data));
    } catch (e) {
        next(e)
    }


}
module.exports = { login }