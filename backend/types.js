const zod = require('zod');

const userSignupInput = zod.object({
    firstName: zod.string().min(3),
    lastName: zod.string().min(3),
    username: zod.string().email(),
    password: zod.string().min(6)
})

const userSigninInput = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})

const userUpdate = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})

module.exports = {
    userSignupInput,
    userSigninInput,
    userUpdate
}