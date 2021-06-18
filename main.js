const express = require('express')
const app = express()
require('dotenv').config()

// Middlewares
app.use(express.json())
app.use(express.static('node_modules'))
app.use(express.static('public'))


// Routes




// Listen
app.listen(process.env.PORT)
