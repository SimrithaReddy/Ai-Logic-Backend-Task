import userSchema from "../schemas/userSchema";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';


export const registrationService = async (req, res, next) => {
    try {
        const body = req.body;

        const errMsg = "is mandatory in request body.";

        if (!body.email) {
            return res.status(400).json({ message: `${body.email} ${errMsg}` });
        };
        if (!body.name) {
            return res.status(400).json({ message: `${body.name} ${errMsg}` });
        };
        if (!body.password) {
            return res.status(400).json({ message: `${body.password} ${errMsg}` });
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


        console.log(createUser);

        return res.status(200).json({ message: "User created successfully." });

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


