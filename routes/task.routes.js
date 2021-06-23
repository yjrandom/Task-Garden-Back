const router = require('express').Router()
const datefns = require('date-fns')
const TaskModel = require('../models/task.model')
const UserModel = require('../models/user.model')
const DailyModel = require('../models/dailies.model')
const checkUser = require('../lib/checkUser')
const {removeItemFromArray, mergeObjectWithAnotherObject, findNewestDateInArrayOfObjects, findNextClosestInterval, getCurrentDayStart} = require('../lib/func')

// Test imports
// const PlantModel = require('../tests/plant.model')

//Task Dashboard
router.get('/', checkUser,async (req, res)=>{
    try{
        let userId = req.user.id
        let tasks = await TaskModel.find({user: userId})
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

//Dailies
//give you a random daily
router.get('/dailies', checkUser,async (req, res)=>{
    let interval = {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 5,
        seconds: 0
    }
    try{
        let userId = req.user.id
        let user = await UserModel.findById(userId).populate('dailies')
        let userDailies = user.dailies
        let currentDate = new Date()
        let latestDate = findNewestDateInArrayOfObjects(
            userDailies, "dateBy", "._id")

        let currentDailies = []
        if(latestDate > currentDate){
            currentDailies = userDailies.filter(el=>{
                return (datefns.isEqual(el.dateBy, latestDate))
            })
        }else{
            let temp = await generateDaily(userId, userDailies, interval)

            let task = new TaskModel(temp)
            await task.save()
            let newDaily = await UserModel.findByIdAndUpdate(
                userId, {$push: {dailies: task._id}},
                {new: true})
            currentDailies.push(newDaily)
        }
        res.status(200).json({dailies: currentDailies, currentDate: currentDate})
    }catch (e){
        console.log(e)
        res.status(400).json({message: "Fail to get daily"})
    }
})

router.post('/dailies/:id', checkUser, async(req,res)=>{
    try{
        let userId = req.user.id
        let user = await UserModel.findById(userId)
        
        // if I hit this route, I will check is user has this task alr in dailies
        // if user has the task I will change from isArchived true to false or false to true

        let task = new TaskModel(temp)
        let dateAndStatus = {
            dateCompleted: new Date(),
            status: 'Completed'
        }
        let dailyRecord = mergeObjectWithAnotherObject(daily, dateAndStatus)

    }catch(e){
        console.log(e)
    }
})

async function generateDaily(userId, userDailies, interval){
    let allDailies = await DailyModel.find()
    let randomIndex = Math.floor(Math.random() * allDailies.length)
    let daily = allDailies[randomIndex]
    let currentDate = new Date()
    let latestDate = findNewestDateInArrayOfObjects(
        userDailies, "dateBy", "._id")

    let temp = {
        name: daily.name,
        category: daily.category,
        description: "Daily challenge task!",
        user: userId,
        isArchived: false,
        dateBy: new Date(), // interval
        dateStart: new Date(), //oldest date till interval
        status: "Pending"
    }
    console.log(temp)
    if (userDailies.length < 1){
        temp["dateStart"] = getCurrentDayStart()
    }else{
        temp["dateStart"] = latestDate
    }

    temp["dateBy"] = findNextClosestInterval(currentDate, temp["dateStart"], interval)

    return temp
}

module.exports = router
