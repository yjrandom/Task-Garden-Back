
const UserModel = require('../models/user.model')

module.exports = async function (req, res, next){
    try{
        let user = await UserModel.findById(req.user.id)
        if (user.isAdmin){
            next()
        }else{
            throw "You do not have Admin privileges!"
        }
    }catch (e) {
        if (e.includes("Admin")){
            return res.status(401).json({message: e})
        }else
        {
            return res.status(404).json({message: "User not found!"})
        }
    }
}