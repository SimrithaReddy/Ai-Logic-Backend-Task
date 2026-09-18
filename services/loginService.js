import express from "express";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userSchema from "../schemas/userSchema";

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const jwt = require("jsonwebtoken");
dotenv.config();




export const registrationService = async (req, res, next) => {
    try {
        const body = req.body;

        if (!body.email) {
            return res.status(400).json({ message: `${body.email} is mandatory in request body.` });
        };
        if (!body.name) {
            return res.status(400).json({ message: `${body.name} is mandatory in request body.` });
        };
        if (!body.password) {
            return res.status(400).json({ message: `${body.password} is mandatory in request body.` });
        };

        let hashpassword = "";
        bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
            hashpassword = hash;
        });

        const createUser = await userSchema.create({
            email: body.email,
            name: body.name,
            password: body.hashpassword,
        });


        return res.status(200).json({ message: "User created successfully." });

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const loginService = async (req, res, next) => {
    try {
        const body = req.body;

        if (!body.email) {
            return res.status(400).json({ message: `${body.email} is mandatory in request body.` });
        };
        if (!body.password) {
            return res.status(400).json({ message: `${body.password} is mandatory in request body.` });
        };

        let result = false;
        bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
            result == true
        });

        if (!result) {
            return res.status(400).json({ message: "Incorrect password." });
        };

        const createUser = await userSchema.findOne({
            email: body.email,
        });


        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: createUser
        }, process.env.JWT_SECRET);


        return res.status(200).json({ message: token });

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
