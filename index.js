const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const databaseConnection = require("./database/database.js");
const userAuthenticationRoute = require("./userAuthenticationRoutes/userAuth.route.js");
const gameRoute = require("./games/games.route.js");
const authMiddleware = require("./middleware/middleware.js")
require('dotenv').config();
const app = express();

//Database Connection
const databaseConnectionString = process.env.MONGODB_URI;

//CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL, 
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

databaseConnection(databaseConnectionString);

app.use("/user" , userAuthenticationRoute);
app.use("/playgame", authMiddleware , gameRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})