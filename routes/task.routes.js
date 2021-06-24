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
        let user = await UserModel.findById(userId).populate("tasks")
        
        let tasks = user.tasks

        res.status(200).json({tasks})
    }catch (e){
        res.status(400).json({message: "Fail to get tasks"})
    }
})

router.post('/create', checkUser,  async (req,res)=>{
    try{
        let task = new TaskModel(req.body)
        task.user = req.user.id
        task.status = "Pending"
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

router.get('/done/:id', checkUser, async (req, res)=>{
    try{

        let originalTask = await TaskModel.findById(req.params.id)

        let newStatus = originalTask["status"]
        if (originalTask["status"] === undefined){
            newStatus = "Completed"
        }else if (originalTask["status"] === "Pending"){
            newStatus = "Completed"
        }else if (originalTask["status"] === "Completed"){
            newStatus = "Pending"
        }

        await TaskModel.findByIdAndUpdate(req.params.id, {status: `${newStatus}`}, {new: true})
        res.status(200).json({message: `Task marked as ${newStatus} successfully`, payload: newStatus})
    }catch(e){
        console.log(e)
        res.status(400).json({message: "Failed to change task status"})
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

        await deletePastIncompleteDailies(userId)

        if(latestDate > currentDate){
            currentDailies = returnCurrentDailies(userDailies, latestDate);
        }else{
            currentDailies = await generateNewDailies(currentDailies, userId, userDailies, interval);
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

        let newCoins = await addRemoveCoinsFromUser(!dailyToUpdate.isArchived, req.user.id)

        res.status(200).json({isArchived: !dailyToUpdate.isArchived, newCoins})
    }catch(e){
        console.log(e)
        res.status(400).json({message: "Fail to get daily"})
    }
})

async function addRemoveCoinsFromUser(isAdd, userId){
    try{
        const dailyCoin = 1000
        let user = await UserModel.findById(userId)
        let userCoins = user.coins
        isAdd ? userCoins += dailyCoin : userCoins -= dailyCoin
        await UserModel.findByIdAndUpdate(userId, {coins: userCoins})
        return userCoins
    }catch (e) {
        console.log(e)
    }

}

function returnCurrentDailies(userDailies, latestDate) {
    return userDailies.filter(el => {
        return (datefns.isEqual(el.dateBy, latestDate))
    })
}

async function generateNewDailies(currentDailies, userId, userDailies, interval) {
    let currentDailiesId = ""
    let userDailiesId = ""

    currentDailies = await generateRandomDailies(userId, 1, userDailies, interval)

    let res = await TaskModel.insertMany(currentDailies)
    currentDailies = res
    currentDailiesId = res.map(el => el._id)
    userDailiesId = userDailies.map(el => el._id)

    currentDailiesId = appendArrayWithAnotherArray(
        userDailiesId, currentDailiesId)

    let updateUser = await UserModel.findByIdAndUpdate(
        userId, {"dailies": currentDailiesId},
        {new: true})
    return currentDailies;
}

async function deletePastIncompleteDailies(userId){
    let currentDate = new Date()
    let user = await UserModel.findById(userId)
    let userDailies = user.dailies

    let dailiesToDelete = await TaskModel.find({user: userId, isArchived: false})

    dailiesToDelete = dailiesToDelete.filter(el => {
        return (el.dateBy < currentDate && userDailies.includes(el._id.toString()))
    })

    for (let i = dailiesToDelete.length - 1; i >= 0 ; i--){
        await TaskModel.findByIdAndDelete(dailiesToDelete[i]._id)
    }

    let dailiesToDeleteId = dailiesToDelete.map(el => el._id.toString())
    let newUserDailies = userDailies.filter(el => {
        return (!dailiesToDeleteId.includes(el._id.toString()))
    })

    await UserModel.findByIdAndUpdate(userId, {dailies: newUserDailies})

    return dailiesToDelete
}

async function generateRandomDailies(userId, count, userDailies, interval){
    let allDailies = await DailyModel.find()
    let arr = []; let daily; let task
    for(let i = 0; i < count; i++){
        let randomIndex = Math.floor(Math.random() * allDailies.length)
        if (allDailies.length > 0){
            daily = allDailies.splice(randomIndex, 1)[0]
        }else{
            daily = allDailies[0]
        }
        let temp = constructDaily(daily, interval, userId, userDailies)

        task = new TaskModel(temp)
        arr.push(temp)
    }
    return arr
}

function constructDaily(daily, interval, userId, userDailies){
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
