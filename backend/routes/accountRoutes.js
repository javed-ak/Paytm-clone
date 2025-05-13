const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
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
    const session = await mongoose.startSession();

    session.startTransaction();
    const createPayload = req.body;

    const fromAccount = await Account.findOne({
        userId: req.userId
    }).session(session);

    if(fromAccount.balance < createPayload.amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: 'Insufficient balance'
        });
    };

    const toAccount = await Account.findOne({
        userId: createPayload.to
    }).session(session);

    if(!toAccount) {
        await session.abortTransaction();
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
    }).session(session);

    await Account.updateOne ({
        userId: createPayload.to
    }, {
        $inc: {
            balance: createPayload.amount
        }
    }).session(session)

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })
})

module.exports = router;