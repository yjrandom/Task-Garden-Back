const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dailiesSchema = new Schema({
    category: {required:true, type: String},
    name: {required:true, type:String, unique: true}
})

module.exports = mongoose.model('Daily', dailiesSchema)