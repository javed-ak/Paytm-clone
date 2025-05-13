const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Javed:wq0QppRnBMV3dI1E@cluster0.iobmisv.mongodb.net/paytm')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String 
});

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'User'},
    balance: Number
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account
}