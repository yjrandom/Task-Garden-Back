const mongoose = require('mongoose')
const Schema = mongoose.Schema

const floristSchema = new Schema({
    name: {required: true, type: String, unique: true},
    description: {required: true, type: String, default: "No information available"},
    price: {required:true, type: Number, default: 1},
    maxGrowth: {required:true, type: Number, default: 100},
    maxLevel: {type: Number, default: 2},
    images: [
        {type: String}
    ]
})

module.exports = mongoose.model('FloristPlant', floristSchema)