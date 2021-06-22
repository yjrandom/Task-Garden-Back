require('dotenv').config()
const router = require('express').Router()
const floristPlantModel = require('../models/floristPlant.model')
const checkUser = require('../lib/checkUser')
const checkAdmin = require('../lib/checkAdmin')

router.post("/florist/create", checkUser, checkAdmin, async (req,res)=>{
    try{
        let floristPlant = new floristPlantModel(req.body)
        await floristPlant.save().catch(err=>{
            //console.log(err)
            if (err.code === 11000){
                throw "Name is already taken"
            }
        })
        res.status(200).json({message: "Plant added to florist", payload: floristPlant})
    }catch(e){
        res.status(400).json({message: e})
    }
})

module.exports = router
