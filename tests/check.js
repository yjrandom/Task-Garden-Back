// function check(req, res, next){
//
//     try{
//         req.user = {
//             id: "60cc4e1f65fad7077a9791f8"
//         }
//         next()
//     }catch (e) {
//         return res.status(401).json({message: "token is not valid"})
//     }
// }
module.exports = function (req, res, next){

    try{
        req.user = {
            id: "60cc4e1f65fad7077a9791f8"
        }
        next()
    }catch (e) {
        return res.status(401).json({message: "token is not valid"})
    }
}