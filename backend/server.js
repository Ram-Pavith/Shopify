const path=require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors =  require('colors')
const morgan = require('morgan')
const { notFound, errorHandler } =require('./middleware/errorMiddleware.js')
const connectDB = require('./config/db.js')

const productRoutes = require('./routes/productRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')
const uploadRoutes = require('./routes/uploadRoutes.js')
const products = require('./data/products.js')

dotenv.config()

connectDB()

const app = express()
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

// app.use('/api/products', productRoutes)
// app.use('/api/users', userRoutes)
app.get('/api/products',(req,res)=>{
  res.json(products)
})

app.get('/api/products/:id',(req,res)=>{
  const product = products.filter((p)=>p.brand === req.params.id)
  res.json(product)
})
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirnametemp = path.resolve()
app.use('/uploads', express.static(path.join(__dirnametemp, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirnametemp, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirnametemp, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5004

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV||PORT} mode on port ${PORT}`.yellow.bold
  )
)
