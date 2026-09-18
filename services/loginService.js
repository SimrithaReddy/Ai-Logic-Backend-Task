const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");


const userSchema = require("../schemas/userSchema")

const saltRounds = 10;
dotenv.config();




const registrationService = async (req, res, next) => {
    try {
        const body = req.body;

        if (!body.email) {
            return res.status(400).json({ message: "email is mandatory in request body." });
        };
        if (!body.name) {
            return res.status(400).json({ message: "name is mandatory in request body." });
        };
        if (!body.password) {
            return res.status(400).json({ message: "password is mandatory in request body." });
        };

        const hashpassword = await bcrypt.hash(body.password, saltRounds);

        const createUser = await userSchema.create({
            email: body.email,
            name: body.name,
            password: hashpassword,
        });


        return res.status(200).json({ message: "User created successfully." });

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const loginService = async (req, res, next) => {
    try {
        const body = req.body;

        if (!body.email) {
            return res.status(400).json({ message: "email is mandatory in request body." });
        };
        if (!body.password) {
            return res.status(400).json({ message: "password is mandatory in request body." });
        };

        const createUser = await userSchema.findOne({
            email: body.email,
        });

        if (!createUser) {
            return res.status(400).json({ message: "Incorrect password." });
        };

        const result = await bcrypt.compare(body.password, createUser.password);

        if (!result) {
            return res.status(400).json({ message: "Incorrect password." });
        };

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: {
                id: createUser._id,
                email: createUser.email,
                name: createUser.name,
            }
        }, process.env.JWT_SECRET);


        return res.status(200).json({ message: token });

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.registrationService = registrationService;
exports.loginService = loginService;

