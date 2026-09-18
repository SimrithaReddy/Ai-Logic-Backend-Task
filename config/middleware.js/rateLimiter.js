const redis = require("../redis");

const MAX_ATTEMPTS = 5;
const WINDOW = 60; //1min;



export const loginRatelimiter = async (req, res, next) => {
    try {
        const ip = req.ip;

        const key = `login-attempts:${ip}`;

        const attempts = await redis.incr(key);

        if (attempts === 1) {
            await redis.expire(key, WINDOW);
        }

        if (attempts > MAX_ATTEMPTS) {
            return res.status(429).json({
                message: "Too many login request"
            });
        };

        next();

    }
    catch (error) {
        throw Error(error.message);
    }
};




