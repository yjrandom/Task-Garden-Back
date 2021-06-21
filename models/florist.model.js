const mongoose = require('mongoose')
const Schema = mongoose.Schema

const floristSchema = new Schema({
    name: {required:true, type: String, unique: true},
    description: {required:true, type: String, unique: true},
    price: {required:true, type: Number},
    maxGrowth: {required:true, type: Number},
    maxLevel: {type: Number, default: 2},
    images: [
        {type: String,}
    ]
})

module.exports = mongoose.model('Florist', floristSchema)