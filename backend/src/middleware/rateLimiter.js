const rateLimit = require("../config/upstash")

// rate limiting with upstash
// GET RID OF 'my-limit-key' AFTER IMPLEMENTING USER AUTH
const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await rateLimit.limit('my-limit-key');
        if (!success) {
            return res.status(429).json({
                message: 'Too many requests, please try again later'
            });
        }

        next()
    } catch (err) {
        console.log('Rate limit error', err)
        next(err)
    }
}

module.exports = rateLimiter