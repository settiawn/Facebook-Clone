const Redis = require("ioredis");

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASS;
const redisDB = 0;

const redis = new Redis({
  host: redisHost,
  port: redisPort,
  password: redisPassword,
  db: redisDB,
});

module.exports = redis;
