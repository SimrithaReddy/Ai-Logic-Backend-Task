
// import Redis from "ioredis";

const Redis = require("ioredis");
const redis = new Redis({
    host: "localhost",
    port: 6379
});

export default redis;
