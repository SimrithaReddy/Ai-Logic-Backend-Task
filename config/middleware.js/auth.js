const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const authMiddleWare = async (req, res, next) => {
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





exports.authMiddleWare=authMiddleWare;