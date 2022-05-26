const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name of yourself"],
        minlength: [3, "Please enter a name atleast 3 characters"],
        maxlength: [15, "Name can not big than 10 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        // validate: [validator.isEmail, "Please enter a valid email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Password must be at least 8 characters long"],
        // select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)
