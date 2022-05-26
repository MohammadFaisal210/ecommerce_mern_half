const router = require("express").Router()
const paymentCtrl = require("../controllers/paymentCtrl")
const auth = require("../middleware/auth")

router.route("/payment")
    .post(paymentCtrl.processPaymant)
    .get(auth, paymentCtrl.sendStripeApiKey)

module.exports = router