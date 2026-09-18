// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

export const authMiddleWare = async (req, res, next) => {
    try {
        const headers = req.headers.authorization;

        if (!headers) {
            return res.status(400).json({ message: "Auth token is missing" });
        };
        const token = headers.split(" ")[1];

        const decoded = jwt.verify(token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};




