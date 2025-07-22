const rateLimit = require('express-rate-limit');
const redisClient = require("../config/redis.config");
const {RedisStore} = require("rate-limit-redis");
const { keyGeneratorIp } = require('express-rate-limit');
/**
 * Middleware de rate-limiting configurable.
 * @param {Object} options - Configuración del rate-limiter.
 */
function customRateLimit(options) {
    const config = {
      windowMs: options.windowMs,
      max: options.max,
      message: options.message,
      standardHeaders: true,
      legacyHeaders: false,
      store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
      }),
    };
  
    if (options.keyType === 'user') {
      config.keyGenerator = (req, res) => {
        return req.headers["user-id"]?.toString();
      };
    }
  
    return rateLimit(config);
  }

module.exports = customRateLimit;


