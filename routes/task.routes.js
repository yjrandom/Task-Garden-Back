const router = require('express').Router()

const TaskModel = require('../models/task.model')
const PlantModel = require('../tests/plant.model')

router.get('/:id', async (req, res)=>{
    try{
        let tasks = await TaskModel.find({user: req.params.id})
        res.status(200).json({tasks})
    }catch (e){
        res.status(200).json({message: "Fail to get tasks"})
    }
})



module.exports = router