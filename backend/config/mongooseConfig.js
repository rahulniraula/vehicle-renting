const mongoose = require("mongoose");
(async () => {
    await mongoose.connect(
        process.env.CONNECTION_URL,
        {
            dbName: process.env.DB_NAME
        });
})()

module.exports = mongoose;