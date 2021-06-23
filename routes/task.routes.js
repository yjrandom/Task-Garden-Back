const router = require('express').Router()
const datefns = require('date-fns')
const TaskModel = require('../models/task.model')
const UserModel = require('../models/user.model')
const DailyModel = require('../models/dailies.model')
const checkUser = require('../lib/checkUser')
const {removeItemFromArray, mergeObjectWithAnotherObject, findNewestDateInArrayOfObjects, findNextClosestInterval, getCurrentDayStart, appendArrayWithAnotherArray} = require('../lib/func')

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
            currentDailies = await generateRandomDailies(userId, 1, userDailies, interval)
            // console.log(currentDailies)
            let currentDailiesId = ""
            let userDailiesId = ""
            let res = await TaskModel.insertMany(currentDailies)
            currentDailies = res
            currentDailiesId = res.map(el=>el._id)
            userDailiesId = userDailies.map(el => el._id)

            currentDailiesId = appendArrayWithAnotherArray(
                userDailiesId, currentDailiesId)

            let updateUser = await UserModel.findByIdAndUpdate(
                userId, {"dailies": currentDailiesId},
                {new: true})
        }
        res.status(200).json({dailies: currentDailies, currentDate: currentDate})
    }catch (e){
        console.log(e)
        res.status(400).json({message: "Fail to get daily"})
    }
})

router.post('/dailies/:id', checkUser, async(req,res)=>{
    try{
        let dailyToUpdate = await TaskModel.findById(req.params.id)
        let daily = await TaskModel.findByIdAndUpdate(
            req.params.id, {"isArchived": !dailyToUpdate.isArchived }, {new: true})
        res.status(200).json({isArchived: !dailyToUpdate.isArchived})
    }catch(e){
        console.log(e)
        res.status(400).json({message: "Fail to get daily"})
    }
})

async function generateRandomDailies(userId, count, userDailies, interval){
    let allDailies = await DailyModel.find()
    let latestDate = findNewestDateInArrayOfObjects(
        userDailies, "dateBy", "._id")
    let arr = []; let daily; let task
    for(let i = 0; i < count; i++){
        let randomIndex = Math.floor(Math.random() * allDailies.length)
        if (allDailies.length > 0){
            daily = allDailies.splice(randomIndex, 1)[0]
        }else{
            daily = allDailies[0]
        }
        let temp = generateDaily(daily, interval, userId, userDailies)

        task = new TaskModel(temp)
        arr.push(temp)
    }
    return arr
}

function generateDaily(daily, interval, userId, userDailies){
    let currentDate = new Date()
    let latestDate = findNewestDateInArrayOfObjects(
        userDailies, "dateBy", "._id")
    let temp = {
        name: daily.name,
        category: daily.category,
        description: "Daily challenge task!",
        isArchived: false,
        dateBy: new Date(), // interval
        dateStart: new Date(), //oldest date till interval
        status: "Pending"
    }

    temp["user"] = userId

    if (userDailies.length < 1){
        temp["dateStart"] = getCurrentDayStart()
    }else{
        temp["dateStart"] =  datefns.sub(findNextClosestInterval(
            currentDate, latestDate, interval),interval)
    }
    temp["dateBy"] = findNextClosestInterval(
        currentDate, temp["dateStart"], interval)
    return temp
}

module.exports = router
