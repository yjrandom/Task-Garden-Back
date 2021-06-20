const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {type: String, required: true},
    description:{type: String},
    category: {type: String},
    dateBy: {type: Date},
    dateStart: {type: Date, default: new Date()},
    status: {type: String}, //completed
    plantAssigned: {
        type: Schema.Types.ObjectId,
        ref: 'Plant'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isImportant: {type: Boolean, default: false},
    isUrgent: {type: Boolean, default: false},
}, {timestamps: {createdAt:'dateCreated', updatedAt:'dateUpdated'}})

module.exports = mongoose.model('Task', taskSchema)