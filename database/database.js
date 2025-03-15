const mongoose = require("mongoose");

async function ConnectToDatabase( databaseConnectionString ) {
    try {
        await mongoose.connect(databaseConnectionString);
        console.log("Database Connected Successfully!")
    } catch (error) {
        console.error("Internal Server Error" , error);
    }
}

module.exports = ConnectToDatabase