const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    loggedInOn: String,
    createdBy: String,
    isLoggedIn: Boolean,
    username: {
        type: String,
        unique: true
    },
    password: String
})

module.exports = mongoose.model('Users', userSchema)