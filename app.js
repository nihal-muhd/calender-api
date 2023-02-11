const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config({ path: './.env' })
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000
const app = express()
connectDB()

const userRouter = require('./routes/user')

app.use(express.json())
app.use(cors())
app.use(errorHandler)

app.use('/', userRouter)


app.listen(port, () => console.log(`server started to port ${port}`))