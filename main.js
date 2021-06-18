const express = require('express')
const app = express()
require('dotenv').config()
require("./lib/mongodb");

// Middlewares
app.use(express.json())
app.use(express.static('node_modules'))
app.use(express.static('public'))


// Routes
app.use("/api",require('./routes/auth.routes'))



// Listen
app.listen(process.env.PORT)
