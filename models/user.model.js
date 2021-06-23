const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {required:true, type: String, unique: true},
    username: {required:true, type: String, unique: true},
    password: {required:true, type: String},
    isAdmin: {type: Boolean, default: false},
    coins: {type: Number, default: 5 },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    plants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Plant'
        }
    ],
    dailies:[{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)