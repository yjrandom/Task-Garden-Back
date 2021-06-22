const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dailiesSchema = new Schema({
    category: {type: String},
    name: {type:String}
})

module.exports = mongoose.model('Daily', dailiesSchema)