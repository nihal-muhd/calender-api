const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')

const verifyUser = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            const jwtToken = jwt?.verify(token, process.env.TOKEN_KEY)

            if (jwtToken) {
                const urId = jwtToken.userId
                const user = await UserModel.findOne({ urId })
                if (!user) {
                    return res.status(400).json({ status: false, message: 'Invalid token' })
                } else {
                    req.user = {
                        urId: user._id,
                        userName: user.name
                    }
                    next()
                }
            } else {
                return res.status(400).json({ status: false, message: 'Invalid token' })
            }
            if (!token) {
                res.status(401)
                throw new Error('No token');
            }
        }

    } catch (error) {
        return res.status(500).json({ status: false, message: 'token not available' })
    }
}

module.exports = { verifyUser }