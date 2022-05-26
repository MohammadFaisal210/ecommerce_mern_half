const router = require("express").Router()
const productCtrl = require("../controllers/productCtrl")
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")
router.route("/product")
    .get(productCtrl.getAllProducts)
    .post(auth, authAdmin, productCtrl.createProduct)


router.post("/product/review", auth, productCtrl.createProductReview)

router.get("/product/get_reviews", productCtrl.getReviews)

router.delete("/product/deleteReview", auth, authAdmin, productCtrl.deleteReview)


router.route('/product/:id')
    .put(auth, authAdmin, productCtrl.updateProduct)
    .delete(auth, authAdmin, productCtrl.deleteProduct)
    .get(productCtrl.getProduct)

module.exports = router