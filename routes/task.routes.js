const router = require('express').Router()
const TaskModel = require('../models/task.model')
const UserModel = require('../models/user.model')
const checkUser = require('../lib/checkUser')
const {removeItemFromArray, mergeObjectWithAnotherObject} = require('../lib/func')

// Test imports
const PlantModel = require('../tests/plant.model')

//

router.get('/:id', async (req, res)=>{
    try{
        let tasks = await TaskModel.find({user: req.params.id})
        res.status(200).json({tasks})
    }catch (e){
        res.status(400).json({message: "Fail to get tasks"})
    }
})

router.post('/create', checkUser,  async (req,res)=>{
    try{
        let task = new TaskModel(req.body)
        task.user = req.user.id
        await task.save()
        await UserModel.findByIdAndUpdate(req.user.id, {$push: {tasks: task._id}})
        res.status(200).json({message: "Task created successfully", payload: task})
    }catch (e){
        console.log(e)
        res.status(400).json({message: "Failed to create tasks"})
    }
})

router.delete('/delete/:id', checkUser, async (req, res) =>{
    try{
        let userId = req.user.id
        let user = await UserModel.findById(userId)
        let taskArr = user.tasks

        await TaskModel.findByIdAndDelete(req.params.id)
        let updatedUser = await UserModel.findByIdAndUpdate(userId,
            {tasks: removeItemFromArray(req.params.id, taskArr)}, {new: true})
        res.status(200).json({message: "Task deleted successfully", payload: updatedUser})
    }catch (e){
        res.status(400).json({message: "Failed to delete task"})
    }
})

router.post('/edit/:id', checkUser, async (req, res)=>{
    try{
        let originalTask = await TaskModel.findById(req.params.id)
        let task = await TaskModel.findByIdAndUpdate(req.params.id,
            mergeObjectWithAnotherObject(originalTask, req.body),{new: true})
        res.status(200).json({message: "Task edited successfully", payload: task})
    }catch(e){
        res.status(400).json({message: "Failed to edit task"})
    }
})

module.exports = router