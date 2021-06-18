const mongoose = require('mongoose')
const Schema = mongoose.Schema

const plantSchema = new Schema({
    name: String
})

module.exports = mongoose.model('Plant', plantSchema)