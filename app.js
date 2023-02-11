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
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}))
app.use(errorHandler)

app.use('/', userRouter)


app.listen(port, () => console.log(`server started to port ${port}`))