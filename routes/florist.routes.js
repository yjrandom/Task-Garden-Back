const router = require('express').Router()
const floristPlantModel = require('../models/floristPlant.model')
const checkUser = require('../lib/checkUser')

router.get("/",checkUser, async (req, res) => {
    try{
        let floristPlants = await floristPlantModel.find()
        res.status(200).json({message: "Get florist plants successful", payload: floristPlants})
    }catch(e){
        console.log(e)
        res.status(400).json({message: "Failed to get plant"})
    }
})



module.exports = router
