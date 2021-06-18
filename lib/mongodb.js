const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect(process.env.DB, {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("DB connected")
}).catch(e => console.log(e))


module.exports = mongoose
