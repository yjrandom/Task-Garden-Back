const router = require('express').Router()
const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {body} = require('express-validator')
const checkUser = require("../lib/checkUser")


router.get('/user', checkUser, async(req, res) => {
    try{
        let user = await UserModel.findById(req.user.id, "-password")
        res.status(200).json({user})
    }catch(e){
        console.log(e)
        res.status(500).json({ message: "something went wrong"})
    }
})


//this is the route for registering
router.post('/register',
    body('passwordConfirmation').custom((value, { req }) => {
        // console.log(value)
        // console.log(req.body.password)
        try{
            if (value !== req.body.password) {
                // console.log("wrong")
                req.success = false
                throw new Error('Password confirmation does not match password');
            }
            req.success = true
        }catch (e) {
            console.log(e)
        }
        // Indicates the success of this synchronous custom validator
        // return true;
    }),
    async (req, res)=>{

    try{
        if(!req.success){
            throw "password confirmation failed"
        }
        let user = new UserModel(req.body)

        //salt rounds
        user.password = await bcrypt.hash(user.password, 10)
        await user.save()

        //auto-login after registering
        let token = jwt.sign({user: {
            id: user._id
            }},process.env.JWTSECRET,{expiresIn: "1d"})
        res.status(201).json({token})
    }catch (e) {

        console.log(e)
        res.status(400).json({message:"user not created"})
    }
})

//route for login
router.post('/login', async (req, res)=>{
    try{
        let user = await UserModel.findOne({email: req.body.email})
        //if user is empty
        if(!user){
            throw "user not found"
        }
        //if password is not a match
        if(!user.validPassword(req.body.password)){
            throw "check user password"
        }
        //sign the token
        let token = jwt.sign({user:{
            id: user._id
        }},process.env.JWTSECRET,{expiresIn: "1d"})

        res.status(200).json({token})
    }catch (e) {
        res.status(400).json({message : e})
    }
})

//route for logout


module.exports = router