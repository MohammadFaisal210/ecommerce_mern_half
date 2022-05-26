const orderCtrl = require("../controllers/orderCtrl")
const router = require("express").Router()
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")

router.post("/order", auth, orderCtrl.createOrder)

router.get("/order", auth, orderCtrl.getAllOrders)

router.get("/order/admin", auth, authAdmin, orderCtrl.getAdminAllorders)

router.route("/order/:id")
    .get(auth, orderCtrl.getOrder)
    .delete(auth, authAdmin, orderCtrl.deleteOrder)
router.put("/order/:id", auth, authAdmin, orderCtrl.updateOrder)

module.exports = router