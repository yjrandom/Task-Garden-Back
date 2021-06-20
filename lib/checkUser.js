const jwt = require('jsonwebtoken')
require('dotenv').config()
const TokenModel = require('../models/token.model')

module.exports = async function (req, res, next){
    let token = req.headers.authorization.split(" ")[1]
    if(!token){
        return res.status(401).json({message: "no token"})
    }
    let checkToken = await TokenModel.findOne({token: token})
    if(!checkToken){
        return res.status(403).json({message: "token cannot be used anymore, please re-login"})
    }
    try{
        let token = req.headers.authorization.split(" ")[1]
        if(token){
            let decoded = jwt.verify(token, process.env.JWTSECRET)
            req.user = decoded.user
            next()
        }
    }catch (e) {
        return res.status(401).json({message: "token is not valid"})
    }
}
