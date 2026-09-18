// import express from "express";
// import http from "http";
// import http from "dotenv";
// import mongoose from "mongoose";

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const { registrationService, loginService } = require('./services/loginService');
const { loginRatelimiter } = require('./config/middleware.js/rateLimiter');
const { authMiddleWare } = require('./config/middleware.js/auth');


dotenv.config();

const app = express();
const server = http.createServer();


app.use(express.json());

app.post("/add-user", registrationService);
app.get("/login", loginRatelimiter, loginService);
app.get("/get-user", authMiddleWare, (req, res, next) => {
    res.json({
        message: "User fetched sucessfully."
    })
});




server.listen(3000, () => {
    console.log("Server running on port 3000........")
});



async function connectMongo(){
    await mongoose.connect(process.env.MONGO_URI)
};

connectMongo()