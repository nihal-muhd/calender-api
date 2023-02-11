const express = require('express')
const router = express.Router()
const {verifyUser}=require('../middleware/verifyUser')
const { signUp, login,addTask,getTask,eventDrop } = require('../controllers/userControllers')

router.post('/signup', signUp)
router.post('/login', login)
router.post('/add-task',verifyUser,addTask)
router.get('/get-task',verifyUser,getTask)
router.post('/event-drop',verifyUser,eventDrop)

module.exports = router