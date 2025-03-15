const express = require("express");
const route = express.Router();
const DATA = require("../DATA.json"); //34
const userModel = require("../models/user.model.js")

function getRandomNumber(){
    return Math.floor(Math.random() * 33)
}

route.get("/" , (req , res) => {

    try {
    const randomNumber = getRandomNumber();
   const randomQuestionData = DATA[randomNumber];

   let options = [];

   if(randomNumber > 0 && randomNumber < 29){
       options = [
           DATA[randomNumber + 1].city, 
           DATA[randomNumber].city,
           DATA[randomNumber + 2].city,
           DATA[randomNumber + 3].city
       ];
   } else {
       options = [
           DATA[randomNumber - 3].city,
           DATA[randomNumber - 2].city,
           DATA[randomNumber].city,
           DATA[randomNumber - 5].city
       ];
   } 

   return res.status(200).send({ gameQuestion: randomQuestionData, options: options, randomNumber: randomNumber });
    } catch (error) {
        console.error("Error in playing game" , error);
        return res.status(400).send("Please login before continuing futher");
    }

   
})


route.post("/checkAnswer" , async (req , res) => {
    const {randomNumber , option} = req.body;

    const userID = req.user.userID;
    if(!randomNumber || !option) {
        return res.status(400).send("Please Select any option before submitting");
    }
    if(DATA[randomNumber].city === option) {
        const updateScore = await userModel.findByIdAndUpdate(userID , { $inc: { userScore: 1 } }, { new: true });
        return res.status(200).send({msg: "Correct Answer 🎉🎯" , score: updateScore.userScore})
    } else {
        const score = await userModel.findById(userID);
        return res.status(200).send({msg: "Incorrect Answer 🚫⚠️", score: score.userScore});
    }
})

route.post("/resetgame" , async(req , res)=>{
    const userID = req.user.userID
    try {
        const resetScoreResponse = await userModel.findByIdAndUpdate(userID , {userScore: 0});
        return res.status(200).send("Score Reset to 0!");
    } catch (error) {
        console.error("error in reseting score" , error);
        return res.status(500).send("Error in reseting score to 0");
    }
})

route.get("/checkAuth" , async(req , res) => {
    try {
        return res.status(200).send("User authenticated!")
    } catch (error) {
        console.error("user is accessing without authenticatiing");
        return res.status(403).send("Pease login before continuing further!");
    }
})

module.exports = route;