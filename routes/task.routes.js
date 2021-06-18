const router = require('express').Router()
const TaskModel = require('../models/task.model')

// Test imports
const PlantModel = require('../tests/plant.model')
const UserModel = require('../tests/user.model')
const checkUser = require('../tests/check')
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

module.exports = router