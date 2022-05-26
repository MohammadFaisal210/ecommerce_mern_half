const jwt = require("jsonwebtoken")
const Users = require("../models/userModel")
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(400).json({ msg: "Invalid authentication" })

        // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        //     if (err) return res.status(400).json({ msg: "Invalid authentication" })

        //     req.user = user
        //     next()
        // })
        const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = await Users.findById(decodedData.id);
        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = auth