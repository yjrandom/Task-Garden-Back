const router = require('express').Router()
const floristPlantModel = require('../models/floristPlant.model')
const UserModel = require('../models/user.model')
const checkUser = require('../lib/checkUser')

//display of the plants in the shop/florist
router.get("/",checkUser, async (req, res) => {
    try{
        let floristPlants = await floristPlantModel.find()
        res.status(200).json({message: "Get florist plants successful", payload: floristPlants})
    }catch(e){
        console.log(e)
        res.status(400).json({message: "Failed to get plant"})
    }
})

router.post("/buy",checkUser, async (req, res) => {
    try{
        //deduct the price of plant and update user.coins
        let newCoins = req.body.coins - req.body.plant.price

        //update the coins in the database for the user
        await UserModel.findByIdAndUpdate(req.body.user._id,{coins: newCoins})

        //create a plant that is
        console.log(req.body)

        //send back the updated value of the coins
        res.status(200).json({newCoins})
    }catch(e){
        console.log(e)
        res.status(400).json({message: "Failed to get plant"})
    }
})
module.exports = router
