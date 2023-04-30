// import mongoose from 'mongoose'

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI||'mongodb://localhost:27017/tempdb', {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     })

//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
//   } catch (error) {
//     console.error(`Error: ${error.message}`.red.underline.bold)
//     process.exit(1)
//   }
// }

// export default connectDB
import pg from 'pg'
const connectDB = async () =>{
  try{
    const conn = new pg.Pool({
      host:"localhost",
      user:"postgres",
      port:5432,
      password:"postgres",
      database:"ShopifyDB"
  }) 
  }
  catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}
export default connectDB