const router = require('express').Router()
const userCtrl = require("../controllers/userCtrl")
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")

router.post("/register", userCtrl.register)

router.post("/login", userCtrl.login)

router.post("/logout", userCtrl.logout)

router.post("/refresh_token", userCtrl.refreshtoken)

router.post("/forgot", userCtrl.forgotPassword)

router.put("/reset", auth, userCtrl.resetPassword)

router.patch('/updatePass', auth, userCtrl.updatePassword)

router.put("/updateInfor", auth, userCtrl.updateProfile)

router.get("/infor", auth, userCtrl.getUser)

router.get("/allusers_infor", auth, authAdmin, userCtrl.getAllUsers)

router.delete("/delete_user_id/:id", auth, authAdmin, userCtrl.deleteUser)

router.patch("/update_role/:id", auth, authAdmin, userCtrl.updateUserRole)

module.exports = router