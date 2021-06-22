require('dotenv').config()
const router = require('express').Router()
const floristPlantModel = require('../models/floristPlant.model')
const dailyModel = require('../models/dailies.model')
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
        res.status(200).json({message: "Plant added to florist"})
    }catch(e){
        res.status(400).json({message: e})
    }
})

router.post("/dailies/create", checkUser, checkAdmin, async (req,res)=>{
    try{
        let daily = new dailyModel(req.body)
        await daily.save().catch(err=>{
            //console.log(err)
            if (err.code === 11000){
                throw "Name is already taken"
            }
        })
        res.status(200).json({message: "New dailies added"})
    }catch(e){
        res.status(400).json({message: e})
    }
})

module.exports = router
