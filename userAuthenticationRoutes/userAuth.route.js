const express = require('express');
const route = express.Router();
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

route.post("/register" , async (req , res) => {

    const {userName , userEmail , userPassword} = req.body;
    const userScore = 0;

    if(!userName || !userEmail || !userPassword) {
        return res.status(400).send("Please Enter all credentials");
    }

    const checkUserName = await userModel.findOne({userName});

    if(!checkUserName){
        try {
            await userModel.create({ userEmail, userName, userPassword, userScore }) ;
            return res.status(201).send("User registered successfully");
           } catch (error) {
               console.error("Error in registereing user" , error);
               return res.status(500).send("Error in registering user");
           }
    } else {
        return res.status(400).send("Username is already taken, enter new one");
    }
    
})

route.post("/login" , async (req , res) => {

    const {userEmail , userPassword} = req.body;

    if(!userEmail || !userPassword) {
        return res.status(400).send("Please enter all credentials");
    }

    try {
        const userLogin = await userModel.findOne({userEmail, userPassword});
        if(userLogin){
            const jwtToken = jwt.sign({userName: userLogin.userName , userID: userLogin._id} , process.env.JWT_SECRET);

            res.cookie("LoginCookie" , jwtToken, {httpOnly: true, secure: true, sameSite:'None'});

            return res.status(200).send({userName: userLogin.userName, message: "User login success"});
        } else{
            return res.status(400).send("Please enter Valid credentails");
        }
    } catch (error) {
        console.error("Error in logging-in user" , error);
        return res.status(400).send("Error in logging in user");
    }
})

module.exports = route;