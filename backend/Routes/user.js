const express = require("express")
const router = express.Router()
const zod = require('zod')
const User = require("../db")
const JWT_SECRET = require("../config")
const jwt = require("jsonwebtoken")
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})
router.post('/signup', async (req, res) => {
    const body = req.body;
    // Checks for the inputs using zod
    const { success } = signupSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({ message: "Email already taken / InCorrect input" })
    }

    // Finding Existing Users
    const existingUser = await User.findOne({
        username: body.username
    })
    if (existingUser._id) {
        return res.status(411).json({ message: "User Already Exists" })
    }

    // New User

    const dbUser = await User.create(body)
    const Token = jwt.sign({ userId: dbUser._id }, JWT_SECRET)
    res.json({
        message: "User Created Successfully",
        token: Token
    })
})

router.post('/signup', (req, res) => {

})
module.exports = router