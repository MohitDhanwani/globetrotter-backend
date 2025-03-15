const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userScore: {
        type: Number,
    }
})

const User = mongoose.model("Users" , userSchema);

module.exports = User