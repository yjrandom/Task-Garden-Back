const router = require('express').Router()
const PlantModel = require('../models/plant.model')
const GardenModel = require('../models/garden.model')
const UserModel = require('../models/user.model')
const checkUser = require('../lib/checkUser')

// Get garden of user
router.get("/", checkUser, async (req,res) => {
    try {
        let userId = req.user.id
        let garden = await GardenModel.findOne({user: userId}).populate("plants")
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
        console.log(userId, req.body.index)
        let tempGarden = await GardenModel.findOne({user: userId})
        tempGarden.plants[]

        // let garden = await GardenModel.findOneAndUpdate({user: userId}, {plants[req.body.index]: req.params.id }, {new: true})
        // console.log(garden)
        // res.status(200).json({message: "Plant inserted", payload: garden})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Failed to insert plant"})
    }
})



module.exports = router
