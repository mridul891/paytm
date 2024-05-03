const express = require("express")
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JSONWEBSECRET } = require('../config');
const { User } = require('../db');
const { authMiddleware } = require("../middleware/middleware");

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

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})


router.post('/signup', async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: " Email already taken / Incorrect Inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser) {
        res.status(411).json({
            message: " The user is already present in the datbase"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JSONWEBSECRET);

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

router.put('/updateinfo', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Something went wrong || Bad Credentials"
        })
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.status(200).json({
        message: "Information is Updated"
    })

})

router.get('/bulk', authMiddleware, async (req, res) => {
    const query = req.query.filter;

    const user = await User.findOne({
        firstname: req.query.filter
    })

    console.log(user)
    return;

})
module.exports = router;