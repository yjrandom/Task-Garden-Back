const express = require('express')
const app = express()
const {createTask, createPlant, createUser} = require('./tests/taskTests')

require('dotenv').config()
require('./lib/mongodb')

// Middlewares
app.use(express.json())

app.use(express.static('node_modules'))
app.use(express.static('public'))


// Routes

app.use("/api/tasks", require('./routes/task.routes'))

// Tests
// createTask().then(suc=>console.log(suc)).catch(err=>console.log(err))
// createPlant().then(suc=>console.log(suc)).catch(err=>console.log(err))
// createUser().then(suc=>console.log(suc)).catch(err=>console.log(err))

// Listen
app.listen(process.env.PORT, () => console.log(`running on ${process.env.PORT}`))
