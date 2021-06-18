const UserModel = require('../tests/user.model')
const PlantModel = require('./plant.model')
const TaskModel = require('../models/task.model')

async function createTask(plantId="", userId="60cc4e1f65fad7077a9791f8"){
    try{
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        let day = new Date().getDate()

        let temp = {
            name: "sample-task",
            description: "sample-description",
            category: "sample-category",
            dateBy: new Date(year, month, day + 1),
            //dateStart: ,
            status: "Pending", //completed
            user: userId
        }
        let task = new TaskModel(temp)
        await task.save()
        return {message: "task created!",payload: task}
    }catch (e){
        return {message: "Failed to create task!", error: e}
    }
}

async function createPlant(){
    try{

        let temp = {
            name: "sample-plant",
        }
        let plant = new PlantModel(temp)
        await plant.save()
        return {message: `${plant.name} created!`,payload: plant}
    }catch (e){
        return {message: `Failed to create plant!`, error: e}
    }
}

async function createUser(){
    try{

        let user = new UserModel()
        await user.save()
        return {message: `${user.email} created!`,payload: user}
    }catch (e){
        return {message: `Failed to create user!`, error: e}
    }
}

module.exports = {createTask, createPlant, createUser}