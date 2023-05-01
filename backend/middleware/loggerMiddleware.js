import expressPinoLogger from 'express-pino-logger'
import { logger } from '../utils/logger.js'
const loggerMiddleware = expressPinoLogger({
    logger:logger,
    autoLogging:true,
})
export default loggerMiddleware