
const Redis = require("ioredis");
const redis = new Redis({
    host: "localhost",
    port: 6379
});

exports.redis=redis;
