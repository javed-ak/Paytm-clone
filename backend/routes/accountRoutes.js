const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const userAccount = await Account.findOne({
        userId: req.userId
    })
    res.json({
        balance: userAccount.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = mongoose.t
    const createPayload = req.body;
    const fromAccount = await Account.findOne({
        userId: req.userId
    })

    if(fromAccount.balance < createPayload.amount) {
        return res.status(400).json({
            message: 'Insufficient balance'
        })
    }

    const toAccount = await Account.findOne({
        userId: createPayload.to
    })

    if(!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -createPayload.amount
        }
    })

    await Account.updateOne ({
        userId: createPayload.to
    }, {
        $inc: {
            balance: createPayload.amount
        }
    })

    res.json({
        message: "Transfer successful"
    })
})

module.exports = router;