const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.signUp = async (req, res, next) => {
    try {
        const user = req.body
        let email = await UserModel.findOne({ email: user.email })
        if (email) {
            res.status(400).json({ success: false, message: 'Email  already used' })
        } else {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await UserModel.create(user)
            res.status(201).json({
                status: 'User Created'
            })
        }
    } catch (error) {
        throw (error)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const maxAge = 60 * 60 * 24
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            const passwordCheck = await bcrypt.compare(password, user.password)
            if (passwordCheck) {
                const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: maxAge })
                res.status(201).json({ user: user, token, success: true, message: 'Login Completed' })
            } else {
                res.status(401).json({ status: 'inavalid password' })
            }
        } else {
            res.status(401).json({ status: 'inavalid email' })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.addTask = async (req, res, next) => {
    try {
        req.body.id = Date.now()
        const userId = req.user.uId
        await UserModel.updateOne({ userId }, {
            $push: {
                task: req.body
            }
        })
        res.status(201).json('task added')
    } catch (error) {
        console.log(error)
    }

}

module.exports.getTask=async(req,res,next)=>{
    try {
        const userId=req.user.urId
        const val=await UserModel.findOne({_id:userId})
        let task=val.task
        res.status(201).json({task})
    } catch (error) {
        console.log(error)
    }
}

module.exports.eventDrop=async(req,res,next)=>{
    try {
        console.log(req.body)
        const userId=req.user.urId
        const {end,event,start}=req.body
        await UserModel.updateOne({_id:userId,"task.id":event.id},{
            $set:{
                "task.$.end":end,
                "task.$.start":start
            }
        })
        res.status(201).json('event changed date')
    } catch (error) {
        console.log(error)
    }
}