const {Ratelimit} = require('@upstash/ratelimit');
const {Redis} = require('@upstash/redis');

// establishes rate limiter
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, '60 s')
})


module.exports = rateLimit;