const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, default: "sample-email@email.com"},
    password: {type: String, default: "password"}
})

module.exports = mongoose.model('User', userSchema)