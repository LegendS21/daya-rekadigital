// const { User } = require('../models')
// const { verifyToken } = require('../helper/jwt')
// const authentication = async (req, res, next) => {
//     try {
//         const { authorization } = req.headers
//         if (!authorization) {
//             throw { name: `Unauthorization` }
//         }
//         const access_token = authorization.split(' ')[1]

//         const payload = verifyToken(access_token)

//         const user = await User.findOne({
//             where: {
//                 email: payload.email
//             }
//         })
//         if (!user) {
//             throw { name: `Unauthorization` }
//         }
//         req.loginInfo = {
//             userId: user.id,
//             email: user.email
//         }
//         next()
//     } catch (error) {
//         console.log(error);
//         next(error)
//     }
// }
// module.exports = authentication