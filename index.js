const express = require('express');
const http = require('http');
const dotenv = require("dotenv");
const { default: mongoose } = require('mongoose');
const { registrationService } = require('./services/loginService');
const { loginRatelimiter } = require('./config/middleware.js/rateLimiter');

dotenv.config();

const app = express();
const server = http.createServer();



app.post("/add-user", registrationService);
app.get("/login", loginRatelimiter, (req,res,next)=>{

});




server.listen(3000, () => {
    console.log("Server running on port 3000........")
});

// mongoose.connect(process.env.MONGO_URI,{
//     directConnection:true,
// });



