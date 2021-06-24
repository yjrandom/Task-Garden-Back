const express = require('express')
const app = express()

const path = require('path');
app.use(express.static(path.resolve(__dirname, 'build')));


require('dotenv').config()
require('./lib/mongodb')

// Middlewares
app.use(express.json())

app.use(express.static('node_modules'))
app.use(express.static('public'))


// Routes
app.use("/api",require('./routes/auth.routes'))
app.use("/api/tasks", require('./routes/task.routes'))
app.use("/api/florist", require('./routes/florist.routes'))
app.use("/api/admin", require('./routes/admin.routes'))
app.use("/api/garden", require('./routes/garden.routes'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


// Listen
app.listen(process.env.PORT, () => console.log(`running on ${process.env.PORT}`))
