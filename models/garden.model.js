const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gardenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    plants: [{
        type: Schema.Types.ObjectId,
        ref: 'Plant'
    }]
})

module.exports = mongoose.model('Garden', gardenSchema)
