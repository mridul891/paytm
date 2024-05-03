const express = require("express")
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JSONWEBSECRET } = require('../config');
const { User } = require('../db')

const signupBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string().min(6, { message: "Please enter a greate than 6" })
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
router.post('/signup', async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: " Email already taken / Incorrect Inputs"
        })
    }

    console.log(req.body.username)
    const existingUser = await User.findOne({
        username: req.body.username
    })
    console.log("gss")
    if (existingUser) {
        res.status(411).json({
            message: " The user is already present in the datbase"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.username,
        lastname: req.body.lastname,
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JSONWEBSECRET);

    console.log("h")
    res.json({
        message: "The user successfully connected",
        token: token
    })
})

router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({ message: "Bad Input Credentials" })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id,
        }, JSONWEBSECRET);

        res.json({ token: token })
        return;
    }

    res.status(401).json({ message: "Error while logging in" })
})

module.exports = router;