import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import adminRoute from './Routes/admin.js'
import productRoute from './Routes/product.js'
import userRoute from './Routes/user.js'
import orderRoute from './Routes/order.js'



dotenv.config()

connectDB().then()

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: false }));

// app.use('/', (req, res)=>{
//   res.send('Server running successfully')
// })


app.use('/api/15689/admin', adminRoute)
app.use('/api/product', productRoute)
app.use('/api/user', userRoute)
app.use('/api/order', orderRoute)



app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)