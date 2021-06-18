const PlantModel = require('../models/plant.model')
const TaskModel = require('../models/task.model')

async function createTask(plantId=""){
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
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        let day = new Date().getDate()

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

module.exports = {createTask, createPlant}