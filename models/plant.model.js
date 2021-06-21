const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sapling = require('../lib/images/sapling.png')

const plantSchema = new Schema({
    name: {required:true, type: String, unique: true},
    description: { type: String, unique: true},
    price: {required:true, type: Number},
    currentGrowth: {type: Number, default: 1},
    maxGrowth: {required:true, type: Number},
    currentLevel: {type: Number, default: 1},
    maxLevel: {type: Number, default: 2},
    images: [
        {type: String, default: sapling}
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pendingTasks: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }
    ],
    completedTasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
})

module.exports = mongoose.model('Plant', plantSchema)