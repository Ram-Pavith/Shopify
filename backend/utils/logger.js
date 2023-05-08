import pino from "pino"
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const fullPath = path.join(__dirname,'../logs/logger.log')
// Create a logging instance
const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
},
pino.destination(fullPath),
);


export {logger}
