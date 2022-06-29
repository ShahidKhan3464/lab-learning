const express = require('express')
const articleRoute = require('./route/article')
const userRoute = require('./route/user')
const mongoose = require('mongoose')
const app = express()
const port = 3001 || process.env.PORT
require('dotenv/config')
const cors = require('cors')

// MiddleWare
app.use(cors())
app.use(express.json()) // Body parse used with post request
app.use('/article', articleRoute)
app.use('/user', userRoute)

mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to DB'))

app.listen(port, () => console.log(`listening to the given port no ${port}`))