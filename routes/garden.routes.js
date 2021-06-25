const router = require('express').Router()
const PlantModel = require('../models/plant.model')
const GardenModel = require('../models/garden.model')
const UserModel = require('../models/user.model')
const checkUser = require('../lib/checkUser')
const {removeItemFromArray} = require("../lib/func")

// Get garden of user
router.get("/", checkUser, async (req,res) => {
    try {
        let userId = req.user.id
        let garden = await GardenModel.findOne({user: userId})
        if(!garden) {
            let newGarden = new GardenModel({user: userId})
            await newGarden.save()
            garden = await GardenModel.findOne({user: userId})
        }

        for(let i = 0; i < garden.plants.length; i++) {
            let plant =  await PlantModel.findById(garden.plants[i])
            if(plant != null && (plant.currentGrowth >= plant.maxGrowth)) {
                plant = await PlantModel.findByIdAndUpdate(garden.plants[i], {currentLevel: 2},{new: true})
            }
            garden.plants[i] = plant
        }

        res.status(200).json({garden})
    } catch (e) {
        res.status(400).json({message: "Failed to get inventory"})
    }
})

// Get inventory of user
router.get("/inventory", checkUser, async (req,res) => {
    try {
        let userId = req.user.id
        let {plants} = await UserModel.findById(userId).populate("plants")
        res.status(200).json({plants})
    } catch (e) {
        res.status(400).json({message: "Failed to get inventory"})
    }
})

// Insert plant
router.post("/inventory/:id", checkUser, async (req, res) => {
    try {
        let userId = req.user.id
        let user = await UserModel.findById(userId)
        let userPlants = user.plants
        await UserModel.findByIdAndUpdate(userId, {plants: removeItemFromArray(req.params.id, userPlants)}, {new: true})
        let tempGarden = await GardenModel.findOne({user: userId})
        tempGarden.plants[req.body.index] = req.params.id
        let plants = tempGarden.plants
        let garden = await GardenModel.findOneAndUpdate({user: userId}, {plants: plants}, {new: true})
        res.status(200).json({message: "Plant inserted", payload: garden})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Failed to insert plant"})
    }
})



module.exports = router
