const Users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("./sendEmail")
const cloudinary = require("cloudinary")

const { CLIENT_URL } = process.env
const userCtrl = {
    register: async (req, res) => {
        try {
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatar",
                width: 300,
                crop: "scale"
            })
            const { name, email, password } = req.body;

            if (!name || !email || !password) return res.status(400).json({ msg: "Please fill all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid emails." })

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "The email already exists." })

            if (password.length < 8) return res.status(400).json({ msg: "Password must be at least 8 characters long." })

            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = await Users({
                name, email, password: passwordHash, avatar
                    : { public_id: myCloud.public_id, url: myCloud.secure_url }
            })

            await newUser.save()
            const accessToken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: "/user/refresh_token",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({ accessToken, newUser })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password) return res.status(400).json({ msg: "please fill in all fields." })

            const user = await Users.findOne({ email })

            if (!user) return res.status(400).json({ msg: "Email does not exist." })

            const match = await bcrypt.compare(password, user.password)
            if (!match) return res.status(400).json({ msg: "Password is incorrect" })

            const accessToken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })


            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: "/user/refresh_token",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({ accessToken, user })
            // res.json({ msg: "Login Successful" })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: "/user/refresh_token" })
            res.json({ msg: "Logged out" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshtoken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "Please login or register" })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login or register" })
                const accessToken = createAccessToken({ id: user.id })
                res.json({ accessToken })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "The email does not exist." })

            const access_token = createAccessToken({ id: user._id })

            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendEmail(email, url, 'reset your password')

            res.json({ msg: "Re-send the password, please check your email." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body

            const passwordHash = await bcrypt.hash(password, 12)
            await Users.findByIdAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })
            res.json({ msg: "Password successfully changed" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password")
            if (!user)
                return res.status(400).json({ msg: "User does not exist." })
            res.json({ user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await Users.find().select("-password")
            res.json({ result: users.length, users })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updatePassword: async (req, res) => {
        try {
            const { oldpassword, newPassword, confirmPassword } = req.body
            const user = await Users.findById(req.user.id)
            const isMatch = await bcrypt.compare(oldpassword, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Old password is incorrect." })

            if (newPassword !== confirmPassword)
                return res.status(400).json({ msg: "Password does not match!" })

            const passwordHash = await bcrypt.hash(newPassword, 10)

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })
            res.json({ msg: "Password successfully changed" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProfile: async (req, res) => {
        try {
            //     const { name, avatar } = req.body
            //     await Users.findOneAndUpdate({ _id: req.user.id }, {
            //         name, avatar
            //     })
            //     res.status(400).json({ messasge: "Profile Updated successfully" })
            const newUserData = {
                name: req.body.name
            };

            if (req.body.avatar) {
                const user = await Users.findById(req.user.id);

                const imageId = user.avatar.public_id;

                await cloudinary.v2.uploader.destroy(imageId);

                const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                    folder: "avatars",
                    width: 300,
                    crop: "scale",
                });

                newUserData.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }

            const user = await Users.findByIdAndUpdate(req.user.id, newUserData, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            });

            res.status(200).json({
                success: true,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)
            res.json({ msg: `Deleted this user id ${req.params.id}` })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUserRole: async (req, res) => {
        try {
            const { role } = req.body
            await Users.findOneAndUpdate({ _id: req.params.id }, {
                role
            })
            res.status(400).json({ msg: "Update success" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const validateEmail = (email) => {
    return email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
    );
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    })
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
}
module.exports = userCtrl