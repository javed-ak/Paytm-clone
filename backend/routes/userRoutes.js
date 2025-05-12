const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { userSignupInput, userSigninInput, userUpdate } = require('../types');
const { User, Account } = require('../db');

const { JWT_SECRET_KEY } = require('../config');
const { authMiddleware } = require('../middleware');

router.post('/signup', async (req, res) => {
    const createPayload = req.body;
    const parsePayload = userSignupInput.safeParse(createPayload);

    if(!parsePayload.success) {
        return res.status(403).json({
            message: "Some inputs are wrong"
        })
    }

    const isExisting = await User.findOne({
        username: createPayload.username
    })

    if(isExisting) {
        return res.status(403).json({
            message: "User already exists"
        })
    }

    const user = await User.create({
        firstName: createPayload.firstName,
        lastName: createPayload.lastName,
        username: createPayload.username,
        password: createPayload.password
    })

    await Account.create({
        userId: user._id,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({userId: user._id}, JWT_SECRET_KEY);
    const jwtToken = `Bearer ${token}`

    res.json({
        message: "User created successfully",
        token: jwtToken
    })
})

router.post('/signin', async (req, res) => {
    const createPayload = req.body;
    const parsePayload = userSigninInput.safeParse(createPayload);

    if(!parsePayload.success) {
        return res.status(403).json({
            message: "Inputs are wrong"
        })
    }

    const validate = await User.findOne({
        username: createPayload.username,
        password: createPayload.password
    })
    if(!validate) {
        return res.json({
            message: "User not exists"
        })
    }

    // const token = jwt.sign({userId: user._id}, JWT_SECRET_KEY);
    const token = jwt.sign({userId: validate._id}, JWT_SECRET_KEY);
    const jwtToken = `Bearer ${token}`;

    res.json({
        token: jwtToken
    })
})

router.put('/update-profile', authMiddleware, async (req, res) => {
    const createPayload = req.body;
    const parsePayload = userUpdate.safeParse(createPayload);

    if(!parsePayload.success) {
        return res.json({
            message: 'Inputs are wrong'
        })
    }
    try {
        await User.updateOne({
        _id: req.userId
        }, req.body)
        res.json({
            message: "Updated successfully"
        })
    } catch (err) {
        res.status(411).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: { $regex : filter, $options: 'i'}
        }, {
            lastName: { $regex : filter, $options: "i"}
        }]
    })
    res.json({
        user: users.map(user => ({
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }))
    })
})

module.exports = router;