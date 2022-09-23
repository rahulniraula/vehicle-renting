const mongoose = require("mongoose");
(async () => {
    console.log(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_NAME)
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017`,
        { dbName: process.env.DB_NAME });
})()
module.exports = mongoose;