const router = require('express').Router()
const PlantModel = require('../models/plant.model')
const UserModel = require('../models/user.model')
const checkUser = require('../lib/checkUser')

// Get inventory of user
router.get("/", checkUser, async (req,res) => {
    try {
        let userId = req.user.id
        let {plants} = await UserModel.findById(userId).populate("plants")
        res.status(200).json({plants})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Failed to get inventory"})
    }
})



module.exports = router
