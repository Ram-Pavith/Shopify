import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import routes from "./routes/index.js"
import helmet from "helmet"
import compression from "compression"
import unknownEndpoint from "./middleware/unKnownEndpoint.js"
import { handleError } from "./helpers/error.js"
import loggerMiddleware from './middleware/loggerMiddleware.js'
const PORT = process.env.PORT||5004

const app = express()

dotenv.config()

app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use("/api", routes);
app.use(unknownEndpoint);
app.use(handleError);
app.use(loggerMiddleware)

app.get("/", (req, res) =>
  res.send("<h1 style='text-align: center'>E-COMMERCE API</h1>")
);

app.get('/api/products',(req,res)=>{
  res.json(products)
})

app.get('/api/products/:id',(req,res)=>{
  const product = products.filter((p)=>p.brand === req.params.id)
  res.json(product)
})


app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
